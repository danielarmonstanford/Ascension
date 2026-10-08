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
          <p>Start with an enquiry. An enquiry does not reserve a place. ASCENSION will confirm availability, the selected programme or stay option, included elements, payment steps and the applicable terms in writing before any payment or deposit is requested.</p>
        </section>
        <section>
          <h2>Cancellation policy</h2>
          <p>ASCENSION Da Nang is scheduled for January 12–26, 2027, with final confirmation by November 1, 2026. If the event is not confirmed by that deadline, cancelled or rescheduled by ASCENSION, guests may choose a full refund of programme payments or an optional full-value credit toward a future edition.</p>
          <p>Guests who voluntarily cancel before their programme begins may request a refund less 10% of programme payments received, where legally permitted, or choose full-value credit toward a future edition within 24 months. Any price difference applies when rebooking. Statutory cancellation rights take precedence, and no administration fee will be deducted where a full refund is legally required.</p>
          <p>Requests may be emailed to <a href="mailto:daniel@stanfordemporium.com">daniel@stanfordemporium.com</a>. Refunds will be processed within 15 days to the original payment method. Credits require the guest’s agreement. Flights, accommodation, transfers and separately booked services follow their providers’ own terms. Wait for written event confirmation before making non-refundable travel arrangements.</p>
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
