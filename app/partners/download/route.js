import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.redirect(new URL("/downloads/ascension-partnership-invitation.pdf", request.url), 307);
}

