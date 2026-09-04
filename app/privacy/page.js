import InfoPage from "../_components/info-page";
import { CONTACT_EMAIL, JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "Privacy | ASCENSION SENSES";
const description = "How ASCENSION SENSES handles enquiries, reservations, website analytics and third-party media services.";

export const metadata = createPageMetadata({ title, description, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <InfoPage eyebrow="Privacy" title="Your information, treated with care." lead="This notice explains the limited information used to operate the ASCENSION SENSES website and respond to enquiries." primaryLabel="Return to ASCENSION" primaryHref="/">
        <section>
          <h2>Information you choose to provide</h2>
          <p>We receive information when you email us, request information, apply to facilitate or complete a reservation through a third-party checkout. Please do not send private health information through general email forms.</p>
        </section>
        <section>
          <h2>Website and service data</h2>
          <p>The website may collect limited technical and usage information through Vercel Analytics. Stripe processes reservation payments under its own privacy terms. Cloudinary, Vimeo and YouTube may process technical information when media is requested or played.</p>
        </section>
        <section>
          <h2>How information is used</h2>
          <p>Information is used to answer enquiries, administer applications and reservations, improve the website, maintain security and meet applicable legal obligations. ASCENSION SENSES does not sell personal information.</p>
        </section>
        <section>
          <h2>Questions and requests</h2>
          <p>To ask about your information or request a correction or deletion where applicable, email <a href={`mailto:${CONTACT_EMAIL}?subject=ASCENSION%20Privacy`}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </InfoPage>
    </>
  );
}
