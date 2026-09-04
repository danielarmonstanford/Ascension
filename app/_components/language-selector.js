"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, getLocaleConfig, isPublishedLocale, localePath, routeWithoutLocale } from "../../i18n/config";

export default function LanguageSelector({ className = "" }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const pathLocale = pathname.split("/").filter(Boolean)[0];
  const currentLocale = getLocaleConfig(pathLocale).code;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const focusItem = (index) => itemRefs.current[(index + LOCALES.length) % LOCALES.length]?.focus();
  const handleMenuKeyDown = (event, index) => {
    if (event.key === "ArrowDown") { event.preventDefault(); focusItem(index + 1); }
    if (event.key === "ArrowUp") { event.preventDefault(); focusItem(index - 1); }
    if (event.key === "Home") { event.preventDefault(); focusItem(0); }
    if (event.key === "End") { event.preventDefault(); focusItem(LOCALES.length - 1); }
  };

  const chooseLocale = (locale) => {
    const config = getLocaleConfig(locale);
    if (!isPublishedLocale(locale)) {
      setNotice(`${config.label} is awaiting human review.`);
      return;
    }
    try { window.localStorage.setItem("ascension-locale", locale); } catch {}
    setNotice("");
    setOpen(false);
    router.push(localePath(locale, routeWithoutLocale(pathname)) || `/${locale}`);
  };

  return (
    <div className={`language-selector ${className}`} ref={containerRef}>
      <button
        className="language-selector-trigger"
        type="button"
        aria-label="Choose language"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setOpen((value) => !value);
          setNotice("");
        }}
      >
        {getLocaleConfig(currentLocale).shortLabel}
        <span aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div className="language-selector-menu" id={menuId} role="menu" aria-label="Languages">
          {LOCALES.map((locale, index) => {
            const config = getLocaleConfig(locale);
            const published = isPublishedLocale(locale);
            return (
              <button
                key={locale}
                ref={(node) => { itemRefs.current[index] = node; }}
                type="button"
                role="menuitemradio"
                aria-checked={locale === currentLocale}
                aria-disabled={!published}
                onClick={() => chooseLocale(locale)}
                onKeyDown={(event) => handleMenuKeyDown(event, index)}
              >
                <span>{config.shortLabel} — {config.label}</span>
                {!published ? <small>In review</small> : null}
              </button>
            );
          })}
          <p className="language-selector-notice" role="status" aria-live="polite">{notice}</p>
        </div>
      ) : null}
    </div>
  );
}
