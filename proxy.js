import { NextResponse } from "next/server";

const PRODUCTION_HOST = "www.ascensionsenses.com";
const APEX_HOST = "ascensionsenses.com";

export function proxy(request) {
  const hostname = request.nextUrl.hostname.toLowerCase();

  if (hostname === APEX_HOST) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.host = PRODUCTION_HOST;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const response = NextResponse.next();
  const isPrivateRoute = request.nextUrl.pathname === "/access" || request.nextUrl.pathname.startsWith("/partners");
  const isProductionHost = hostname === PRODUCTION_HOST;

  if (!isProductionHost || isPrivateRoute) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|icon.svg|apple-icon|favicon.ico).*)"],
};
