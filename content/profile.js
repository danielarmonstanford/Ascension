export const pathwayOrder = ["RESTORE", "EMBODY", "BREATHE", "RESONATE", "CREATE", "TASTE"];

export const pathwayCopy = {
  RESTORE: "Make space for rest, recovery and restorative Vietnamese body care.",
  EMBODY: "Reconnect through touch, mobility and conscious movement.",
  BREATHE: "Return to presence through breath, spaciousness and the sea.",
  RESONATE: "Listen deeply through music, sound baths and stillness.",
  CREATE: "Follow intuition through art, observation and expression.",
  TASTE: "Experience Da Nang through flavour, markets and shared tables.",
};

export const destinations = [
  { value: "montreal", label: "Montréal" },
  { value: "thailand", label: "Thailand" },
  { value: "taiwan", label: "Taiwan" },
  { value: "japan", label: "Japan" },
  { value: "other", label: "Another city or country" },
  { value: "none-yet", label: "No future destination yet" },
];

export const accommodationStyles = [
  { value: "quiet-boutique", label: "Quiet boutique hotel" },
  { value: "wellness-resort", label: "Wellness resort" },
  { value: "design-hotel", label: "Design-led hotel" },
  { value: "simple-comfort", label: "Simple, comfortable base" },
  { value: "undecided", label: "Open to guidance" },
];

export const hotelBudgets = [
  { value: "under-75", label: "Under US$75" },
  { value: "75-150", label: "US$75–150" },
  { value: "150-250", label: "US$150–250" },
  { value: "250-plus", label: "US$250+" },
  { value: "undecided", label: "Not decided" },
];

export const travelParties = [
  { value: "solo", label: "Solo" },
  { value: "partner", label: "With a partner" },
  { value: "friend", label: "With a friend" },
  { value: "shared", label: "Open to a shared room" },
];

const option = (value, label, scores = {}) => ({ value, label, scores });

// Exactly six guest-facing screens. Practical details are grouped into one final
// planning question so the experience stays conversational rather than exhaustive.
export const profileQuestions = [
  {
    id: "first_name", type: "text", eyebrow: "First, an introduction",
    question: "What should we call you?", placeholder: "Your first name", required: true,
  },
  {
    id: "wellness_priority", type: "single", eyebrow: "Begin with now",
    question: "What would you most like to make space for, {{firstName}}?",
    help: "Choose the priority that feels most present today.", required: true,
    options: [
      option("rest", "Deep rest and recovery", { RESTORE: 4, BREATHE: 2 }),
      option("movement", "Freedom and confidence in movement", { EMBODY: 4, RESTORE: 1 }),
      option("calm", "Calm, breath and mental spaciousness", { BREATHE: 4, RESONATE: 2 }),
      option("sound", "Sound, meditation and stillness", { RESONATE: 4, BREATHE: 1 }),
      option("creativity", "Creativity and renewed perspective", { CREATE: 4, RESONATE: 1 }),
      option("food", "Food, culture and shared discovery", { TASTE: 4, CREATE: 1 }),
    ],
  },
  {
    id: "body_experience", type: "multi", eyebrow: "Experience planning",
    question: "What would you like your body to experience more easily?",
    help: "Non-diagnostic experience planning only. Choose any that feel relevant.", required: true, sensitive: true,
    options: [
      option("less-discomfort", "Less recurring discomfort or stiffness", { RESTORE: 3, EMBODY: 2 }),
      option("everyday-movement", "Walking, reaching or moving with more ease", { EMBODY: 3, RESTORE: 1 }),
      option("energy", "More energy and less fatigue", { BREATHE: 2, RESTORE: 3 }),
      option("release-stress", "Release stress and switch off", { BREATHE: 3, RESONATE: 2 }),
      option("comfortable-rest", "Sit, rest and sleep more comfortably", { RESTORE: 2, BREATHE: 1 }),
      option("prefer-not", "No concern / prefer not to say", {}),
    ],
  },
  {
    id: "sensory_preferences", type: "multi", eyebrow: "Follow your senses",
    question: "Which experiences draw you in, {{firstName}}?",
    help: "Choose up to three.", required: true, max: 3,
    options: [
      option("touch", "Restorative touch and bodywork", { RESTORE: 3, EMBODY: 2 }),
      option("movement", "Movement and embodied practice", { EMBODY: 3 }),
      option("breath", "Breath and spaciousness", { BREATHE: 3 }),
      option("sound", "Sound, music and meditation", { RESONATE: 3 }),
      option("creative", "Art and creative exploration", { CREATE: 3 }),
      option("taste", "Food, markets and shared tables", { TASTE: 3 }),
    ],
  },
  {
    id: "edition_plan", type: "single", eyebrow: "Edition 01 · Da Nang",
    question: "How does Da Nang in January 2027 fit your world?", required: true,
    options: [
      option("14-ready", "I’m ready for 14 days · January 12–26"),
      option("7-ready", "I’m ready for 7 days · January 12–19"),
      option("considering", "It’s possible—I need the right details"),
      option("partial", "I could join for part of those dates"),
      option("future", "Not this edition, but keep me close"),
    ],
  },
  {
    id: "travel_planning", type: "planning", eyebrow: "Shape your stay",
    question: "A few practical preferences, then your pathway is ready.", required: true,
  },
];

export function questionIsVisible() { return true; }

export function calculatePathways(answers) {
  const totals = Object.fromEntries(pathwayOrder.map((pathway) => [pathway, 0]));
  for (const question of profileQuestions) {
    const selected = Array.isArray(answers[question.id]) ? answers[question.id] : [answers[question.id]];
    for (const value of selected) {
      const scores = question.options?.find((entry) => entry.value === value)?.scores || {};
      for (const [pathway, score] of Object.entries(scores)) totals[pathway] += score;
    }
  }
  return pathwayOrder
    .map((pathway, order) => ({ pathway, score: totals[pathway], order }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3)
    .map(({ pathway }) => pathway);
}
