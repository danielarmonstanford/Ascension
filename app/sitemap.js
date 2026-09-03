const PRODUCTION_ORIGIN = "https://ascensionsenses.com";

export default function sitemap() {
  return [
    {
      url: PRODUCTION_ORIGIN,
      lastModified: new Date("2026-09-02"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PRODUCTION_ORIGIN}/about`,
      lastModified: new Date("2026-09-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
