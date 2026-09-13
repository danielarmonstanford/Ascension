import Image from "next/image";
import Link from "next/link";
import PartnerForm from "./partner-form";
import PartnerTracking, { StickyPartnerCta } from "./partner-tracking";
import styles from "./partners.module.css";
import { activationCategories, deliverables, investmentPathways, partnerEmail, partnerPathways } from "../../content/partners";

const ORIGIN = "https://www.ascensionsenses.com";
const COVER = "/assets/partners/partnership-deck-cover.webp";
const MOVEMENT = "/assets/funnel/morning-movement.png";
const DANIEL = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1000/v1788490840/Daniel_A_S_portrait_Aug_22_D80_8451_crop_mqftfl.jpg";
const CONTACT = "mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%202027%20%E2%80%94%20Partnership%20Conversation";

export const metadata = {
  title: "ASCENSION Partnership Opportunities · Da Nang, Montréal and Future Cities",
  description: "Partner with ASCENSION for its founding Da Nang edition—an intimate wellness and cultural programme connecting body, place, creativity and Southeast Asia.",
  alternates: { canonical: `${ORIGIN}/partners` },
  robots: { index: true, follow: true },
  openGraph: { title: "ASCENSION Partnership Opportunities · Da Nang, Montréal and Future Cities", description: "Partner with ASCENSION for its founding Da Nang edition—an intimate wellness and cultural programme connecting body, place, creativity and Southeast Asia.", url: `${ORIGIN}/partners`, images: [{ url: COVER }] },
};

