"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./_components/language-selector";
import HostHotel from "./_components/host-hotel";
import { sensoryMedia } from "./sensory-media";
import { en, faqItems, passportCategories } from "../content/en";
import { vi, viFaqItems, viPassportCategories, viUi } from "../content/vi";
import { translatedContent, translatedFaq, translatedLower, translatedPassport, translatedUi } from "../content/other-locales";
import { JsonLd, homeStructuredData } from "./seo";

const HERO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png";
const HERO_MASTER =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4";
const HERO_COMPAT =
  "https://res.cloudinary.com/dno3ruh4b/video/upload/ac_none/vc_h264:high:4.1/f_mp4/q_auto:best/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4";
const DA_NANG_VIMEO_ID = "1221665573";
const DA_NANG_VIDEO_POSTER =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787489954/Screen_Shot_2026-08-23_at_8.59.05_AM_e8jceq.png";
const DA_NANG_FILM =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/v1788060868/Screen_Shot_2026-08-29_at_11.33.44_PM_dyhsom.png";
const DIEN_CHAN_VISUAL =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787672842/hf_20260825_154036_0f54f781-11e4-4fd2-bc2e-b20f07766ac2_tuvnzo.png";
const DANIEL_PORTRAIT =
  "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1788490840/Daniel_A_S_portrait_Aug_22_D80_8451_crop_mqftfl.jpg";

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

function ThemeControl({ theme, onChange, labels = { day: "DAY", dusk: "DUSK" } }) {
  return (
    <div className="theme-control" role="group" aria-label="Choose time of day">
      <button aria-pressed={theme === "day"} onClick={() => onChange("day")}>{labels.day}</button>
      <span aria-hidden="true" />
      <button aria-pressed={theme === "dusk"} onClick={() => onChange("dusk")}>{labels.dusk}</button>
    </div>
  );
}

