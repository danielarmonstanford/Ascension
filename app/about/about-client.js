"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGE =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const CREATE_IMAGE =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/a_90,so_0,f_jpg,q_auto/v1788259482/Angel_Art_Daniel_Stanford_Da_Nang_fps2la.jpg";
const HOI_AN_IMAGE =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1788267982/Screen_Shot_2026-09-01_at_9.06.12_AM_ikm6wg.png";
const DA_NANG_IMAGE =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1788060868/Screen_Shot_2026-08-29_at_11.33.44_PM_dyhsom.png";
const DANIEL_PORTRAIT =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1788402592/IMG_5135_2_fp3ceb.heic";
const STRIPE_RESERVATION = "https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00";
const PRACTITIONER_APPLICATION = "mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20%E2%80%94%20Practitioner%20Application&body=Name%3A%0ALocation%3A%0APractice%20or%20modality%3A%0ATraining%20and%20years%20of%20experience%3A%0AWebsite%20or%20professional%20profile%3A%0AProposed%20ASCENSION%20contribution%3A%0AGroup%20sessions%2C%20private%20sessions%20or%20both%3A%0AAvailability%20between%20January%2012%E2%80%9326%2C%202027%3A%0AEquipment%20or%20space%20required%3A%0ALanguages%20spoken%3A%0AWhy%20would%20your%20practice%20fit%20ASCENSION%3F%3A";

const values = [
  ["THE BODY IS CONNECTED.", "We approach the body as an interconnected whole. Movement, tension, breath, touch, rest and awareness do not exist in isolation."],
  ["EXPERIENCE BEFORE PROMISES.", "We do not promise instant transformation or guaranteed results. We create thoughtful conditions for meaningful personal experience."],
  ["PARTICIPATION WITHOUT PRESSURE.", "You do not need to be flexible, artistic or experienced in meditation or movement. Join what serves you. Rest or step away when you choose."],
  ["CONSENT BEFORE TOUCH.", "Every participant retains control over their body. Therapeutic touch requires clear consent, and practices should be adapted to individual comfort and needs."],
  ["VIETNAM IS NOT DECORATION.", "ASCENSION is grounded in respect for Vietnamese knowledge, culture, food, landscapes and people. Vietnam is part of the experience—not an exotic backdrop."],
  ["CREATIVITY BELONGS TO EVERYONE.", "Draw, paint, write, photograph, move or create in whatever form calls to you. Nothing needs to be displayed or perfected. The practice is simply to begin."],
  ["CONNECTION AND SOLITUDE.", "We make room for shared experiences, genuine human connection and the freedom to be alone when solitude is what you need."],
];

function ThemeControl({ theme, onChange }) {
  return (
    <div className="theme-control" aria-label="Choose time of day">
      <button aria-pressed={theme === "day"} onClick={() => onChange("day")}>DAY</button>
      <span aria-hidden="true" />
      <button aria-pressed={theme === "dusk"} onClick={() => onChange("dusk")}>DUSK</button>
    </div>
  );
}

function AboutHeader({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="about-site-header">
      <nav className="about-site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="/#top">ASCENSION</a>
        <div className="about-nav-links">
          <a href="/#experience">Experience</a>
          <a href="/#dien-chan">Diện Chẩn</a>
          <a href="/about" aria-current="page">About</a>
          <a href="/#attendance">Attend</a>
        </div>
      </nav>
      <div className="about-theme"><ThemeControl theme={theme} onChange={setTheme} /></div>
      <button className="about-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="about-mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" />
      </button>
      <div className={`about-mobile-menu ${menuOpen ? "is-open" : ""}`} id="about-mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="/#experience">Experience</a>
          <a href="/#dien-chan">Diện Chẩn</a>
          <a href="/about" aria-current="page">About</a>
          <a href="/#attendance">Attend</a>
          <a href="/#facilitate">Facilitate</a>
        </nav>
        <a className="radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
      </div>
    </header>
  );
}

