import styles from "./join.module.css";
import { RESERVATION_URL } from "../seo";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1800/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";

export const metadata = {
  title: "Join ASCENSION SENSES | Da Nang 2027",
  description:
    "Choose seven or fourteen days of Vietnamese wellness, movement, sound, food, culture and creativity in Da Nang, January 12–26, 2027.",
  robots: { index: false, follow: false, noarchive: true },
};

const details = [
  ["Place", "Da Nang, Vietnam"],
  ["Dates", "January 12–26, 2027"],
  ["Format", "Seven or fourteen days"],
  ["Group", "Small, intimate cohort"],
];

const faq = [
  [
    "What does my reservation cover?",
    "The checkout takes a USD $300 deposit toward your chosen program. Accommodation, flights and local transfers are separate.",
  ],
  [
    "Do I need experience?",
    "No. You do not need previous experience with movement, meditation, bodywork or creative practice. Participate in your own way.",
  ],
  [
    "What is confirmed?",
    "Diện Chẩn is led daily by Y sĩ Huỳnh Bảo Loan, a licensed traditional medicine and healthcare practitioner and licensed acupressure and massage therapist. Additional planned experiences and facilitators are announced only as agreements are confirmed.",
  ],
  [
    "What is the cancellation policy?",
    "Cancel 60 or more days before the program for a full refund less a $25 administration fee; 30–60 days before for a 50% refund. Under 30 days, payments are non-refundable. Private sessions are non-refundable once booked.",
  ],
];

function ReserveAction({ label = "Reserve your place" }) {
  return (
    <a
      className={styles.reserve}
      href={RESERVATION_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}<span aria-hidden="true">→</span>
    </a>
  );
}

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#offer">Skip to program options</a>

      <header className={styles.hero}>
        <div className={styles.media} aria-hidden="true">
          <img src={HERO_POSTER} alt="" />
        </div>
        <div className={styles.scrim} />

        <nav className={styles.nav} aria-label="Funnel navigation">
          <a className={styles.wordmark} href="/en">ASCENSION</a>
          <a className={styles.returnLink} href="/en">Explore the full experience</a>
        </nav>

        <div className={styles.heroCopy}>
          <p className={styles.series}>A MODUS SERIES · DA NANG /01</p>
          <h1><span>Heal your soul.</span><span>Revive your senses.</span></h1>
          <p className={styles.heroLead}>
            Seven or fourteen days between the city, sea and mountains of Da Nang.
          </p>
          <div className={styles.heroAction}>
            <ReserveAction />
            <p>USD $300 deposit</p>
          </div>
        </div>

        <dl className={styles.heroFacts}>
          {details.slice(0, 2).map(([term, value]) => (
            <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </header>

      <section className={styles.orientation} aria-labelledby="orientation-title">
        <p className={styles.sectionNumber}>01</p>
        <div>
          <h2 id="orientation-title">Come back to what you can feel.</h2>
          <p className={styles.largeCopy}>
            ASCENSION is an immersive wellness and cultural happening shaped by Vietnamese practice, movement, sound, food, creativity and place.
          </p>
        </div>
        <dl className={styles.factList}>
          {details.map(([term, value]) => (
            <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className={styles.rhythm} aria-labelledby="rhythm-title">
        <div className={styles.rhythmHeading}>
          <p className={styles.sectionNumber}>02</p>
          <h2 id="rhythm-title">One place.<br />Six ways in.</h2>
        </div>
        <ol>
          <li><strong>Embody</strong><span>Diện Chẩn · bodywork · movement</span></li>
          <li><strong>See</strong><span>Sea · mountains · Hội An · people</span></li>
          <li><strong>Sound</strong><span>Waves · music · sound baths · stillness</span></li>
          <li><strong>Taste</strong><span>Shared table · local flavour</span></li>
          <li><strong>Breathe</strong><span>Salt air · breathwork · warm earth</span></li>
          <li><strong>Create</strong><span>Draw · paint · write · photograph</span></li>
        </ol>
      </section>

      <section className={styles.offer} id="offer" aria-labelledby="offer-title">
        <div className={styles.offerIntro}>
          <p className={styles.sectionNumber}>03</p>
          <h2 id="offer-title">Choose your time in Da Nang.</h2>
          <p>Both options open the shared ASCENSION rhythm while leaving room to rest and explore.</p>
        </div>
        <div className={styles.options}>
          <article>
            <p>Seven days</p>
            <h3>January 12–19</h3>
            <strong>USD $1,200</strong>
            <span>The concentrated first-week experience.</span>
          </article>
          <article>
            <p>Fourteen days</p>
            <h3>January 12–26</h3>
            <strong>USD $2,000</strong>
            <span>The complete arc of Edition 01.</span>
          </article>
        </div>
        <div className={styles.offerAction}>
          <ReserveAction />
          <p>Secure either program with a USD $300 deposit.</p>
        </div>
      </section>

      <section className={styles.trust} aria-labelledby="trust-title">
        <p className={styles.sectionNumber}>04</p>
        <div>
          <h2 id="trust-title">A Vietnamese practice at the centre.</h2>
          <p>
            Daily Diện Chẩn sessions respond to the individual through a needle-free Vietnamese practice incorporating reflexology, acupressure, heat, stretching and therapeutic bodywork.
          </p>
        </div>
        <div className={styles.practitioner}>
          <p>Led daily by</p>
          <h3>Y sĩ Huỳnh<br />Bảo Loan</h3>
          <p>Licensed Traditional Medicine Practitioner<br />Licensed Acupressure &amp; Massage Therapist</p>
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title">
        <div>
          <p className={styles.sectionNumber}>05</p>
          <h2 id="questions-title">Before you reserve.</h2>
        </div>
        <div className={styles.disclosures}>
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.final}>
        <p>Da Nang · January 12–26, 2027</p>
        <h2>Ready to feel<br />the difference?</h2>
        <ReserveAction />
        <div className={styles.legal}>
          <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="mailto:daniel@stanfordemporium.com">Ask a question</a>
        </div>
      </footer>
    </main>
  );
}
