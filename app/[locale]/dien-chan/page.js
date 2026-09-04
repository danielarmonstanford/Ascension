import { notFound } from "next/navigation";
import DienChanPage from "../../dien-chan/page";
import LocaleReviewPage from "../../_components/locale-review-page";
import { createLocalizedPageMetadata } from "../../seo";
import { isPublishedLocale, isSupportedLocale } from "../../../i18n/config";
import english from "../../../i18n/dictionaries/en";
import { VietnameseDienChanPage } from "../../_components/vietnamese-pages";
import TranslatedInfoPage from "../../_components/translated-info-page";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  return createLocalizedPageMetadata({ locale, path: "/dien-chan", ...english.metadata.dienChan });
}

export default async function LocalizedDienChanPage({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  if (!isPublishedLocale(locale)) return <LocaleReviewPage locale={locale} />;
  if (locale === "vi") return <VietnameseDienChanPage />;
  if (locale !== "en") return <TranslatedInfoPage locale={locale} page="dien-chan" />;
  return <DienChanPage />;
}