function AboutFooter() {
  return (
    <footer className="about-footer">
      <span>ASCENSION SENSES · Edition 01</span>
      <div>
        <a href="/about">About</a><a href="/#experience">Experience</a><a href="/#dien-chan">Diện Chẩn</a><a href="/#attendance">Attend</a><a href="/#facilitate">Facilitate</a><a href="/partners">Partners</a><a href="/partners/sponsorship">Sponsors</a><a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Enquiry">Contact</a><a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Privacy">Privacy</a><a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Terms">Terms</a>
      </div>
    </footer>
  );
}

export default function AboutPageClient() {
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ascension-theme");
      if (saved === "day" || saved === "dusk") setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("ascension-theme", theme); } catch {}
  }, [theme]);

  return (
    <div className="about-page">
      <a className="skip-link" href="#about-main">Skip to main content</a>
      <AboutHeader theme={theme} setTheme={setTheme} />
      <main id="about-main">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-media">
            <Image src={HERO_IMAGE} alt="Yoga wheel practice overlooking the sea in Da Nang" fill priority sizes="(max-width: 767px) 100vw, 52vw" />
          </div>
          <div className="about-hero-copy">
            <p className="about-eyebrow">About ASCENSION</p>
            <h1 id="about-title">A return to what makes us feel alive.</h1>
            <p>ASCENSION is a curated experience of Vietnamese wellness, movement, sound, food, culture and creativity—built around Diện Chẩn, a needle-free Vietnamese system of reflexology, acupressure, heat, stretching and full-body therapeutic work.</p>
            <p>Around this foundation, selected practitioners contribute movement, breathwork, guided meditation, sound baths, bodywork and creative expression.</p>
            <p>ASCENSION is not a retreat formula. It is an immersive happening—an invitation to return to the body, awaken the senses and experience Vietnam with greater presence.</p>
            <div className="about-actions"><a className="radiant-action" href="/#experience">Explore the experience <span aria-hidden="true">→</span></a><a className="about-secondary-action" href="/#attendance">View dates and pricing <span aria-hidden="true">→</span></a></div>
          </div>
        </section>

        <section className="about-editorial about-origin" aria-labelledby="origin-title">
          <div className="about-placeholder">
            <Image src={DANIEL_PORTRAIT} alt="Portrait of Daniel Stanford beneath tropical trees in Da Nang" fill sizes="(max-width: 767px) 100vw, 40vw" />
            <span>Daniel Stanford · Da Nang</span>
          </div>
          <div className="about-long-copy">
            <p className="about-eyebrow">Why I created ASCENSION</p>
            <h2 id="origin-title">Experienced before it was offered.</h2>
            <p>I did not build ASCENSION from wellness trends or online research.</p>
            <p>It grew from my own search for ways to restore my body, stay creatively alive and keep moving forward through periods of pain and physical limitation.</p>
            <p>Over more than two decades—and across travels through 25 countries—I encountered practitioners, traditions and environments that changed how I understood wellbeing.</p>
            <p>I stopped seeing it as one treatment or one destination. I began seeing it as a relationship between the body, mind, movement, creativity, place and human connection.</p>
            <p>In Da Nang, I experienced Diện Chẩn over several months, including an intensive period of 40 consecutive days.</p>
            <p>The changes I personally experienced in mobility, alignment and physical awareness are why this practice sits at the foundation of ASCENSION.</p>
            <p>I am bringing together the practices, people and places that changed me most—and inviting others to experience them with openness and curiosity.</p>
          </div>
        </section>

        <section className="about-editorial about-role" aria-labelledby="role-title">
          <div className="about-role-copy about-long-copy">
            <p className="about-eyebrow">My role</p>
            <h2 id="role-title">Host. Curator. Creative director.</h2>
            <p>I am not a medical practitioner, and I am not presenting myself as one.</p>
            <p>My role is to host the experience, shape its creative direction and bring together experienced practitioners around one clear intention.</p>
            <p>For more than 25 years, I have worked across art, fashion, photography, film and design—always centred on transformation: how an image, an environment or an encounter can change the way we see and feel.</p>
            <p>ASCENSION brings that creative practice into a living experience.</p>
            <p>Every element is considered—the place, the people, the visual atmosphere, the rhythm of the days and the space left open for what you discover on your own.</p>
            <p>ASCENSION brings these worlds together as a cultural journey and living artwork—something to enter, feel and experience, not simply observe.</p>
          </div>
          <div className="about-role-media"><Image src={CREATE_IMAGE} alt="A hand applying gold leaf detail to a painted portrait" fill sizes="(max-width: 767px) 100vw, 46vw" /></div>
        </section>

        <section className="about-place" aria-labelledby="place-title">
          <div className="about-place-media"><Image src={HOI_AN_IMAGE} alt="Silk lanterns illuminating a shop in Hội An" fill sizes="100vw" /></div>
          <div className="about-place-copy">
            <p className="about-eyebrow">Why Da Nang</p>
            <h2 id="place-title"><span>City.</span><span>Sea.</span><span>Mountain.</span></h2>
            <div>
              <p>I lived in Da Nang for more than a year, and what connected me to it was more than the landscape.</p>
              <p>I found openness in the sea, perspective in the mountains and creative energy in the city.</p>
              <p>Nearby, Hội An offered lantern-lit streets, craftsmanship, history and a different rhythm of time.</p>
              <p>Most of all, I remember the people: smiling faces, genuine hellos and small gestures of generosity that made me feel welcome before I knew the language.</p>
              <p>Da Nang is not simply the setting for ASCENSION. It is part of what I want to share.</p>
            </div>
          </div>
        </section>

        <section className="about-collective" aria-labelledby="collective-title">
          <p className="about-eyebrow">From personal to collective</p>
          <h2 id="collective-title">A personal beginning. A shared experience.</h2>
          <div><p>ASCENSION began with my journey. It will not remain centred on me.</p><p>It will be shaped by Vietnamese practitioners, visiting facilitators, local partners and the people who join us.</p><p>My role is to hold the vision while leaving room for others to bring their knowledge, presence and perspective.</p></div>
        </section>

        <section className="about-values" aria-labelledby="values-title">
          <div className="about-values-heading"><p className="about-eyebrow">What we hold</p><h2 id="values-title">The principles beneath the experience.</h2></div>
          <ol>
            {values.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
          </ol>
        </section>

        <section className="about-foundation" aria-labelledby="program-foundation-title">
          <div><p className="about-eyebrow">Program foundation</p><h2 id="program-foundation-title">One foundation. Many practices.</h2></div>
          <div className="about-long-copy"><p>Diện Chẩn is the therapeutic foundation of ASCENSION.</p><p>Around it, a modular program brings together movement, breath, guided meditation, sound baths, bodywork, food, cultural discovery and creative practice.</p><p>Facilitators are selected for experience, integrity, cultural fit and the quality of what they can contribute.</p><p>The foundation is clear. The experience remains alive.</p><p className="about-medical-note">Diện Chẩn is presented as a traditional wellness practice and educational experience. Individual responses vary. Participation does not replace medical diagnosis, treatment or professional healthcare.</p><div className="about-actions"><a className="radiant-action" href="/#dien-chan">Learn about Diện Chẩn <span aria-hidden="true">→</span></a><a className="about-secondary-action" href={PRACTITIONER_APPLICATION}>Apply to facilitate <span aria-hidden="true">→</span></a></div></div>
        </section>

        <section className="about-closing" aria-labelledby="about-closing-title">
          <Image src={DA_NANG_IMAGE} alt="Da Nang sunset reflected across still water" fill sizes="100vw" />
          <div className="about-closing-overlay" aria-hidden="true" />
          <div className="about-closing-copy">
            <p className="about-closing-line">I created it. We hold it. You experience it.</p>
            <h2 id="about-closing-title">Da Nang is waiting.</h2>
            <p>Come for seven days or experience the complete fourteen-day journey. Discover Vietnamese knowledge. Reconnect with your body. Share extraordinary food, sound, movement, culture and creative experience within a small, carefully curated group.</p>
            <div className="about-actions"><a className="radiant-action" href="/#experience">Experience ASCENSION <span aria-hidden="true">→</span></a><a className="about-secondary-action about-secondary-light" href="/#attendance">View dates and pricing <span aria-hidden="true">→</span></a></div>
          </div>
          <AboutFooter />
        </section>
      </main>
    </div>
  );
}
