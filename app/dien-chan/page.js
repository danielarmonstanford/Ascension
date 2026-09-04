import InfoPage from "../_components/info-page";
import { JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "Diện Chẩn in Da Nang | ASCENSION SENSES";
const description = "Discover Diện Chẩn, the needle-free Vietnamese practice at the foundation of ASCENSION, using reflexology, acupressure, heat, stretching and individualized full-body work.";

export const metadata = createPageMetadata({ title, description, path: "/dien-chan" });

export default function DienChanPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "Diện Chẩn", path: "/dien-chan" }])} />
      <InfoPage eyebrow="Diện Chẩn" title="One body. Everything connected." lead="Diện Chẩn—or Dien Chan—is the needle-free Vietnamese wellness practice at the therapeutic foundation of ASCENSION.">
        <section>
          <h2>What is Diện Chẩn?</h2>
          <p>Diện Chẩn is a modern Vietnamese system rooted in traditional principles. It combines reflexology, needle-free acupressure, therapeutic heat, stretching and individualized full-body work.</p>
          <p>The face may be a starting point, but a session is not limited to facial reflexology. Practitioners may work across the head, hands, feet, limbs and back according to the individual.</p>
          <p><strong>Sessions are led daily by Dr. Huỳnh Bảo Loan, Da Nang.</strong></p>
        </section>
        <section>
          <h2>Does Diện Chẩn use needles?</h2>
          <p>No. Diện Chẩn is needle-free. It should not be described as acupuncture, and it does not follow one universal treatment sequence.</p>
        </section>
        <section>
          <h2>How it belongs within ASCENSION</h2>
          <p>Diện Chẩn provides a distinct Vietnamese foundation for the wider experience. Movement, breathwork, guided meditation, sound baths, food, cultural discovery and creative expression sit around it as confirmed or clearly identified planned programming.</p>
          <p>Diện Chẩn is presented as a traditional wellness practice and educational experience. Individual responses vary. Participation does not replace medical diagnosis, treatment or professional healthcare.</p>
        </section>
      </InfoPage>
    </>
  );
}
