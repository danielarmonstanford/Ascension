"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { pathwayShareCopy } from "../../content/profile";
import styles from "./profile.module.css";

const ORIGIN = "https://www.ascensionsenses.com";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

function joinUrl(attribution) {
  const query = new URLSearchParams();
  for (const key of ATTRIBUTION_KEYS) {
    if (attribution?.[key]) query.set(key, attribution[key]);
  }
  const suffix = query.toString();
  return `${ORIGIN}/join${suffix ? `?${suffix}` : ""}`;
}

export default function PathwayShare({ pathway, attribution }) {
  const [feedback, setFeedback] = useState("");
  const detail = pathwayShareCopy[pathway];
  const url = joinUrl(attribution);
  const message = detail?.message || `My ASCENSION pathway is ${pathway}. What does your body need more of? Discover yours and receive the complimentary guide:`;

  async function share() {
    const payload = { title: "ASCENSION Pathway", text: message, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        track("profile_pathway_shared", { pathway, method: "web-share" });
        return;
      }
      await navigator.clipboard.writeText(`${message} ${url}`);
      setFeedback("Link copied. Share it wherever you like.");
      track("profile_pathway_shared", { pathway, method: "copy-link" });
    } catch (error) {
      if (error?.name === "AbortError") return;
      setFeedback("Copy the link below to share your pathway.");
    }
  }

  return <section className={styles.sharePanel} aria-label="Share your ASCENSION pathway">
    <div className={styles.shareCard} data-pathway={pathway}>
      <span>ASCENSION pathway</span><strong>{pathway}</strong><p>{detail?.tagline}</p>
    </div>
    <div className={styles.shareCopy}>
      <h2>Invite someone in.</h2>
      <p>Share only your pathway and the invitation—your profile answers remain private.</p>
      <button type="button" className={styles.secondary} onClick={share}>Share My Pathway <span aria-hidden="true">↗</span></button>
      {feedback && <p className={styles.shareFeedback} role="status">{feedback}</p>}
    </div>
  </section>;
}
