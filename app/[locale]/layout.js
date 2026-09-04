import { notFound } from "next/navigation";
import { LOCALES, isSupportedLocale } from "../../i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return children;
}
