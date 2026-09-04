import { faqItems } from "../content/en";
import { getLocaleConfig, getPublishedLocales, isPublishedLocale, localePath } from "../i18n/config";

export const PRODUCTION_ORIGIN = "https://www.ascensionsenses.com";
export const MODUS_ASCENSION_URL = "https://www.modus.gallery/seance/ascension";
export const RESERVATION_URL = "https://buy.stripe.com/dRm8wQ2FR5tr9vL0izcfK00";
export const CONTACT_EMAIL = "daniel@stanfordemporium.com";
export const PRACTITIONER_APPLICATION = `mailto:${CONTACT_EMAIL}?subject=ASCENSION%20Da%20Nang%20%E2%80%94%20Practitioner%20Application&body=Name%3A%0ALocation%3A%0APractice%20or%20modality%3A%0ATraining%20and%20years%20of%20experience%3A%0AWebsite%20or%20professional%20profile%3A%0AProposed%20ASCENSION%20contribution%3A%0AGroup%20sessions%2C%20private%20sessions%20or%20both%3A%0AAvailability%20between%20January%2012%E2%80%9326%2C%202027%3A%0AEquipment%20or%20space%20required%3A%0ALanguages%20spoken%3A%0AWhy%20would%20your%20practice%20fit%20ASCENSION%3F%3A`;

export const SOCIAL_IMAGE = {
  url: "https://res.cloudinary.com/dno3ruh4b/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png",
  width: 1200,
  height: 630,
  alt: "ASCENSION SENSES yoga-wheel practice on the Da Nang coast",
};

