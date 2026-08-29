"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_face,w_1800,h_1200,q_auto,f_auto/v1787504880/nano-banana-2_upscale_this_image_increase_the_statue_pull_back_and_sharpen_depth_HK_similar_vi-0_oyfqsj.jpg";
const DA_NANG_FILM =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1787827128/zen_sunset_beach_pool_da_nang_ovllnz.jpg";

function ThemeControl({ theme, onChange }) {
  return (
    <div className="theme-control" aria-label="Choose time of day">
      <button aria-pressed={theme === "day"} onClick={() => onChange("day")}>DAY</button>
      <span aria-hidden="true" />
      <button aria-pressed={theme === "dusk"} onClick={() => onChange("dusk")}>DUSK</button>
    </div>
  );
}

function ProgressiveMedia({ poster, alt, priority = false, className = "", videoSrc }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  return (
    <div className={`progressive-media ${ready ? "motion-ready" : ""} ${className}`}>
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className="media-poster" />
      {videoSrc ? (
        <video
          ref={videoRef}
          className="media-motion"
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onLoadedData={() => videoRef.current?.play().catch(() => {})}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

function Hero({ theme, setTheme }) {
  return (
    <header className="hero-stage" id="top">
      <ProgressiveMedia
        poster={HERO_POSTER}
        alt="A monumental figure overlooking a coastal city at sunset"
        priority
      />
      <div className="hero-atmosphere" aria-hidden="true" />
      <nav className="hero-nav entrance entrance-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top">ASCENSION</a>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#attendance">Attend</a>
        </div>
      </nav>

      <div className="hero-frame">
        <div className="hero-copy">
          <h1 className="entrance entrance-title">ASCENSION</h1>
          <p className="hero-place entrance entrance-place">Da Nang · Vietnam<br />January 12–26, 2027</p>
          <p className="hero-proposition entrance entrance-proposition">Come back to your senses.</p>
        </div>
        <a className="hero-explore entrance entrance-controls" href="#awaken">Explore <span aria-hidden="true">↓</span></a>
      </div>

      <div className="hero-theme entrance entrance-controls">
        <ThemeControl theme={theme} onChange={setTheme} />
      </div>
    </header>
  );
}

const senses = ["SIGHT", "SOUND", "TOUCH", "TASTE", "SCENT", "MOVE"];

export default function HomePage() {
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("ascension-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ascension-theme");
      if (saved === "day" || saved === "dusk") setTheme(saved);
    } catch {}
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Hero theme={theme} setTheme={setTheme} />

      <main id="main">
        <section className="awaken" id="awaken" aria-labelledby="awaken-title">
          <div className="awaken-media">
            <ProgressiveMedia poster={HERO_POSTER} alt="A monumental figure overlooking a coastal city at sunset" />
            <div className="awaken-vignette" aria-hidden="true" />
          </div>
          <div className="awaken-copy">
            <h2 id="awaken-title">Awaken</h2>
            <p>The body remembers what the mind forgets.</p>
          </div>
        </section>

        <section className="destination" aria-labelledby="destination-title">
          <ProgressiveMedia poster={DA_NANG_FILM} alt="Sunset over water in Da Nang" />
          <div className="destination-overlay" aria-hidden="true" />
          <div className="destination-copy">
            <h2 id="destination-title"><span>CITY.</span><span>SEA.</span><span>MOUNTAIN.</span></h2>
            <p>Da Nang, between salt air and ancient stone.</p>
          </div>
        </section>

        <section className="sense-sequence" aria-labelledby="senses-title">
          <div className="sense-intro">
            <h2 id="senses-title">Come back to<br />your senses.</h2>
            <p>Six ways into the present.</p>
          </div>
          <div className="sense-river" aria-label="The six senses of ASCENSION">
            {senses.map((sense, index) => (
              <div className={`sense-word sense-${index + 1}`} key={sense}>
                <span>{sense}</span>
              </div>
            ))}
          </div>
          <p className="sound-note">Sound is always yours to begin. No audio plays without your choice.</p>
        </section>

        <section className="model" id="experience" aria-labelledby="model-title">
          <div className="model-title-wrap">
            <h2 id="model-title">Not a retreat<br />from life.<br /><em>A return to it.</em></h2>
          </div>
          <div className="model-copy">
            <p>ASCENSION is a curated, modular experience across movement, restoration, food, culture, landscape and the senses.</p>
            <p>Choose seven days or the full fourteen. Accommodation and travel remain yours to arrange.</p>
          </div>
        </section>

        <section className="experience-da-nang" aria-labelledby="experience-title">
          <div className="experience-image">
            <Image src={HERO_POSTER} alt="A monumental figure overlooking a coastal landscape" fill sizes="(max-width: 760px) 100vw, 60vw" />
          </div>
          <div className="experience-words">
            <h2 id="experience-title">Experience<br />Da Nang.</h2>
            <p>Movement · restoration · food<br />culture · landscape · Tết</p>
            <a href="/retreat/index.html">Explore the program <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="people" aria-labelledby="people-title">
          <div className="people-photo">
            <Image src={DA_NANG_FILM} alt="Da Nang at sunset" fill sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
          <div className="people-copy">
            <h2 id="people-title">People shape<br />the experience.</h2>
            <p>Facilitators will be introduced here only as participation is confirmed.</p>
            <a href="/partners/index.html">Facilitator and partner pathways <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="attendance" id="attendance" aria-labelledby="attendance-title">
          <div className="attendance-heading">
            <h2 id="attendance-title">Your<br />Ascension.</h2>
            <p>Program costs are separate from accommodation and travel.</p>
          </div>
          <div className="attendance-options">
            <article>
              <p className="duration">7 DAYS</p>
              <p className="dates">January 12–19, 2027</p>
              <p className="price">$1,200 <small>USD · program</small></p>
            </article>
            <article>
              <p className="duration">14 DAYS</p>
              <p className="dates">January 12–26, 2027</p>
              <p className="price">$2,000 <small>USD · program</small></p>
            </article>
          </div>
          <a className="reserve-action" href="https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00" target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
          <p className="deposit">Current reservation link requests a $300 deposit. Commercial details require final verification before launch.</p>
        </section>

        <section className="series-positioning" aria-labelledby="series-title">
          <div className="series-intro">
            <h2 id="series-title">One idea.<br />Many places.</h2>
            <p>ASCENSION is not a single retreat. It’s a travelling series of curated editions — each built around wellbeing, movement, sound and place, and each shaped by where it lands.</p>
          </div>
          <div className="series-editions" aria-label="ASCENSION series editions">
            <div className="series-edition series-current">
              <h3>Da Nang</h3>
              <p>Edition 01 · January 2027</p>
              <span>Current primary experience</span>
            </div>
            <div className="series-edition">
              <h3>Montréal</h3>
              <p>Edition 02 · In planning</p>
              <span>Follow-up edition</span>
            </div>
            <div className="series-edition series-next">
              <h3>Next</h3>
              <p>Perhaps your city.</p>
            </div>
          </div>
          <a
            className="series-inquiry"
            href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20in%20My%20City&body=City%20%2F%20Country%3A%20%0A%0AI%E2%80%99m%20interested%20as%20a%3A%20Guest%20%2F%20Practitioner%20%2F%20Venue%20or%20Hospitality%20Partner%20%2F%20Sponsor%20%2F%20Local%20Connector%0A%0AName%3A%20%0AOrganization%20(if%20applicable)%3A%20%0A%0AWhy%20ASCENSION%20could%20belong%20here%3A%20"
          >
            Request ASCENSION in Your City <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="join" aria-labelledby="join-title">
          <ProgressiveMedia poster={DA_NANG_FILM} alt="Da Nang sunset reflected across still water" />
          <div className="join-overlay" aria-hidden="true" />
          <div className="join-copy">
            <h2 id="join-title">Da Nang<br />is waiting.</h2>
            <a href="https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00" target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
          </div>
          <footer>
            <span>ASCENSION SENSES · Edition 01</span>
            <div><a href="/partners/practitioners.html">Facilitators</a><a href="/partners/index.html">Partners</a><a href="/partners/sponsorship.html">Sponsors</a></div>
          </footer>
        </section>
      </main>
    </>
  );
}
