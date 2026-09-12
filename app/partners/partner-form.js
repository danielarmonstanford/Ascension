"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"];
const initialForm = { name: "", organization: "", email: "", website: "", category: "", interest: "", message: "", consent: false, company: "" };

export default function PartnerForm({ styles }) {
  const [form, setForm] = useState(initialForm);
  const [attribution, setAttribution] = useState(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, params.get(key)]).filter(([, value]) => value));
  });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending"); setFeedback("");
    try {
      const response = await fetch("/api/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form, attribution }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Your request could not be sent.");
      track("partners_conversation_requested", { source_path: "/partners", category: form.category || "unspecified", interest: form.interest || "unspecified" });
      setStatus("sent"); setForm(initialForm);
    } catch (error) { setStatus("error"); setFeedback(error.message); }
  }

  if (status === "sent") return <div className={styles.formSuccess} role="status"><p>Request received</p><h3>The conversation begins here.</h3><p>Thank you. Daniel will review the context and respond personally.</p></div>;

  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.formPair}>
      <label>Name<input required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
      <label>Organization<input required autoComplete="organization" value={form.organization} onChange={(event) => update("organization", event.target.value)} /></label>
    </div>
    <div className={styles.formPair}>
      <label>Email<input required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
      <label>Website <span>Optional</span><input type="url" inputMode="url" placeholder="https://" value={form.website} onChange={(event) => update("website", event.target.value)} /></label>
    </div>
    <div className={styles.formPair}>
      <label>Partnership category<select required value={form.category} onChange={(event) => update("category", event.target.value)}><option value="">Choose a category</option><option>Travel and hospitality</option><option>Wellness technology and wearables</option><option>Audio and music</option><option>Body care</option><option>Nutrition and beverages</option><option>Creative materials</option><option>Fashion and textiles</option><option>Mobility and transport</option><option>Another aligned category</option></select></label>
      <label>What would you like to explore?<select required value={form.interest} onChange={(event) => update("interest", event.target.value)}><option value="">Choose an interest</option><option>Partnership conversation</option><option>Tailored concept</option><option>Product or in-kind participation</option><option>Information request</option></select></label>
    </div>
    <label>Short message<textarea required rows="5" value={form.message} onChange={(event) => update("message", event.target.value)} /></label>
    <input className={styles.honeypot} tabIndex="-1" aria-hidden="true" autoComplete="off" value={form.company} onChange={(event) => update("company", event.target.value)} />
    <label className={styles.consent}><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I consent to being contacted about ASCENSION partnership opportunities.</span></label>
    {feedback && <p className={styles.formError} role="alert">{feedback}</p>}
    <button className={styles.radiant} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a Partnership Conversation"}<span aria-hidden="true">→</span></button>
    <p className={styles.formNote}>No payment or commitment. Partnership fit and scope are discussed personally.</p>
  </form>;
}
