import InfoPage from "../_components/info-page";
import { JsonLd, RESERVATION_URL, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "Attend ASCENSION Da Nang | January 12–26, 2027";
const description = "Choose seven or fourteen days of Vietnamese wellness, movement, sound, food, culture and creativity in Da Nang. Programs begin at USD $1,200.";

export const metadata = createPageMetadata({ title, description, path: "/attend" });

export default function AttendPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "Attend", path: "/attend" }])} />
      <InfoPage eyebrow="Attend" title="Seven days or fourteen." lead="Join the first ASCENSION edition in Da Nang, Vietnam, between January 12 and 26, 2027.">
        <section className="info-options" aria-label="Program options">
          <article id="seven-days"><p className="info-eyebrow">Seven days</p><h2>January 12–19, 2027</h2><p className="info-price">USD $1,200</p><p>Enter the shared ASCENSION rhythm for one week while retaining the freedom to choose what serves you.</p><a className="text-action" data-plan="seven-day" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">Reserve seven days →</a></article>
          <article id="fourteen-days"><p className="info-eyebrow">Fourteen days</p><h2>January 12–26, 2027</h2><p className="info-price">USD $2,000</p><p>Experience the complete arc across Vietnamese wellness, movement, sound, food, culture and creativity.</p><a className="text-action" data-plan="fourteen-day" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">Reserve fourteen days →</a></article>
        </section>
        <section>
          <h2>What the experience includes</h2>
          <p>Your ASCENSION Passport opens confirmed shared programming built around Diện Chẩn. The wider program includes movement, breathwork, cultural discovery, creative expression and selected shared food experiences. Ecstatic Dance, sound baths and participating facilitators remain planned until their details are confirmed.</p>
        </section>
        <section>
          <h2>Travel and accommodation</h2>
          <p>Accommodation, flights and local transfers are separate. Guests choose and book their own accommodation unless a future offer explicitly states otherwise.</p>
          <p>You may attend alone or with someone. No previous experience with movement, meditation, bodywork or creative practice is required.</p>
        </section>
        <section id="reserve">
          <h2>Reserve your place</h2>
          <p>The active checkout requests a USD $300 reservation deposit. Confirmed inclusions and applicable booking terms should be reviewed before completing payment.</p>
        </section>
      </InfoPage>
    </>
  );
}
