import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.redirect(new URL("/downloads/ascension-da-nang-2027-partnership-deck.pdf?v=2026-09-16", request.url), 307);
}
