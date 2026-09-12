import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 30_000;
const ATTRIBUTION_KEYS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]);
const FIELDS = ["name", "organization", "email", "website", "category", "interest", "message"];
const clean = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return NextResponse.json({ ok:false, message:"Send this inquiry as JSON." }, { status:415 });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return NextResponse.json({ ok:false, message:"This inquiry is too large to submit." }, { status:413 });
  let input;
  try { input = await request.json(); } catch { return NextResponse.json({ ok:false, message:"The inquiry data is not valid." }, { status:400 }); }
  if (JSON.stringify(input).length > MAX_BODY_BYTES) return NextResponse.json({ ok:false, message:"This inquiry is too large to submit." }, { status:413 });
  if (input?.form?.company) return NextResponse.json({ ok:true });
  const form = Object.fromEntries(FIELDS.map((field) => [field, clean(input?.form?.[field], field === "message" ? 2500 : 300)]));
  if (!form.name || !form.organization || !/^\S+@\S+\.\S+$/.test(form.email) || !form.category || !form.interest || !form.message || input?.form?.consent !== true) return NextResponse.json({ ok:false, message:"Complete the required fields and consent before sending." }, { status:400 });
  const webhook = process.env.ASCENSION_PARTNER_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok:false, code:"testing_mode", message:"Testing mode: the partnership destination is not configured, so this inquiry was not stored. You can still email Daniel directly." }, { status:503, headers:{ "Cache-Control":"no-store" } });
  const attribution = Object.fromEntries(Object.entries(input.attribution || {}).filter(([key]) => ATTRIBUTION_KEYS.has(key)).map(([key,value]) => [key,clean(value,180)]));
  try {
    const response = await fetch(webhook, { method:"POST", headers:{ "Content-Type":"application/json", "User-Agent":"ASCENSION-Partners/1.0" }, body:JSON.stringify({ event:"ascension_partner_inquiry", submittedAt:new Date().toISOString(), form:{ ...form, consent:true }, attribution }), signal:AbortSignal.timeout(10_000), cache:"no-store" });
    if (!response.ok) throw new Error("Destination rejected inquiry");
    return NextResponse.json({ ok:true }, { headers:{ "Cache-Control":"no-store" } });
  } catch { return NextResponse.json({ ok:false, message:"The inquiry could not be stored safely. Please email Daniel directly or try again." }, { status:502, headers:{ "Cache-Control":"no-store" } }); }
}

