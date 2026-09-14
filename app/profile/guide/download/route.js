import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.redirect(new URL("/downloads/ascension-body-senses-guide-v1.pdf", request.url), 307);
}
