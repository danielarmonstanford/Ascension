"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { deckSlides } from "../../../content/partners";
import styles from "./deck.module.css";

export default function DeckExperience() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStart = useRef(null);
  const completed = useRef(false);
  const current = deckSlides[index];

  const go = useCallback((next) => setIndex((value) => Math.max(0, Math.min(deckSlides.length - 1, typeof next === "function" ? next(value) : next))), []);

  useEffect(() => { track("partners_deck_started", { source_path:"/partners/deck", slide_count:deckSlides.length }); }, []);
  useEffect(() => {
    if (index === deckSlides.length - 1 && !completed.current) { completed.current = true; track("partners_deck_completed", { source_path:"/partners/deck", slide_count:deckSlides.length }); }
  }, [index]);
  useEffect(() => {
    const onKey = (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); go((value) => value + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go((value) => value - 1); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(deckSlides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  }

  function finishSwipe(event) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) go((value) => value + (distance < 0 ? 1 : -1));
    touchStart.current = null;
  }

  return <main className={`${styles.page} ${styles[current.theme || "editorial"]}`} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={finishSwipe}>
    <header className={styles.header}>
      <Link href="/partners">ASCENSION</Link>
      <p>Partnership Invitation · Da Nang 2027</p>
      <button type="button" onClick={toggleFullscreen}>{fullscreen ? "Exit full screen" : "Full screen"}</button>
    </header>

    <div className={styles.progress} aria-label={`Slide ${index + 1} of ${deckSlides.length}`}><span style={{ width:`${((index + 1) / deckSlides.length) * 100}%` }} /></div>

    <section className={styles.slide} key={index} aria-live="polite">
      {current.image && <div className={styles.media}><Image src={current.image} alt={current.imageAlt} fill priority={index === 0} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, 56vw" /></div>}
      <div className={styles.copy}>
        <p className={styles.kicker}>{current.kicker}</p>
        <h1>{current.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p className={styles.body}>{current.body}</p>
        {current.meta && <p className={styles.meta}>{current.meta}</p>}
        {current.quote && <blockquote>{current.quote}</blockquote>}
        {current.pathways && <div className={styles.pathways}>{current.pathways.map((item) => <span key={item}>{item}</span>)}</div>}
        {current.stats && <div className={styles.stats}>{current.stats.map(([value,label]) => <p key={label}><strong>{value}</strong><span>{label}</span></p>)}</div>}
        {current.list && <ol className={styles.list}>{current.list.map((item) => <li key={item}>{item}</li>)}</ol>}
        {current.sequence && <ol className={styles.sequence}>{current.sequence.map((item) => <li key={item}>{item}</li>)}</ol>}
        {current.investments && <div className={styles.investments}>{current.investments.map(([name,amount]) => <p key={name}><span>{name}</span><strong>{amount}</strong></p>)}</div>}
        {current.note && <p className={styles.note}>{current.note}</p>}
        {index === deckSlides.length - 1 && <div className={styles.finalActions}><Link href="/partners#conversation">Request a Partnership Conversation</Link><a href="/partners/download" data-analytics-event="partners_pdf_downloaded">Download PDF</a></div>}
      </div>
    </section>

    <footer className={styles.controls}>
      <button type="button" onClick={() => go((value) => value - 1)} disabled={index === 0} aria-label="Previous slide">← <span>Previous</span></button>
      <p><strong>{String(index + 1).padStart(2,"0")}</strong> / {String(deckSlides.length).padStart(2,"0")}</p>
      <button type="button" onClick={() => go((value) => value + 1)} disabled={index === deckSlides.length - 1} aria-label="Next slide"><span>Next</span> →</button>
    </footer>
  </main>;
}

