const PRODUCTION_ORIGIN = "https://ascensionsenses.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PRODUCTION_ORIGIN}/sitemap.xml`,
    host: PRODUCTION_ORIGIN,
  };
}
