import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.redirect(new URL("/downloads/ascension-da-nang-2027-partnership-deck.pdf", request.url), 307);
}
