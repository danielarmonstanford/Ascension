import { PRODUCTION_ORIGIN } from "./seo";

export default function sitemap() {
  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dien-chan", changeFrequency: "monthly", priority: 0.9 },
    { path: "/attend", changeFrequency: "weekly", priority: 0.9 },
    { path: "/facilitate", changeFrequency: "monthly", priority: 0.7 },
  ];
  return routes.map(({ path, ...entry }) => ({
    url: `${PRODUCTION_ORIGIN}${path}`,
    lastModified: new Date("2026-09-03"),
    ...entry,
  }));
}
