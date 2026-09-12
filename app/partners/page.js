import Image from "next/image";
import Link from "next/link";
import PartnerForm from "./partner-form";
import PartnerTracking, { StickyPartnerCta } from "./partner-tracking";
import styles from "./partners.module.css";
import { activationCategories, deliverables, investmentPathways, partnerEmail, partnerPathways } from "../../content/partners";

const ORIGIN = "https://www.ascensionsenses.com";
const HERO = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const MOVEMENT = "/assets/funnel/morning-movement.png";
const DANIEL = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1000/v1788490840/Daniel_A_S_portrait_Aug_22_D80_8451_crop_mqftfl.jpg";

export const metadata = {
  title: "ASCENSION Partnership Invitation | Da Nang 2027",
  description: "Help shape the founding ASCENSION edition in Da Nang, Vietnam, January 12–26, 2027.",
  alternates: { canonical: `${ORIGIN}/partners` },
  openGraph: { title: "ASCENSION Partnership Invitation", description: "Help shape the founding edition in Da Nang.", url: `${ORIGIN}/partners`, images: [{ url: HERO }] },
};

function ConversationLink({ children = "Request a Partnership Conversation", className = styles.radiant }) {
  return <a className={className} href="#conversation" data-analytics-event="partners_conversation_cta">{children}<span aria-hidden="true">→</span></a>;
}

