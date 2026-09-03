"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sensoryMedia } from "./sensory-media";
import { en, faqItems, passportCategories } from "../content/en";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const HERO_MASTER =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4";
const DA_NANG_VIMEO_ID = "1221665573";
const DA_NANG_VIDEO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787489954/Screen_Shot_2026-08-23_at_8.59.05_AM_e8jceq.png";
const DA_NANG_FILM =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1788060868/Screen_Shot_2026-08-29_at_11.33.44_PM_dyhsom.png";
const DIEN_CHAN_VISUAL =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787672842/hf_20260825_154036_0f54f781-11e4-4fd2-bc2e-b20f07766ac2_tuvnzo.png";
const DANIEL_PORTRAIT =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1788402592/IMG_5135_2_fp3ceb.heic";

const STRIPE_RESERVATION = "https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00";
const PRACTITIONER_APPLICATION = "mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20%E2%80%94%20Practitioner%20Application&body=Name%3A%0ALocation%3A%0APractice%20or%20modality%3A%0ATraining%20and%20years%20of%20experience%3A%0AWebsite%20or%20professional%20profile%3A%0AProposed%20ASCENSION%20contribution%3A%0AGroup%20sessions%2C%20private%20sessions%20or%20both%3A%0AAvailability%20between%20January%2012%E2%80%9326%2C%202027%3A%0AEquipment%20or%20space%20required%3A%0ALanguages%20spoken%3A%0AWhy%20would%20your%20practice%20fit%20ASCENSION%3F%3A";

const destinationTypographyTiming = {
  fadeInStart: 2.4,
  fadeInEnd: 6,
  fadeOutStart: 12.6,
  fadeOutEnd: 16.5,
  hiddenBy: 25,
  embeddedTitleStart: 25.75,
};

const destinationScrollTiming = {
  fadeInStart: 0.08,
  fadeInEnd: 0.2,
  fadeOutStart: 0.42,
  hiddenBy: 0.55,
};

const clamp = (value, minimum = 0, maximum = 1) => Math.min(Math.max(value, minimum), maximum);
const rangeProgress = (value, start, end) => clamp((value - start) / (end - start));

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
    <div className="theme-control" role="group" aria-label="Choose time of day">
      <button aria-pressed={theme === "day"} onClick={() => onChange("day")}>DAY</button>
      <span aria-hidden="true" />
      <button aria-pressed={theme === "dusk"} onClick={() => onChange("dusk")}>DUSK</button>
    </div>
  );
}

