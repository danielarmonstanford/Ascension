---
name: "ASCENSION SENSES"
description: "A cinematic, sensory wellness and travel identity shaped by Pacific morning and Da Nang dusk."
colors:
  day-sky: "#B8D9E8"
  day-sea-glass: "#7FB7B3"
  day-mist: "#E7F0EF"
  day-shell: "#F4EDE1"
  day-sunlight: "#F4C96B"
  dusk-deep-ocean: "#071C2B"
  dusk-twilight-blue: "#173A59"
  dusk-burnt-sand: "#C47B55"
  dusk-clay: "#9E5947"
  dusk-sunset: "#EF9A62"
  dusk-warm-stone: "#B8A58F"
  dusk-moon-ivory: "#F2EBDC"
  dusk-night-sea: "#030B12"
typography:
  display:
    fontFamily: "Lovine, Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.5rem, 12vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Lovine, Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Avenir Next, DM Sans, Helvetica Neue, sans-serif"
    fontSize: "clamp(1rem, 1.4vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  utility:
    fontFamily: "DM Mono, Courier New, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  control: "2px"
  media: "0px"
spacing:
  compact: "0.75rem"
  rhythm: "1.5rem"
  section: "clamp(5rem, 12vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.dusk-sunset}"
    textColor: "{colors.dusk-night-sea}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.5rem"
  button-day:
    backgroundColor: "{colors.dusk-deep-ocean}"
    textColor: "{colors.day-mist}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.5rem"
---

# Design System: ASCENSION SENSES

## Overview

**Creative North Star: “Pacific Threshold”**

ASCENSION SENSES should feel like standing at the edge of the Pacific at the hour when the body becomes aware of light, temperature, air, and distance. Photography carries the emotional argument; typography provides identity and orientation; interface chrome recedes.

DAY is Pacific morning, not generic light mode. DUSK is the transition from burnt sand and sunset into night sea, not generic dark mode. The system is cinematic and spacious but never vague: practical facts and reservation actions remain immediately legible.

**Key Characteristics:** photography-first, one dominant visual idea per surface, sensory colour transitions, disciplined Lovine, short copy, progressive media, quiet controls, excellent static fallback.

## Colors

DAY moves through sky, mist, sea glass, shell, and a rare sunlight accent. DUSK moves through deep ocean, twilight blue, burnt sand, clay, sunset, warm stone, moon ivory, and night sea.

**The Time-of-Day Rule.** DAY and DUSK are complete environmental states. Never produce them by simply inverting foreground and background colours.

**The Sunlight Rule.** Yellow and orange accents are scarce moments of warmth or action, not a default highlight applied across every section.

## Typography

**Display Font:** Lovine, with Cormorant Garamond and Georgia only as fallbacks.  
**Body Font:** Avenir Next / DM Sans / Helvetica Neue.  
**Utility Font:** DM Mono for dates, edition labels, prices, and compact evidence.

Lovine is the identity voice. Use it for decisive phrases, place names, edition titles, and rare transitions. It must never become decorative filler or appear on every heading. Body copy is clean, modern, and highly legible; the old all-editorial reading texture is not carried forward.

**The Identity Rule.** If removing Lovine from a composition changes nothing about its character, the type has been used as decoration rather than identity.

**The Sensory Chapter Rule.** Every sensory lockup follows one order: dominant Lovine chapter hero → copper utility line naming the modalities → evocative Lovine sub-hero at approximately half scale. This applies to EMBODY, SEE, SOUND, TASTE, BREATHE, CREATE · INTUITION and the nested MOVE experience, where ECSTATIC DANCE sits immediately beneath MOVE. On desktop the copper line may offset toward the opposing edge, but it must remain below its hero; on mobile it may wrap but never move above the hero. Preserve this sequence independently across desktop, tablet and mobile.

**The SEE Film Rule.** The approved YouTube film is a progressive visual replacement for the former lantern still, not a new interaction system. Use the film’s own frame as the poster, autoplay only while visible, remain muted, and use an edge-to-edge cover crop on compact screens rather than visible letterboxing. The SEE typography and copy remain independent of the media layer.

**The SOUND Ground Rule.** SOUND alone uses the approved ear-and-radiating-wave illustration as a full-bleed chapter background. Screen it with the active DAY/DUSK ground colour so typography remains primary: Mist in DAY, Night Sea in DUSK. Keep the Vietnamese film as the foreground media stage. On mobile, move the background crop toward the ear rather than allowing a generic centered crop to lose the illustration's subject.

