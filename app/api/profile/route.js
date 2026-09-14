import { NextResponse } from "next/server";
import { calculatePathways, pathwayOrder, profileQuestions, questionIsVisible } from "../../../content/profile";
import { sendProfileDelivery } from "../../../lib/profile-email";

const MAX_BODY_BYTES = 50_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const allowedQuestionIds = new Set(profileQuestions.map((question) => question.id));
const allowedAttribution = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"]);
const requiredProfileColumns = [
  "first_name", "email", "privacy_consent", "consent_recorded_at", "questionnaire_answers", "primary_pathway", "secondary_pathway",
  "source_path", "source_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "preferred_destinations", "recommended_route",
];
let profileColumnsPromise;
const inMemoryRateHits = new Map();

function cleanText(value, max = 240) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanAnswers(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input).filter(([key]) => allowedQuestionIds.has(key)).map(([key, value]) => {
    if (Array.isArray(value)) return [key, value.slice(0, 12).map((item) => cleanText(item, 120)).filter(Boolean)];
    return [key, cleanText(value, 240)];
  }));
}

function answersAreValid(answers) {
  return profileQuestions.every((question) => {
    if (!questionIsVisible(question, answers)) return true;
    const value = answers[question.id];
    if (question.required && (Array.isArray(value) ? value.length === 0 : !value)) return false;
    if (question.type === "text") return !value || typeof value === "string";
    const allowed = new Set((question.options || []).map((option) => option.value));
    if (question.type === "multi") return Array.isArray(value) && (!question.max || value.length <= question.max) && value.every((entry) => allowed.has(entry));
    return typeof value === "string" && allowed.has(value);
  });
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url, key } : null;
}

function supabaseHeaders(key, extras = {}) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extras };
}

async function getProfileColumns(config) {
  if (!profileColumnsPromise) {
    profileColumnsPromise = fetch(`${config.url}/rest/v1/`, {
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, Accept: "application/openapi+json" },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const schema = await response.json();
        const properties = schema?.definitions?.attendee_profiles?.properties
          || schema?.components?.schemas?.attendee_profiles?.properties;
        return properties ? new Set(Object.keys(properties)) : null;
      })
      .catch(() => null);
  }
  return profileColumnsPromise;
}

async function rateLimitKey(request, email, secret) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const bytes = new TextEncoder().encode(`${secret}:${forwarded}:${email}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function isRateLimited(config, key, columns) {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const query = columns.has("rate_limit_key")
    ? new URLSearchParams({ select: "id", rate_limit_key: `eq.${key}`, created_at: `gte.${since}`, limit: String(RATE_LIMIT_MAX) })
    : new URLSearchParams({ select: "id", email: `eq.${key}`, created_at: `gte.${since}`, limit: String(RATE_LIMIT_MAX) });
  const response = await fetch(`${config.url}/rest/v1/attendee_profiles?${query}`, {
    headers: supabaseHeaders(config.key), signal: AbortSignal.timeout(10_000), cache: "no-store",
  });
  if (!response.ok) throw new Error(`Rate-limit lookup failed (${response.status})`);
  const rows = await response.json();
  return Array.isArray(rows) && rows.length >= RATE_LIMIT_MAX;
}

function recordRateHit(key, columns) {
  if (!columns.has("rate_limit_key")) return;
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  const hits = (inMemoryRateHits.get(key) || []).filter((time) => time >= cutoff);
  hits.push(Date.now());
  inMemoryRateHits.set(key, hits);
}

function sourceDetails(request, input, attribution) {
  const incoming = input?.source && typeof input.source === "object" ? input.source : {};
  const sourcePath = cleanText(incoming.path || input?.source || "/profile", 300).replace(/^https?:\/\/[^/]+/i, "") || "/profile";
  const rawUrl = cleanText(incoming.url, 2_000);
  const requestUrl = new URL(request.url);
  let sourceUrl;
  try {
    const parsed = new URL(rawUrl);
    sourceUrl = parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed : null;
  } catch { sourceUrl = null; }
  if (!sourceUrl) {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
    const protocol = request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "") || "https";
    sourceUrl = new URL(`${protocol}://${host}${sourcePath.startsWith("/") ? sourcePath : `/${sourcePath}`}`);
  }
  for (const [key, value] of Object.entries(attribution)) sourceUrl.searchParams.set(key, value);
  return { sourcePath: sourcePath.split("?")[0] || "/profile", sourceUrl: sourceUrl.toString() };
}

