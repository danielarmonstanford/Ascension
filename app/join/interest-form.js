"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";

export default function InterestForm({ styles }) {
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("enquiry_started", { source_path: "/join" });
  }

  function submit(event) {
    event.preventDefault();
    track("enquiry_submitted", { source_path: "/join" });
    setSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={submit} onFocus={markStarted}>
      {submitted ? (
        <div className={styles.success} role="status">
          <p>Interest received</p>
          <h3>Thank you. This is the beginning of the conversation.</h3>
          <p>This preview does not transmit or store your entry. Please use “Ask a Question” to contact ASCENSION directly while the secure enquiry connection is completed.</p>
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
            <input id="join-consent" name="marketingConsent" type="checkbox" />
            <span>I would like occasional ASCENSION updates. This is optional.</span>
          </label>

          <button type="submit" data-analytics-event="funnel_primary_cta">Request Your Place</button>
          <p className={styles.formNote}>Submitting this preview does not transmit or store your entry. The optional marketing checkbox is separate from your enquiry.</p>
        </>
      )}
    </form>
  );
}