export default function PartnersPage() {
  return <main className={styles.page}>
    <PartnerTracking />
    <header className={styles.hero}>
      <nav className={styles.nav}><Link href="/en">ASCENSION</Link><span>Partnership invitation</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>ASCENSION · Partnership invitation</p>
        <h1>Enter the<br />experience.</h1>
        <p className={styles.heroStatement}>Help shape the founding edition.</p>
        <p className={styles.heroIntro}>ASCENSION brings Vietnamese wellness knowledge into conversation with movement, breath, sound, creativity, food and cultural discovery. We are inviting selected partners to help shape the founding Da Nang edition.</p>
        <p className={styles.eventLine}>Da Nang, Vietnam · January 12–26, 2027</p>
        <div className={styles.actions}><Link className={styles.radiant} href="/partners/deck" data-analytics-event="partner_deck_view">View Partnership Deck <span aria-hidden="true">→</span></Link><Link className={styles.textAction} href="/partners/download" data-analytics-event="partner_deck_download">Download Partnership Deck <span aria-hidden="true">↓</span></Link><a className={styles.textAction} href={CONTACT} data-analytics-event="partner_contact_click">Request a Partnership Conversation <span aria-hidden="true">→</span></a></div>
      </div>
      <Link className={styles.coverPreview} href="/partners/deck" aria-label="View the ASCENSION Da Nang 2027 partnership deck" data-analytics-event="partner_deck_view">
        <Image src={COVER} alt="Cover of the ASCENSION Da Nang 2027 partnership deck" width={1500} height={844} priority sizes="(max-width: 900px) 92vw, 47vw" />
        <span>Open the 14-page presentation <b aria-hidden="true">↗</b></span>
      </Link>
    </header>

    <section className={styles.proposition}>
      <p className={styles.sectionMark}>The proposition</p>
      <div><h2>A living programme—not a placement.</h2><p>ASCENSION brings Vietnamese wellness knowledge into conversation with movement, breath, sound, creativity, food and cultural discovery. For fourteen days, practice, city, kitchen and studio become one continuous experience shared by an intimate international cohort.</p></div>
      <dl><div><dt>14</dt><dd>Days · January 12–26</dd></div><div><dt>20–25</dt><dd>Founding cohort</dd></div><div><dt>7 / 14</dt><dd>Day participation</dd></div></dl>
    </section>

    <section className={styles.travelSeries}>
      <div><p className={styles.sectionMark}>The series</p><h2>A modular series designed to travel</h2></div>
      <div className={styles.seriesCopy}><p>ASCENSION is a year-round experiential platform designed to move between culturally relevant, high-demand destinations.</p><p>Da Nang launches the founding edition in January 2027. Montréal is planned for August 2027, with Rio de Janeiro under consideration for a future edition.</p><p>Partners may begin with one city and develop a longer-term relationship—adapting activations, content and audience engagement to each destination while maintaining one consistent partnership story.</p></div>
      <p className={styles.destinationSequence}>DA NANG · JAN 2027 <span>→</span> MONTRÉAL · AUG 2027 <span>→</span> RIO DE JANEIRO · UNDER CONSIDERATION</p>
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
      <div className={styles.sectionHeading}><p className={styles.sectionMark}>Partnership categories</p><h2>Brands become part of the experience.</h2></div>
      <div className={styles.activationList}>{activationCategories.map(([name, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></article>)}</div>
      <p className={styles.disclaimer}>Categories are open. No partner is confirmed, and no example represents an existing agreement.</p>
    </section>

    <section className={styles.valueSection}>
      <div className={styles.valueIntro}><p className={styles.sectionMark}>Partner value</p><h2>From product to cultural story.</h2><p>Partners can leave with a documented cultural moment, edited to publication standard and useful long after the edition closes.</p><p>ASCENSION creates the lived experience. <a href="https://modus.gallery" target="_blank" rel="noopener noreferrer">MODUS.GALLERY</a> extends selected stories through independent cultural and editorial publishing.</p><p className={styles.editorialNote}>MODUS editorial coverage is independently curated and is not guaranteed advertising placement.</p></div>
      <ol className={styles.valueSequence}>{["Partner expertise", "Lived activation", "Professional documentation", "MODUS editorial", "Social and partner content", "Post-edition case study"].map((item) => <li key={item}>{item}</li>)}</ol>
      <div className={styles.deliverables}><h3>Potential deliverables—agreed per partner</h3>{deliverables.map((item) => <p key={item}>{item}</p>)}</div>
      <p className={styles.scopeNote}>Potential deliverables may include category exclusivity, named experience integration, direct cohort engagement, selected public touchpoints, professional photography and short-form video, agreed content usage rights, MODUS editorial consideration, hospitality access and post-edition reporting.<br /><br />Every partnership scope is co-designed and confirmed in writing before the edition opens.</p>
    </section>

    <section className={styles.audience}>
      <div><p className={styles.sectionMark}>Audience and projected reach</p><h2>An intimate cohort.<br />A wider cultural platform.</h2></div>
      <div className={styles.audienceFigures}><p><strong>20–25</strong><span>Founding cohort · direct experience</span></p><p><strong>200+</strong><span>Potential hotel touchpoints</span></p><p><strong>100+</strong><span>Potential public programming</span></p><p><strong>30K</strong><span>Daniel Stanford / Stanford Emporium creative network</span></p></div>
      <p className={styles.disclaimer}>All figures beyond the founding cohort are potential or projected reach. They are not guaranteed impressions or a booked audience. MODUS readership will be stated only when measured.</p>
    </section>

    <section className={styles.investment}>
      <div className={styles.sectionHeading}><p className={styles.sectionMark}>Partnership pathways</p><h2>Starting points for conversation.</h2><p>Scope, exclusivity, content rights and deliverables are tailored to category and objectives.</p></div>
      <div className={styles.investmentList}>{investmentPathways.map(([name, amount]) => <article key={name}><h3>{name}</h3><p>{amount}</p><a href={`${CONTACT}&body=${encodeURIComponent(`I would like to discuss the ${name} pathway.`)}`} data-analytics-event="partnership_tier_interest" data-plan={name}>Discuss this pathway <span aria-hidden="true">→</span></a></article>)}</div>
      <p className={styles.disclaimer}>Ranges are starting points for conversation, not a fixed rate card. Scope, exclusivity, content rights and deliverables are tailored to each partner’s category, objectives and selected edition.</p>
      <p className={styles.disclaimer}>The upper range applies to bespoke presenting partnerships involving expanded content rights, category exclusivity, hospitality or travel integration, or participation across multiple editions.</p>
    </section>

    <section className={styles.timeline}>
      <div><p className={styles.sectionMark}>Production timeline</p><h2>From alignment to publication.</h2></div>
      <ol><li><strong>Now–October 1, 2026</strong><span>Fit, objectives and letter of intent</span></li><li><strong>October–December 2026</strong><span>Concept, scope, logistics and content rights</span></li><li><strong>January 12–26, 2027</strong><span>ASCENSION · Da Nang · Edition 01</span></li><li><strong>After the edition</strong><span>Agreed content delivery, editorial and reporting</span></li></ol>
    </section>

    <section className={styles.leadership}>
      <div className={styles.portrait}><Image src={DANIEL} alt="Portrait of ASCENSION creator Daniel A. Stanford" fill sizes="(max-width: 767px) 100vw, 38vw" /></div>
      <div><p className={styles.sectionMark}>Leadership</p><h2>Daniel A. Stanford</h2><p>Creator and curator of ASCENSION. Editor-in-Chief of MODUS. Daniel brings an editorial and fine-art practice to partnership design—shaping each relationship as part of the experience rather than as an interruption.</p><div className={styles.credibility}><p>Cornell Art Museum 2016 · shown alongside Warhol and Russell Young</p><p>Art Basel Miami · 2014–2018</p><p>MIS São Paulo · solo invitation, 49/50</p><p>MODUS · independent editorial platform</p></div><a className={styles.textAction} href="https://modus.gallery/methodology" target="_blank" rel="noopener noreferrer">Explore the MODUS methodology <span aria-hidden="true">→</span></a></div>
    </section>

    <section className={styles.modusStatement}>
      <p>ASCENSION is an experiential series created by Stanford Emporium Inc. and extended through <a href="https://modus.gallery" target="_blank" rel="noopener noreferrer">MODUS.GALLERY</a>, its independent cultural and editorial platform.</p>
      <div><Link href="/partners/deck" data-analytics-event="partner_deck_view">View Partnership Deck</Link><Link href="/partners/download" data-analytics-event="partner_deck_download">Download Partnership Deck</Link><a href={CONTACT} data-analytics-event="partner_contact_click">Request a Partnership Conversation</a></div>
    </section>

    <section className={styles.conversation} id="conversation">
      <div><p className={styles.sectionMark}>The invitation</p><h2>Help shape the founding edition.</h2><p>Tell us what your organization wants to make possible. Partnership fit, scope and deliverables are considered personally.</p><p>Daniel A. Stanford<br /><a href={CONTACT} data-analytics-event="partner_contact_click">{partnerEmail}</a></p><p><a href="https://www.ascensionsenses.com/partners">ASCENSIONSENSES.COM/PARTNERS</a><br /><a href="https://modus.gallery" target="_blank" rel="noopener noreferrer">MODUS.GALLERY</a></p><div className={styles.documentActions}><Link href="/partners/deck" data-analytics-event="partner_deck_view">View Partnership Deck</Link><Link href="/partners/download" data-analytics-event="partner_deck_download">Download Partnership Deck</Link></div></div>
      <PartnerForm styles={styles} />
    </section>

    <footer className={styles.footer}><p>ASCENSION · A MODUS SERIES</p><p>Da Nang · Edition 01 · January 12–26, 2027</p></footer>
    <StickyPartnerCta styles={styles} />
  </main>;
}
