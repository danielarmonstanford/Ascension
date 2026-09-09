import Image from "next/image";
import Link from "next/link";
import styles from "./join.module.css";
import InterestForm from "./interest-form";
import StickyInterestAction from "./sticky-interest-action";
import { sensoryMedia } from "../sensory-media";

const HERO_POSTER = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const DUSK_GROUP = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1788887672/da-nang-dusk_il93gv.png";

export const metadata = {
  title: "Join ASCENSION SENSES | Da Nang 2027",
  description: "Request a place in the seven- or fourteen-day ASCENSION cohort in Da Nang, January 12–26, 2027.",
  robots: { index: false, follow: false, noarchive: true },
};

const values = [
  "Reconnect with your body.",
  "Experience Vietnamese approaches to touch and restoration.",
  "Move, create and discover within a curated cohort.",
  "Return home with practices and perspectives you can continue.",
];

const pathways = [
  ["embody", "EMBODY", "Vietnamese touch, breath, mobility and restorative movement."],
  ["see", "SEE", "Meet the sea, mountains, Hội An and the people of Da Nang."],
  ["sound", "SOUND", "Listen through waves, music, sound baths and stillness."],
  ["taste", "TASTE", "Discover local flavour through markets and shared tables."],
  ["breathe", "BREATHE", "Return to presence through salt air and conscious breath."],
  ["create", "CREATE", "Follow intuition through drawing, painting, writing and photography."],
];

const faq = [
  ["What is included?", "Your selected experience includes confirmed shared ASCENSION programming and participation in the cohort. Final inclusions are supplied before booking."],
  ["Is accommodation included?", "No. Accommodation and flights are selected and booked separately."],
  ["Do I need previous wellness or movement experience?", "No. Guidance is provided, and you choose what feels appropriate for you."],
  ["Can I attend for seven days?", "Yes. The seven-day experience runs January 12–19, 2027."],
  ["When will the edition be confirmed?", "Availability, final programming and confirmed practical details will be shared personally before you are asked to make a non-refundable payment."],
  ["What happens to my payment if the edition does not proceed?", "The current terms provide the applicable payment and cancellation conditions before checkout. Contact us with any question before reserving."],
];

function InterestAction({ label = "Request Your Place", event = "funnel_primary_cta" }) {
  return <a className={styles.reserve} href="#apply" data-analytics-event={event}>{label}<span aria-hidden="true">→</span></a>;
}

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#offer">Skip to participation options</a>
      <header className={styles.hero} id="funnel-hero">
        <div className={styles.media} aria-hidden="true"><Image src={HERO_POSTER} alt="" fill priority sizes="100vw" /></div>
        <div className={styles.scrim} />
        <nav className={styles.nav} aria-label="Funnel navigation"><Link className={styles.wordmark} href="/en">ASCENSION</Link><Link className={styles.returnLink} href="/en">Explore the full experience</Link></nav>
        <div className={styles.heroCopy}>
          <p className={styles.series}>ASCENSION · DA NANG · JANUARY 12–26, 2027</p>
          <h1><span>Come back to</span><span>your senses.</span></h1>
          <p className={styles.heroSubheading}>A different way to experience wellness—and Vietnam.</p>
          <p className={styles.heroLead}>Join an intimate international cohort for seven or fourteen days of Vietnamese wellness, embodied movement, recovery, sound, creativity, food and cultural discovery.</p>
          <p className={styles.brandBridge}>Heal your soul. Revive your senses.</p>
          <div className={styles.heroAction}><InterestAction /><a className={styles.secondaryAction} href="#pathways">See What’s Included</a></div>
          <p className={styles.microcopy}>7 or 14 days · Approximately 20–25 participants · Programme from US$1,200<br />Accommodation and flights are selected and booked separately.</p>
        </div>
      </header>

      <section className={styles.values} aria-label="What ASCENSION offers">{values.map((value, index) => <p key={value}><span>0{index + 1}</span>{value}</p>)}</section>

      <section className={styles.pathways} id="pathways" aria-labelledby="pathways-title">
        <div className={styles.sectionIntro}><p className={styles.sectionNumber}>Six pathways</p><h2 id="pathways-title">One place.<br />Six ways in.</h2></div>
        <div className={styles.pathwayGrid}>
          {pathways.map(([id, title, copy]) => {
            const media = sensoryMedia[id];
            return <article key={id}><div className={styles.pathwayImage}><Image src={media.poster || media.src} alt={media.alt} fill sizes="(max-width: 700px) 50vw, 33vw" /></div><h3>{title}</h3><p>{copy}</p><Link href={`/en#${id}`}>Learn more <span aria-hidden="true">→</span></Link></article>;
          })}
        </div>
      </section>

      <section className={styles.embodySpotlight} aria-labelledby="embody-title">
        <p className={styles.sectionNumber}>EMBODY spotlight</p>
        <div><h2 id="embody-title">The body, experienced as a whole.</h2><p>Touch, breath, mobility and restorative movement come together through Vietnamese Diện Chẩn, acupressure, assisted stretching and guided release practices.</p><p>The body is approached as an interconnected experience—not a collection of isolated parts.</p><Link href="/en#embody" data-analytics-event="embody_main_site_click">Explore the embodied approach <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className={styles.offer} id="offer" aria-labelledby="offer-title">
        <div className={styles.offerIntro}><p className={styles.sectionNumber}>Participation</p><h2 id="offer-title">Choose your time in Da Nang.</h2><p>Two clear ways to enter the founding edition.</p></div>
        <div className={styles.options}>
          <article><p>7-Day Experience</p><h3>January 12–19</h3><strong>US$1,200</strong><span>Programme access for one seven-day pathway. Accommodation and flights booked separately.</span><a href="#apply" data-analytics-event="seven_day_interest" data-plan="7-day">Request seven days →</a></article>
          <article><p>14-Day Experience</p><h3>January 12–26</h3><strong>US$2,000</strong><span>The complete ASCENSION fortnight. Accommodation and flights booked separately.</span><a href="#apply" data-analytics-event="fourteen_day_interest" data-plan="14-day">Request fourteen days →</a></article>
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title"><div><p className={styles.sectionNumber}>Essential FAQ</p><h2 id="questions-title">Before you decide.</h2></div><div className={styles.disclosures}>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className={styles.apply} id="apply" aria-labelledby="apply-title"><div className={styles.applyCopy}><p className={styles.sectionNumber}>Private enquiry</p><h2 id="apply-title">Begin the conversation.</h2><p>Tell us what you are looking for and whether seven or fourteen days feels right. We will respond personally with availability and next steps.</p><p className={styles.microcopy}>Accommodation and travel are separate. No charge today.</p><a className={styles.askQuestion} href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">Ask a Question →</a></div><InterestForm styles={styles} /></section>

      <footer className={styles.final}><Image className={styles.finalImage} src={DUSK_GROUP} alt="An ASCENSION group walking along the Da Nang coast at dusk" fill sizes="100vw" /><p>ASCENSION · A MODUS SERIES</p><h2>Heal your soul.<br />Revive your senses.</h2><InterestAction /><div className={styles.legal}><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><a href="mailto:daniel@stanfordemporium.com">Ask a question</a></div></footer>
      <StickyInterestAction styles={styles} />
    </main>
  );
}
