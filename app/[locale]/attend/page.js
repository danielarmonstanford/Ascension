import { notFound } from "next/navigation";
import AttendPage from "../../attend/page";
import LocaleReviewPage from "../../_components/locale-review-page";
import { createLocalizedPageMetadata } from "../../seo";
import { isPublishedLocale, isSupportedLocale } from "../../../i18n/config";
import english from "../../../i18n/dictionaries/en";
import { VietnameseAttendPage } from "../../_components/vietnamese-pages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  return createLocalizedPageMetadata({ locale, path: "/attend", ...english.metadata.attend });
}

export default async function LocalizedAttendPage({ params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  if (!isPublishedLocale(locale)) return <LocaleReviewPage locale={locale} />;
  if (locale === "vi") return <VietnameseAttendPage />;
  return <AttendPage />;
}
