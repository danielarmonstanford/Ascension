import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://ascensionsenses.com"),
  title: "ASCENSION SENSES — Da Nang · January 12–26, 2027",
  description:
    "Come back to your senses in Da Nang, Vietnam. ASCENSION SENSES unfolds January 12–26, 2027.",
  openGraph: {
    title: "ASCENSION SENSES — Da Nang",
    description: "Come back to your senses. January 12–26, 2027.",
    url: "/",
    siteName: "ASCENSION SENSES",
    images: [{
      url: "https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png",
      width: 1200,
      height: 630
    }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCENSION SENSES — Da Nang",
    description: "Come back to your senses. January 12–26, 2027.",
    images: ["https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