**The Featured Place Rule.** In the experience-at-a-glance composition, DA NANG, VIETNAM is the dominant Lovine hero—not a utility kicker. “The experience at a glance” is a substantial Lovine sub-hero at approximately half scale and offset on the opposing edge. Dates, duration, pricing, accommodation and comparison actions remain the factual utility layer.

**The Facilitator Invitation Rule.** In the practitioner invitation, FACILITATORS is the dominant Lovine hero. “Bring your practice to Da Nang” is the offset Lovine sub-hero at approximately half scale. The application action may use a single concentrated sunrise-gold treatment—bright core, warm edge and a restrained interactive halo—to signal conversion without spreading glow or rounded controls across the wider interface. Closing FACILITATORS / PARTNERS / SPONSORS pathways must remain clearly legible rather than disappearing into footer utility text.

**The Collaborator Legibility Rule.** Partner, practitioner, venue and sponsorship pages may remain quieter than the guest journey, but never visually faint. On DUSK surfaces, long-form body text uses a near-ivory reading colour, a minimum 17px compact-screen size, comfortable line-height and restrained line length. Utility labels, navigation, notes and tables must not rely on low opacity or excessive tracking for hierarchy. Links, rules and focus states remain visibly distinct in normal and increased-contrast modes.

**The Collaborator DAY/DUSK Rhythm.** Facilitator, venue and sponsorship detail pages open through a DUSK photographic threshold, then release into a warm-shell DAY reading field with deep-ocean text, generous spacing and clear rules. Mist is used for secondary contact and footer surfaces; sunlight gold is reserved for decisive actions. This creates tonal relief for long-form commercial material without copying another wellness brand, abandoning ASCENSION typography, or turning every section into a card.

**Typographic Implementation Rule.** Do not approximate typography. For every approved major type role, specify the typeface, available weight, size, line height, letter spacing, maximum width, optical treatment when supported, and responsive behavior. Disable synthesized bold or italic where the supplied font files do not contain those styles. Use deliberate text rendering and font smoothing. Lovine is a compositional element, not a generic heading font.

## Layout

Build around large photographic fields, calm negative space, and a single linear guest journey: desire → comprehension → trust → program → reservation. Alternate immersive media with concise information; do not convert every content group into a card grid. Secondary partner and facilitator routes stay discoverable in navigation and the closing utility layer, never beside the primary reservation action.

**The About Route Rule.** `/about` is a restrained editorial narrative within the existing DAY/DUSK system, not a founder-brand microsite. Use one H1, large Lovine section statements, alternating media and copy, an uncarded numbered principles list, and clear cross-links back to the guest journey. Mobile places media before copy. If an approved Daniel portrait is unavailable, use an intentional art-directed placeholder; never fabricate a likeness or label another person as Daniel.

Desktop composition may use strong asymmetry and cropped imagery. Mobile becomes a direct vertical narrative with the same photographic authority, readable facts, and no dependency on hover. Core text should normally stay within 60–72 characters per line.

**The Measured-Composition Rule.** Once a hero reference frame is approved, measure and lock the relationships between ASCENSION typography, body, horizon, location/date, CTA, DAY/DUSK control, and scroll cue. Record coordinates, offsets, widths, baselines, and alignment anchors for each responsive architecture. Do not substitute guessed flex gaps, generic centering, or visually approximate spacing.

Define three composed architectures—desktop, tablet, and compact/mobile. Do not merely shrink desktop. Preserve art direction while changing crop, hierarchy, positioning, and control placement for each architecture. A horizontal yoga image requires a deliberately approved mobile crop or alternate source, not automatic center-cropping.

## Elevation & Depth

Depth comes from photography, colour atmosphere, scale, crop, and spatial overlap—not generic shadows or frosted panels. Surfaces remain flat by default. Use tonal separation when information needs a boundary.

**The No Glass Default.** Glassmorphism is forbidden as ambient decoration. A translucent layer is acceptable only when it solves legibility over moving media and remains restrained.

## Shapes

The form language is full-bleed rectangular media, calm planes, precise rules, and almost-square controls. Avoid pill proliferation, soft SaaS cards, ornamental blobs, and repeated rounded containers. Organic form should come from bodies, coastline, fabric, mist, water, and photographic composition.

## Components

### Primary actions

Use one dominant reservation action per decision region. Every conversion button uses the approved radiant-gold signature: warm gold gradient, Night Sea utility type, rounded end geometry, a restrained luminous edge, and a brighter hover bloom. This shared treatment applies to reservation, application, request, and other deliberate primary actions across DAY and DUSK. Editorial navigation and low-priority utility links remain visually quieter so gold retains its conversion meaning.

### Photography

Photography is structural content, not decoration. Prefer one strong crop over collages and repeated thumbnails. The original Da Nang yoga-wheel photograph is the visual source of truth for posture, scale, atmosphere, palette, and cinematic ambition.

