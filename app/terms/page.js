import InfoPage from "../_components/info-page";
import { JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";
import { BookingPolicyTerms } from "../_components/booking-policy";
import { getBookingPolicy } from "../../content/booking-policy";

const title = "Terms and Cancellation Policy | ASCENSION SENSES";
const description = "Reservation, payment, cancellation, participation and travel terms for ASCENSION SENSES in Da Nang, January 12–26, 2027.";

export const metadata = createPageMetadata({ title, description, path: "/terms" });

export default function TermsPage({ locale = "en" }) {
  const policy = getBookingPolicy(locale);
  const prefix = locale === "en" ? "/en" : `/${locale}`;

  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: prefix }, { name: policy.termsEyebrow, path: `${prefix}/terms` }])} />
      <InfoPage locale={locale} eyebrow={policy.termsEyebrow} title={policy.termsTitle} lead={policy.termsLead} primaryLabel={policy.attendanceLabel} primaryHref={`${prefix}/attend`}>
        <BookingPolicyTerms locale={locale} />
      </InfoPage>
    </>
  );
}
