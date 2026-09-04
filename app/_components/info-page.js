import Link from "next/link";
import { CONTACT_EMAIL, RESERVATION_URL } from "../seo";
import LanguageSelector from "./language-selector";
import { translatedUi } from "../../content/other-locales";

export default function InfoPage({ eyebrow, title, lead, currentPath, children, primaryLabel, primaryHref = RESERVATION_URL, locale = "en" }) {
  const isVi = locale === "vi";
  const isLocalized = locale !== "en";
  const prefix = isLocalized ? `/${locale}` : "";
  const localeUi = translatedUi[locale];
  const resolvedPrimaryLabel = primaryLabel || (isVi ? "Đặt chỗ" : localeUi?.reserve || "Reserve your place");
  const nav = isVi ? { about:"Giới thiệu", attend:"Tham dự", facilitate:"Hướng dẫn" } : localeUi?.nav || { about:"About", attend:"Attend", facilitate:"Facilitate" };
  return (
    <div className="info-page">
      <a className="skip-link" href="#content">{isVi ? "Bỏ qua để đến nội dung chính" : "Skip to main content"}</a>
      <header className="info-header">
        <Link className="wordmark" href={prefix || "/"}>ASCENSION</Link>
        <nav aria-label="Primary navigation">
          <Link href={`${prefix}/about`}>{nav.about}</Link>
          <Link href={`${prefix}/dien-chan`}>Diện Chẩn</Link>
          <Link href={`${prefix}/attend`}>{nav.attend}</Link>
          <Link href={`${prefix}/facilitate`}>{nav.facilitate}</Link>
        </nav>
        <LanguageSelector />
      </header>
      <main id="content">
        <nav className="info-breadcrumb" aria-label="Breadcrumb">
          <Link href={prefix || "/"}>ASCENSION</Link><span aria-hidden="true">/</span><span aria-current="page">{eyebrow}</span>
        </nav>
        <section className="info-hero">
          <p className="info-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="info-lead">{lead}</p>
        </section>
        <div className="info-content">{children}</div>
        <section className="info-cta" aria-label="Next step">
          <p>{isVi ? "Đà Nẵng, Việt Nam · 12–26 tháng 1, 2027" : localeUi ? `${localeUi.place} · ${localeUi.dates}` : "Da Nang, Vietnam · January 12–26, 2027"}</p>
          <a className="radiant-action" href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}>{resolvedPrimaryLabel} <span aria-hidden="true">→</span></a>
          <a href={`mailto:${CONTACT_EMAIL}?subject=ASCENSION%20Da%20Nang%20Question`}>{isVi ? "Đặt câu hỏi" : localeUi?.ask || "Ask a question"}</a>
        </section>
      </main>
      <footer className="info-footer">
        <span>ASCENSION SENSES · Da Nang 2027</span>
        <nav aria-label="Footer navigation"><Link href={prefix || "/"}>{isVi ? "Trang chủ" : "Home"}</Link><Link href={`${prefix}/about`}>{isVi ? "Giới thiệu" : "About"}</Link><Link href={`${prefix}/attend`}>{isVi ? "Tham dự" : "Attend"}</Link><Link href={`${prefix}/privacy`}>{isVi ? "Quyền riêng tư" : "Privacy"}</Link><Link href={`${prefix}/terms`}>{isVi ? "Điều khoản" : "Terms"}</Link></nav>
      </footer>
    </div>
  );
}
