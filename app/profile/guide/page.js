import Link from "next/link";
import { pathwayCopy, pathwayOrder } from "../../../content/profile";
import styles from "./guide.module.css";

export const metadata = {
  title: "ASCENSION Body & Senses Guide",
  description: "A concise guide to the six ASCENSION pathways.",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function BodySensesGuide({ searchParams }) {
  const params = await searchParams;
  const requested = String(params?.pathway || "").toUpperCase();
  const primary = pathwayOrder.includes(requested) ? requested : pathwayOrder[0];

  return <main className={styles.page}>
    <header><Link href="/en">ASCENSION</Link><span>Body &amp; Senses Guide</span></header>
    <section className={styles.hero}><p>Your guide</p><h1>Your Body &amp;<br />Senses Guide.</h1><div><span>Your primary pathway</span><strong>{primary}</strong><p>{pathwayCopy[primary]}</p><a className={styles.guideDownload} href="/profile/guide/download" target="_blank" rel="noopener noreferrer">Open the complete guide <span aria-hidden="true">↗</span></a><small>16-page PDF · opens in a new tab</small></div></section>
    <section className={styles.intro}><h2>Six ways into the present.</h2><p>ASCENSION brings restorative practice, movement, breath, sound, creativity and food into one connected experience. Your pathway is a place to begin—not a diagnosis or a fixed track.</p></section>
    <section className={styles.pathways}>{pathwayOrder.map((pathway, index) => <article key={pathway} className={pathway === primary ? styles.primaryPathway : ""}><span>{String(index + 1).padStart(2, "0")}</span><h2>{pathway}</h2><p>{pathwayCopy[pathway]}</p></article>)}</section>
    <section className={styles.next}><p>Da Nang · January 12–26, 2027</p><h2>Carry the guide into the experience.</h2><Link href="/join#apply">Request Your Cohort Invitation <span aria-hidden="true">→</span></Link></section>
    <footer><p>This guide supports experience personalisation only. ASCENSION does not provide medical diagnosis, advice or treatment.</p><Link href="/profile?reset=1">Start a new profile</Link></footer>
  </main>;
}
