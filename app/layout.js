import "./globals.css";
import SiteAnalytics from "./analytics";
import { JsonLd, PRODUCTION_ORIGIN, SOCIAL_IMAGE, siteEntityGraph } from "./seo";

export const metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  applicationName: "ASCENSION SENSES",
  title: "ASCENSION SENSES | Da Nang Wellness Experience 2027",
  description:
    "A seven- or fourteen-day immersive happening in Da Nang built around Diện Chẩn, movement, breathwork, sound baths, Vietnamese food, culture and creativity.",
  alternates: {
    canonical: `${PRODUCTION_ORIGIN}/`,
    languages: {
      en: `${PRODUCTION_ORIGIN}/`,
      "x-default": `${PRODUCTION_ORIGIN}/`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Come Back to Your Senses — Da Nang 2027",
    description: "Experience Vietnamese wellness, movement, sound, food and creativity between the city, sea and mountains of Da Nang, January 12–26, 2027.",
    url: `${PRODUCTION_ORIGIN}/`,
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <JsonLd data={siteEntityGraph} />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