### Progressive media

Every media experience ships in layers: excellent still image → responsive optimized image → optional short video → optional advanced orbit. Text, navigation, and conversion must work before media enhancement loads. Advanced motion may replace no fact or control.

Media must never delay perceived first render. Render an optimized poster immediately, make the complete interface usable, load motion media progressively, and crossfade only after the motion source is decoded and ready. Keep the poster mounted as the fallback. The poster and first motion frame must share compatible crop, horizon, subject scale, and colour treatment so the transition is visually invisible.

Prioritize above-the-fold posters. Defer non-critical video and below-the-fold media. Provide deliberately art-directed desktop and mobile sources when one crop cannot preserve the composition. Do not place loading spinners over primary imagery unless an unavoidable user-initiated operation requires explicit progress.

The static state is a finished composition, not a loading state. If video never loads, the visitor must not see an error, missing narrative, inactive control, or visibly incomplete hero.

Destination film sound is opt-in. Keep the film muted on entry, reveal a clear `PLAY SOUND` control as its section enters view, and change the same control to `MUTE` after activation. A scroll event alone must never be treated as permission to unmute. Silence the film when the visitor leaves the section; poster, typography, navigation, and the complete journey remain usable without audio.

Keep media and interface independent. The hero architecture is:

```text
HeroStage
├── ProgressiveMedia
├── AtmosphereOverlay
├── Navigation
├── HeroTypography
├── PrimaryCTA
├── DayDuskControl
└── ScrollCue
```

`ProgressiveMedia` fills the viewport with intentional `object-fit: cover` crops while the interface sits in a separate positioned frame. A future Higgsfield, video, image sequence, canvas renderer, or 3D source may replace the media implementation without restructuring navigation, typography, controls, or conversion.

### Motion

Motion reveals sensory continuity, spatial depth, or a change in time of day. Use a small number of choreographed sequences instead of scattered entrance effects. The complete experience must remain excellent with animation disabled and under reduced-motion preferences.

MotionSites is a technical-motion reference, not a visual reference. Learn from its progressive media architecture, interpolated scroll state, pinned cinematic sequences, optional image-sequence precision, and earned use of real 3D. Do not inherit its glass panels, frosted cards, Inter-everywhere typography, pill CTAs, dark-tech palette, or generic product-demo styling.

**The Smoothed-State Rule.** Scroll drives a target progress value. Rendered progress approaches that target through interpolation on animation frames; do not bind raw scroll directly to `video.currentTime`.

**The One-Shot Entrance Rule.** The opening resolves once, then becomes still until the visitor acts:

- 0ms: poster is already visible.
- 100ms: navigation softly resolves.
- 250ms: ASCENSION resolves from controlled atmospheric blur.
- 450ms: location and date resolve.
- 650ms: proposition appears.
- 850ms: primary CTA and DAY/DUSK control arrive.
- 1000ms: entrance motion ends and tears down.

Use one specified easing family, small translations, controlled blur settling, and intentional stagger. Do not loop or add ambient twitching. Under `prefers-reduced-motion: reduce`, render the final state immediately with no lost information.

After the entrance completes, remove temporary animation state, observers, timers, and `will-change` hints that no longer serve interaction or rendering. The interface must not remain in a permanently animated or compositor-promoted state merely to signal activity.

## Do's and Don'ts

### Do

- **Do** ask whether photography can communicate the idea faster than interface components.
- **Do** make one visual thesis dominate each page and each major viewport.
- **Do** shorten copy before styling it.
- **Do** make DAY feel like Pacific morning and DUSK feel like sunset becoming night sea.
- **Do** keep the static and progressive-media experience launch-ready before adding advanced motion.

### Don't

- **Don't** reproduce recognizable Claude/Codex/AI landing-page patterns: generic luxury beige, gradient blobs, dashboard grids, endless cards, pill labels, centered copy stacks, or decorative glass.
- **Don't** use cards merely because they are convenient containers.
- **Don't** let MODUS editorial density or navigation hierarchy return under new colours.
- **Don't** let animation carry the brand, explain the program, or rescue weak composition.
- **Don't** add Three.js or WebGL until the Higgsfield orbit asset proves that the static and progressive-media architecture needs it.
- **Don't** treat MotionSites as an aesthetic template. Its implementation techniques are admissible; its generic glass, pills, Inter, and dark-tech styling are not.
- **Don't** “improve” approved art direction by adding cards, changing the palette, replacing Lovine, introducing generic wellness imagery, inventing testimonials, adding sections, adding unrelated gradients, centering an approved asymmetric composition, or adding decorative animation.
