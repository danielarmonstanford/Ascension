import Link from "next/link";
import { getLocaleConfig } from "../../i18n/config";

export default function LocaleReviewPage({ locale }) {
  const language = getLocaleConfig(locale);
  return (
    <main className="locale-review-page">
      <p className="info-eyebrow">ASCENSION SENSES</p>
      <h1>{language.label} is being carefully reviewed.</h1>
      <p>English remains the only published language. This translation will become available after complete human linguistic and cultural review.</p>
      <Link className="radiant-action" href="/en">Continue in English <span aria-hidden="true">→</span></Link>
    </main>
  );
}
