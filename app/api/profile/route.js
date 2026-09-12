import { NextResponse } from "next/server";
import { pathwayOrder, profileQuestions } from "../../../content/profile";

const MAX_BODY_BYTES = 50_000;
const allowedQuestionIds = new Set(profileQuestions.map((question) => question.id));
const allowedAttribution = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]);

function cleanText(value, max = 240) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanAnswers(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input).filter(([key]) => allowedQuestionIds.has(key)).map(([key, value]) => {
    if (Array.isArray(value)) return [key, value.slice(0, 12).map((item) => cleanText(item, 120))];
    if (value && typeof value === "object") return [key, Object.fromEntries(Object.entries(value).slice(0, 12).map(([field, fieldValue]) => [cleanText(field, 80), Array.isArray(fieldValue) ? fieldValue.slice(0, 12).map((item) => cleanText(item, 120)) : cleanText(fieldValue, 240)]))];
    return [key, cleanText(value, 240)];
  }));
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return NextResponse.json({ ok: false, message: "Send this profile as JSON." }, { status: 415 });
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This profile is too large to submit." }, { status: 413 });

  let input;
  try { input = await request.json(); } catch { return NextResponse.json({ ok: false, message: "The profile data is not valid." }, { status: 400 }); }
  if (JSON.stringify(input).length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "This profile is too large to submit." }, { status: 413 });

  const name = cleanText(input?.lead?.name, 120);
  const email = cleanText(input?.lead?.email, 254).toLowerCase();
  if (input?.lead?.website) return NextResponse.json({ ok: true });
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || input?.lead?.consent !== true) return NextResponse.json({ ok: false, message: "A valid name, email and consent are required." }, { status: 400 });

  const webhook = process.env.ASCENSION_PROFILE_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, code: "testing_mode", message: "Testing mode: no profile destination is configured, so your answers were not stored. Please return after the local review." }, { status: 503, headers: { "Cache-Control": "no-store" } });

  const payload = {
    event: "ascension_profile_submitted", version: 1, submittedAt: new Date().toISOString(),
    lead: { name, email, consent: true },
    pathways: Array.isArray(input.pathways) ? input.pathways.filter((pathway) => pathwayOrder.includes(pathway)).slice(0, 3) : [],
    answers: cleanAnswers(input.answers),
    attribution: Object.fromEntries(Object.entries(input.attribution || {}).filter(([key]) => allowedAttribution.has(key)).map(([key, value]) => [key, cleanText(value, 180)])),
  };

  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": "ASCENSION-Profile/1.0" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000), cache: "no-store" });
    if (!response.ok) throw new Error("Webhook rejected submission");
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, message: "We could not safely store your profile. Your draft remains on this device; please try again." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