export default function PartnersPage() {
  return <main className={styles.page}>
    <PartnerTracking />
    <header className={styles.hero}>
      <Image className={styles.heroImage} src={HERO} alt="A movement study on the Da Nang coast" fill priority sizes="100vw" />
      <div className={styles.heroScrim} />
      <nav className={styles.nav}><Link href="/en">ASCENSION</Link><span>Partnership invitation</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>Da Nang, Vietnam · January 12–26, 2027</p>
        <h1>ASCENSION<br />Partnership Invitation</h1>
        <p className={styles.heroStatement}>Help shape the founding edition.</p>
        <div className={styles.actions}><ConversationLink /><Link className={styles.textAction} href="/partners/deck" data-analytics-event="partners_deck_cta">View the Presentation <span aria-hidden="true">→</span></Link></div>
      </div>
    </header>

    <section className={styles.proposition}>
      <p className={styles.sectionMark}>The proposition</p>
      <div><h2>A living programme—not a placement.</h2><p>ASCENSION brings Vietnamese wellness knowledge into conversation with movement, breath, sound, creativity, food and cultural discovery. For fourteen days, practice, city, kitchen and studio become one continuous experience shared by an intimate international cohort.</p></div>
      <dl><div><dt>14</dt><dd>Days · January 12–26</dd></div><div><dt>20–25</dt><dd>Founding cohort</dd></div><div><dt>7 / 14</dt><dd>Day participation</dd></div></dl>
    </section>

    <section className={styles.pathwaySection}>
      <div className={styles.sectionHeading}><p className={styles.sectionMark}>The experience</p><h2>Six aligned pathways.</h2><p>Each pathway is a meaningful place for the right partner to participate—not a surface for generic visibility.</p></div>
      <div className={styles.pathwayList}>{partnerPathways.map(([name, copy], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.imageStatement}>
      <Image src={MOVEMENT} alt="A group practising morning movement above the Da Nang coast" fill sizes="100vw" />
      <div><p>Partnership principle</p><h2>The product enters only when the experience genuinely wants it.</h2></div>
    </section>

    <section className={styles.activationSection}>
      <div className={styles.sectionHeading}><p className={styles.sectionMark}>Proposed activations</p><h2>Integration, not interruption.</h2></div>
      <div className={styles.activationList}>{activationCategories.map(([name, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></article>)}</div>
      <p className={styles.disclaimer}>Categories are open. No partner is confirmed, and no example represents an existing agreement.</p>
    </section>

    <section className={styles.valueSection}>
      <div className={styles.valueIntro}><p className={styles.sectionMark}>Partner value</p><h2>From product to cultural story.</h2><p>Partners can leave with a documented cultural moment, edited to publication standard and useful long after the edition closes.</p></div>
      <ol className={styles.valueSequence}>{["Partner expertise", "Lived activation", "Professional documentation", "MODUS editorial", "Social and partner content", "Post-edition case study"].map((item) => <li key={item}>{item}</li>)}</ol>
      <div className={styles.deliverables}><h3>Potential deliverables—agreed per partner</h3>{deliverables.map((item) => <p key={item}>{item}</p>)}</div>
    </section>

    <section className={styles.audience}>
      <div><p className={styles.sectionMark}>Audience and projected reach</p><h2>An intimate cohort.<br />A wider cultural platform.</h2></div>
      <div className={styles.audienceFigures}><p><strong>20–25</strong><span>Founding cohort · direct experience</span></p><p><strong>200+</strong><span>Potential hotel touchpoints</span></p><p><strong>100+</strong><span>Potential public programming</span></p><p><strong>30K</strong><span>Daniel Stanford / Stanford Emporium creative network</span></p></div>
      <p className={styles.disclaimer}>All figures beyond the founding cohort are potential or projected reach. They are not guaranteed impressions or a booked audience. MODUS readership will be stated only when measured.</p>
    </section>

    <section className={styles.investment}>
      <div className={styles.sectionHeading}><p className={styles.sectionMark}>Partnership pathways</p><h2>Starting points for conversation.</h2><p>Scope, exclusivity, content rights and deliverables are tailored to category and objectives.</p></div>
      <div className={styles.investmentList}>{investmentPathways.map(([name, amount]) => <article key={name}><h3>{name}</h3><p>{amount}</p></article>)}</div>
      <p className={styles.disclaimer}>Indicative starting ranges in US dollars—not a fixed rate card.</p>
    </section>

    <section className={styles.timeline}>
      <div><p className={styles.sectionMark}>Production timeline</p><h2>From alignment to publication.</h2></div>
      <ol><li><strong>Now–October 1, 2026</strong><span>Fit, objectives and letter of intent</span></li><li><strong>October–December 2026</strong><span>Concept, scope, logistics and content rights</span></li><li><strong>January 12–26, 2027</strong><span>ASCENSION · Da Nang · Edition 01</span></li><li><strong>After the edition</strong><span>Agreed content delivery, editorial and reporting</span></li></ol>
    </section>

    <section className={styles.leadership}>
      <div className={styles.portrait}><Image src={DANIEL} alt="Portrait of ASCENSION creator Daniel A. Stanford" fill sizes="(max-width: 767px) 100vw, 38vw" /></div>
      <div><p className={styles.sectionMark}>Leadership</p><h2>Daniel A. Stanford</h2><p>Creator and curator of ASCENSION. Editor-in-Chief of MODUS. Daniel brings an editorial and fine-art practice to partnership design—shaping each relationship as part of the experience rather than as an interruption.</p><div className={styles.credibility}><p>Cornell Art Museum 2016 · shown alongside Warhol and Russell Young</p><p>Art Basel Miami · 2014–2018</p><p>MIS São Paulo · solo invitation, 49/50</p><p>MODUS · independent editorial platform</p></div><a className={styles.textAction} href="https://modus.gallery/methodology" target="_blank" rel="noopener noreferrer">Explore the MODUS methodology <span aria-hidden="true">→</span></a></div>
    </section>

    <section className={styles.conversation} id="conversation">
      <div><p className={styles.sectionMark}>The invitation</p><h2>Help shape the founding edition.</h2><p>Tell us what your organization wants to make possible. Partnership fit, scope and deliverables are considered personally.</p><p><a href={`mailto:${partnerEmail}`}>{partnerEmail}</a></p><div className={styles.documentActions}><Link href="/partners/deck">View the presentation</Link><Link href="/partners/download" data-analytics-event="partners_pdf_downloaded">Download the PDF</Link></div></div>
      <PartnerForm styles={styles} />
    </section>

    <footer className={styles.footer}><p>ASCENSION · A MODUS SERIES</p><p>Da Nang · Edition 01 · January 12–26, 2027</p></footer>
    <StickyPartnerCta styles={styles} />
  </main>;
}
