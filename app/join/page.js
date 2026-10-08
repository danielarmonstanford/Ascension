import Image from "next/image";
import Link from "next/link";
import styles from "./join.module.css";
import InterestForm from "./interest-form";
import StickyInterestAction from "./sticky-interest-action";
import { sensoryMedia } from "../sensory-media";

const HERO_POSTER = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const DUSK_GROUP = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_2000/v1788887672/da-nang-dusk_il93gv.png";
const HIDEOUT_IMAGE = "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto,w_1600/v1788050463/Hideout_Bath_scene_qwpu7q.jpg";

export const metadata = {
  title: "ASCENSION Da Nang 2027 | Choose Your Pathway",
  description: "Choose a seven-day, fourteen-day or Design Stay pathway for ASCENSION in Da Nang, January 12–26, 2027.",
  alternates: { canonical: "https://www.ascensionsenses.com/join" },
  openGraph: {
    title: "Choose Your ASCENSION Pathway | Da Nang 2027",
    description: "Restoration, movement, breath, sound, bodywork, sea, food and culture—at your own pace.",
    url: "https://www.ascensionsenses.com/join",
    siteName: "ASCENSION SENSES",
    images: [{ url: "/join/opengraph-image", width: 1200, height: 630, alt: "ASCENSION pathway discovery above the Da Nang coastline" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Choose Your ASCENSION Pathway | Da Nang 2027", description: "Restoration, movement, breath, sound, bodywork, sea, food and culture—at your own pace.", images: ["/join/opengraph-image"] },
};

const experiences = [
  ["RESTORE", "restore", ["Private thermal experiences", "Mineral pool", "Sauna", "Hot + cold bathing", "Rest", "Bodywork"]],
  ["EMBODY", "embody", ["Yoga", "Mobility", "Movement", "Sea", "Somatic awareness"]],
  ["BREATHE", "breathe", ["Breathwork", "Meditation", "Deep rest"]],
  ["RESONATE", "sound", ["Sound bath", "Music", "Vibration", "Stillness"]],
  ["TREAT", "see", ["Diện Chẩn", "Acupressure", "Massage / bodywork", "Selected individual treatments"]],
  ["TASTE", "taste", ["Vietnamese food", "Shared tables", "Local discovery"]],
  ["DISCOVER", "see", ["Da Nang", "Hội An", "Beach", "Sea", "Culture"]],
];

const sampleDay = [
  ["07:00", "Awaken", "Beach yoga · mobility · breath · optional sea"],
  ["08:30", "Nourish", "Breakfast · coffee · slow morning"],
  ["10:00", "Restore", "Private thermal experience · rain · heat · cold · warm bathing · mineral pool · rest"],
  ["11:30", "Treat", "Rotating individual sessions · Diện Chẩn · acupressure · massage / bodywork · mobility"],
  ["13:00", "Pause", "Lunch · beach · sleep · explore · free time"],
  ["15:30", "Breathe / Resonate", "Breathwork · sound · meditation · deep rest"],
  ["17:00", "Your time", "Swim. Read. Sleep. Walk. Spa. Explore. Do nothing."],
  ["19:00", "Taste / Connect", "Selected food · culture · conversation · Da Nang / Hội An"],
];

const sevenDays = [
  ["01", "Arrive", "Land. Exhale. Begin.", "Arrival · settle in · orientation · gentle movement · opening gathering · welcome experience"],
  ["02", "Restore", "Heat. Cool. Release.", "Private thermal experience · sauna · hot + cold bathing · mineral pool · individual treatment rotations · bodywork · breath · deep rest"],
  ["03", "Embody", "Move. Breathe. Feel.", "Beach movement · yoga · mobility · breathwork · optional sea · treatment opportunities · free time"],
  ["04", "Discover", "Step outside the retreat.", "Da Nang · Hội An · local food · culture · nature · exploration"],
  ["05", "Deepen", "Return to the body.", "Restore experience · thermal recovery · bodywork · treatment · mobility · sound · rest"],
  ["06", "Resonate", "Listen. Create. Connect.", "Movement · sea · breath · sound · creative / group experience · sunset · shared evening"],
  ["07", "Integrate", "Take something with you.", "Gentle movement · breath · reflection · optional treatment · closing experience · departure / onward stay"],
];

const packages = [
  { kicker: "7-Day Design Stay", price: "$2,100", copy: "Seven nights in a selected Design Stay, paired with the complete 7-Day ASCENSION Pathway.", items: ["Daily breakfast where included by hotel", "Two planned Restore / thermal experiences", "Programmed thermal access: mineral pool, sauna, hot + cold bathing", "Morning movement, breathwork and sound / resonance experiences", "Diện Chẩn / acupressure experience and selected bodywork allocation", "Sea, Taste and cultural experiences where conditions allow", "Opening, closing and ASCENSION hosting + curation"], event: "join_design_7day" },
  { kicker: "14-Day Design Stay", price: "$3,500", copy: "Fourteen nights in a selected Design Stay, with room for repeat pathways and more unstructured time.", items: ["Breakfast where included by hotel", "14-Day ASCENSION Immersion", "Expanded Restore, movement, breath and sound programming", "Selected treatment allocation", "Sea, cultural and Taste experiences", "Greater choice of repeat pathways", "ASCENSION hosting + curation"], event: "join_design_14day" },
];

const stays = [
  ["DESIGN", "CHICLAND", "Design-led beachfront stay. Current reference stay for complete Design packages."],
  ["WELLNESS", "Fusion Resort & Villas Da Nang", "Wellness-oriented resort / villa upgrade. Pricing by request until a preferred rate is finalised."],
  ["FIVE-STAR", "Sheraton Grand Danang", "Five-star resort option. Pricing by request / selected room."],
  ["VILLA", "Naman Retreat", "Private wellness-villa option. Current reference for ASCENSION VIP."],
];

const priceChoices = [
  ["DAY", "$295+", "Enter"],
  ["7-DAY PATHWAY", "$1,200", "Founding"],
  ["7-DAY + STAY", "$2,100", "Most accessible complete experience"],
  ["14-DAY + STAY", "$3,500", "Go deeper"],
  ["7-DAY VIP", "$4,500+", "Private villa"],
  ["14-DAY VIP", "$7,500+", "Full immersion"],
];

const faq = [
  ["Do I have to participate in everything?", "No. ASCENSION is designed around choice."],
  ["Is this a medical retreat?", "No. ASCENSION is a wellness, movement, restoration and cultural experience and does not replace medical care."],
  ["Can I come alone?", "Yes."],
  ["Can couples come?", "Yes."],
  ["Can I stay somewhere else?", "Yes. Choose a Pathway-only option."],
  ["Are flights included?", "No."],
  ["Are all meals included?", "Only meals specifically identified in your selected package."],
  ["Are private treatments included?", "Selected treatments or allocations are included according to package. Additional sessions may be available separately."],
  ["Do I need to be fit?", "ASCENSION is designed around varied levels of participation. Specific activities may have their own suitability requirements."],
  ["Can I extend my stay?", "Yes, subject to hotel availability."],
  ["What happens if weather affects sea activities?", "Programming adapts."],
  ["What is the cancellation policy?", "ASCENSION Da Nang is scheduled for January 12–26, 2027, with final confirmation by November 1, 2026. If the event is not confirmed, cancelled or rescheduled by ASCENSION, guests may choose a full refund of programme payments or an optional full-value credit toward a future edition. See Terms for the complete policy before payment."],
];

function EnquireLink({ label, event }) {
  return <a className={styles.reserve} href="#apply" data-analytics-event={event}>{label}<span aria-hidden="true">→</span></a>;
}

function ExperienceImage({ mediaKey, title }) {
  const media = sensoryMedia[mediaKey];
  const source = title === "RESTORE" ? HIDEOUT_IMAGE : media?.poster || media?.src || HERO_POSTER;
  return <div className={styles.experienceImage}><Image src={source} alt={media?.alt || `${title} at ASCENSION`} fill sizes="(max-width: 700px) 88vw, (max-width: 1100px) 45vw, 30vw" /></div>;
}

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#pathways">Skip to pathways</a>
      <header className={styles.hero} id="funnel-hero">
        <div className={styles.media} aria-hidden="true"><Image src={HERO_POSTER} alt="" fill priority sizes="100vw" /></div>
        <div className={styles.scrim} />
        <nav className={styles.nav} aria-label="Funnel navigation"><Link className={styles.wordmark} href="/en">ASCENSION</Link><Link className={styles.returnLink} href="/en">Explore the full experience</Link></nav>
        <div className={styles.heroCopy}>
          <p className={styles.series}>ASCENSION · DA NANG<br />JANUARY 12–26, 2027</p>
          <h1>Choose your<br />pathway.</h1>
          <div className={styles.heroLead}><p>Come for a day.</p><p>Stay for seven.</p><p>Give yourself fourteen.</p><p>ASCENSION combines restoration, movement, breath, sound, bodywork, sea, food, culture and enough unstructured time to actually experience it.</p></div>
          <div className={styles.heroAction}><a className={styles.reserve} href="#pathways" data-analytics-event="join_hero">See the pathways <span aria-hidden="true">↓</span></a><a className={styles.secondaryAction} href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question" data-analytics-event="join_question">Ask a question</a></div>
          <p className={styles.founding}>Founding rates available through November 15</p>
        </div>
      </header>

      <section className={styles.promise} aria-labelledby="promise-title">
        <div><p className={styles.sectionNumber}>The promise</p><h2 id="promise-title">Not more to do.<br />More to feel.</h2></div>
        <div className={styles.promiseCopy}><p>ASCENSION isn&apos;t seven days of compulsory wellness activities.</p><p>Some mornings begin on the beach. Some days move through heat, cold, water and treatment. Others take you into Da Nang, Hội An, the sea, food, culture or simply nowhere at all.</p><p>You choose how deeply you participate.</p><p>The programme creates the possibilities.<br />Your body sets the pace.</p></div>
      </section>

      <section className={styles.experiences} id="pathways" aria-labelledby="experiences-title">
        <div className={styles.sectionIntro}><p className={styles.sectionNumber}>What you&apos;ll experience</p><h2 id="experiences-title">One place.<br />Many ways in.</h2></div>
        <div className={styles.experienceGrid}>{experiences.map(([title, mediaKey, items]) => <article key={title}><ExperienceImage mediaKey={mediaKey} title={title} /><div><h3>{title}</h3><p>{items.join(" · ")}</p></div></article>)}</div>
      </section>

      <section className={styles.sampleDay} aria-labelledby="sample-day-title">
        <div className={styles.sampleIntro}><p className={styles.sectionNumber}>A sample day</p><h2 id="sample-day-title">Your day has a rhythm.<br />Not a rulebook.</h2></div>
        <ol>{sampleDay.map(([time, title, details]) => <li key={time}><time>{time}</time><div><strong>{title}</strong><p>{details}</p></div></li>)}</ol>
        <p className={styles.sampleNote}>Sample only. No guest is required to participate in every experience. The exact programme adapts to the group, weather, practitioner availability and individual needs or preferences.</p>
      </section>

      <section className={styles.sevenDay} aria-labelledby="seven-day-title">
        <div className={styles.sevenIntro}><p className={styles.sectionNumber}>The 7-Day Pathway</p><h2 id="seven-day-title">Seven days to<br />come back to<br />your senses.</h2><EnquireLink label="Choose 7 days" event="join_7day" /></div>
        <ol>{sevenDays.map(([day, title, line, details]) => <li key={day}><span>DAY {day}</span><h3>{title}</h3><strong>{line}</strong><p>{details}</p></li>)}</ol>
      </section>

      <section className={styles.fourteenDay} aria-labelledby="fourteen-day-title">
        <div><p className={styles.sectionNumber}>The 14-Day Immersion</p><h2 id="fourteen-day-title">Stay long enough<br />to go deeper.</h2></div>
        <div className={styles.fourteenCopy}><p>The first week opens the Pathways. The second gives you time to follow the ones that matter most.</p><p>More Restore. More treatment. More movement. More sea. More culture. More space.</p><strong>More time to do nothing.</strong><div className={styles.weekMarkers}><p><span>Week one</span>Open</p><p><span>Week two</span>Deepen</p></div><p className={styles.possibilities}>Second-week possibilities may include additional thermal / Restore sessions, selected additional treatments, deeper mobility and movement, sound and breath, sea experiences, Taste, Da Nang / Hội An, creative sessions, free days and repeat experiences selected by the guest.</p><EnquireLink label="Choose 14 days" event="join_14day" /></div>
      </section>

      <section className={styles.designStays} aria-labelledby="design-stays-title">
        <div className={styles.designHeader}><p className={styles.sectionNumber}>Design stays</p><h2 id="design-stays-title">Stay inside<br />the experience.</h2><p>Proposed package pricing. Accommodation, room category and included hotel benefits are confirmed in writing before booking.</p></div>
        <div className={styles.packageGrid}>{packages.map((pkg) => <article key={pkg.kicker}><p>{pkg.kicker}</p><h3>{pkg.price} <span>USD</span></h3><p>{pkg.copy}</p><ul>{pkg.items.map((item) => <li key={item}>{item}</li>)}</ul><EnquireLink label={`Request ${pkg.kicker} availability`} event={pkg.event} /></article>)}</div>
      </section>

      <section className={styles.vip} aria-labelledby="vip-title">
        <div className={styles.vipMedia}><Image src={HIDEOUT_IMAGE} alt="A quiet wellness bathing setting in Da Nang" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className={styles.vipCopy}><p className={styles.sectionNumber}>ASCENSION VIP</p><h2 id="vip-title">Your own space<br />inside the experience.</h2><p>Use Naman Retreat as the current working VIP reference. All room and villa categories and hotel benefits remain subject to availability and written confirmation.</p><div className={styles.vipOffers}><article><p>7-Day VIP Wellness Villa</p><strong>From $4,500 USD</strong><span>Everything in the ASCENSION Pathway, plus seven nights in a private wellness-villa accommodation, daily breakfast, applicable hotel spa / wellness benefits, selected transfers, ASCENSION concierge and priority experience coordination.</span><EnquireLink label="Request 7-day VIP" event="join_vip_7day" /></article><article><p>14-Day VIP Immersion</p><strong>From $7,500 USD</strong><span>Extended ASCENSION Pathway, fourteen nights in a private wellness-villa accommodation, applicable hotel wellness benefits, selected transfers, ASCENSION concierge and priority experience coordination.</span><EnquireLink label="Request 14-day VIP" event="join_vip_14day" /></article></div>
        </div>
      </section>

      <section className={styles.pathwayOnly} aria-labelledby="pathway-only-title">
        <div><p className={styles.sectionNumber}>Pathway only</p><h2 id="pathway-only-title">Already staying<br />in Da Nang?</h2><p>Choose your own accommodation and join ASCENSION through the experience that fits.</p></div>
        <div className={styles.pathwayPrices}><p><span>ASCENSION Day</span><strong>From $295 USD</strong></p><p><span>Restore Pathway</span><strong>From $650 USD</strong></p><p><span>7-Day Founding Pathway</span><strong>$1,200 USD</strong><small>Regular $1,500 · Accommodation separate</small></p><p><span>14-Day Founding Pathway</span><strong>$2,000 USD</strong><small>Regular $2,500 · Accommodation separate</small></p><EnquireLink label="Join without a stay" event="join_pathway_only" /></div>
      </section>

      <section className={styles.selectedStays} aria-labelledby="stays-title"><div><p className={styles.sectionNumber}>Selected stays</p><h2 id="stays-title">From design hotel<br />to private villa.</h2></div><div>{stays.map(([type, name, copy]) => <article key={name}><p>{type}</p><h3>{name}</h3><span>{copy}</span></article>)}</div></section>

      <section className={styles.priceChoice} aria-labelledby="price-choice-title"><div><p className={styles.sectionNumber}>Choose your way in</p><h2 id="price-choice-title">One clear choice<br />at a time.</h2><p>Founding rate ends November 15.</p></div><div>{priceChoices.map(([name, price, label]) => <article key={name}><p>{name}</p><strong>{price}</strong><span>{label}</span></article>)}</div></section>

      <section className={styles.questions} aria-labelledby="questions-title"><div><p className={styles.sectionNumber}>Essential FAQ</p><h2 id="questions-title">Before you decide.</h2></div><div className={styles.disclosures}>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}{question === "What is the cancellation policy?" && <> <Link href="/terms">Read the Terms.</Link></>}</p></details>)}</div></section>

      <section className={styles.apply} id="apply" aria-labelledby="apply-title"><div className={styles.applyCopy}><p className={styles.sectionNumber}>Start here</p><h2 id="apply-title">You came this far<br />for a reason.</h2><p>Seven days. Fourteen days. Or simply one day to begin. Choose the way in.</p><p className={styles.applyDate}>Da Nang<br />January 12–26, 2027</p><a className={styles.askQuestion} href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">Talk to ASCENSION →</a></div><InterestForm styles={styles} /></section>

      <footer className={styles.final}><Image className={styles.finalImage} src={DUSK_GROUP} alt="An ASCENSION group walking along the Da Nang coast at dusk" fill sizes="100vw" /><p>ASCENSION · A MODUS SERIES</p><h2>Choose the way in.</h2><EnquireLink label="Join ASCENSION" event="join_final" /><div className={styles.legal}><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><a href="mailto:daniel@stanfordemporium.com">Ask a question</a></div></footer>
      <StickyInterestAction styles={styles} />
    </main>
  );
}
