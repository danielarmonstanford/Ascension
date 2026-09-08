import Image from "next/image";
import styles from "./join.module.css";
import InterestForm from "./interest-form";
import StickyInterestAction from "./sticky-interest-action";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const DUSK_GROUP =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1788887672/da-nang-dusk_il93gv.png";
const DIEN_CHAN_VISUAL =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1200/v1788887674/dien-chan-circle_amacjw.png";
const MORNING_MOVEMENT =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1800/v1788887673/morning-movement_cqsgnn.png";
const HIDEOUT_VISUAL =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1800/v1788050463/Hideout_Bath_scene_qwpu7q.jpg";

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
    "What is included?",
    "Your selected ASCENSION program includes confirmed shared programming built around daily Diện Chẩn. The final inclusion schedule is supplied before any non-refundable payment.",
  ],
  [
    "Do I need experience?",
    "No. You do not need previous experience with movement, meditation, bodywork or creative practice. Participate in your own way.",
  ],
  [
    "What is booked separately?",
    "Flights, accommodation, visas, personal insurance, most transportation and meals not explicitly listed. Guests choose and book their own accommodation.",
  ],
  [
    "Is this medical care?",
    "No. ASCENSION is a wellness, cultural and educational experience. It does not replace medical advice, diagnosis, treatment or professional healthcare.",
  ],
];

function InterestAction({ label = "Request the private overview" }) {
  return (
    <a className={styles.reserve} href="#apply">
      {label}<span aria-hidden="true">→</span>
    </a>
  );
}

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#offer">Skip to program options</a>

      <header className={styles.hero} id="funnel-hero">
        <div className={styles.media} aria-hidden="true">
          <Image src={HERO_POSTER} alt="" fill priority sizes="100vw" />
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
            <InterestAction />
            <a className={styles.secondaryAction} href="#experience">See the experience</a>
          </div>
          <p className={styles.microcopy}>A short expression of interest—not a payment or commitment.</p>
        </div>

        <dl className={styles.heroFacts}>
          {details.slice(0, 2).map(([term, value]) => (
            <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </header>

      <section className={styles.clarity} aria-label="Program at a glance">
        {details.map(([term, value]) => (
          <div key={term}><strong>{value}</strong><span>{term}</span></div>
        ))}
      </section>

      <section className={styles.orientation} id="experience" aria-labelledby="orientation-title">
        <p className={styles.sectionNumber}>01</p>
        <div>
          <h2 id="orientation-title">A living curation, not a rigid itinerary.</h2>
          <p className={styles.largeCopy}>
            ASCENSION is for curious people who want depth without dogma: daily anchors, room for discovery and access to a Vietnamese practice rooted in place.
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
          <InterestAction />
          <p>No charge today. Accommodation and travel are separate.</p>
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
          <Image src={DIEN_CHAN_VISUAL} alt="A small group observing a gentle Vietnamese facial reflexology demonstration" width={1122} height={1402} sizes="(max-width: 820px) 100vw, 32vw" />
          <p>Led daily by</p>
          <h3>Y sĩ Huỳnh<br />Bảo Loan</h3>
          <p>Licensed Traditional Medicine Practitioner<br />Licensed Acupressure &amp; Massage Therapist</p>
        </div>
      </section>

      <section className={styles.dayRhythm} aria-labelledby="day-title">
        <div>
          <p className={styles.sectionNumber}>05</p>
          <h2 id="day-title">Enough structure to arrive.<br />Enough freedom to breathe.</h2>
        </div>
        <p className={styles.dayLead}>No two days need to feel identical. The program balances dependable daily anchors with selected cultural experiences and unprogrammed space.</p>
        <Image className={styles.dayImage} src={MORNING_MOVEMENT} alt="A small international group practicing gentle movement on a Da Nang terrace at sunrise" width={1672} height={941} sizes="(max-width: 820px) 100vw, 91vw" />
        <ol>
          <li><strong>Morning</strong><span>Breath, mobility and embodied practice.</span></li>
          <li><strong>Midday</strong><span>Vietnamese wellness, food and rest.</span></li>
          <li><strong>Afternoon</strong><span>Creative or cultural immersion.</span></li>
          <li><strong>Evening</strong><span>Sound, movement, conversation—or space.</span></li>
        </ol>
      </section>

      <section className={styles.hideout} aria-labelledby="hideout-title">
        <p className={styles.sectionNumber}>06</p>
        <div>
          <p className={styles.hideoutLabel}>Planned featured venue</p>
          <h2 id="hideout-title">Hideout<br />Wellness</h2>
        </div>
        <Image className={styles.hideoutImage} src={HIDEOUT_VISUAL} alt="A restorative bath setting at Hideout Wellness in Da Nang" width={1800} height={1200} sizes="(max-width: 820px) 100vw, 44vw" />
        <div className={styles.hideoutCopy}>
          <p>ASCENSION moves through Da Nang. Alongside our primary host setting, selected recovery experiences are planned at Hideout Wellness—bringing contrast therapy, sauna and deep rest into the fortnight’s rhythm.</p>
          <p>Subject to final venue confirmation and availability.</p>
          <a href="https://hideoutwellness.com/" target="_blank" rel="noopener noreferrer">Explore Hideout Wellness</a>
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title">
        <div>
          <p className={styles.sectionNumber}>07</p>
          <h2 id="questions-title">Before you decide.</h2>
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

      <section className={styles.apply} id="apply" aria-labelledby="apply-title">
        <div className={styles.applyCopy}>
          <p className={styles.sectionNumber}>Private overview</p>
          <h2 id="apply-title">Could this be your January?</h2>
          <p>Tell us what draws you to ASCENSION. We will send the concise program overview, current logistics and an invitation to a short fit conversation.</p>
          <p className={styles.applyPrice}>7 days · USD $1,200<br />14 days · USD $2,000</p>
          <p className={styles.microcopy}>Accommodation and travel are separate. No charge today.</p>
        </div>
        <InterestForm styles={styles} />
      </section>

      <footer className={styles.final}>
        <Image className={styles.finalImage} src={DUSK_GROUP} alt="An ASCENSION group walking along the Da Nang coast at dusk" fill sizes="100vw" />
        <p>ASCENSION · A MODUS SERIES</p>
        <h2>Heal your soul.<br />Revive your senses.</h2>
        <InterestAction />
        <div className={styles.legal}>
          <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="mailto:daniel@stanfordemporium.com">Ask a question</a>
        </div>
      </footer>
      <StickyInterestAction styles={styles} />
    </main>
  );
}
