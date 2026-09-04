import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const COOKIE_NAME = "ascension_venue_access";

function matches(left, right) {
  if (!left || !right) return false;
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export async function POST(request) {
  const configuredPassword = process.env.VENUE_PORTAL_PASSWORD;
  const sessionToken = process.env.VENUE_PORTAL_SESSION_TOKEN;

  if (!configuredPassword || !sessionToken) {
    return NextResponse.json({ error: "Partner access is temporarily unavailable." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email.includes("@") || !matches(password, configuredPassword)) {
    return NextResponse.json({ error: "Access denied. Check your email and access key." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/partners/venues",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
