"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sensoryMedia } from "./sensory-media";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const HERO_MASTER =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4";
const DA_NANG_VIMEO_ID = "1221665573";
const DA_NANG_VIDEO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787489954/Screen_Shot_2026-08-23_at_8.59.05_AM_e8jceq.png";
const DA_NANG_FILM =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1788060868/Screen_Shot_2026-08-29_at_11.33.44_PM_dyhsom.png";
const SOUND_ART =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787663022/ear_sound_topographic_parchment_d1tm3s.webp";

const STRIPE_RESERVATION = "https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00";

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return reduceMotion;
}

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function ThemeControl({ theme, onChange }) {
  return (
    <div className="theme-control" aria-label="Choose time of day">
      <button aria-pressed={theme === "day"} onClick={() => onChange("day")}>DAY</button>
      <span aria-hidden="true" />
      <button aria-pressed={theme === "dusk"} onClick={() => onChange("dusk")}>DUSK</button>
    </div>
  );
}

function ProgressiveMedia({ poster, alt, priority = false, className = "", videoSrc, vimeoId }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "180px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && ready && !reduceMotion) video.play().catch(() => {});
    else video.pause();
  }, [inView, ready, reduceMotion]);

  return (
    <div ref={containerRef} className={`progressive-media ${ready ? "motion-ready" : ""} ${className}`}>
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className="media-poster" onLoad={() => setPosterLoaded(true)} />
      {videoSrc && posterLoaded && !reduceMotion ? (
        <video
          ref={videoRef}
          className="media-motion"
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      {vimeoId && posterLoaded && inView && !reduceMotion ? (
        <iframe
          className="media-motion media-vimeo"
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&title=0&byline=0&portrait=0`}
          title="Da Nang moving landscape"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex="-1"
          aria-hidden="true"
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
}

function MediaPlaceholder({ label, alt }) {
  return (
    <div className="sense-frame media-placeholder" role="img" aria-label={alt}>
      {process.env.NODE_ENV !== "production" ? <span>{label}</span> : null}
    </div>
  );
}

function SensoryMedia({ media, chapter }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduceMotion) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduceMotion]);

  if (media.type === "placeholder") {
    return <MediaPlaceholder label={media.productionLabel} alt={media.alt} />;
  }

  const imageSource = media.poster || media.src;
  return (
    <div
      className={`sense-frame sense-frame-${chapter}`}
      ref={frameRef}
      style={{ "--focal-mobile": media.focalPointMobile, "--focal-desktop": media.focalPointDesktop }}
    >
      <Image className="sense-art sense-poster" src={imageSource} alt={media.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
      {media.type === "video" && inView && !reduceMotion ? (
        <video ref={videoRef} className="sense-art sense-motion" poster={media.poster} muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={media.src} type="video/mp4" />
        </video>
      ) : null}
      {media.type === "audio-video" ? <span className="sound-coming">60-SECOND SOUND PREVIEW — COMING SOON</span> : null}
    </div>
  );
}

function ScrollHeroMedia({ videoRef, isMobile, motionReady, onLoadedMetadata, onCanPlay, onSeeking, onSeeked, onError }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`progressive-media hero-progressive-media ${motionReady ? "motion-ready" : ""}`}>
      <Image
        src={HERO_POSTER}
        alt="A woman in a yoga wheel pose on a Pacific beach in Da Nang"
        fill
        priority
        sizes="100vw"
        className="media-poster"
      />
      {!reduceMotion ? (
        <video
          ref={videoRef}
          className="media-motion hero-orbit"
          muted
          playsInline
          autoPlay={isMobile}
          loop={isMobile}
          preload={isMobile ? "metadata" : "auto"}
          poster={HERO_POSTER}
          aria-hidden="true"
          tabIndex="-1"
          onLoadedMetadata={onLoadedMetadata}
          onCanPlay={onCanPlay}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onError={onError}
        >
          <source src={HERO_MASTER} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

function Hero({ theme, setTheme }) {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const isMobile = useMobileLayout();
  const targetProgress = useRef(0);
  const renderedProgress = useRef(0);
  const animationFrame = useRef(0);
  const metadataReady = useRef(false);
  const canPlayReady = useRef(false);
  const seekInFlight = useRef(false);
  const pendingSeekTime = useRef(null);
  const [motionReady, setMotionReady] = useState(false);

  const enableMotionWhenReady = () => {
    if (metadataReady.current && canPlayReady.current) {
      setMotionReady(true);
    }
  };

  const requestVideoTime = (requestedTime) => {
    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_METADATA) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const nextTime = Math.min(Math.max(requestedTime, 0), Math.max(video.duration - 0.04, 0));
    if (Math.abs(video.currentTime - nextTime) <= 0.018) return;

    if (seekInFlight.current || video.seeking) {
      pendingSeekTime.current = nextTime;
      return;
    }

    seekInFlight.current = true;
    try {
      video.currentTime = nextTime;
    } catch {
      seekInFlight.current = false;
      pendingSeekTime.current = nextTime;
    }
  };

  useEffect(() => {
    if (isMobile !== false) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observedScrollY = window.scrollY;
    let scrollPoll = 0;

    const measure = () => {
      if (!scrollRef.current || mediaQuery.matches) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const distance = Math.max(scrollRef.current.offsetHeight - window.innerHeight, 1);
      targetProgress.current = Math.min(1, Math.max(0, -rect.top / distance));
    };

    const render = () => {
      animationFrame.current = 0;
      const difference = targetProgress.current - renderedProgress.current;
      renderedProgress.current += difference * 0.085;

      if (Math.abs(difference) < 0.0005) {
        renderedProgress.current = targetProgress.current;
      }

      const progress = renderedProgress.current;
      const mediaOpacity = Math.min(1, Math.max(0, (progress - 0.02) / 0.14));
      stageRef.current?.style.setProperty("--hero-progress", progress.toFixed(4));
      stageRef.current?.style.setProperty("--hero-media-opacity", mediaOpacity.toFixed(4));

      const video = videoRef.current;
      if (motionReady && video && Number.isFinite(video.duration) && video.duration > 0) {
        requestVideoTime(progress * video.duration);
      }

      if (Math.abs(targetProgress.current - renderedProgress.current) >= 0.0005) {
        animationFrame.current = window.requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      measure();
      if (!animationFrame.current) {
        animationFrame.current = window.requestAnimationFrame(render);
      }
    };

    const pollScrollPosition = () => {
      if (window.scrollY !== observedScrollY) {
        observedScrollY = window.scrollY;
        requestRender();
      }

      const rect = scrollRef.current?.getBoundingClientRect();
      const nearHero = rect && rect.bottom > -window.innerHeight && rect.top < window.innerHeight;
      scrollPoll = window.setTimeout(pollScrollPosition, nearHero ? 80 : 320);
    };

    requestRender();
    pollScrollPosition();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("wheel", requestRender, { passive: true });
    window.addEventListener("touchmove", requestRender, { passive: true });
    document.addEventListener("scroll", requestRender, { passive: true, capture: true });
    window.addEventListener("resize", requestRender);
    mediaQuery.addEventListener("change", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("wheel", requestRender);
      window.removeEventListener("touchmove", requestRender);
      document.removeEventListener("scroll", requestRender, { capture: true });
      window.removeEventListener("resize", requestRender);
      mediaQuery.removeEventListener("change", requestRender);
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = 0;
      window.clearTimeout(scrollPoll);
    };
  }, [isMobile, motionReady]);

  return (
    <header className={`hero-scroll ${isMobile ? "hero-mobile" : "hero-desktop"}`} id="top" ref={scrollRef}>
      <div className="hero-stage" ref={stageRef}>
        <ScrollHeroMedia
          videoRef={videoRef}
          isMobile={isMobile}
          motionReady={motionReady}
          onLoadedMetadata={() => {
            metadataReady.current = true;
            enableMotionWhenReady();
          }}
          onCanPlay={() => {
            canPlayReady.current = true;
            enableMotionWhenReady();
            if (isMobile) videoRef.current?.play().catch(() => {});
          }}
          onSeeking={() => {
            seekInFlight.current = true;
          }}
          onSeeked={() => {
            seekInFlight.current = false;
            const queuedTime = pendingSeekTime.current;
            pendingSeekTime.current = null;
            if (Number.isFinite(queuedTime)) requestVideoTime(queuedTime);
          }}
          onError={() => {
            setMotionReady(false);
            seekInFlight.current = false;
            pendingSeekTime.current = null;
          }}
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
          <h1 className="hero-title entrance entrance-title">ASCENSION</h1>
          <p className="hero-proposition entrance entrance-proposition">Come back to your senses.</p>
          <div className="hero-offer entrance entrance-place">
            <p className="hero-place">Da Nang, Vietnam<br />January 12–26, 2027</p>
            <p className="hero-description">A 7- or 14-day experience of movement, restoration, culture and creative renewal.</p>
          </div>
          <div className="hero-actions entrance entrance-controls">
            <a className="hero-primary" href="#senses">Embody it</a>
            <a className="hero-explore" href="#awaken">Explore the experience <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-theme entrance entrance-controls">
          <ThemeControl theme={theme} onChange={setTheme} />
        </div>
      </div>
    </header>
  );
}

const sensoryStories = [
  {
    id: "embody", name: "EMBODY", title: "Feel more. Move more. Touch deeper.", cta: "Explore embody",
    summary: "Movement, daily ecstatic dance and body-based practices invite you to notice how you feel, move and meet the present. The program also includes Vietnamese acupressure with Loan and fascial release, with private or specialist work identified separately where applicable.",
    details: "Participation is invitational, not prescribed. Confirmed group programming and any optional paid private sessions will be clearly distinguished in the final schedule."
  },
  {
    id: "see", name: "SEE", title: "See differently.", cta: "Explore seeing",
    summary: "Let your eyes soften into Da Nang: changing Pacific light, the visual life of Hội An, contemporary art, architecture and the ancient stone of the Marble Mountains. Seeing becomes a practice of attention—less analysis, more wonder, and a more intimate relationship with place.",
    details: "Marble Mountains is planned as a special excursion, with the day still to be confirmed. Other place-based moments remain illustrative until the final program is published."
  },
  {
    id: "sound", name: "SOUND", title: "Listen deeply.", cta: "Explore sound",
    summary: "Daily sound practice draws attention to waves, wind, music, resonance and silence. Rather than filling every moment, ASCENSION uses listening to create spaciousness and connection—to the body, the environment and the people sharing the experience. Any audible preview will always begin by choice.",
    details: "The final sound preview and full participant controls are pending approved media. No named sound facilitator is presented as confirmed."
  },
  {
    id: "taste", name: "TASTE", title: "Taste the place.", cta: "Explore taste",
    summary: "Vietnamese ingredients, preparation and shared tables offer another way into Da Nang. Taste tropical fruit, local herbs, tea and the textures of the coast while learning through discovery rather than spectacle. Selected culinary experiences are part of the curated program; additional meals remain yours to choose.",
    details: "The final culinary media and specific shared-meal schedule are pending. Only confirmed inclusions will appear in the participant program."
  },
  {
    id: "breathe", name: "BREATHE", title: "Breathe it in.", cta: "Explore breathing",
    summary: "Sea air, incense, plants, steam and the warm humidity of Da Nang make the environment physically present. Breath and scent become quiet forms of orientation: notice what surrounds you, what memory it carries, and how a change of place can open a different quality of attention.",
    details: "Environmental and scent-led moments are descriptive of the experience. Specific botanical rituals or facilitators will be named only when confirmed."
  },
  {
    id: "create", name: "CREATE · INTUITION", title: "Follow the sixth sense.", cta: "Explore creating",
    summary: "Creative practice gives form to what you notice. Through photography, drawing, painting, collage, writing or movement, you can follow intuition without needing to perform as an artist. Make something that did not exist that morning, then carry the memory of the experience home in a tangible form.",
    details: "Creative sessions are part of the ASCENSION Passport framework. Final media and the detailed materials schedule are still in production."
  }
];

const passportCategories = [
  { name: "MOVE", copy: "Curated group movement, yoga, breathwork and embodied practices." },
  { name: "RESTORE", copy: "Selected group restoration and wellness experiences, with additional private treatments available separately." },
  { name: "SOUND", copy: "Guided meditation, sound and sensory sessions." },
  { name: "TASTE", copy: "Selected shared culinary experiences connecting guests with Da Nang through food." },
  { name: "DISCOVER", copy: "Curated cultural and place-based experiences across Da Nang and its surroundings." },
  { name: "CREATE", copy: "Photography, drawing, painting, collage and material exploration." },
  { name: "COMMUNITY", copy: "A small international cohort sharing the experience, rather than a conventional tour group." },
];

function MobileReserveBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#top");
    const exclusionZones = ["#comparison", "#attendance", "#join"]
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
    if (!hero) return;

    let heroVisible = true;
    const excluded = new Set();
    const update = () => setVisible(!heroVisible && excluded.size === 0);
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      update();
    });
    const exclusionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? excluded.add(entry.target) : excluded.delete(entry.target));
      update();
    }, { rootMargin: "0px 0px -10% 0px" });

    heroObserver.observe(hero);
    exclusionZones.forEach((zone) => exclusionObserver.observe(zone));
    return () => {
      heroObserver.disconnect();
      exclusionObserver.disconnect();
    };
  }, []);

  return (
    <a className={`mobile-reserve ${visible ? "is-visible" : ""}`} href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">
      Reserve your place · from $1,200
    </a>
  );
}

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
      <MobileReserveBar />

      <main id="main">
        <section className="awaken" id="awaken" aria-labelledby="awaken-title">
          <div className="awaken-heading">
            <p className="awaken-kicker">Da Nang, Vietnam</p>
            <h2 id="awaken-title">The experience,<br />at a glance.</h2>
          </div>
          <div className="awaken-facts">
            <p className="awaken-lead">Choose seven days or the full fourteen between city, sea and mountain.</p>
            <dl>
              <div><dt>7 days</dt><dd>January 12–19, 2027 · USD $1,200</dd></div>
              <div><dt>14 days</dt><dd>January 12–26, 2027 · USD $2,000</dd></div>
            </dl>
            <p>Small, intimate cohort. Accommodation and travel are separate.</p>
            <div className="fact-actions">
              <a href="#comparison">Compare 7 and 14 days <span aria-hidden="true">→</span></a>
              <a href="#inclusions">See what’s included <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="destination" aria-labelledby="destination-title">
          <ProgressiveMedia
            poster={DA_NANG_VIDEO_POSTER}
            alt="A bright Pacific beach and mountain coastline in Da Nang"
            vimeoId={DA_NANG_VIMEO_ID}
          />
          <div className="destination-overlay" aria-hidden="true" />
          <div className="destination-copy">
            <h2 id="destination-title"><span>CITY.</span><span>SEA.</span><span>MOUNTAIN.</span></h2>
            <p>Da Nang, between salt air and ancient stone.</p>
          </div>
        </section>

        <section className="sensory-framework" id="senses" aria-labelledby="senses-title">
          <div className="sense-intro">
            <h2 id="senses-title">Six ways into<br />the present.</h2>
          </div>
          <div className="sensory-stories" aria-label="The six senses of ASCENSION">
            {sensoryStories.map((story, index) => {
              const media = sensoryMedia[story.id];
              return (
                <article className={`sensory-story sensory-story-${index + 1}`} id={story.id} key={story.name}>
                  <header className="sensory-story-heading">
                    <p className="sensory-story-label">{story.name}</p>
                    <h3>{story.title}</h3>
                    <SensoryMedia media={media} chapter={story.id} />
                  </header>
                  <div className="sensory-story-copy">
                    <p>{story.summary}</p>
                    <details>
                      <summary>{story.cta} <span aria-hidden="true">→</span></summary>
                      <p>{story.details}</p>
                    </details>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="model" id="experience" aria-labelledby="model-title">
          <div className="model-title-wrap">
            <p className="model-kicker">Your Ascension Passport</p>
            <h2 id="model-title">Not a retreat<br />from life.<br /><em>A return to it.</em></h2>
          </div>
          <div className="model-copy">
            <p className="model-lead">More than a retreat. Your way into Da Nang.</p>
            <p>Your ASCENSION Passport gives you access to a curated program across movement, restoration, creativity, sound, taste and discovery — while leaving you free to choose your own hotel, your own downtime and the experiences that matter most to you.</p>
          </div>
          <div className="model-categories" id="inclusions" aria-label="What your Ascension Passport opens">
            {passportCategories.map((category) => (
              <article className="model-category" key={category.name}>
                <h3>{category.name}</h3>
                <p>{category.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rhythm" id="program" aria-labelledby="rhythm-title">
          <div className="rhythm-heading">
            <h2 id="rhythm-title">A day in<br />Ascension.</h2>
            <p>Illustrative, not guaranteed. Every day is different — participate in what serves you, and leave space for what Da Nang reveals.</p>
          </div>
          <div className="rhythm-list" aria-label="An illustrative daily rhythm">
            <article><p className="rhythm-time">Morning</p><p className="rhythm-detail">Movement · Breath · Ocean</p></article>
            <article><p className="rhythm-time">Midday</p><p className="rhythm-detail">Restore · Explore · Create</p></article>
            <article><p className="rhythm-time">Sunset</p><p className="rhythm-detail">Sound · Shared Table · Connection</p></article>
            <article><p className="rhythm-time">Your Time</p><p className="rhythm-detail">Beach · Spa · City · Rest · Private Sessions</p></article>
          </div>
          <p className="rhythm-note">ASCENSION is curated, not prescribed.</p>
        </section>

        <section className="comparison" id="comparison" aria-labelledby="comparison-title">
          <div className="comparison-heading">
            <p className="comparison-kicker">Choose your rhythm</p>
            <h2 id="comparison-title">Seven days<br />or fourteen.</h2>
          </div>
          <div className="comparison-options">
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
        </section>

        <section className="travel-note" aria-labelledby="travel-title">
          <p className="travel-kicker">Your stay, your way</p>
          <h2 id="travel-title">Program and place.<br />Accommodation is separate.</h2>
          <p>Choose and book the Da Nang hotel that suits you. Flights, accommodation and local transfers are not included in the ASCENSION program price.</p>
        </section>

        <section className="people" aria-labelledby="people-title">
          <div className="people-photo">
            <Image src={DA_NANG_FILM} alt="Da Nang at sunset" fill sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
          <div className="people-copy">
            <h2 id="people-title">People shape<br />the experience.</h2>
            <p>Facilitators will be introduced here only as participation is confirmed.</p>
            <a href="/partners">Facilitator and partner pathways <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="attendance" id="attendance" aria-labelledby="attendance-title">
          <div className="attendance-heading">
            <h2 id="attendance-title">Reserve your<br />Ascension.</h2>
            <p>Programs begin at USD $1,200. A $300 deposit currently reserves your place.</p>
          </div>
          <div className="attendance-art">
            <Image
              src={SOUND_ART}
              alt="An illustration of an ear surrounded by radiating sound waves"
              fill
              sizes="(max-width: 700px) 100vw, 72vw"
            />
          </div>
          <div className="attendance-terms">
            <div className="attendance-included">
              <p className="terms-label">Included</p>
              <ul>
                <li>Access to the curated ASCENSION program across movement, restoration, sound, taste, discovery and creative sessions</li>
                <li>Participation in the shared ASCENSION cohort</li>
              </ul>
            </div>
            <div className="attendance-optional">
              <p className="terms-label">Optional · Book Separately</p>
              <ul>
                <li>Accommodation — guests choose and book their own hotel</li>
                <li>Flights and local transfers</li>
                <li>Private treatments and additional spa services</li>
                <li>Additional excursions, meals or special experiences</li>
              </ul>
            </div>
          </div>
          <div className="attendance-actions">
            <a className="reserve-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
            <a className="question-action" href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">Ask a question <span aria-hidden="true">→</span></a>
          </div>
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

        <section className="join" id="join" aria-labelledby="join-title">
          <ProgressiveMedia poster={DA_NANG_FILM} alt="Da Nang sunset reflected across still water" />
          <div className="join-overlay" aria-hidden="true" />
          <div className="join-copy">
            <h2 id="join-title">Da Nang<br />is waiting.</h2>
            <a href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
          </div>
          <footer>
            <span>ASCENSION SENSES · Edition 01</span>
            <div><a href="/partners/practitioners">Facilitators</a><a href="/partners">Partners</a><a href="/partners/sponsorship">Sponsors</a></div>
          </footer>
        </section>
      </main>
    </>
  );
}
