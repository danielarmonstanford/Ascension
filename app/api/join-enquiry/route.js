import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 30_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const requiredColumns = [
  "first_name", "email", "privacy_consent", "consent_recorded_at", "questionnaire_answers",
  "source_path", "source_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "preferred_destinations", "recommended_route",
];
const attributionKeys = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"]);
let columnsPromise;
const rateHits = new Map();

const clean = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url, key } : null;
}

async function getColumns(config) {
  if (!columnsPromise) {
    columnsPromise = fetch(`${config.url}/rest/v1/`, {
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, Accept: "application/openapi+json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }).then(async (response) => {
      if (!response.ok) return null;
      const schema = await response.json();
      const properties = schema?.definitions?.attendee_profiles?.properties || schema?.components?.schemas?.attendee_profiles?.properties;
      return properties ? new Set(Object.keys(properties)) : null;
    }).catch(() => null);
  }
  return columnsPromise;
}

function sourceDetails(request, input) {
  const incoming = input?.source && typeof input.source === "object" ? input.source : {};
  const sourcePath = clean(incoming.path || "/join", 300).replace(/^https?:\/\/[^/]+/i, "") || "/join";
  const requestUrl = new URL(request.url);
  let sourceUrl;
  try { sourceUrl = new URL(clean(incoming.url, 2_000)); } catch { sourceUrl = null; }
  if (!sourceUrl || !["https:", "http:"].includes(sourceUrl.protocol)) {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
    const protocol = request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "") || "https";
    sourceUrl = new URL(`${protocol}://${host}${sourcePath.startsWith("/") ? sourcePath : `/${sourcePath}`}`);
  }
  const attribution = Object.fromEntries([...sourceUrl.searchParams.entries()].filter(([key]) => attributionKeys.has(key)).map(([key, value]) => [key, clean(value, 180)]));
  return { sourcePath: sourcePath.split("?")[0] || "/join", sourceUrl: sourceUrl.toString(), attribution };
}

function isRateLimited(email) {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  const hits = (rateHits.get(email) || []).filter((time) => time >= cutoff);
  if (hits.length >= RATE_LIMIT_MAX) return true;
  hits.push(Date.now());
  rateHits.set(email, hits);
  return false;
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return NextResponse.json({ ok: false, message: "Send this enquiry as JSON." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This enquiry is too large to submit." }, { status: 413 });
  let input;
  try { input = await request.json(); } catch { return NextResponse.json({ ok: false, message: "The enquiry data is not valid." }, { status: 400 }); }
  if (JSON.stringify(input).length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This enquiry is too large to submit." }, { status: 413 });
  if (input?.enquiry?.company) return NextResponse.json({ ok: true });

  const form = input?.enquiry || {};
  const name = clean(form.name, 120);
  const email = clean(form.email, 254).toLowerCase();
  const country = clean(form.country, 180);
  const duration = clean(form.duration, 60);
  const draw = clean(form.draw, 1_500);
  const accessibility = clean(form.accessibility, 1_500);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !country || !duration || form.enquiryConsent !== "on") return NextResponse.json({ ok: false, message: "Complete the required fields and consent before sending." }, { status: 400 });
  if (isRateLimited(email)) return NextResponse.json({ ok: false, message: "This enquiry has been submitted several times recently. Please wait before trying again." }, { status: 429 });

  const config = supabaseConfig();
  if (!config) return NextResponse.json({ ok: false, message: "The secure enquiry connection is not configured yet. Please email Daniel directly." }, { status: 503 });
  const columns = await getColumns(config);
  if (!columns || requiredColumns.some((column) => !columns.has(column))) return NextResponse.json({ ok: false, message: "The secure enquiry connection needs final configuration. Please email Daniel directly." }, { status: 503 });

  const source = sourceDetails(request, input);
  const payload = Object.fromEntries(Object.entries({
    first_name: name.split(/\s+/)[0],
    email,
    privacy_consent: true,
    marketing_consent: form.marketingConsent === "on",
    consent_recorded_at: new Date().toISOString(),
    questionnaire_answers: { version: "join-enquiry-v1", country, duration, draw: draw || null, accessibility: accessibility || null, enquiry_consent: true },
    primary_pathway: "enquiry",
    secondary_pathway: null,
    source_path: source.sourcePath,
    source_url: source.sourceUrl,
    utm_source: source.attribution.utm_source || null,
    utm_medium: source.attribution.utm_medium || null,
    utm_campaign: source.attribution.utm_campaign || null,
    utm_content: source.attribution.utm_content || null,
    utm_term: source.attribution.utm_term || null,
    preferred_destinations: ["Da Nang"],
    recommended_route: "da-nang-cohort-enquiry",
  }).filter(([key]) => columns.has(key)));

  try {
    const response = await fetch(`${config.url}/rest/v1/attendee_profiles`, {
      method: "POST",
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Join enquiry insert failed", response.status, (await response.text()).slice(0, 300));
      return NextResponse.json({ ok: false, message: "Your enquiry could not be stored safely. Please email Daniel directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Join enquiry storage failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false, message: "Your enquiry could not be stored safely. Please email Daniel directly." }, { status: 502 });
  }
}
