import { MODUS_ASCENSION_URL, PRODUCTION_ORIGIN } from "../seo";

export function GET() {
  const body = `# ASCENSION SENSES

ASCENSION is a seven- or fourteen-day immersive wellness and cultural happening in Da Nang, Vietnam, taking place January 12–26, 2027. Diện Chẩn, a needle-free Vietnamese practice, is its therapeutic foundation. Accommodation, flights and local transfers are separate.

- Homepage: ${PRODUCTION_ORIGIN}/
- About: ${PRODUCTION_ORIGIN}/about
- Diện Chẩn: ${PRODUCTION_ORIGIN}/dien-chan
- Attend: ${PRODUCTION_ORIGIN}/attend
- Facilitate: ${PRODUCTION_ORIGIN}/facilitate
- MODUS editorial context: ${MODUS_ASCENSION_URL}

Planned activities and unconfirmed facilitators are identified as planned until confirmed.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
