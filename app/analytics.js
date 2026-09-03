"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";

function classifyLink(link) {
  const href = link.getAttribute("href") || "";
  if (href.startsWith("https://buy.stripe.com/")) return "reservation_cta_click";
  if (href.includes("Practitioner%20Application")) return "practitioner_application_click";
  if (href === "/about" || href.endsWith("/about")) return "about_page_link_click";
  if (href === "/dien-chan" || href.endsWith("/dien-chan")) return "dien_chan_deep_dive_click";
  return link.dataset.analyticsEvent || null;
}

export default function SiteAnalytics() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const eventName = classifyLink(link);
      if (!eventName) return;
      track(eventName, {
        source_path: window.location.pathname,
        plan: link.dataset.plan || "unspecified",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Analytics />;
}
