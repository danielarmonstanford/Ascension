import Link from "next/link";
import { CONTACT_EMAIL } from "../seo";
import { getBookingPolicy } from "../../content/booking-policy";

const QUEBEC_CANCELLATION_RIGHTS_URL = "https://www.opc.gouv.qc.ca/en/consumer/topic/purchase/online-purchase/cancelling";

function termsHref(locale) {
  return locale === "en" ? "/en/terms" : `/${locale}/terms`;
}

export function BookingPolicySummary({ locale = "en", className = "" }) {
  const policy = getBookingPolicy(locale);

  return (
    <p className={`booking-policy-summary ${className}`.trim()}>
      {policy.bookingSummary}{" "}
      <Link href={termsHref(locale)}>{policy.bookingTermsLabel}</Link>.
    </p>
  );
}

export function BookingPolicyTerms({ locale = "en" }) {
  const policy = getBookingPolicy(locale);

  return (
    <>
      <section>
        <h2>{policy.reservationHeading}</h2>
        <p>{policy.reservation}</p>
      </section>
      <section>
        <h2>{policy.cancellationHeading}</h2>
        {policy.cancellation.map((paragraph, index) => (
          <p key={paragraph}>
            {index === 2 ? <>{paragraph}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> : paragraph}
          </p>
        ))}
      </section>
      <section>
        <h2>{policy.quebecHeading}</h2>
        <p>{policy.quebec}</p>
        <p><a href={QUEBEC_CANCELLATION_RIGHTS_URL} target="_blank" rel="noopener noreferrer">{policy.quebecLinkLabel}</a></p>
      </section>
      <section>
        <h2>{policy.travelHeading}</h2>
        <p>{policy.travel}</p>
      </section>
      <section>
        <h2>{policy.wellnessHeading}</h2>
        <p>{policy.wellness}</p>
      </section>
    </>
  );
}
