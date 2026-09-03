import AboutPageClient from "./about-client";
import { JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "About ASCENSION | Daniel Stanford’s Story and Vision";
const description = "Discover why Daniel Stanford created ASCENSION after living in Da Nang and experiencing Diện Chẩn, Vietnamese culture, movement and creative practice.";

export const metadata = createPageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "About", path: "/about" }])} />
      <AboutPageClient />
    </>
  );
}
