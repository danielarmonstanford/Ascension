"use client";

import { useState } from "react";

export default function InterestForm({ styles }) {
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {submitted ? (
        <div className={styles.success} role="status">
          <p>Interest received</p>
          <h3>Thank you. This is the beginning of the conversation.</h3>
          <p>This mockup does not transmit or store your entry. The production form will connect to the approved ASCENSION inquiry system before launch.</p>
        </div>
      ) : (
        <>
          <label htmlFor="join-name">Your name</label>
          <input id="join-name" name="name" autoComplete="name" required />

          <label htmlFor="join-email">Email</label>
          <input id="join-email" name="email" type="email" autoComplete="email" required />

          <label htmlFor="join-duration">Which rhythm fits you?</label>
          <select id="join-duration" name="duration" required defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>7 days</option>
            <option>14 days</option>
            <option>I am not sure yet</option>
          </select>

          <label htmlFor="join-draw">What draws you to ASCENSION?</label>
          <textarea id="join-draw" name="draw" placeholder="A sentence is enough." />

          <button type="submit">Request my private overview</button>
          <p className={styles.formNote}>By continuing, you agree to receive information about this edition. You may unsubscribe at any time. This prototype does not transmit or store your entry.</p>
        </>
      )}
    </form>
  );
}
