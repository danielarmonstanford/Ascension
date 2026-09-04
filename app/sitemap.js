import { PRODUCTION_ORIGIN } from "./seo";
import { PUBLIC_ROUTES, getPublishedLocales, localePath } from "../i18n/config";

export default function sitemap() {
  const routeData = {
    "": { changeFrequency: "weekly", priority: 1 },
    "/about": { changeFrequency: "monthly", priority: 0.8 },
    "/dien-chan": { changeFrequency: "monthly", priority: 0.9 },
    "/attend": { changeFrequency: "weekly", priority: 0.9 },
    "/facilitate": { changeFrequency: "monthly", priority: 0.7 },
    "/terms": { changeFrequency: "yearly", priority: 0.3 },
    "/privacy": { changeFrequency: "yearly", priority: 0.3 },
  };
  const publishedLocales = getPublishedLocales();

  const localizedRoutes = publishedLocales.flatMap((locale) => PUBLIC_ROUTES.map((path) => ({
    url: `${PRODUCTION_ORIGIN}${localePath(locale, path)}`,
    lastModified: new Date("2026-09-03"),
    alternates: {
      languages: Object.fromEntries([
        ...publishedLocales.map((publishedLocale) => [publishedLocale === "zh-hans" ? "zh-Hans" : publishedLocale, `${PRODUCTION_ORIGIN}${localePath(publishedLocale, path)}`]),
        ["x-default", `${PRODUCTION_ORIGIN}${localePath("en", path)}`],
      ]),
    },
    ...routeData[path],
  })));

  return [
    ...localizedRoutes,
    {
      url: `${PRODUCTION_ORIGIN}/partners/sponsorship`,
      lastModified: new Date("2026-09-03"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
