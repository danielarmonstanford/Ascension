import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://ascensionsenses.com"),
  applicationName: "ASCENSION SENSES",
  title: "ASCENSION SENSES | Da Nang · January 12–26, 2027",
  description:
    "ASCENSION is a seven- or fourteen-day immersive happening in Da Nang, built around Diện Chẩn, movement, sound, Vietnamese culture, food and creativity.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Come Back to Your Senses — Da Nang 2027",
    description: "Experience Vietnamese wellness, movement, sound, food and creativity between the city, sea and mountains of Da Nang.",
    url: "/",
    siteName: "ASCENSION SENSES",
    images: [{
      url: "https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png",
      width: 1200,
      height: 630,
      alt: "ASCENSION SENSES yoga-wheel practice on the Da Nang coast",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Come Back to Your Senses — Da Nang 2027",
    description: "Experience Vietnamese wellness, movement, sound, food and creativity between the city, sea and mountains of Da Nang.",
    images: ["https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png"],
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
      <body>{children}</body>
    </html>
  );
}
