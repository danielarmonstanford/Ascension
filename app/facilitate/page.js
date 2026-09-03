import InfoPage from "../_components/info-page";
import { JsonLd, PRACTITIONER_APPLICATION, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "Facilitate at ASCENSION Da Nang | Practitioner Applications";
const description = "Apply to contribute movement, meditation, sound, bodywork, wellness or creative practice to ASCENSION in Da Nang, January 2027.";

export const metadata = createPageMetadata({ title, description, path: "/facilitate" });

export default function FacilitatePage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "Facilitate", path: "/facilitate" }])} />
      <InfoPage eyebrow="Facilitate" title="Bring your practice to Da Nang." lead="Practitioner applications are open for the founding ASCENSION experience in Da Nang, January 12–26, 2027." primaryLabel="Apply to facilitate" primaryHref={PRACTITIONER_APPLICATION}>
        <section>
          <h2>Who ASCENSION is inviting</h2>
          <p>ASCENSION welcomes applications from experienced practitioners in movement, breathwork, guided meditation, sound baths, bodywork, creativity and complementary wellness practices.</p>
          <p>A facilitator may contribute one experience, a short series, private appointments or a collaboration created specifically for Da Nang.</p>
        </section>
        <section>
          <h2>How practitioners are selected</h2>
          <p>Selection is based on experience, integrity, cultural fit, consent-aware practice and meaningful contribution to a small international group.</p>
          <p>Practitioners, schedules, venues and program elements are announced publicly only after they are confirmed.</p>
        </section>
        <section>
          <h2>How to apply</h2>
          <p>The application email asks for your location, modality, training, experience, professional profile, proposed contribution, availability and practical requirements. Do not include private client or health information.</p>
        </section>
      </InfoPage>
    </>
  );
}
