import Image from "next/image";
import Link from "next/link";
import { JsonLd, breadcrumbStructuredData, createPageMetadata } from "../seo";
import styles from "./teams.module.css";

const title = "Private and Team Experiences in Da Nang | ASCENSION";
const description = "Private ASCENSION experiences for intimate teams, leadership groups, founders, creative groups and private gatherings in Da Nang.";

export const metadata = createPageMetadata({ title, description, path: "/teams" });

const formats = [
  { number: "01", name: "Reset", duration: "1 day", copy: "A focused interruption to the everyday. Restore, move, reconnect and return." },
  { number: "02", name: "Retreat", duration: "3–4 days", copy: "A concentrated ASCENSION journey through body, sea, place and time together." },
  { number: "03", name: "Immerse", duration: "7 days", copy: "A deeper experience combining restoration, movement, treatments, culture, discovery and space to reset." },
  { number: "04", name: "Bespoke", duration: "7+ days", copy: "Private journeys, leadership residencies and extended experiences shaped around the needs and rhythm of the group." },
];

const environments = [
  { name: "Body", copy: "Thermal experiences, movement, bodywork, treatments, breath and deep rest." },
  { name: "Sea", copy: "Swimming, beach movement and optional guided surf, paddle and water experiences shaped around conditions and ability." },
  { name: "Place", copy: "Da Nang and Hoi An through food, culture, creativity, nature and discovery." },
  { name: "Together", copy: "Time to connect, create, reflect and work differently—without forcing everyone into the same experience at the same time." },
];

const stays = [
  ["Design", "Boutique stays close to the life of Da Nang."],
  ["Resort", "Five-star beachfront comfort and full resort amenities."],
  ["Wellness", "Wellness-led properties for a deeper restorative stay."],
  ["Villa", "Private and elevated accommodation for leadership groups, couples and VIP experiences."],
];

const proposalHref = "mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Private%20Proposal&body=Organisation%20or%20group%3A%0AContact%20name%3A%0AApproximate%20number%20of%20guests%3A%0APreferred%20duration%3A%0AApproximate%20timing%3A%0AExperience%20focus%3A%0AAccommodation%20preference%3A";

export default function TeamsPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData([{ name: "ASCENSION", path: "/en" }, { name: "Private + Teams", path: "/teams" }])} />
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={styles.siteHeader}>
        <Link className={styles.wordmark} href="/en">ASCENSION</Link>
        <nav aria-label="Private and teams navigation">
          <Link href="/en">Experience</Link>
          <a href="#formats">Formats</a>
          <a href="#stay">Stay</a>
          <a href={proposalHref}>Enquire</a>
        </nav>
      </header>

      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="teams-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Private + Teams</p>
            <h1 id="teams-title">Bring your people.<br />We’ll shape the experience.</h1>
            <div className={styles.introduction}>
              <p>Private ASCENSION experiences in Da Nang bring together restoration, movement, the sea, culture and meaningful time together.</p>
              <p>Designed for intimate teams, leadership groups, founders, creative groups and private gatherings.</p>
              <p>The rhythm is shaped around the people taking part—with space to participate, recover, explore or simply step away when needed.</p>
            </div>
          </div>
          <figure className={styles.heroMedia}>
            <Image
              src="/assets/images/private-teams-beach.png"
              alt="Three people sharing a quiet movement practice beside the sea"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 52vw"
            />
          </figure>
        </section>

        <section className={styles.formats} id="formats" aria-labelledby="formats-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Choose your format</p>
            <h2 id="formats-title">Time shaped around the group.</h2>
          </div>
          <ol className={styles.formatList}>
            {formats.map((format) => (
              <li key={format.number}>
                <span>{format.number}</span>
                <h3>{format.name}</h3>
                <strong>{format.duration}</strong>
                <p>{format.copy}</p>
              </li>
            ))}
          </ol>
          <p className={styles.sectionNote}>Most initial private editions are designed around groups of up to 10. Larger groups can be developed by arrangement.</p>
        </section>

        <section className={styles.architecture} aria-labelledby="architecture-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>The experience architecture</p>
            <h2 id="architecture-title">Body. Sea. Place. Together.</h2>
          </div>
          <div className={styles.architectureList}>
            {environments.map((environment) => <article key={environment.name}><h3>{environment.name}</h3><p>{environment.copy}</p></article>)}
          </div>
        </section>

        <section className={styles.rhythm} aria-labelledby="rhythm-title">
          <p className={styles.eyebrow}>The rhythm</p>
          <h2 id="rhythm-title">A rhythm, not an itinerary.</h2>
          <div>
            <p>ASCENSION is intentionally flexible.</p>
            <p>A day might move between morning movement, restorative treatments, thermal experiences, time in the sea, shared food, cultural discovery and periods of complete freedom.</p>
            <p>Nothing needs to fill every hour. Most days are designed around no more than approximately eight hours of programming, with additional experiences remaining optional.</p>
            <p>Guests are invited to choose according to their energy, interests and what they need that day.</p>
          </div>
        </section>

        <section className={styles.stay} id="stay" aria-labelledby="stay-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Stay</p>
            <h2 id="stay-title">Choose how you stay.</h2>
          </div>
          <div className={styles.stayList}>
            {stays.map(([name, copy]) => <article key={name}><h3>{name}</h3><p>{copy}</p></article>)}
          </div>
          <p className={styles.sectionNote}>Accommodation can be matched to the group and budget while the core ASCENSION experience remains independent.</p>
        </section>

        <section className={styles.organisations} aria-labelledby="organisations-title">
          <p className={styles.eyebrow}>For organisations</p>
          <h2 id="organisations-title">Step away from business without losing the purpose.</h2>
          <div>
            <p>ASCENSION can combine wellbeing and restoration with protected time for leadership conversations, strategy, creativity or simply reconnecting as people.</p>
            <p>Your organisation can bring its own objectives and working sessions. ASCENSION shapes the environment and experience around them.</p>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="proposal-title">
          <p className={styles.eyebrow}>Private proposals</p>
          <h2 id="proposal-title">Tell us about your group.</h2>
          <div>
            <p>Tell us who is coming, how much time you have and what you want the experience to make space for.</p>
            <p>We’ll begin there.</p>
            <a className="radiant-action" href={proposalHref}>Request a private proposal <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>
    </>
  );
}
