import InfoPage from "../_components/info-page";
import { JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";

const title = "Terms and Cancellation Policy | ASCENSION SENSES";
const description = "Reservation, payment, cancellation, participation and travel terms for ASCENSION SENSES in Da Nang, January 12–26, 2027.";

export const metadata = createPageMetadata({ title, description, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <InfoPage eyebrow="Terms" title="Clear terms before you reserve." lead="These terms apply to ASCENSION SENSES · Da Nang, January 12–26, 2027." primaryLabel="View attendance options" primaryHref="/attend">
        <section>
          <h2>Reservation and payment</h2>
          <p>A USD $300 deposit reserves your place. The remaining program balance is due 30 days before January 12, 2027.</p>
        </section>
        <section>
          <h2>Cancellation policy</h2>
          <p>Cancellations received 60 or more days before January 12, 2027 receive a full refund less a USD $25 administration fee.</p>
          <p>Cancellations received between 30 and 60 days before January 12, 2027 receive a 50% refund of amounts paid.</p>
          <p>Cancellations received fewer than 30 days before January 12, 2027 are non-refundable.</p>
          <p>Private sessions are non-refundable once booked.</p>
        </section>
        <section>
          <h2>Travel and accommodation</h2>
          <p>Accommodation, flights and local transfers are not included in the ASCENSION program price. Guests select and book their own accommodation unless a confirmed offer explicitly states otherwise.</p>
        </section>
        <section>
          <h2>Wellness and educational experience</h2>
          <p>ASCENSION is a wellness and educational experience, not medical care. Its programming does not replace medical diagnosis, treatment or professional healthcare. Participants remain responsible for deciding whether an activity is appropriate for them and for seeking qualified medical advice when needed.</p>
        </section>
      </InfoPage>
    </>
  );
}
