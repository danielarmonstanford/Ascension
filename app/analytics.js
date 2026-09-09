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
    if (window.location.pathname === "/join") {
      track("funnel_view", { source_path: window.location.pathname });
    }

    const onClick = (event) => {
      const target = event.target.closest("a[href], button[data-analytics-event]");
      if (!target) return;
      const eventName = target.matches("a[href]") ? classifyLink(target) : target.dataset.analyticsEvent;
      if (!eventName) return;
      track(eventName, {
        source_path: window.location.pathname,
        plan: target.dataset.plan || "unspecified",
      });
    };

    const onToggle = (event) => {
      const disclosure = event.target;
      if (!(disclosure instanceof HTMLDetailsElement) || !disclosure.open) return;
      const eventName = disclosure.dataset.analyticsEvent;
      if (eventName) track(eventName, { source_path: window.location.pathname });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return <Analytics />;
}
