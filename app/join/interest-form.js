"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";

export default function InterestForm({ styles }) {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("enquiry_started", { source_path: "/join" });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");
    const formData = new FormData(event.currentTarget);
    const enquiry = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/join-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry,
          source: { path: window.location.pathname, url: window.location.href },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Your enquiry could not be sent.");
      track("enquiry_submitted", { source_path: "/join", duration: enquiry.duration || "unspecified" });
      setSubmitted(true);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Your enquiry could not be sent.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} onFocus={markStarted}>
      {submitted ? (
        <div className={styles.success} role="status">
          <p>Interest received</p>
          <h3>Thank you. This is the beginning of the conversation.</h3>
          <p>Your enquiry has been received. We will respond personally with availability, confirmed inclusions and the appropriate reservation steps.</p>
        </div>
      ) : (
        <>
          <label htmlFor="join-name">Your name</label>
          <input id="join-name" name="name" autoComplete="name" required />

          <label htmlFor="join-email">Email</label>
          <input id="join-email" name="email" type="email" autoComplete="email" required />

          <label htmlFor="join-country">Country or departure city</label>
          <input id="join-country" name="country" autoComplete="country-name" required />

          <label htmlFor="join-duration">Which rhythm fits you?</label>
          <select id="join-duration" name="duration" required defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>7 days</option>
            <option>14 days</option>
            <option>I am not sure yet</option>
          </select>

          <label htmlFor="join-draw">What draws you to ASCENSION?</label>
          <textarea id="join-draw" name="draw" placeholder="A sentence is enough." />

          <label htmlFor="join-accessibility">Accessibility or mobility considerations <span>(optional)</span></label>
          <textarea id="join-accessibility" name="accessibility" placeholder="Share only what would help us make the experience accessible." />

          <label className={styles.consent} htmlFor="join-consent">
            <input id="join-consent" name="enquiryConsent" type="checkbox" required />
            <span>I agree that ASCENSION may use these details to respond to this enquiry.</span>
          </label>

          <label className={styles.consent} htmlFor="join-marketing">
            <input id="join-marketing" name="marketingConsent" type="checkbox" />
            <span>I would like occasional ASCENSION updates. This is optional.</span>
          </label>

          {feedback && <p className={styles.formError} role="alert">{feedback}</p>}
          <button type="submit" disabled={status === "sending"} data-analytics-event="funnel_primary_cta">{status === "sending" ? "Sending…" : "Request Your Place"}</button>
          <p className={styles.formNote}>This enquiry is not a reservation or a payment. The optional marketing checkbox is separate from your enquiry.</p>
        </>
      )}
    </form>
  );
}
