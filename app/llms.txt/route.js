import { MODUS_ASCENSION_URL, PRODUCTION_ORIGIN } from "../seo";

export function GET() {
  const body = `# ASCENSION SENSES

ASCENSION is a seven- or fourteen-day immersive wellness and cultural happening in Da Nang, Vietnam, taking place January 12–26, 2027. Diện Chẩn, a needle-free Vietnamese practice, is its therapeutic foundation. Accommodation, flights and local transfers are separate.

- English homepage: ${PRODUCTION_ORIGIN}/en
- English About: ${PRODUCTION_ORIGIN}/en/about
- English Diện Chẩn: ${PRODUCTION_ORIGIN}/en/dien-chan
- English Attend: ${PRODUCTION_ORIGIN}/en/attend
- English Facilitate: ${PRODUCTION_ORIGIN}/en/facilitate
- MODUS editorial context: ${MODUS_ASCENSION_URL}

Planned activities and unconfirmed facilitators are identified as planned until confirmed.

English, French, Vietnamese, Korean and Simplified Chinese locale routes are live. English remains the current source copy while localized editorial translations are completed.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