function ProgressiveMedia({ poster, alt, priority = false, className = "", videoSrc, vimeoId, iframeRef, onVimeoLoad }) {
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
          ref={iframeRef}
          className="media-motion media-vimeo"
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&title=0&byline=0&portrait=0&api=1&player_id=destination-film`}
          title="Da Nang moving landscape"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex="-1"
          aria-hidden="true"
          onLoad={() => {
            setReady(true);
            onVimeoLoad?.();
          }}
        />
      ) : null}
    </div>
  );
}

function DestinationSection() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const iframeRef = useRef(null);
  const soundEnabledRef = useRef(false);
  const currentTime = useRef(0);
  const playerLoaded = useRef(false);
  const playbackStartedAt = useRef(null);
  const hasPlayerTime = useRef(false);
  const dismissed = useRef(false);
  const beforeSection = useRef(true);
  const animationFrame = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundControlVisible, setSoundControlVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  const sendVimeoMessage = (method, value) => {
    iframeRef.current?.contentWindow?.postMessage({ method, value }, "https://player.vimeo.com");
  };

  const registerVimeoEvents = () => {
    sendVimeoMessage("addEventListener", "timeupdate");
    sendVimeoMessage("addEventListener", "playProgress");
    sendVimeoMessage("addEventListener", "ended");
  };

  const setDestinationSound = (enabled) => {
    soundEnabledRef.current = enabled;
    setSoundEnabled(enabled);
    sendVimeoMessage("setMuted", !enabled);
    sendVimeoMessage("setVolume", enabled ? 1 : 0);
    if (enabled) sendVimeoMessage("play");
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      setSoundControlVisible(entry.isIntersecting);
      if (!entry.isIntersecting && soundEnabledRef.current) setDestinationSound(false);
    }, { threshold: 0.05 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (soundEnabledRef.current) setDestinationSound(false);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy || reduceMotion) return;

    const renderOpacity = () => {
      animationFrame.current = 0;
      const bounds = section.getBoundingClientRect();
      const scrollDistance = Math.max(bounds.height - window.innerHeight, 1);
      const scrollProgress = clamp(-bounds.top / scrollDistance);

      if (bounds.top >= window.innerHeight) {
        beforeSection.current = true;
      } else if (beforeSection.current && bounds.bottom > 0) {
        beforeSection.current = false;
        dismissed.current = false;
        currentTime.current = 0;
        hasPlayerTime.current = false;
        playbackStartedAt.current = playerLoaded.current ? performance.now() : null;
        sendVimeoMessage("setCurrentTime", 0);
        sendVimeoMessage("play");
      }

      const scrollAppearance = rangeProgress(
        scrollProgress,
        destinationScrollTiming.fadeInStart,
        destinationScrollTiming.fadeInEnd,
      );
      const timeAppearance = rangeProgress(
        currentTime.current,
        destinationTypographyTiming.fadeInStart,
        destinationTypographyTiming.fadeInEnd,
      );
      const scrollFadeOut = rangeProgress(
        scrollProgress,
        destinationScrollTiming.fadeOutStart,
        destinationScrollTiming.hiddenBy,
      );
      const timeFadeOut = rangeProgress(
        currentTime.current,
        destinationTypographyTiming.fadeOutStart,
        destinationTypographyTiming.fadeOutEnd,
      );

      if (
        scrollProgress >= destinationScrollTiming.hiddenBy ||
        currentTime.current >= destinationTypographyTiming.fadeOutEnd ||
        currentTime.current >= destinationTypographyTiming.hiddenBy
      ) {
        dismissed.current = true;
      }

      const appearance = Math.max(scrollAppearance, timeAppearance);
      const fadeOut = Math.max(scrollFadeOut, timeFadeOut);
      const opacity = dismissed.current ? 0 : appearance * (1 - fadeOut);
      copy.style.setProperty("--destination-copy-opacity", opacity.toFixed(3));
      copy.dataset.phase = dismissed.current ? "hidden" : opacity >= 0.99 ? "visible" : opacity > 0 ? "transitioning" : "waiting";
    };

    const requestRender = () => {
      if (!animationFrame.current) animationFrame.current = window.requestAnimationFrame(renderOpacity);
    };

    const onVimeoMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com" || event.source !== iframeRef.current?.contentWindow) return;
      let message = event.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch {
          return;
        }
      }

      if (message?.event === "timeupdate" || message?.event === "playProgress") {
        const seconds = Number(message.data?.seconds);
        if (Number.isFinite(seconds)) {
          hasPlayerTime.current = true;
          currentTime.current = seconds;
        }
        requestRender();
      } else if (message?.method === "getCurrentTime") {
        const seconds = Number(message.value);
        if (Number.isFinite(seconds)) {
          hasPlayerTime.current = true;
          currentTime.current = seconds;
        }
        requestRender();
      } else if (message?.event === "ended") {
        dismissed.current = true;
        requestRender();
      } else if (message?.event === "ready") {
        registerVimeoEvents();
      }
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    window.addEventListener("message", onVimeoMessage);
    const timePoll = window.setInterval(() => {
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        sendVimeoMessage("getCurrentTime");
        if (!hasPlayerTime.current && playbackStartedAt.current) {
          currentTime.current = Math.max(0, (performance.now() - playbackStartedAt.current) / 1000);
          requestRender();
        }
      }
    }, 250);
    renderOpacity();

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      window.removeEventListener("message", onVimeoMessage);
      window.clearInterval(timePoll);
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="destination" aria-labelledby="destination-title">
      <div className="destination-stage">
        <ProgressiveMedia
          poster={DA_NANG_VIDEO_POSTER}
          alt="A bright Pacific beach and mountain coastline in Da Nang"
          vimeoId={DA_NANG_VIMEO_ID}
          iframeRef={iframeRef}
          onVimeoLoad={() => {
            playerLoaded.current = true;
            playbackStartedAt.current = performance.now();
            registerVimeoEvents();
          }}
        />
        <div className="destination-overlay" aria-hidden="true" />
        <div ref={copyRef} className="destination-copy" data-phase={reduceMotion ? "static" : "waiting"}>
          <h2 id="destination-title"><span>CITY.</span><span>SEA.</span><span>MOUNTAIN.</span></h2>
          <p>Da Nang, between salt air and ancient stone.</p>
        </div>
        {!reduceMotion ? (
          <button
            className={`destination-sound${soundControlVisible ? " is-visible" : ""}`}
            type="button"
            aria-label={soundEnabled ? "Mute the Da Nang destination film" : "Play the Da Nang destination film with sound"}
            aria-pressed={soundEnabled}
            onClick={() => setDestinationSound(!soundEnabledRef.current)}
          >
            <span className="destination-sound-indicator" aria-hidden="true" />
            <span>{soundEnabled ? "MUTE" : "PLAY SOUND"}</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}

function MediaPlaceholder({ label, alt }) {
  return (
    <div className="sense-frame media-placeholder" role="img" aria-label={alt}>
      {process.env.NODE_ENV !== "production" ? <span>{label}</span> : null}
    </div>
  );
}

function sendYouTubeCommand(frame, func) {
  frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "https://www.youtube-nocookie.com");
}

function SoundListeningStage({ media }) {
  const frameRef = useRef(null);
  const filmRef = useRef(null);
  const meditationRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const [mode, setMode] = useState("silent");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting) {
        sendYouTubeCommand(filmRef, "mute");
        sendYouTubeCommand(meditationRef, "pauseVideo");
        setMode("silent");
      }
    }, { rootMargin: "120px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const selectFilmSound = () => {
    if (mode === "film") {
      sendYouTubeCommand(filmRef, "mute");
      setMode("silent");
      return;
    }
    sendYouTubeCommand(meditationRef, "pauseVideo");
    sendYouTubeCommand(filmRef, "unMute");
    sendYouTubeCommand(filmRef, "playVideo");
    setMode("film");
  };

  const selectMeditation = () => {
    sendYouTubeCommand(filmRef, "mute");
    if (mode === "meditation") {
      sendYouTubeCommand(meditationRef, "pauseVideo");
      setMode("silent");
      return;
    }
    setMode("meditation");
  };

  const loadFilm = inView && (!reduceMotion || mode === "film");

  return (
    <div className={`sense-frame sound-listening-stage${filmReady ? " film-ready" : ""}${mode === "meditation" ? " meditation-active" : ""}`} ref={frameRef}>
      <Image className="sense-art sound-poster sound-poster-mobile" src={media.poster} alt={media.alt} fill sizes="(max-width: 767px) 100vw, 1px" />
      <Image className="sense-art sound-poster sound-poster-desktop" src={media.filmPoster} alt="Preview frame from the selected Vietnamese SOUND film" fill sizes="(max-width: 767px) 1px, 100vw" />
      {loadFilm ? (
        <iframe
          ref={filmRef}
          className="sound-film"
          src={`https://www.youtube-nocookie.com/embed/${media.filmId}?autoplay=1&mute=${mode === "film" ? "0" : "1"}&controls=0&loop=1&playlist=${media.filmId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
          title="Vietnam scenic relaxation film"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex="-1"
          aria-hidden="true"
          onLoad={() => {
            setFilmReady(true);
            if (mode === "film") {
              sendYouTubeCommand(filmRef, "unMute");
            } else {
              sendYouTubeCommand(filmRef, "mute");
            }
            sendYouTubeCommand(filmRef, "playVideo");
          }}
        />
      ) : null}
      <div className="sound-screen" aria-hidden="true" />
      {mode === "meditation" ? (
        <div className="sound-meditation-player">
          <iframe
            ref={meditationRef}
            src={`https://www.youtube-nocookie.com/embed/${media.meditationId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
            title="Full-length Tibetan sound meditation sample"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : null}
      <div className="sound-stage-controls" role="group" aria-label="Choose the SOUND listening source">
        <button className="sound-film-control" type="button" aria-pressed={mode === "film"} onClick={selectFilmSound}>
          <span className="sound-control-indicator" aria-hidden="true" />
          {mode === "film" ? "MUTE FILM" : "FILM SOUND"}
        </button>
        <button className="radiant-action sound-meditate-control" type="button" aria-pressed={mode === "meditation"} onClick={selectMeditation}>
          {mode === "meditation" ? "END MEDITATION" : "MEDITATE NOW"}
        </button>
      </div>
      <p className="sound-source-note" aria-live="polite">
        {mode === "meditation" ? "Tibetan sound meditation · External YouTube recording" : "Vietnam scenic film · External YouTube recording"}
      </p>
    </div>
  );
}

function CreateArtistVoice() {
  const sectionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setListening(false);
    }, { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="create-extras" ref={sectionRef} aria-labelledby="artist-voice-title">
      <div className="create-credit">
        <p>Fine art · Daniel Stanford</p>
        <a href="https://danielstanford.art/" target="_blank" rel="noopener noreferrer">
          Go deeper · Explore the full series <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="create-listening">
        <p className="create-listening-label">Listening sample · External recording</p>
        <h4 id="artist-voice-title">Finding your artist voice.</h4>
        {listening ? (
          <div className="create-listening-player">
            <iframe
              src="https://www.youtube-nocookie.com/embed/xIGJZ4ydEgQ?autoplay=1&playsinline=1&rel=0&modestbranding=1"
              title="Finding Your Artist Voice listening sample"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : null}
        <button className="radiant-action create-listening-control" type="button" aria-pressed={listening} onClick={() => setListening((active) => !active)}>
          {listening ? "END LISTENING" : "LISTEN NOW"}
        </button>
        <p className="create-listening-source">Motivation2Study · YouTube</p>
      </div>
    </aside>
  );
}

function YouTubeVisual({ media, chapter }) {
  const frameRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sense-frame sense-frame-${chapter} youtube-visual${ready ? " film-ready" : ""}`}
      ref={frameRef}
      style={{ "--focal-mobile": media.focalPointMobile, "--focal-desktop": media.focalPointDesktop }}
    >
      <Image className="sense-art sense-poster" src={media.poster} alt={media.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
      {inView && !reduceMotion ? (
        <iframe
          className="sensory-youtube-film"
          src={`https://www.youtube-nocookie.com/embed/${media.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${media.videoId}&playsinline=1&rel=0&modestbranding=1`}
          title={`ASCENSION ${chapter.toUpperCase()} film`}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex="-1"
          aria-hidden="true"
          onLoad={() => setReady(true)}
        />
      ) : null}
      <div className="sensory-youtube-screen" aria-hidden="true" />
      <p className="sensory-youtube-note">Selected {chapter.toUpperCase()} film · External YouTube recording</p>
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

  if (chapter === "sound") {
    return <SoundListeningStage media={media} />;
  }

  if (media.type === "youtube") {
    return <YouTubeVisual media={media} chapter={chapter} />;
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
            <a href="#dien-chan">Diện Chẩn</a>
            <a href="/about">About</a>
            <a href="#attendance">Attend</a>
          </div>
        </nav>

        <button
          className="mobile-menu-toggle entrance entrance-nav"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
          <nav aria-label="Mobile navigation">
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#dien-chan" onClick={() => setMenuOpen(false)}>Diện Chẩn</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#attendance" onClick={() => setMenuOpen(false)}>Attend</a>
            <a href="#facilitate" onClick={() => setMenuOpen(false)}>Facilitate</a>
          </nav>
          <a className="radiant-action mobile-menu-reserve" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
        </div>

        <div className="hero-frame">
          <h1 className="hero-title entrance entrance-title">ASCENSION</h1>
          <p className="hero-proposition entrance entrance-proposition">Come back to your senses.</p>
          <div className="hero-offer entrance entrance-place">
            <p className="hero-place">Da Nang, Vietnam<br />January 12–26, 2027</p>
            <p className="hero-description">{isMobile === false ? en.hero.desktop : en.hero.mobile}</p>
          </div>
          <div className="hero-actions entrance entrance-controls">
            <a className="hero-primary radiant-action" href="#senses">Embody it</a>
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
    <a className={`mobile-reserve radiant-action ${visible ? "is-visible" : ""}`} href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">
      Reserve your place · from $1,200
    </a>
  );
}

function EcstaticDanceExperience({ isMobile }) {
  const experience = en.ecstaticDance;
  const paragraphs = isMobile === false ? experience.desktop : [experience.mobile];

  return (
    <aside className="ecstatic-dance" aria-labelledby="ecstatic-dance-title">
      <div className="ecstatic-intro">
        <h4 id="ecstatic-dance-title">MOVE</h4>
        <p className="ecstatic-label">{experience.label}</p>
        <p className="ecstatic-subtitle">{experience.title}</p>
        {paragraphs.map((paragraph) => <p className="ecstatic-description" key={paragraph}>{paragraph}</p>)}
        <p className="experience-status">{experience.status}</p>
      </div>
      <ol className="movement-arc" aria-label="Ecstatic Dance experience arc">
        {experience.arc.map((step, index) => (
          <li key={step.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h5>{step.label}</h5>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function FoundationSection({ isMobile }) {
  const foundation = en.foundation;
  return (
    <section className="foundation" id="dien-chan" aria-labelledby="foundation-title">
      <div className="foundation-visual">
        <Image
          src={DIEN_CHAN_VISUAL}
          alt="Needle-free Diện Chẩn reflexology and acupressure treatment"
          fill
          sizes="(max-width: 767px) 100vw, 52vw"
        />
      </div>
      <div className="foundation-copy">
        <p className="foundation-kicker">{foundation.eyebrow}</p>
        <h2 id="foundation-title">{foundation.title}</h2>
        <p>{isMobile === false ? foundation.desktop : foundation.mobile}</p>
        <details>
          <summary>Go deeper <span aria-hidden="true">→</span></summary>
          <div className="foundation-details">
            {foundation.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="medical-note">{foundation.disclaimer}</p>
          </div>
        </details>
      </div>
    </section>
  );
}

function ParticipationPrinciples() {
  const participation = en.participation;
  return (
    <section className="participation" aria-labelledby="participation-title">
      <div>
        <p className="participation-kicker">{participation.eyebrow}</p>
        <h2 id="participation-title">{participation.title}</h2>
        <p>{participation.copy}</p>
      </div>
      <ul>
        {participation.principles.map((principle) => <li key={principle}>{principle}</li>)}
      </ul>
    </section>
  );
}

function PractitionerInvitation({ isMobile }) {
  const practitioner = en.practitioner;
  return (
    <section className="practitioner-invitation" id="facilitate" aria-labelledby="practitioner-title">
      <h2 id="practitioner-title">Facilitators</h2>
      <p className="practitioner-subtitle">{practitioner.title}</p>
      <p className="practitioner-description">{isMobile === false ? practitioner.desktop : practitioner.mobile}</p>
      <a className="practitioner-action radiant-action" href={PRACTITIONER_APPLICATION}>Apply to facilitate <span aria-hidden="true">→</span></a>
    </section>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <p className="faq-kicker">Before you arrive</p>
      <h2 id="faq-title">Questions,<br />answered.</h2>
      <div className="faq-list">
        {faqItems.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState("day");
  const isMobile = useMobileLayout();

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
            <h2 id="awaken-title">Da Nang,<br />Vietnam</h2>
            <p className="awaken-subtitle">The experience,<br />at a glance.</p>
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

        <section className="main-introduction" id="experience" aria-labelledby="introduction-title">
          <div>
            <h2 id="introduction-title">{en.introduction.title}</h2>
            <div className="introduction-copy">
              {(isMobile === false ? en.introduction.desktop : [en.introduction.mobile]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <ol className="introduction-progression" aria-label="The ASCENSION progression">
            {en.introduction.progression.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <DestinationSection />

        <FoundationSection isMobile={isMobile} />

        <section className="wider-program" aria-labelledby="wider-program-title">
          <h2 id="wider-program-title">{en.widerProgram.title}</h2>
          <p>{isMobile === false ? en.widerProgram.desktop : en.widerProgram.mobile}</p>
        </section>

        <section className="sensory-framework" id="senses" aria-labelledby="senses-title">
          <div className="sense-intro">
            <h2 id="senses-title">Six ways into<br />the present.</h2>
          </div>
          <div className="sensory-stories" role="group" aria-label="The six senses of ASCENSION">
            {en.sensoryStories.map((story, index) => {
              const media = sensoryMedia[story.id];
              const alignment = {
                embody: "left",
                see: "right",
                sound: "left",
                taste: "left",
                breathe: "center",
                create: "right",
              }[story.id];
              return (
                <article className={`sensory-story sensory-story-${index + 1}`} id={story.id} key={story.name}>
                  {story.id === "sound" || story.id === "breathe" ? <SensoryMedia media={media} chapter={story.id} /> : null}
                  <header className="sensory-story-heading">
                    <div className={`sensory-story-lockup sensory-lockup-${alignment}`}>
                      <h3 className="sensory-story-name">{story.name}</h3>
                      <p className="sensory-story-keywords">{story.keywords}</p>
                      <p className="sensory-story-subtitle">{story.title}</p>
                    </div>
                    {story.id !== "sound" && story.id !== "breathe" ? <SensoryMedia media={media} chapter={story.id} /> : null}
                  </header>
                  <div className="sensory-story-copy">
                    {story.quote ? <blockquote>{story.quote}</blockquote> : null}
                    <p>{isMobile === false ? story.desktop : story.mobile}</p>
                    {story.href ? (
                      <a className="sensory-link" href={story.href}>{story.cta} <span aria-hidden="true">→</span></a>
                    ) : (
                      <details>
                        <summary>{story.cta} <span aria-hidden="true">→</span></summary>
                        <p>{story.details}</p>
                      </details>
                    )}
                    {story.id === "create" ? <CreateArtistVoice /> : null}
                  </div>
                  {story.id === "embody" ? <EcstaticDanceExperience isMobile={isMobile} /> : null}
                </article>
              );
            })}
          </div>
        </section>

        <ParticipationPrinciples />

        <section className="model" aria-labelledby="model-title">
          <div className="model-title-wrap">
            <p className="model-kicker">Your Ascension Passport</p>
            <h2 id="model-title">Your experience.<br /><em>Your rhythm.</em></h2>
          </div>
          <div className="model-copy">
            <p className="model-lead">Follow a curated program without losing your freedom.</p>
            <p>Your ASCENSION Passport opens confirmed shared experiences while leaving room to rest, explore Da Nang and choose optional private sessions. Planned programming is identified separately until facilitators and schedules are confirmed.</p>
          </div>
          <div className="model-categories" id="inclusions" role="group" aria-label="What your Ascension Passport opens">
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
            <h2 id="rhythm-title">A rhythm,<br />not a rigid schedule.</h2>
            <p>{isMobile === false ? "Mornings may begin with movement, breath or Diện Chẩn. Days open into restorative practices, food, cultural discovery and creative experience. As the sun lowers, the rhythm may shift toward sound baths, Ecstatic Dance, shared tables, reflection or quiet by the sea." : "Mornings may begin with movement, breath or Diện Chẩn. Days open into food, culture, creativity and restoration. Evenings may bring sound, dance, community or quiet. Every day leaves room to choose."}</p>
          </div>
          <div className="rhythm-list" role="group" aria-label="An illustrative daily rhythm">
            <article><p className="rhythm-time">Morning</p><p className="rhythm-detail">Movement · Breath · Ocean</p></article>
            <article><p className="rhythm-time">Midday</p><p className="rhythm-detail">Restore · Explore · Create</p></article>
            <article><p className="rhythm-time">Sunset</p><p className="rhythm-detail">Sound · Shared Table · Connection</p></article>
            <article><p className="rhythm-time">Your Time</p><p className="rhythm-detail">Beach · Spa · City · Rest · Private Sessions</p></article>
          </div>
          <p className="rhythm-note">ASCENSION is curated, not prescribed.</p>
        </section>

        <section className="host-story" aria-labelledby="host-title">
          <div className="host-story-media">
            <Image src={DANIEL_PORTRAIT} alt="Portrait of Daniel Stanford beneath tropical trees in Da Nang" fill sizes="(max-width: 767px) 100vw, 40vw" />
            <span>Daniel Stanford · Da Nang</span>
          </div>
          <div className="host-story-copy">
            <p className="host-kicker">Why I created ASCENSION</p>
            <h2 id="host-title">Experienced before it was offered.</h2>
            <p>ASCENSION grew from my personal journey through movement, creativity, traditional Vietnamese wellness and life in Da Nang.</p>
            <p>Built around Diện Chẩn and expanded through selected practitioners, it is an immersive happening designed to awaken the body, senses and imagination.</p>
            <a className="text-action" href="/about">Read my story <span aria-hidden="true">→</span></a>
          </div>
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

        <PractitionerInvitation isMobile={isMobile} />

        <FrequentlyAskedQuestions />

        <section className="attendance" id="attendance" aria-labelledby="attendance-title">
          <div className="attendance-heading">
            <h2 id="attendance-title">Reserve your<br />Ascension.</h2>
            <p>Programs begin at USD $1,200. A $300 deposit currently reserves your place.</p>
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
            <a className="reserve-action radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
            <a className="question-action" href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">Ask a question <span aria-hidden="true">→</span></a>
          </div>
          <p className="deposit">The active checkout requests a USD $300 reservation deposit.</p>
        </section>

        <section className="series-positioning" aria-labelledby="series-title">
          <div className="series-intro">
            <h2 id="series-title">One idea.<br />Many places.</h2>
            <p>ASCENSION is not a single retreat. It’s a travelling series of curated editions — each built around wellbeing, movement, sound and place, and each shaped by where it lands.</p>
          </div>
          <div className="series-editions" role="group" aria-label="ASCENSION series editions">
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
            className="series-inquiry radiant-action"
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
            <p>{isMobile === false ? en.finalCta.desktop : en.finalCta.mobile}</p>
            <div className="join-actions">
              <a className="radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">Reserve your place <span aria-hidden="true">→</span></a>
              <a className="join-question" href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">Ask a question <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <footer>
            <span>ASCENSION SENSES · Edition 01</span>
            <div>
              <a href="/about">About</a>
              <a href="/#experience">Experience</a>
              <a href="/#dien-chan">Diện Chẩn</a>
              <a href="/#attendance">Attend</a>
              <a href="/#facilitate">Facilitate</a>
              <a href="/partners">Partners</a>
              <a href="/partners/sponsorship">Sponsors</a>
              <a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Enquiry">Contact</a>
              <a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Privacy">Privacy</a>
              <a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Terms">Terms</a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
