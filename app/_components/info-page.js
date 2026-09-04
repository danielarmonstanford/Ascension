import Link from "next/link";
import { CONTACT_EMAIL, RESERVATION_URL } from "../seo";
import LanguageSelector from "./language-selector";

export default function InfoPage({ eyebrow, title, lead, currentPath, children, primaryLabel = "Reserve your place", primaryHref = RESERVATION_URL }) {
  return (
    <div className="info-page">
      <a className="skip-link" href="#content">Skip to main content</a>
      <header className="info-header">
        <Link className="wordmark" href="/">ASCENSION</Link>
        <nav aria-label="Primary navigation">
          <Link href="/about">About</Link>
          <Link href="/dien-chan">Diện Chẩn</Link>
          <Link href="/attend">Attend</Link>
          <Link href="/facilitate">Facilitate</Link>
        </nav>
        <LanguageSelector />
      </header>
      <main id="content">
        <nav className="info-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">ASCENSION</Link><span aria-hidden="true">/</span><span aria-current="page">{eyebrow}</span>
        </nav>
        <section className="info-hero">
          <p className="info-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="info-lead">{lead}</p>
        </section>
        <div className="info-content">{children}</div>
        <section className="info-cta" aria-label="Next step">
          <p>Da Nang, Vietnam · January 12–26, 2027</p>
          <a className="radiant-action" href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}>{primaryLabel} <span aria-hidden="true">→</span></a>
          <a href={`mailto:${CONTACT_EMAIL}?subject=ASCENSION%20Da%20Nang%20Question`}>Ask a question</a>
        </section>
      </main>
      <footer className="info-footer">
        <span>ASCENSION SENSES · Da Nang 2027</span>
        <nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/attend">Attend</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
      </footer>
    </div>
  );
}
