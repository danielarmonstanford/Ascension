export const DEFAULT_LOCALE = "en";

export const LOCALES = ["en", "fr", "vi", "ko", "zh-hans"];

export const localeConfig = {
  en: { code: "en", htmlLang: "en", shortLabel: "EN", label: "English", status: "published" },
  fr: { code: "fr", htmlLang: "fr", shortLabel: "FR", label: "Français", status: "published" },
  vi: { code: "vi", htmlLang: "vi", shortLabel: "VI", label: "Tiếng Việt", status: "published" },
  ko: { code: "ko", htmlLang: "ko", shortLabel: "KO", label: "한국어", status: "published" },
  "zh-hans": { code: "zh-hans", htmlLang: "zh-Hans", shortLabel: "中文", label: "简体中文", status: "published" },
};

export const PUBLIC_ROUTES = ["", "/about", "/dien-chan", "/attend", "/facilitate", "/terms", "/privacy"];

export function isSupportedLocale(value) {
  return typeof value === "string" && LOCALES.includes(value.toLowerCase());
}

export function normalizeLocale(value) {
  return isSupportedLocale(value) ? value.toLowerCase() : DEFAULT_LOCALE;
}

export function getLocaleConfig(value) {
  return localeConfig[normalizeLocale(value)];
}

export function isPublishedLocale(value) {
  return isSupportedLocale(value) && localeConfig[value.toLowerCase()].status === "published";
}

export function getPublishedLocales() {
  return LOCALES.filter((locale) => localeConfig[locale].status === "published");
}

export function localePath(locale, path = "") {
  const normalizedPath = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${normalizeLocale(locale)}${normalizedPath}`;
}

export function routeWithoutLocale(pathname = "/") {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isSupportedLocale(segments[0])) segments.shift();
  return segments.length ? `/${segments.join("/")}` : "";
}
