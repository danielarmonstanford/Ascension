import { notFound } from "next/navigation";
import PrivacyPage from "../../privacy/page";
import LocaleReviewPage from "../../_components/locale-review-page";
import { createLocalizedPageMetadata } from "../../seo";
import { isPublishedLocale, isSupportedLocale } from "../../../i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  return createLocalizedPageMetadata({ locale, path: "/privacy", title: "Privacy | ASCENSION SENSES", description: "How ASCENSION SENSES handles enquiries, reservations, website analytics and third-party media services." });
}

export default async function LocalizedPrivacyPage({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  if (!isPublishedLocale(locale)) return <LocaleReviewPage locale={locale} />;
  return <PrivacyPage />;
}
