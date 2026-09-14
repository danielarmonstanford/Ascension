import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 30_000;
const ATTRIBUTION_KEYS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"]);
const FIELDS = ["name", "organization", "email", "website", "category", "interest", "message"];
const clean = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";
const REQUIRED_PARTNER_COLUMNS = [
  "name", "organization", "email", "website", "partnership_category", "interest", "message", "consent",
  "consent_recorded_at", "source_path", "source_url", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];
let partnerColumnsPromise;

async function getPartnerColumns(supabaseUrl, secretKey) {
  if (!partnerColumnsPromise) {
    partnerColumnsPromise = fetch(`${supabaseUrl}/rest/v1/`, {
      headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}`, Accept: "application/openapi+json" },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const schema = await response.json();
        const properties = schema?.definitions?.partner_inquiries?.properties
          || schema?.components?.schemas?.partner_inquiries?.properties;
        return properties ? new Set(Object.keys(properties)) : null;
      })
      .catch(() => null);
  }
  return partnerColumnsPromise;
}

function sourceDetails(request, input, attribution) {
  const incoming = input?.source && typeof input.source === "object" ? input.source : {};
  const sourcePath = clean(incoming.path || input?.source || "/partners", 300).replace(/^https?:\/\/[^/]+/i, "") || "/partners";
  const rawUrl = clean(incoming.url, 2_000);
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
  return { sourcePath: sourcePath.split("?")[0] || "/partners", sourceUrl: sourceUrl.toString() };
}

async function storeInquiry(form, attribution, source) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return { ok: false, code: "testing_mode", message: "Testing mode: the partnership database is not configured, so this inquiry was not stored. You can still email Daniel directly." };
  }

  const columns = await getPartnerColumns(supabaseUrl, secretKey);
  if (!columns) return { ok: false, code: "schema_unavailable", message: "The partnership database schema could not be verified. Please try again shortly." };
  const missing = REQUIRED_PARTNER_COLUMNS.filter((column) => !columns.has(column));
  if (missing.length) {
    console.error("Partner inquiry table is missing required columns", missing.join(","));
    return { ok: false, code: "schema_incomplete", message: "The partnership database needs its required fields configured before this inquiry can be stored." };
  }

  const payload = {
    name: form.name,
    organization: form.organization,
    email: form.email,
    website: form.website || null,
    partnership_category: form.category,
    interest: form.interest,
    message: form.message,
    consent: true,
    consent_recorded_at: new Date().toISOString(),
    source_path: source.sourcePath,
    source_url: source.sourceUrl,
    utm_source: attribution.utm_source || null,
    utm_medium: attribution.utm_medium || null,
    utm_campaign: attribution.utm_campaign || null,
    utm_content: attribution.utm_content || null,
    utm_term: attribution.utm_term || null,
  };
  const response = await fetch(`${supabaseUrl}/rest/v1/partner_inquiries`, {
    method: "POST",
    headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!response.ok) {
    const databaseMessage = await response.text();
    console.error("Partner inquiry database insert failed", response.status, databaseMessage.slice(0, 1200));
    return { ok: false, message: "The inquiry could not be stored safely. Please email Daniel directly or try again." };
  }
  const rows = await response.json();
  return { ok: true, inquiryId: rows[0]?.id };
}

async function notifyWebhook(form, attribution) {
  const webhook = process.env.ASCENSION_PARTNER_WEBHOOK_URL;
  if (!webhook) return;

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "ASCENSION-Partners/1.0" },
      body: JSON.stringify({ event: "ascension_partner_inquiry", submittedAt: new Date().toISOString(), form: { ...form, consent: true }, attribution }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) console.error("Partner inquiry notification failed", response.status);
  } catch (error) {
    console.error("Partner inquiry notification failed", error instanceof Error ? error.message : "Unknown error");
  }
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return NextResponse.json({ ok:false, message:"Send this inquiry as JSON." }, { status:415 });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return NextResponse.json({ ok:false, message:"This inquiry is too large to submit." }, { status:413 });
  let input;
  try { input = await request.json(); } catch { return NextResponse.json({ ok:false, message:"The inquiry data is not valid." }, { status:400 }); }
  if (JSON.stringify(input).length > MAX_BODY_BYTES) return NextResponse.json({ ok:false, message:"This inquiry is too large to submit." }, { status:413 });
  if (input?.form?.company) return NextResponse.json({ ok:true });
  const form = Object.fromEntries(FIELDS.map((field) => [field, clean(input?.form?.[field], field === "message" ? 2500 : 300)]));
  if (!form.name || !form.organization || !/^\S+@\S+\.\S+$/.test(form.email) || !form.category || !form.interest || !form.message || input?.form?.consent !== true) return NextResponse.json({ ok:false, message:"Complete the required fields and consent before sending." }, { status:400 });
  const attribution = Object.fromEntries(Object.entries(input.attribution || {}).filter(([key]) => ATTRIBUTION_KEYS.has(key)).map(([key,value]) => [key,clean(value,180)]));
  const source = sourceDetails(request, input, attribution);

  try {
    const result = await storeInquiry(form, attribution, source);
    if (!result.ok) return NextResponse.json(result, { status: result.code ? 503 : 502, headers: { "Cache-Control": "no-store" } });
    await notifyWebhook(form, attribution);
    return NextResponse.json({ ok:true, inquiryId: result.inquiryId }, { headers:{ "Cache-Control":"no-store" } });
  } catch (error) {
    console.error("Partner inquiry storage failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok:false, message:"The inquiry could not be stored safely. Please email Daniel directly or try again." }, { status:502, headers:{ "Cache-Control":"no-store" } });
  }
}