async function storeProfile(config, profile, columns) {
  const payload = columns
    ? Object.fromEntries(Object.entries(profile).filter(([key]) => columns.has(key)))
    : profile;
  const response = await fetch(`${config.url}/rest/v1/attendee_profiles`, {
    method: "POST",
    headers: supabaseHeaders(config.key, { Prefer: "return=representation" }),
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("Attendee profile insert failed", response.status, detail.slice(0, 300));
    throw new Error("Profile storage failed");
  }
  const rows = await response.json();
  return rows[0]?.id;
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return NextResponse.json({ ok: false, message: "Send this profile as JSON." }, { status: 415 });
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This profile is too large to submit." }, { status: 413 });

  let input;
  try { input = await request.json(); } catch { return NextResponse.json({ ok: false, message: "The profile data is not valid." }, { status: 400 }); }
  if (JSON.stringify(input).length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This profile is too large to submit." }, { status: 413 });
  if (input?.lead?.website) return NextResponse.json({ ok: true });

  const startedAt = Number(input?.startedAt || 0);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2_500) return NextResponse.json({ ok: false, message: "Please take a moment to review your profile before sending." }, { status: 429 });

  const name = cleanText(input?.lead?.name, 120);
  const email = cleanText(input?.lead?.email, 254).toLowerCase();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || input?.lead?.consent !== true || input?.lead?.acknowledgement !== true) return NextResponse.json({ ok: false, message: "A valid name, email, consent and acknowledgement are required." }, { status: 400 });

  const answers = cleanAnswers(input.answers);
  if (!answersAreValid(answers)) return NextResponse.json({ ok: false, message: "Complete each profile question with a valid selection before sending." }, { status: 400 });

  const config = supabaseConfig();
  if (!config) return NextResponse.json({ ok: false, code: "testing_mode", message: "Testing mode: the profile database is not configured, so your answers were not stored. Your draft remains on this device." }, { status: 503, headers: { "Cache-Control": "no-store" } });

  const pathways = calculatePathways(answers).filter((pathway) => pathwayOrder.includes(pathway)).slice(0, 3);
  const attribution = Object.fromEntries(Object.entries(input.attribution || {}).filter(([key]) => allowedAttribution.has(key)).map(([key, value]) => [key, cleanText(value, 180)]));
  const source = sourceDetails(request, input, attribution);
  const qualifiedForDaNang = ["ready", "researching", "details"].includes(answers.travel_readiness)
    && ["yes", "likely", "partial", "unsure"].includes(answers.da_nang_availability)
    && ["7-day", "14-day", "either"].includes(answers.duration_preference);

  try {
    const columns = await getProfileColumns(config);
    if (!columns) {
      return NextResponse.json({ ok: false, message: "The profile database schema could not be verified. Your draft remains on this device; please try again shortly." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    const missingPersistenceColumns = requiredProfileColumns.filter((column) => !columns.has(column));
    if (missingPersistenceColumns.length) {
      console.error("Attendee profile table is missing required persistence columns", missingPersistenceColumns.join(","));
      return NextResponse.json({ ok: false, message: "The profile database needs its required secure fields configured before this profile can be stored. Your draft remains on this device." }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
    const fingerprint = await rateLimitKey(request, email, config.key);
    if (columns.has("rate_limit_key")) {
      if (await isRateLimited(config, fingerprint, columns)) return NextResponse.json({ ok: false, message: "This profile has been submitted several times recently. Please wait before trying again." }, { status: 429, headers: { "Cache-Control": "no-store" } });
    } else if (await isRateLimited(config, email, columns)) {
      return NextResponse.json({ ok: false, message: "This profile has been submitted several times recently. Please wait before trying again." }, { status: 429, headers: { "Cache-Control": "no-store" } });
    }

    const leadRoute = qualifiedForDaNang ? "da-nang-cohort" : "future-city-waitlist";
    const profileId = await storeProfile(config, {
      first_name: name,
      email,
      privacy_consent: true,
      marketing_consent: input?.lead?.marketingConsent === true,
      consent_recorded_at: new Date().toISOString(),
      questionnaire_answers: {
        version: 2,
        answers,
        acknowledgement: true,
        supporting_pathways: pathways.slice(1),
        referral_code: attribution.ref || null,
      },
      primary_pathway: pathways[0],
      secondary_pathway: pathways[1] || null,
      discomfort_frequency: answers.discomfort_frequency || null,
      affected_body_areas: answers.body_areas || [],
      movement_limitations: answers.movement_limitations || [],
      desired_changes: answers.desired_changes || [],
      southeast_asia_2027: answers.travel_readiness || null,
      da_nang_interest: answers.da_nang_availability || null,
      preferred_duration: answers.duration_preference || null,
      accommodation_preference: answers.accommodation_style || null,
      preferred_room_type: answers.room_type || null,
      accommodation_priorities: answers.accommodation_priorities || [],
      nightly_budget: answers.nightly_budget || null,
      source_path: source.sourcePath,
      source_url: source.sourceUrl,
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_content: attribution.utm_content || null,
      utm_term: attribution.utm_term || null,
      preferred_destinations: Array.isArray(answers.future_destinations) ? answers.future_destinations : [],
      recommended_route: leadRoute,
      rate_limit_key: fingerprint,
    }, columns);
    recordRateHit(fingerprint, columns);

    const delivery = await sendProfileDelivery({
      profileId,
      firstName: name,
      participantEmail: email,
      pathway: pathways[0],
      supportingPathways: pathways.slice(1),
      leadRoute,
      sourcePath: source.sourcePath,
      attribution,
    });

    return NextResponse.json({ ok: true, profileId, pathways, leadRoute, delivery }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Attendee profile submission failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false, message: "We could not safely store your profile. Your draft remains on this device; please try again." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
