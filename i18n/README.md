# ASCENSION translation handoff

English (`en`) is the approved editorial source language. French (`fr`), Vietnamese (`vi`), Korean (`ko`) and Simplified Chinese (`zh-Hans`, routed as `/zh-hans`) locale routes are published and currently reuse the English source while reviewed translations are completed.

## Publication workflow

1. Translate from the approved English dictionary and current rendered English pages. Do not translate from older MODUS copy.
2. Preserve ASCENSION, ASCENSION SENSES, Diện Chẩn, Da Nang, Hội An, Daniel Stanford and MODUS as approved proper nouns.
3. Preserve dates, USD prices, confirmed/planned distinctions, exclusions and medical disclaimers exactly.
4. Set a locale to `review` in `i18n/config.js` only after the complete language is present.
5. A qualified human reviewer must approve navigation, metadata, accessibility labels, forms, health language and every substantive route.
6. Set the locale to `published` only after layout QA and `npm run validate:i18n` pass. Published locales automatically become eligible for the selector, canonicals, hreflang and sitemap.

Machine translation may be used only as an internal draft. Draft copy must not be indexed or presented as reviewed translation.

## Voice

Clear, elegant, lightly poetic, sensory, welcoming, culturally respectful and easy to scan on mobile. Avoid literal English idioms and medical promises. Vietnamese Diện Chẩn terminology requires native-language subject review. French is international French. Korean should use natural Korean syntax. Mandarin is Simplified Chinese.

## Layout review

Test at 320, 375, 390, 430, 768, 1366 and 1440 px. Do not reduce accessible body sizes to fit expansion. Confirm Vietnamese diacritics, Hangul and CJK fallback fonts, oversized display-type clipping, button wrapping, keyboard operation and visible focus.
