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
      url: "https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_face,w_1200,h_630,q_auto,f_auto/v1787504880/nano-banana-2_upscale_this_image_increase_the_statue_pull_back_and_sharpen_depth_HK_similar_vi-0_oyfqsj.jpg",
      width: 1200,
      height: 630
    }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCENSION SENSES — Da Nang",
    description: "Come back to your senses. January 12–26, 2027.",
    images: ["https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_face,w_1200,h_630,q_auto,f_auto/v1787504880/nano-banana-2_upscale_this_image_increase_the_statue_pull_back_and_sharpen_depth_HK_similar_vi-0_oyfqsj.jpg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
