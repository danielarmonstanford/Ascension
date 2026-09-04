import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, isPublishedLocale, isSupportedLocale } from "./i18n/config";

const PRODUCTION_HOST = "www.ascensionsenses.com";
const APEX_HOST = "ascensionsenses.com";

export function proxy(request) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const locale = isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;

  if (hostname === APEX_HOST) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.host = PRODUCTION_HOST;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const isVenuePortal = request.nextUrl.pathname === "/partners/venues" || request.nextUrl.pathname === "/partners/venues.html";
  if (isVenuePortal) {
    const expectedToken = process.env.VENUE_PORTAL_SESSION_TOKEN;
    const suppliedToken = request.cookies.get("ascension_venue_access")?.value;
    if (!expectedToken || suppliedToken !== expectedToken) {
      const accessUrl = request.nextUrl.clone();
      accessUrl.pathname = "/access";
      accessUrl.search = "";
      accessUrl.searchParams.set("next", "/partners/venues");
      return NextResponse.redirect(accessUrl, 307);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ascension-locale", locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const isSponsorshipRoute = request.nextUrl.pathname.startsWith("/partners/sponsorship");
  const isPrivateRoute = request.nextUrl.pathname === "/access" || (request.nextUrl.pathname.startsWith("/partners") && !isSponsorshipRoute);
  const isProductionHost = hostname === PRODUCTION_HOST;
  const isDraftLocale = isSupportedLocale(firstSegment) && !isPublishedLocale(firstSegment);

  if (!isProductionHost || isPrivateRoute || isDraftLocale) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|icon.svg|apple-icon|favicon.ico).*)"],
};
