import "./globals.css";
import { headers } from "next/headers";
import SiteAnalytics from "./analytics";
import { JsonLd, PRODUCTION_ORIGIN, SOCIAL_IMAGE, siteEntityGraph } from "./seo";
import { getLocaleConfig, isPublishedLocale } from "../i18n/config";

export const metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  applicationName: "ASCENSION SENSES",
  title: "ASCENSION SENSES | Da Nang Wellness Experience 2027",
  description:
    "A seven- or fourteen-day immersive happening in Da Nang built around Diện Chẩn, movement, breathwork, sound baths, Vietnamese food, culture and creativity.",
  alternates: {
    canonical: `${PRODUCTION_ORIGIN}/en`,
    languages: {
      en: `${PRODUCTION_ORIGIN}/en`,
      "x-default": `${PRODUCTION_ORIGIN}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Come Back to Your Senses — Da Nang 2027",
    description: "Experience Vietnamese wellness, movement, sound, food and creativity between the city, sea and mountains of Da Nang, January 12–26, 2027.",
    url: `${PRODUCTION_ORIGIN}/en`,
    siteName: "ASCENSION SENSES",
    images: [SOCIAL_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Come Back to Your Senses — Da Nang 2027",
    description: "Experience Vietnamese wellness, movement, sound, food and creativity between the city, sea and mountains of Da Nang, January 12–26, 2027.",
    images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const locale = getLocaleConfig(requestHeaders.get("x-ascension-locale"));
  return (
    <html lang={locale.htmlLang} suppressHydrationWarning>
      <body>
        {isPublishedLocale(locale.code) ? <JsonLd data={siteEntityGraph} /> : null}
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
