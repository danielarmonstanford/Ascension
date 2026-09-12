"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

export default function PartnerTracking() {
  useEffect(() => { track("partners_page_view", { source_path: "/partners" }); }, []);
  return null;
}

export function StickyPartnerCta({ styles }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.72);
    update();
    window.addEventListener("scroll", update, { passive:true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <a className={`${styles.radiant} ${styles.mobileCta} ${visible ? styles.mobileCtaVisible : ""}`} href="#conversation" data-analytics-event="partners_mobile_conversation_cta">Request a Partnership Conversation</a>;
}
