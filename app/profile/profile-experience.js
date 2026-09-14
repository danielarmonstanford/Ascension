"use client";

/* Draft restoration intentionally hydrates browser-only storage after mount. */
/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { calculatePathways, pathwayCopy, profileDeliveryCopy, profileQuestions, questionIsVisible } from "../../content/profile";
import PathwayShare from "./pathway-share";
import styles from "./profile.module.css";

const STORAGE_KEY = "ascension-profile-v2";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

function emit(eventName) {
  track(eventName, { source_path: "/profile" });
}

export default function ProfileExperience() {
  const [answers, setAnswers] = useState({});
  const [attribution, setAttribution] = useState({});
  const [screen, setScreen] = useState(-1);
  const [hydrated, setHydrated] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", consent: false, acknowledgement: false, website: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [deliveryWarning, setDeliveryWarning] = useState(false);
  const [visualVariant, setVisualVariant] = useState("clean");
  const started = useRef(false);
  const completed = useRef(false);
  const startedAt = useRef(0);

  const visibleQuestions = useMemo(() => profileQuestions.filter((question) => questionIsVisible(question, answers)), [answers]);
  const results = useMemo(() => calculatePathways(answers), [answers]);
  const totalScreens = visibleQuestions.length + 2;
  const current = screen >= 0 && screen < visibleQuestions.length ? visibleQuestions[screen] : null;
  const isResult = screen === visibleQuestions.length;
  const progress = Math.max(0, Math.min(100, ((screen + 1) / totalScreens) * 100));

  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    setVisualVariant(["poster", "female-poster"].includes(params.get("visual")) ? params.get("visual") : "clean");
    const captured = Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, params.get(key)]).filter(([, value]) => value));
    setAttribution(captured);
    try {
      if (params.get("reset") === "1") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (saved?.answers) setAnswers(saved.answers);
        if (Number.isInteger(saved?.screen)) setScreen(saved.screen);
        if (saved?.lead) setLead((value) => ({ ...value, name: saved.lead.name || "", email: saved.lead.email || "" }));
      }
    } catch { /* A damaged draft should never block the profile. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, screen, lead: { name: lead.name, email: lead.email } }));
  }, [answers, screen, lead.name, lead.email, hydrated]);

  const value = current ? answers[current.id] : undefined;
  const valid = !current || !current.required || (Array.isArray(value) ? value.length > 0 : Boolean(String(value || "").trim()));
  const firstName = String(answers.first_name || "").trim();
  const qualifiedForDaNang = ["ready", "researching", "details"].includes(answers.travel_readiness)
    && ["yes", "likely", "partial", "unsure"].includes(answers.da_nang_availability)
    && ["7-day", "14-day", "either"].includes(answers.duration_preference);

  function personalize(copy) {
    return copy?.replaceAll("{{firstName}}", firstName || "you");
  }

  function begin() {
    if (!started.current) { emit("profile_started"); started.current = true; }
    setScreen(0);
  }

  function updateValue(nextValue) {
    setAnswers((previous) => ({ ...previous, [current.id]: nextValue }));
    if (current.id === "first_name") setLead((previous) => ({ ...previous, name: nextValue }));
    setMessage("");
  }

  function toggle(valueToToggle) {
    const existing = Array.isArray(value) ? value : [];
    if (existing.includes(valueToToggle)) return updateValue(existing.filter((item) => item !== valueToToggle));
    if (current.max && existing.length >= current.max) return setMessage(`Choose up to ${current.max}.`);
    const exclusive = ["none", "prefer-not"];
    const next = exclusive.includes(valueToToggle) ? [valueToToggle] : [...existing.filter((item) => !exclusive.includes(item)), valueToToggle];
    updateValue(next);
  }

  function forward() {
    if (!valid) return setMessage("Choose an answer to continue.");
    setMessage("");
    if (screen === visibleQuestions.length - 1 && !completed.current) {
      emit("profile_completed");
      completed.current = true;
    }
    setScreen((value) => value + 1);
  }

  async function submit(event) {
    event.preventDefault();
    if (!lead.name.trim() || !lead.email.trim() || !lead.consent || !lead.acknowledgement) return setMessage("Add your name, email, consent and acknowledgement to unlock your experience.");
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/profile", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: 2, answers, pathways: results, attribution, lead, startedAt: startedAt.current, source: { path: window.location.pathname, url: window.location.href } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "The profile could not be sent.");
      emit("profile_lead_submitted");
      localStorage.removeItem(STORAGE_KEY);
      setDeliveryWarning(data?.delivery?.participant !== "sent");
      setStatus("sent");
    } catch (error) {
      setStatus("error"); setMessage(error.message);
    }
  }

  if (!hydrated) return <main className={styles.page} aria-busy="true" />;

  return (
    <main className={`${styles.page} ${screen >= 0 ? styles.answering : ""}`}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/en">ASCENSION</Link>
        <Link className={styles.exit} href="/join">Exit profile</Link>
      </header>
      <div className={styles.progress} aria-label={`Profile progress: ${Math.round(progress)}%`}><span style={{ width: `${progress}%` }} /></div>

      {screen === -1 && <section className={`${styles.intro} ${styles.introWithArt}`}>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>Your ASCENSION Body &amp; Senses profile</p>
          <h1>Discover your pathway.</h1>
          <p className={styles.lead}>A short, private conversation to understand what draws you toward Da Nang—and which parts of ASCENSION may matter most.</p>
          <button className={styles.primary} onClick={begin}>Begin <span aria-hidden="true">→</span></button>
          <p className={styles.disclaimer}>This profile supports experience personalisation only. ASCENSION does not provide medical diagnosis, advice or treatment.</p>
        </div>
        <picture className={styles.profileArt}>
          <source media="(max-width: 600px)" srcSet={visualVariant === "poster" ? "/assets/profile/pathway-mobile.jpg" : visualVariant === "female-poster" ? "/assets/profile/pathway-mobile-female.jpg" : "/assets/profile/pathway-mobile-clean.jpg"} />
          <img src="/assets/profile/pathway-desktop.jpg" alt="A movement figure overlooking the coast of Da Nang" />
        </picture>
      </section>}

      {current && <section className={styles.question} key={current.id}>
        <p className={styles.eyebrow}>{current.eyebrow}</p>
        <h1>{personalize(current.question)}</h1>
        {current.help && <p className={styles.help}>{current.help}</p>}
        {current.type === "text" ? <input className={styles.textInput} name={current.id} autoFocus value={value || ""} onChange={(event) => updateValue(event.target.value)} placeholder={current.placeholder} autoComplete={current.id === "first_name" ? "given-name" : "off"} onKeyDown={(event) => { if (event.key === "Enter") forward(); }} /> :
          <div className={styles.options} role={current.type === "single" ? "radiogroup" : "group"} aria-label={current.question}>
            {current.options.map((entry, index) => {
              const selected = current.type === "multi" ? (value || []).includes(entry.value) : value === entry.value;
              return <button key={entry.value} type="button" className={selected ? styles.selected : ""} role={current.type === "single" ? "radio" : "checkbox"} aria-checked={selected} onClick={() => current.type === "multi" ? toggle(entry.value) : updateValue(entry.value)}><span>{String.fromCharCode(65 + index)}</span>{entry.label}</button>;
            })}
          </div>}
        {message && <p className={styles.error} role="alert">{message}</p>}
        <nav className={styles.controls} aria-label="Profile navigation"><button type="button" className={styles.back} onClick={() => setScreen((value) => value - 1)}>Back</button><button type="button" className={styles.primary} disabled={!valid} onClick={forward}>Continue <span aria-hidden="true">→</span></button></nav>
      </section>}

      {isResult && status !== "sent" && <section className={styles.result}>
        <p className={styles.eyebrow}>Your pathway constellation</p>
        <h1 className={styles.emailHeading}>{profileDeliveryCopy.en.emailHeading}</h1>
        <p className={styles.lead}>{profileDeliveryCopy.en.emailSupportingCopy}</p>
        <form className={styles.form} onSubmit={submit}>
          <h2>{firstName ? `${firstName}, your pathway is ready.` : "Your pathway is ready."}</h2>
          <label>First name<input name="name" required value={lead.name} onChange={(event) => { setLead({ ...lead, name: event.target.value }); setAnswers((previous) => ({ ...previous, first_name: event.target.value })); }} autoComplete="given-name" /></label>
          <label>Email<input name="email" required type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} autoComplete="email" /></label>
          <input name="website" className={styles.honeypot} tabIndex="-1" autoComplete="off" aria-hidden="true" value={lead.website} onChange={(event) => setLead({ ...lead, website: event.target.value })} />
          <label className={styles.consent}><input name="acknowledgement" required type="checkbox" checked={lead.acknowledgement} onChange={(event) => setLead({ ...lead, acknowledgement: event.target.checked })} /><span>This profile supports experience personalisation only. ASCENSION does not provide medical diagnosis, advice or treatment.</span></label>
          <label className={styles.consent}><input name="consent" required type="checkbox" checked={lead.consent} onChange={(event) => setLead({ ...lead, consent: event.target.checked })} /><span>I consent to ASCENSION using these answers to respond to my enquiry and help plan the experience. <Link href="/privacy">Privacy Policy</Link>.</span></label>
          {message && <p className={styles.error} role="alert">{message}</p>}
          <button className={styles.primary} disabled={status === "sending"}>{status === "sending" ? "Unlocking…" : "Unlock My Experience"}<span aria-hidden="true">→</span></button>
          <p className={styles.privacy}>Body, discomfort and mobility answers are never sent to Meta Pixel or Meta Conversions API.</p>
        </form>
        <button type="button" className={styles.back} onClick={() => setScreen(visibleQuestions.length - 1)}>Back</button>
      </section>}

      {status === "sent" && <section className={styles.result}><p className={styles.eyebrow}>Your primary pathway</p><h1>{results[0]}</h1><p className={styles.lead}>{pathwayCopy[results[0]]}</p>{deliveryWarning ? <p className={styles.deliveryWarning} role="status">Your result is saved, but we could not send the email. Please download your guide now.</p> : <p className={styles.deliveryStatus} role="status">Your personalised result and guide are on their way to your inbox.</p>}<div className={styles.supporting}><span>Supporting pathways</span><strong>{results[1]}</strong><strong>{results[2]}</strong></div><section className={styles.takeHome} aria-labelledby="take-home-title"><h2 id="take-home-title">{profileDeliveryCopy.en.takeHomeHeading}</h2><p>{profileDeliveryCopy.en.takeHomeCopy}</p></section><div className={styles.resultActions}><a className={styles.primary} href="/profile/guide/download" target="_blank" rel="noopener noreferrer">Download My Guide <span aria-hidden="true">↓</span></a><Link className={styles.secondary} href={`/profile/guide?pathway=${results[0].toLowerCase()}`}>View Your Personalised Guide <span aria-hidden="true">→</span></Link>{qualifiedForDaNang ? <Link className={styles.secondary} href="/join#apply">Request Your Cohort Invitation <span aria-hidden="true">→</span></Link> : <a className={styles.secondary} href={`mailto:daniel@stanfordemporium.com?subject=${encodeURIComponent("ASCENSION future-city waitlist")}`}>Join Your Future-City Waitlist <span aria-hidden="true">→</span></a>}</div><PathwayShare pathway={results[0]} attribution={attribution} /></section>}
    </main>
  );
}