function ProgressiveMedia({ poster, alt, priority = false, className = "", videoSrc, vimeoId, iframeRef, onVimeoLoad }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const vimeoFrameRef = useRef(null);
  const onVimeoLoadRef = useRef(onVimeoLoad);
  const [ready, setReady] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onVimeoLoadRef.current = onVimeoLoad;
  }, [onVimeoLoad]);

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

  useEffect(() => {
    if (!vimeoId) return;
    const onMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com" || event.source !== vimeoFrameRef.current?.contentWindow) return;
      let message = event.data;
      if (typeof message === "string") {
        try { message = JSON.parse(message); } catch { return; }
      }
      if (message?.event === "ready") {
        vimeoFrameRef.current?.contentWindow?.postMessage({ method: "addEventListener", value: "play" }, "https://player.vimeo.com");
        vimeoFrameRef.current?.contentWindow?.postMessage({ method: "addEventListener", value: "bufferstart" }, "https://player.vimeo.com");
        vimeoFrameRef.current?.contentWindow?.postMessage({ method: "addEventListener", value: "bufferend" }, "https://player.vimeo.com");
        onVimeoLoadRef.current?.();
      } else if (message?.event === "play" || message?.event === "bufferend") {
        setReady(true);
      } else if (message?.event === "bufferstart") {
        setReady(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [vimeoId]);

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
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          onPlaying={() => setReady(true)}
          onWaiting={() => setReady(false)}
          onStalled={() => setReady(false)}
          onError={() => setReady(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      {vimeoId && posterLoaded && inView && !reduceMotion ? (
        <iframe
          ref={(node) => {
            vimeoFrameRef.current = node;
            if (iframeRef) iframeRef.current = node;
          }}
          className="media-motion media-vimeo"
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&title=0&byline=0&portrait=0&api=1&player_id=destination-film`}
          title="Da Nang moving landscape"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex="-1"
          aria-hidden="true"
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
    // Sound teardown intentionally reads the current callback and mutable player refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Vimeo registration intentionally stays scoped to this single player lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    const onYouTubeMessage = (event) => {
      if (event.origin !== "https://www.youtube-nocookie.com" || event.source !== filmRef.current?.contentWindow) return;
      let message = event.data;
      if (typeof message === "string") {
        try { message = JSON.parse(message); } catch { return; }
      }
      if (message?.event === "onStateChange") {
        if (message.info === 1) setFilmReady(true);
        if (message.info === 3 || message.info === -1) setFilmReady(false);
      }
    };
    window.addEventListener("message", onYouTubeMessage);
    return () => window.removeEventListener("message", onYouTubeMessage);
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
            filmRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: "ascension-sound-film" }), "https://www.youtube-nocookie.com");
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
        {mode === "meditation" ? "Tibetan sound meditation · Full listening experience" : "Vietnam scenic film · Sound available"}
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
        <p className="create-listening-label">Guided listening</p>
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
        <p className="create-listening-source">Featured recording · Motivation2Study</p>
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
      <p className="sensory-youtube-note">Featured {chapter.toUpperCase()} film</p>
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

function MobileSenseDisclosure({ storyId, details, labels }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `${storyId}-mobile-details`;
  const buttonId = `${storyId}-mobile-disclosure`;

  return (
    <div className={`mobile-sense-disclosure${expanded ? " is-expanded" : ""}`}>
      <button
        id={buttonId}
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? labels.less : labels.more}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div id={detailsId} className="mobile-sense-details" role="region" aria-labelledby={buttonId} aria-hidden={!expanded}>
        <div><p>{details}</p></div>
      </div>
    </div>
  );
}

function ScrollHeroMedia({ videoRef, isMobile, motionReady, onLoadedMetadata, onCanPlay, onPlaying, onWaiting, onSeeking, onSeeked, onError }) {
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
          preload="auto"
          poster={HERO_POSTER}
          aria-hidden="true"
          tabIndex="-1"
          onLoadedMetadata={onLoadedMetadata}
          onCanPlay={onCanPlay}
          onPlaying={onPlaying}
          onWaiting={onWaiting}
          onStalled={onWaiting}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onError={onError}
        >
          <source src={HERO_COMPAT} type='video/mp4; codecs="avc1"' />
          <source src={HERO_MASTER} type='video/mp4; codecs="hvc1"' />
        </video>
      ) : null}
    </div>
  );
}

function Hero({ theme, setTheme, copy, ui, locale }) {
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

  useEffect(() => {
    if (!isMobile) return;

    let unlockInFlight = false;

    const removeUnlockListeners = () => {
      window.removeEventListener("touchstart", unlockMobileVideo);
      window.removeEventListener("pointerdown", unlockMobileVideo);
      window.removeEventListener("scroll", unlockMobileVideo);
    };

    const unlockMobileVideo = () => {
      const video = videoRef.current;
      if (!video || unlockInFlight) return;

      video.muted = true;
      video.playsInline = true;
      unlockInFlight = true;
      video.play().then(() => {
        removeUnlockListeners();
        if (metadataReady.current && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          canPlayReady.current = true;
          setMotionReady(true);
        }
      }).catch(() => {
        unlockInFlight = false;
      });
    };

    window.addEventListener("touchstart", unlockMobileVideo, { passive: true });
    window.addEventListener("pointerdown", unlockMobileVideo, { passive: true });
    window.addEventListener("scroll", unlockMobileVideo, { passive: true });

    return removeUnlockListeners;
  }, [isMobile]);

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
            if (!isMobile) enableMotionWhenReady();
            if (isMobile) videoRef.current?.play().catch(() => {});
          }}
          onPlaying={() => {
            if (metadataReady.current && canPlayReady.current) setMotionReady(true);
          }}
          onWaiting={() => {
            if (!metadataReady.current || !canPlayReady.current) setMotionReady(false);
          }}
          onSeeking={() => {
            seekInFlight.current = true;
          }}
          onSeeked={() => {
            seekInFlight.current = false;
            if (metadataReady.current && canPlayReady.current) setMotionReady(true);
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
          <Link className="wordmark" href={locale === "vi" ? "/vi" : "/"}>ASCENSION</Link>
          <div className="nav-links">
            <a href="#experience">{ui.nav.experience}</a>
            <Link href={locale === "vi" ? "/vi/dien-chan" : "/dien-chan"}>Diện Chẩn</Link>
            <Link href={locale === "vi" ? "/vi/about" : "/about"}>{ui.nav.about}</Link>
            <Link href={locale === "vi" ? "/vi/attend" : "/attend"}>{ui.nav.attend}</Link>
          </div>
          <LanguageSelector className="language-selector-desktop" />
        </nav>

        <button
          className="mobile-menu-toggle entrance entrance-nav"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? ui.nav.close : ui.nav.menu}</span>
          <i aria-hidden="true" />
        </button>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
          <nav aria-label="Mobile navigation">
            <a href="#experience" onClick={() => setMenuOpen(false)}>{ui.nav.experience}</a>
            <Link href={locale === "vi" ? "/vi/dien-chan" : "/dien-chan"} onClick={() => setMenuOpen(false)}>Diện Chẩn</Link>
            <Link href={locale === "vi" ? "/vi/about" : "/about"} onClick={() => setMenuOpen(false)}>{ui.nav.about}</Link>
            <Link href={locale === "vi" ? "/vi/attend" : "/attend"} onClick={() => setMenuOpen(false)}>{ui.nav.attend}</Link>
            <Link href={locale === "vi" ? "/vi/facilitate" : "/facilitate"} onClick={() => setMenuOpen(false)}>{ui.nav.facilitate}</Link>
          </nav>
          <LanguageSelector className="language-selector-mobile" />
          <a className="radiant-action mobile-menu-reserve" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">{ui.reserve} <span aria-hidden="true">→</span></a>
        </div>

        <div className="hero-frame">
          <p className="hero-series-eyebrow entrance entrance-place">{ui.series}</p>
          <h1 className="hero-title entrance entrance-title">ASCENSION</h1>
          <p className="hero-proposition entrance entrance-proposition"><span>{ui.slogan[0]}</span><span>{ui.slogan[1]}</span></p>
          <div className="hero-offer entrance entrance-place">
            <p className="hero-place">{ui.place}<br />{ui.dates}</p>
            <p className="hero-description">{isMobile === false ? copy.hero.desktop : copy.hero.mobile}</p>
          </div>
          <div className="hero-actions entrance entrance-controls">
            <a className="hero-primary radiant-action" href="#senses">{ui.embody}</a>
            <a className="hero-explore" href="#awaken">{ui.explore} <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-theme entrance entrance-controls">
          <ThemeControl theme={theme} onChange={setTheme} labels={ui} />
        </div>
      </div>
    </header>
  );
}

function MobileReserveBar({ label = "Reserve your place" }) {
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
      {label}
    </a>
  );
}

function EcstaticDanceExperience({ isMobile, copy }) {
  const experience = copy.ecstaticDance;
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

function FoundationSection({ isMobile, copy, isVi }) {
  const foundation = copy.foundation;
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
        <div className="foundation-practitioner" aria-label="Confirmed Diện Chẩn practitioner">
          <span>{isVi ? "Người thực hành đã xác nhận · Diện Chẩn hằng ngày" : "Confirmed practitioner · Daily Diện Chẩn"}</span>
          <strong>Dr. Huỳnh Bảo Loan</strong>
          <small>{isVi ? "Đà Nẵng, Việt Nam" : "Da Nang, Vietnam"}</small>
        </div>
        <details>
          <summary>{isVi ? "Tìm hiểu sâu hơn" : "Go deeper"} <span aria-hidden="true">→</span></summary>
          <div className="foundation-details">
            {foundation.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="medical-note">{foundation.disclaimer}</p>
          </div>
        </details>
      </div>
    </section>
  );
}

function ParticipationPrinciples({ copy }) {
  const participation = copy.participation;
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

function PractitionerInvitation({ isMobile, copy, ui }) {
  const practitioner = copy.practitioner;
  return (
    <section className="practitioner-invitation" id="facilitate" aria-labelledby="practitioner-title">
      <h2 id="practitioner-title">{ui.facilitator}</h2>
      <p className="practitioner-subtitle">{practitioner.title}</p>
      <p className="practitioner-description">{isMobile === false ? practitioner.desktop : practitioner.mobile}</p>
      <a className="practitioner-action radiant-action" href={PRACTITIONER_APPLICATION}>{ui.apply} <span aria-hidden="true">→</span></a>
    </section>
  );
}

function FrequentlyAskedQuestions({ items = faqItems, ui }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <p className="faq-kicker">{ui.faqKicker}</p>
      <h2 id="faq-title">{ui.faqTitle.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h2>
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function HomePage({ locale = "en" }) {
  const isVi = locale === "vi";
  const translated = translatedContent[locale];
  const copy = isVi ? vi : translated || en;
  const localizedFaqItems = isVi ? viFaqItems : translatedFaq[locale] || faqItems;
  const localizedPassportCategories = isVi ? viPassportCategories : translatedPassport[locale] || passportCategories;
  const lower = translatedLower[locale];
  const ui = isVi ? viUi : translatedUi[locale] || {
    nav:{experience:"Experience",about:"About",attend:"Attend",facilitate:"Facilitate",menu:"Menu",close:"Close"}, reserve:"Reserve your place", ask:"Ask a question", embody:"Embody it", explore:"Explore the experience", day:"DAY", dusk:"DUSK", slogan:["Heal your soul.","Revive your senses."], place:"Da Nang, Vietnam", dates:"January 12–26, 2027", series:"A MODUS SERIES", glanceTitle:"Da Nang,\nVietnam", glanceSub:"The experience,\nat a glance.", glanceLead:"Choose seven days or the full fourteen between city, sea and mountain.", seven:"7 days", fourteen:"14 days", small:"Small, intimate cohort. Accommodation and travel are separate.", compare:"Compare 7 and 14 days", included:"See what’s included", entity:"ASCENSION is a seven- or fourteen-day immersive wellness and cultural happening in Da Nang, Vietnam, taking place January 12–26, 2027. It is built around Diện Chẩn, a needle-free Vietnamese system incorporating reflexology, acupressure, heat, stretching and individualized full-body therapeutic work. The wider program combines confirmed programming with planned movement, breathwork, guided meditation, sound baths, Ecstatic Dance, Vietnamese food, cultural discovery and creative expression.", sixWays:"Six ways into\nthe present.", passport:"Your Ascension Passport", experienceRhythm:"Your experience.\nYour rhythm.", curatedFreedom:"Follow a curated program without losing your freedom.", passportBody:"Your ASCENSION Passport opens confirmed shared experiences while leaving room to rest, explore Da Nang and choose optional private sessions. Planned programming is identified separately until facilitators and schedules are confirmed.", faqKicker:"Before you arrive", faqTitle:"Questions,\nanswered.", facilitator:"Facilitators", apply:"Apply to facilitate", senseDisclosure:{more:"Go deeper",less:"Show less"}, midSenseCta:"Apply to Join"
  };
  const [theme, setTheme] = useState("day");
  const isMobile = useMobileLayout();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("ascension-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    let frame;
    try {
      const saved = window.localStorage.getItem("ascension-theme");
      if (saved === "day" || saved === "dusk") frame = window.requestAnimationFrame(() => setTheme(saved));
    } catch {}
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <JsonLd data={homeStructuredData} />
      <a className="skip-link" href="#main">Skip to main content</a>
      <Hero theme={theme} setTheme={setTheme} copy={copy} ui={ui} locale={locale} />
      <MobileReserveBar label={ui.reserve} />

      <main id="main">
        <section className="awaken" id="awaken" aria-labelledby="awaken-title">
          <div className="awaken-heading">
            <h2 id="awaken-title">{ui.glanceTitle.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h2>
            <p className="awaken-subtitle">{ui.glanceSub.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</p>
          </div>
          <div className="awaken-facts">
            <p className="awaken-lead">{ui.glanceLead}</p>
            <dl>
              <div><dt>{ui.seven}</dt><dd>{isVi ? "12–19 tháng 1, 2027" : "January 12–19, 2027"} · USD $1,200</dd></div>
              <div><dt>{ui.fourteen}</dt><dd>{isVi ? "12–26 tháng 1, 2027" : "January 12–26, 2027"} · USD $2,000</dd></div>
            </dl>
            <p>{ui.small}</p>
            <div className="fact-actions">
              <a href="#comparison">{ui.compare} <span aria-hidden="true">→</span></a>
              <a href="#inclusions">{ui.included} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="main-introduction" id="experience" aria-labelledby="introduction-title">
          <div>
            <h2 id="introduction-title">{copy.introduction.title}</h2>
            <div className="introduction-copy">
              <p className="entity-definition">{ui.entity}</p>
              {(isMobile === false ? copy.introduction.desktop : [copy.introduction.mobile]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <ol className="introduction-progression" aria-label="The ASCENSION progression">
            {copy.introduction.progression.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <DestinationSection />

        <FoundationSection isMobile={isMobile} copy={copy} isVi={isVi} />

        <section className="wider-program" aria-labelledby="wider-program-title">
          <h2 id="wider-program-title">{copy.widerProgram.title}</h2>
          <p>{isMobile === false ? copy.widerProgram.desktop : copy.widerProgram.mobile}</p>
        </section>

        <section className="sensory-framework" id="senses" aria-labelledby="senses-title">
          <div className="sense-intro">
            <h2 id="senses-title">{ui.sixWays.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h2>
          </div>
          <div className="sensory-stories" role="group" aria-label="The six senses of ASCENSION">
            {copy.sensoryStories.map((story, index) => {
              const media = sensoryMedia[story.id];
              const senseCopy = { mobileSummary: story.mobile, details: story.desktop };
              const alignment = {
                embody: "left",
                see: "right",
                sound: "left",
                taste: "left",
                breathe: "center",
                create: "right",
              }[story.id];
              return (
                <Fragment key={story.name}>
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
                    <p>{isMobile === false ? story.desktop : senseCopy.mobileSummary}</p>
                    {isMobile !== false ? (
                      <MobileSenseDisclosure storyId={story.id} details={senseCopy.details} labels={ui.senseDisclosure} />
                    ) : null}
                    {story.href ? (
                      <a className="sensory-link" href={locale !== "en" ? `/${locale}${story.href}` : story.href}>{story.cta} <span aria-hidden="true">→</span></a>
                    ) : (
                      <details>
                        <summary>{story.cta} <span aria-hidden="true">→</span></summary>
                        <p>{story.details}</p>
                      </details>
                    )}
                    {story.id === "create" ? <CreateArtistVoice /> : null}
                  </div>
                  {story.id === "embody" ? <EcstaticDanceExperience isMobile={isMobile} copy={copy} /> : null}
                </article>
                {index === 2 ? (
                  <div className="mobile-mid-senses-cta">
                    <a className="radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">
                      {ui.midSenseCta} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ) : null}
                </Fragment>
              );
            })}
          </div>
        </section>

        <ParticipationPrinciples copy={copy} />

        <section className="model" aria-labelledby="model-title">
          <div className="model-title-wrap">
            <p className="model-kicker">{ui.passport}</p>
            <h2 id="model-title">{ui.experienceRhythm.split("\n").map((line, index) => index === 0 ? <span key={line}>{line}<br /></span> : <em key={line}>{line}</em>)}</h2>
          </div>
          <div className="model-copy">
            <p className="model-lead">{ui.curatedFreedom}</p>
            <p>{ui.passportBody}</p>
          </div>
          <div className="model-categories" id="inclusions" role="group" aria-label="What your Ascension Passport opens">
            {localizedPassportCategories.map((category) => (
              <article className="model-category" key={category.name}>
                <h3>{category.name}</h3>
                <p>{category.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rhythm" id="program" aria-labelledby="rhythm-title">
          <div className="rhythm-heading">
            <h2 id="rhythm-title">{lower?.rhythmTitle || (isVi ? "Một nhịp điệu, không phải lịch trình cứng nhắc." : "A rhythm, not a rigid schedule.")}</h2>
            <p>{lower?.rhythm || (isVi ? "Buổi sáng có thể bắt đầu bằng chuyển động, hơi thở hoặc Diện Chẩn. Ban ngày mở ra ẩm thực, văn hóa, sáng tạo và phục hồi. Buổi tối có thể là âm thanh, khiêu vũ, cộng đồng hoặc sự yên tĩnh." : "Mornings may begin with movement, breath or Diện Chẩn. Days open into food, culture, creativity and restoration. Evenings may bring sound, dance, community or quiet.")}</p>
          </div>
          <div className="rhythm-list" role="group" aria-label="An illustrative daily rhythm">
            {(lower?.times || (isVi ? [["Buổi sáng","Chuyển động · Hơi thở · Đại dương"],["Buổi trưa","Phục hồi · Khám phá · Sáng tạo"],["Hoàng hôn","Âm thanh · Bàn ăn chung · Kết nối"],["Thời gian của bạn","Biển · Spa · Thành phố · Nghỉ ngơi · Buổi riêng"]] : [["Morning","Movement · Breath · Ocean"],["Midday","Restore · Explore · Create"],["Sunset","Sound · Shared Table · Connection"],["Your Time","Beach · Spa · City · Rest · Private Sessions"]])).map(([time,detail]) => <article key={time}><p className="rhythm-time">{time}</p><p className="rhythm-detail">{detail}</p></article>)}
          </div>
          <p className="rhythm-note">{lower?.note || (isVi ? "ASCENSION được tuyển chọn, không áp đặt." : "ASCENSION is curated, not prescribed.")}</p>
        </section>

        <section className="host-story" aria-labelledby="host-title">
          <div className="host-story-media">
            <Image src={DANIEL_PORTRAIT} alt="Portrait of ASCENSION creator Daniel Stanford" fill sizes="(max-width: 767px) 100vw, 40vw" />
            <span>Daniel Stanford · {isVi ? "Đà Nẵng" : "Da Nang"}</span>
          </div>
          <div className="host-story-copy">
            <p className="host-kicker">{lower?.hostKicker || (isVi ? "Vì sao tôi tạo ra ASCENSION" : "Why I created ASCENSION")}</p>
            <h2 id="host-title">{lower?.hostTitle || (isVi ? "Được trải nghiệm trước khi được trao tặng." : "Experienced before it was offered.")}</h2>
            <p>{lower?.host1 || (isVi ? "ASCENSION phát triển từ hành trình cá nhân của tôi qua chuyển động, sáng tạo, chăm sóc sức khỏe truyền thống Việt Nam và cuộc sống tại Đà Nẵng." : "ASCENSION grew from my personal journey through movement, creativity, traditional Vietnamese wellness and life in Da Nang.")}</p>
            <p>{lower?.host2 || (isVi ? "Được xây quanh Diện Chẩn và mở rộng cùng những người thực hành được chọn, đây là trải nghiệm nhập vai đánh thức cơ thể, giác quan và trí tưởng tượng." : "Built around Diện Chẩn and expanded through selected practitioners, it is an immersive happening designed to awaken the body, senses and imagination.")}</p>
            <Link className="text-action" href={locale !== "en" ? `/${locale}/about` : "/about"}>{isVi ? "Đọc câu chuyện của tôi" : locale === "fr" ? "Lire mon histoire" : locale === "ko" ? "이야기 읽기" : locale === "zh-hans" ? "阅读我的故事" : "Read my story"} <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="provenance" aria-labelledby="provenance-title">
          <p className="provenance-kicker">Provenance</p>
          <h2 id="provenance-title">Curated by an editor,<br />not an operator.</h2>
          <div className="provenance-record">
            <p>Cornell Art Museum 2016 — shown alongside Warhol and Russell Young</p>
            <p>Art Basel Miami 2014–2018</p>
            <p>MIS São Paulo solo invitation, 49/50</p>
            <p>MODUS Index Authorities: Marie-Christine Gilbert PhD, National Gallery of Canada · Cleber Papa, MIS São Paulo</p>
            <a className="text-action" href="https://modus.gallery/methodology" target="_blank" rel="noopener noreferrer">Explore the MODUS methodology <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="comparison" id="comparison" aria-labelledby="comparison-title">
          <div className="comparison-heading">
            <p className="comparison-kicker">{lower?.comparisonKicker || (isVi ? "Chọn nhịp điệu của bạn" : "Choose your rhythm")}</p>
            <h2 id="comparison-title">{lower?.comparisonTitle || (isVi ? "Bảy ngày hoặc mười bốn." : "Seven days or fourteen.")}</h2>
          </div>
          <div className="comparison-options">
            <article>
              <p className="duration">{isVi ? "7 NGÀY" : "7 DAYS"}</p>
              <p className="dates">{isVi ? "12–19 tháng 1, 2027" : "January 12–19, 2027"}</p>
              <p className="price">$1,200 <small>USD · {lower?.program || (isVi ? "chương trình" : "program")}</small></p>
            </article>
            <article>
              <p className="duration">{isVi ? "14 NGÀY" : "14 DAYS"}</p>
              <p className="dates">{isVi ? "12–26 tháng 1, 2027" : "January 12–26, 2027"}</p>
              <p className="price">$2,000 <small>USD · {lower?.program || (isVi ? "chương trình" : "program")}</small></p>
            </article>
          </div>
        </section>

        <section className="travel-note" aria-labelledby="travel-title">
          <p className="travel-kicker">{lower?.stay || (isVi ? "Kỳ nghỉ theo cách của bạn" : "Your stay, your way")}</p>
          <h2 id="travel-title">{lower?.travelTitle || (isVi ? "Chương trình và nơi chốn. Chỗ ở tính riêng." : "Program and place. Accommodation is separate.")}</h2>
          <p>{lower?.travel || (isVi ? "Tự chọn và đặt khách sạn phù hợp tại Đà Nẵng. Chuyến bay, chỗ ở và di chuyển địa phương không bao gồm trong giá chương trình ASCENSION." : "Choose and book the Da Nang hotel that suits you. Flights, accommodation and local transfers are not included in the ASCENSION program price.")}</p>
        </section>

        <HostHotel />

        <PractitionerInvitation isMobile={isMobile} copy={copy} ui={ui} />

        <FrequentlyAskedQuestions items={localizedFaqItems} ui={ui} />

        <section className="attendance" id="attendance" aria-labelledby="attendance-title">
          <div className="attendance-heading">
            <h2 id="attendance-title">{lower?.attendanceTitle || (isVi ? "Đặt chỗ cho Ascension của bạn." : "Reserve your Ascension.")}</h2>
            <p>{lower?.attendanceLead || (isVi ? "Chương trình từ 1.200 USD. Khoản đặt cọc 300 USD hiện giữ chỗ của bạn." : "Programs begin at USD $1,200. A $300 deposit currently reserves your place.")}</p>
          </div>
          <div className="attendance-terms">
            <div className="attendance-included">
              <p className="terms-label">{lower?.included || (isVi ? "Bao gồm" : "Included")}</p>
              <ul>
                {(lower?.includedItems || (isVi ? ["Quyền tham gia chương trình ASCENSION được tuyển chọn qua chuyển động, phục hồi, âm thanh, vị giác, khám phá và sáng tạo","Tham gia nhóm khách chung của ASCENSION"] : ["Access to the curated ASCENSION program across movement, restoration, sound, taste, discovery and creative sessions","Participation in the shared ASCENSION cohort"])).map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="attendance-optional">
              <p className="terms-label">{lower?.optional || (isVi ? "Tùy chọn · Đặt riêng" : "Optional · Book Separately")}</p>
              <ul>
                {(lower?.optionalItems || (isVi ? ["Chỗ ở — khách tự chọn và đặt khách sạn","Chuyến bay và di chuyển địa phương","Trị liệu riêng và dịch vụ spa bổ sung","Chuyến đi, bữa ăn hoặc trải nghiệm đặc biệt bổ sung"] : ["Accommodation — guests choose and book their own hotel","Flights and local transfers","Private treatments and additional spa services","Additional excursions, meals or special experiences"])).map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="attendance-actions">
            <a className="reserve-action radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">{ui.reserve} <span aria-hidden="true">→</span></a>
            <a className="question-action" href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">{ui.ask} <span aria-hidden="true">→</span></a>
          </div>
          <p className="deposit">{lower?.deposit || (isVi ? "Trang thanh toán hiện yêu cầu khoản đặt cọc giữ chỗ 300 USD." : "The active checkout requests a USD $300 reservation deposit.")}</p>
        </section>

        <section className="series-positioning" aria-labelledby="series-title">
          <div className="series-intro">
            <h2 id="series-title">{lower?.seriesTitle || (isVi ? "Một ý tưởng. Nhiều nơi chốn." : "One idea. Many places.")}</h2>
            <p>{lower?.series || (isVi ? "ASCENSION không phải một kỳ nghỉ dưỡng duy nhất. Đây là chuỗi những phiên bản được tuyển chọn và di chuyển—mỗi kỳ được xây quanh sức khỏe, chuyển động, âm thanh và nơi chốn." : "ASCENSION is not a single retreat. It’s a travelling series of curated editions—each built around wellbeing, movement, sound and place.")}</p>
          </div>
          <div className="series-editions" role="group" aria-label="ASCENSION series editions">
            <div className="series-edition series-current">
              <h3>Da Nang</h3>
              <p>{isVi ? "Kỳ 01 · Tháng 1, 2027" : "Edition 01 · January 2027"}</p>
              <span>{lower?.current || (isVi ? "Trải nghiệm chính hiện tại" : "Current primary experience")}</span>
            </div>
            <div className="series-edition">
              <h3>Montréal</h3>
              <p>{lower?.planning || (isVi ? "Kỳ 02 · Đang lên kế hoạch" : "Edition 02 · In planning")}</p>
              <span>{lower?.follow || (isVi ? "Kỳ tiếp theo" : "Follow-up edition")}</span>
            </div>
            <div className="series-edition series-next">
              <h3>{lower?.next || (isVi ? "Tiếp theo" : "Next")}</h3>
              <p>{lower?.perhaps || (isVi ? "Có thể là thành phố của bạn." : "Perhaps your city.")}</p>
            </div>
          </div>
          <a
            className="series-inquiry radiant-action"
            href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20in%20My%20City&body=City%20%2F%20Country%3A%20%0A%0AI%E2%80%99m%20interested%20as%20a%3A%20Guest%20%2F%20Practitioner%20%2F%20Venue%20or%20Hospitality%20Partner%20%2F%20Sponsor%20%2F%20Local%20Connector%0A%0AName%3A%20%0AOrganization%20(if%20applicable)%3A%20%0A%0AWhy%20ASCENSION%20could%20belong%20here%3A%20"
          >
            {lower?.request || (isVi ? "Mời ASCENSION đến thành phố của bạn" : "Request ASCENSION in Your City")} <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <ProgressiveMedia poster={DA_NANG_FILM} alt="Da Nang sunset reflected across still water" />
          <div className="join-overlay" aria-hidden="true" />
          <div className="join-copy">
            <h2 id="join-title">{lower?.waiting || (isVi ? "Đà Nẵng đang chờ." : "Da Nang is waiting.")}</h2>
            <p>{isMobile === false ? copy.finalCta.desktop : copy.finalCta.mobile}</p>
            <div className="join-actions">
              <a className="radiant-action" href={STRIPE_RESERVATION} target="_blank" rel="noopener noreferrer">{ui.reserve} <span aria-hidden="true">→</span></a>
              <a className="join-question" href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Da%20Nang%20Question">{ui.ask} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <footer>
            <span>ASCENSION is a series initiated and published by <a href="https://modus.gallery" target="_blank" rel="noopener noreferrer">MODUS — Taste Intelligence</a>, Stanford Emporium Inc., Montréal.</span>
            <div>
              <Link href={locale !== "en" ? `/${locale}/about` : "/about"}>{ui.nav.about}</Link>
              <Link href={locale !== "en" ? `/${locale}/#experience` : "/#experience"}>{ui.nav.experience}</Link>
              <Link href={locale !== "en" ? `/${locale}/dien-chan` : "/dien-chan"}>Diện Chẩn</Link>
              <Link href={locale !== "en" ? `/${locale}/attend` : "/attend"}>{ui.nav.attend}</Link>
              <Link href={locale !== "en" ? `/${locale}/facilitate` : "/facilitate"}>{ui.nav.facilitate}</Link>
              <Link href="/partners">Partners</Link>
              <Link href="/partners/sponsorship">Sponsors</Link>
              <a href="mailto:daniel@stanfordemporium.com?subject=ASCENSION%20Enquiry">{isVi ? "Liên hệ" : "Contact"}</a>
              <Link href={locale !== "en" ? `/${locale}/privacy` : "/privacy"}>{isVi ? "Quyền riêng tư" : locale === "fr" ? "Confidentialité" : locale === "ko" ? "개인정보" : locale === "zh-hans" ? "隐私" : "Privacy"}</Link>
              <Link href={locale !== "en" ? `/${locale}/terms` : "/terms"}>{isVi ? "Điều khoản" : locale === "fr" ? "Conditions" : locale === "ko" ? "이용 조건" : locale === "zh-hans" ? "条款" : "Terms"}</Link>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
