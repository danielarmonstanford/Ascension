"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import styles from "./deck.module.css";

const PDF_URL = "/downloads/ascension-da-nang-2027-partnership-deck.pdf";
const CONTACT_URL = "mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%202027%20%E2%80%94%20Partnership%20Conversation";

export default function DeckExperience() {
  const [desktop, setDesktop] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    track("partner_deck_view", { source_path: "/partners/deck" });
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const frame = window.requestAnimationFrame(() => setViewerReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, [desktop]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/partners" aria-label="Return to ASCENSION partnership opportunities">ASCENSION</Link>
        <p>Partnership Invitation · Da Nang 2027</p>
        <div className={styles.actions}>
          <Link href="/partners/download" data-analytics-event="partner_deck_download">Download Partnership Deck</Link>
          <a href={CONTACT_URL} data-analytics-event="partner_contact_click">Request a Partnership Conversation</a>
        </div>
      </header>

      {desktop && viewerReady ? (
        <section className={styles.desktopViewer} aria-label="ASCENSION Da Nang 2027 partnership deck">
          <object data={`${PDF_URL}#view=FitH`} type="application/pdf" aria-label="ASCENSION Da Nang 2027 partnership deck PDF">
            <p>Your browser cannot display the presentation inline. <a href={PDF_URL}>Open the partnership deck</a>.</p>
          </object>
        </section>
      ) : (
        <section className={styles.mobileDeck}>
          <div className={styles.cover}>
            <Image src="/assets/partners/partnership-deck-cover.webp" alt="Cover of the ASCENSION Da Nang 2027 partnership deck" fill priority sizes="100vw" />
          </div>
          <div className={styles.mobileCopy}>
            <p className={styles.eyebrow}>ASCENSION · Partnership invitation</p>
            <h1>Enter the experience.</h1>
            <p>Da Nang, Vietnam · January 12–26, 2027</p>
            <a className={styles.primary} href={PDF_URL} data-analytics-event="partner_deck_view">Open Partnership Deck <span aria-hidden="true">↗</span></a>
            <div className={styles.mobileActions}>
              <Link href="/partners/download" data-analytics-event="partner_deck_download">Download Partnership Deck</Link>
              <a href={CONTACT_URL} data-analytics-event="partner_contact_click">Request a Partnership Conversation</a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
