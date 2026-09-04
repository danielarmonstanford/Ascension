import "server-only";
import { isPublishedLocale, isSupportedLocale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  "zh-hans": () => import("./dictionaries/zh-Hans.json").then((module) => module.default),
};

export async function getDictionary(locale, { allowDraft = false } = {}) {
  if (!isSupportedLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
  if (!allowDraft && !isPublishedLocale(locale)) throw new Error(`Locale is not published: ${locale}`);
  return dictionaries[locale]();
}
