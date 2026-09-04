import { notFound } from "next/navigation";
import TermsPage from "../../terms/page";
import LocaleReviewPage from "../../_components/locale-review-page";
import { createLocalizedPageMetadata } from "../../seo";
import { isPublishedLocale, isSupportedLocale } from "../../../i18n/config";
import { VietnameseTermsPage } from "../../_components/vietnamese-pages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  return createLocalizedPageMetadata({ locale, path: "/terms", title: "Terms and Cancellation Policy | ASCENSION SENSES", description: "Reservation, payment, cancellation, participation and travel terms for ASCENSION SENSES in Da Nang, January 12–26, 2027." });
}

export default async function LocalizedTermsPage({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  if (!isPublishedLocale(locale)) return <LocaleReviewPage locale={locale} />;
  if (locale === "vi") return <VietnameseTermsPage />;
  return <TermsPage />;
}
