"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const HERO_MASTER =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4";
const DA_NANG_VIMEO_ID = "1221665573";
const DA_NANG_VIDEO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787489954/Screen_Shot_2026-08-23_at_8.59.05_AM_e8jceq.png";
const DA_NANG_FILM =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1787827128/zen_sunset_beach_pool_da_nang_ovllnz.jpg";
const DA_NANG_PLACE =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787504880/nano-banana-2_upscale_this_image_increase_the_statue_pull_back_and_sharpen_depth_HK_similar_vi-0_oyfqsj.jpg";
const CREATIVE_WATER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787823818/Black_Gold-water-D80_5523_fgh0eu.jpg";
const CREATIVE_MATERIAL =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787823955/D80_2949-Zen-Indian_hms21t.jpg";
const TOUCH_ART =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787809245/hf_20260826_211528_f5a526bc-fb5d-4b35-bce6-9c5f6777d724_jmqpoi.png";
const SOUND_ART =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787663022/ear_sound_topographic_parchment_d1tm3s.webp";

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
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className={`progressive-media ${ready ? "motion-ready" : ""} ${className}`}>
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
          onLoadedData={() => videoRef.current?.play().catch(() => {})}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      {vimeoId && posterLoaded && !reduceMotion ? (
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

function ScrollHeroMedia({ videoRef, motionReady, onLoadedMetadata, onCanPlay, onSeeking, onSeeked, onError }) {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

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
          preload="auto"
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
  const targetProgress = useRef(0);
  const renderedProgress = useRef(0);
  const animationFrame = useRef(0);
  const metadataReady = useRef(false);
  const canPlayReady = useRef(false);
  const mobileUnlockRequired = useRef(false);
  const mobileUnlocked = useRef(false);
  const seekInFlight = useRef(false);
  const pendingSeekTime = useRef(null);
  const [motionReady, setMotionReady] = useState(false);

  const enableMotionWhenReady = () => {
    const unlockSatisfied = !mobileUnlockRequired.current || mobileUnlocked.current;
    if (metadataReady.current && canPlayReady.current && unlockSatisfied) {
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
    mobileUnlockRequired.current = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    if (!mobileUnlockRequired.current) mobileUnlocked.current = true;

    let unlocking = false;
    const unlockVideo = () => {
      const video = videoRef.current;
      if (!video || mobileUnlocked.current || unlocking) return;

      unlocking = true;
      video.muted = true;
      video.playsInline = true;
      const finishUnlock = () => {
        video.pause();
        mobileUnlocked.current = true;
        unlocking = false;
        enableMotionWhenReady();
        window.removeEventListener("pointerdown", unlockVideo);
        window.removeEventListener("touchstart", unlockVideo);
        window.removeEventListener("wheel", unlockVideo);
        window.removeEventListener("scroll", unlockVideo);
      };

      const playAttempt = video.play();
      if (playAttempt) {
        playAttempt.then(finishUnlock).catch(() => {
          video.pause();
          unlocking = false;
        });
      } else {
        finishUnlock();
      }
    };

    if (mobileUnlockRequired.current) {
      window.addEventListener("pointerdown", unlockVideo, { passive: true });
      window.addEventListener("touchstart", unlockVideo, { passive: true });
      window.addEventListener("wheel", unlockVideo, { passive: true });
      window.addEventListener("scroll", unlockVideo, { passive: true });
    }

    return () => {
      window.removeEventListener("pointerdown", unlockVideo);
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("wheel", unlockVideo);
      window.removeEventListener("scroll", unlockVideo);
    };
  }, []);

  useEffect(() => {
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
  }, [motionReady]);

  return (
    <header className="hero-scroll" id="top" ref={scrollRef}>
      <div className="hero-stage" ref={stageRef}>
        <ScrollHeroMedia
          videoRef={videoRef}
          motionReady={motionReady}
          onLoadedMetadata={() => {
            metadataReady.current = true;
            enableMotionWhenReady();
          }}
          onCanPlay={() => {
            canPlayReady.current = true;
            enableMotionWhenReady();
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
          <p className="hero-place entrance entrance-place">Da Nang · Vietnam<br />January 12–26, 2027</p>
          <p className="hero-proposition entrance entrance-proposition">Come back to your senses.</p>
          <a className="hero-explore entrance entrance-controls" href="#awaken">Explore <span aria-hidden="true">↓</span></a>
        </div>

        <div className="hero-theme entrance entrance-controls">
          <ThemeControl theme={theme} onChange={setTheme} />
        </div>
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
          <div className="awaken-heading">
            <p className="awaken-kicker">Awaken</p>
            <h2 id="awaken-title">Come back to<br />your senses.</h2>
          </div>
          <div className="awaken-facts">
            <p className="awaken-lead">Fourteen days between city, sea and mountain.</p>
            <p>ASCENSION is a curated experience of movement, restoration, sound, food, creativity and place in Da Nang, Vietnam.</p>
            <dl>
              <div><dt>When</dt><dd>January 12–26, 2027</dd></div>
              <div><dt>Formats</dt><dd>7-day + 14-day experiences</dd></div>
            </dl>
            <a href="#experience">Explore the Experience <span aria-hidden="true">→</span></a>
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

        <section className="sense-sequence" aria-labelledby="senses-title">
          <div className="sense-intro">
            <h2 id="senses-title">Come back to<br />your senses.</h2>
            <p>Six ways into the present.</p>
          </div>
          <div className="sense-river" aria-label="The six senses of ASCENSION">
            {senses.map((sense, index) => (
              <div className={`sense-word sense-${index + 1}`} key={sense}>
                {sense === "TOUCH" ? (
                  <Image
                    className="touch-art"
                    src={TOUCH_ART}
                    alt="An illustration of restorative touch and bodywork"
                    fill
                    sizes="(max-width: 700px) 100vw, 52vw"
                  />
                ) : null}
                <span>{sense}</span>
              </div>
            ))}
          </div>
          <p className="sound-note">Sound is always yours to begin. No audio plays without your choice.</p>
        </section>

        <section className="sight" aria-labelledby="sight-title">
          <div className="sight-copy">
            <p className="sight-label">Sight</p>
            <p className="sight-sequence" aria-hidden="true"><span>See</span><span>Make</span><span>Create</span></p>
            <h2 id="sight-title">See differently.<br />Make something.</h2>
            <p>ASCENSION invites creativity back into daily life. Through photography, drawing, painting, collage and material exploration, guests respond to what they see, feel and experience in Da Nang.</p>
            <p>No artistic experience required.</p>
            <p>This is about noticing, not making “good art.”</p>
          </div>
          <div className="sight-table" aria-label="A visual study of place and creative materials">
            <div className="sight-image sight-landscape"><Image src={DA_NANG_PLACE} alt="Da Nang landscape and architecture" fill sizes="(max-width: 700px) 92vw, 58vw" /></div>
            <div className="sight-image sight-water"><Image src={CREATIVE_WATER} alt="A portrait beside the sea" fill sizes="(max-width: 700px) 54vw, 24vw" /></div>
            <div className="sight-image sight-material"><Image src={CREATIVE_MATERIAL} alt="A body moving through a Da Nang landscape" fill sizes="(max-width: 700px) 58vw, 26vw" /></div>
          </div>
          <blockquote><strong>Make art.</strong><span>Not because you’re an artist. Because you’re alive.</span></blockquote>
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
            <Image src={DA_NANG_PLACE} alt="Da Nang landscape and architecture" fill sizes="(max-width: 760px) 100vw, 60vw" />
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
          <div className="attendance-art">
            <Image
              src={SOUND_ART}
              alt="An illustration of an ear surrounded by radiating sound waves"
              fill
              sizes="(max-width: 700px) 100vw, 72vw"
            />
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