export function createPageMetadata({ title, description, path }) {
  const url = `${PRODUCTION_ORIGIN}${path === "/" ? "/" : path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ASCENSION SENSES",
      images: [SOCIAL_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

export function createLocalizedPageMetadata({ locale, title, description, socialTitle = title, socialDescription = description, path }) {
  const localizedRoute = localePath(locale, path);
  const url = `${PRODUCTION_ORIGIN}${localizedRoute}`;
  const published = isPublishedLocale(locale);
  const languages = published
    ? Object.fromEntries([
        ...getPublishedLocales().map((publishedLocale) => [publishedLocale === "zh-hans" ? "zh-Hans" : publishedLocale, `${PRODUCTION_ORIGIN}${localePath(publishedLocale, path)}`]),
        ["x-default", `${PRODUCTION_ORIGIN}${localePath("en", path)}`],
      ])
    : undefined;

  if (!published) {
    const languageName = getLocaleConfig(locale).label;
    return {
      title: `${languageName} translation under review | ASCENSION SENSES`,
      description: "This ASCENSION SENSES translation is withheld from publication until human linguistic and cultural review is complete.",
      alternates: { canonical: url },
      robots: { index: false, follow: false, noarchive: true },
      openGraph: null,
      twitter: null,
    };
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: "ASCENSION SENSES",
      images: [SOCIAL_IMAGE],
      locale: locale === "en" ? "en" : locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const siteEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${PRODUCTION_ORIGIN}/#website`,
      name: "ASCENSION SENSES",
      alternateName: "ASCENSION",
      url: `${PRODUCTION_ORIGIN}/en`,
      inLanguage: "en",
      publisher: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${PRODUCTION_ORIGIN}/#organization`,
      name: "ASCENSION SENSES",
      alternateName: "ASCENSION",
      url: `${PRODUCTION_ORIGIN}/en`,
      logo: `${PRODUCTION_ORIGIN}/icon.svg`,
      description: "ASCENSION SENSES is a travelling series of immersive wellness and cultural happenings. Its first edition takes place in Da Nang, Vietnam, January 12–26, 2027.",
      founder: { "@id": `${PRODUCTION_ORIGIN}/en/about#daniel-stanford` },
      sameAs: [MODUS_ASCENSION_URL],
      subjectOf: { "@type": "WebPage", url: MODUS_ASCENSION_URL, name: "ASCENSION editorial project page on MODUS" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "guest and practitioner enquiries",
        email: CONTACT_EMAIL,
      },
    },
    {
      "@type": "Person",
      "@id": `${PRODUCTION_ORIGIN}/en/about#daniel-stanford`,
      name: "Daniel Stanford",
      url: `${PRODUCTION_ORIGIN}/en/about`,
      jobTitle: "Host, Curator and Creative Director",
      worksFor: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
      sameAs: ["https://danielstanford.art/"],
    },
  ],
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "@id": `${PRODUCTION_ORIGIN}/#event`,
      name: "ASCENSION SENSES — Da Nang 2027",
      description: "A seven- or fourteen-day immersive wellness and cultural happening in Da Nang built around Diện Chẩn, movement, breathwork, sound baths, Vietnamese food, culture and creativity.",
      url: `${PRODUCTION_ORIGIN}/en/attend`,
      startDate: "2027-01-12",
      endDate: "2027-01-26",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [SOCIAL_IMAGE.url],
      location: {
        "@type": "Place",
        name: "Da Nang, Vietnam",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Da Nang",
          addressCountry: "VN",
        },
      },
      organizer: { "@id": `${PRODUCTION_ORIGIN}/#organization` },
      offers: [
        {
          "@type": "Offer",
          name: "Seven-day ASCENSION program",
          url: `${PRODUCTION_ORIGIN}/en/attend#seven-days`,
          price: "1200",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Fourteen-day ASCENSION program",
          url: `${PRODUCTION_ORIGIN}/en/attend#fourteen-days`,
          price: "2000",
          priceCurrency: "USD",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PRODUCTION_ORIGIN}/#faq`,
      mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@type": "VideoObject",
      "@id": `${PRODUCTION_ORIGIN}/#hero-video`,
      name: "ASCENSION yoga-wheel orbit",
      description: "A yoga-wheel movement sequence on the Da Nang coast introducing the ASCENSION experience.",
      thumbnailUrl: "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png",
      contentUrl: "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4",
      uploadDate: "2026-08-29",
      isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
    },
    {
      "@type": "VideoObject",
      "@id": `${PRODUCTION_ORIGIN}/#destination-video`,
      name: "Da Nang: City, Sea, Mountain",
      description: "A cinematic view of Da Nang between its city, Pacific coast and mountains.",
      thumbnailUrl: "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787489954/Screen_Shot_2026-08-23_at_8.59.05_AM_e8jceq.png",
      embedUrl: "https://player.vimeo.com/video/1221665573",
      duration: "PT30S",
      isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
    },
    {
      "@type": "VideoObject",
      "@id": `${PRODUCTION_ORIGIN}/#breathe-video`,
      name: "Breath moving through the body",
      description: "A visual interpretation of breath and presence accompanying the ASCENSION BREATHE chapter.",
      thumbnailUrl: "https://res.cloudinary.com/dno3ruh4b/video/upload/so_0,f_jpg,q_auto/v1788363812/holographic-human-body-x-ray-scan-with-respiratory-2026-04-22-16-04-13-utc_d8oqa0.jpg",
      contentUrl: "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788363812/holographic-human-body-x-ray-scan-with-respiratory-2026-04-22-16-04-13-utc_d8oqa0.mp4",
      uploadDate: "2026-09-02",
      isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
    },
    {
      "@type": "VideoObject",
      "@id": `${PRODUCTION_ORIGIN}/#create-video`,
      name: "CREATE: art in process",
      description: "A hand applying gold-leaf detail to a painted portrait in the ASCENSION CREATE chapter.",
      thumbnailUrl: "https://res.cloudinary.com/dno3ruh4b/video/upload/a_90,so_0,f_jpg,q_auto/v1788259482/Angel_Art_Daniel_Stanford_Da_Nang_fps2la.jpg",
      contentUrl: "https://res.cloudinary.com/dno3ruh4b/video/upload/a_90,q_auto/v1788259482/Angel_Art_Daniel_Stanford_Da_Nang_fps2la.mp4",
      uploadDate: "2026-09-01",
      isPartOf: { "@id": `${PRODUCTION_ORIGIN}/#website` },
    },
  ],
};

export function breadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${PRODUCTION_ORIGIN}${item.path}`,
    })),
  };
}
