export const pathwayOrder = ["RESTORE", "EMBODY", "BREATHE", "RESONATE", "CREATE", "TASTE"];

export const pathwayCopy = {
  RESTORE: "Make space for rest, recovery and restorative Vietnamese body care.",
  EMBODY: "Reconnect through touch, mobility and conscious movement.",
  BREATHE: "Return to presence through breath, spaciousness and the sea.",
  RESONATE: "Listen deeply through music, sound baths and stillness.",
  CREATE: "Follow intuition through art, observation and expression.",
  TASTE: "Experience Da Nang through flavour, markets and shared tables.",
};

export const pathwayShareCopy = {
  RESTORE: { tagline: "Make space for recovery.", message: "My ASCENSION pathway is RESTORE. What does your body need more of? Discover yours and receive the complimentary guide:" },
  EMBODY: { tagline: "Move with more ease.", message: "My ASCENSION pathway is EMBODY. What does your body need more of? Discover yours and receive the complimentary guide:" },
  BREATHE: { tagline: "Return to spaciousness.", message: "My ASCENSION pathway is BREATHE. What does your body need more of? Discover yours and receive the complimentary guide:" },
  RESONATE: { tagline: "Listen more deeply.", message: "My ASCENSION pathway is RESONATE. What does your body need more of? Discover yours and receive the complimentary guide:" },
  CREATE: { tagline: "Follow your intuition.", message: "My ASCENSION pathway is CREATE. What does your body need more of? Discover yours and receive the complimentary guide:" },
  TASTE: { tagline: "Experience the place.", message: "My ASCENSION pathway is TASTE. What does your body need more of? Discover yours and receive the complimentary guide:" },
};

export const destinations = [
  { value: "montreal", label: "Montréal" },
  { value: "thailand", label: "Thailand" },
  { value: "taiwan", label: "Taiwan" },
  { value: "japan", label: "Japan" },
  { value: "rio-de-janeiro", label: "Rio de Janeiro" },
  { value: "other", label: "Another city or country" },
];

export const accommodationStyles = [
  { value: "easygoing", label: "Easygoing" },
  { value: "clean-modern", label: "Clean and modern" },
  { value: "rustic-boutique", label: "Rustic or boutique" },
  { value: "five-star", label: "Five-star" },
  { value: "ultra-luxury", label: "Ultra-luxury" },
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

export const roomTypes = [
  { value: "private", label: "Private room" },
  { value: "shared", label: "Shared room" },
  { value: "suite", label: "Suite or larger room" },
  { value: "flexible", label: "Open to guidance" },
];

export const accommodationPriorities = [
  { value: "location", label: "Location and easy access" },
  { value: "quiet", label: "Quiet and restorative atmosphere" },
  { value: "design", label: "Design and sense of place" },
  { value: "wellness", label: "Pool, spa or wellness facilities" },
  { value: "value", label: "Strong value" },
  { value: "service", label: "High-touch service" },
];

const option = (value, label, scores = {}) => ({ value, label, scores });

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
    id: "discomfort_frequency", type: "single", eyebrow: "Experience planning",
    question: "How often do discomfort or stiffness affect your day?",
    help: "Non-diagnostic experience planning only. You may prefer not to answer.", required: true, sensitive: true,
    options: [
      option("rarely", "Rarely", { RESTORE: 1 }),
      option("sometimes", "Sometimes", { RESTORE: 2, EMBODY: 1 }),
      option("often", "Often", { RESTORE: 3, EMBODY: 2 }),
      option("most-days", "Most days", { RESTORE: 4, EMBODY: 2 }),
      option("none", "Not currently", {}),
      option("prefer-not", "Prefer not to say", {}),
    ],
  },
  {
    id: "body_areas", type: "multi", eyebrow: "Where you feel it",
    question: "Which areas would you like us to consider, {{firstName}}?",
    help: "Choose only what feels useful for experience planning.", required: true, sensitive: true,
    options: [
      option("neck-shoulders", "Neck or shoulders", { RESTORE: 2, EMBODY: 1 }),
      option("back", "Back", { RESTORE: 2, EMBODY: 2 }),
      option("hips", "Hips", { EMBODY: 2, RESTORE: 1 }),
      option("knees-legs", "Knees or legs", { EMBODY: 2 }),
      option("hands-arms", "Hands or arms", { EMBODY: 1 }),
      option("whole-body", "General or whole-body", { RESTORE: 2, BREATHE: 1 }),
      option("prefer-not", "Prefer not to say", {}),
    ],
  },
  {
    id: "movement_limitations", type: "multi", eyebrow: "Everyday movement",
    question: "Which everyday movements currently feel less easy?",
    help: "This is not a medical assessment.", required: true, sensitive: true,
    options: [
      option("walking-stairs", "Walking or climbing stairs", { EMBODY: 3 }),
      option("bending-reaching", "Bending or reaching", { EMBODY: 3, RESTORE: 1 }),
      option("sitting-standing", "Sitting or standing for a while", { RESTORE: 2, EMBODY: 1 }),
      option("balance", "Balance or steadiness", { EMBODY: 2, BREATHE: 1 }),
      option("sleep-rest", "Settling into sleep or rest", { RESTORE: 3, BREATHE: 1 }),
      option("none", "None currently", {}),
      option("prefer-not", "Prefer not to say", {}),
    ],
  },
  {
    id: "desired_changes", type: "multi", eyebrow: "What may change",
    question: "What would you most like to feel different?",
    help: "Choose up to three intentions—not promised outcomes.", required: true, max: 3,
    options: [
      option("movement", "More ease and confidence in movement", { EMBODY: 4 }),
      option("energy", "More steady energy", { BREATHE: 2, RESTORE: 2 }),
      option("rest", "Deeper rest and recovery", { RESTORE: 4 }),
      option("calm", "More calm and spaciousness", { BREATHE: 3, RESONATE: 2 }),
      option("connection", "A stronger connection with my body", { EMBODY: 2, BREATHE: 2 }),
      option("wellbeing", "A renewed sense of wellbeing", { RESTORE: 2, CREATE: 1 }),
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
    id: "travel_readiness", type: "single", eyebrow: "Travel readiness",
    question: "How ready are you for Southeast Asia travel in 2027?", required: true,
    options: [
      option("ready", "Ready to plan"),
      option("researching", "Interested and researching"),
      option("details", "Possible with the right details"),
      option("not-2027", "Not ready for Southeast Asia in 2027"),
    ],
  },
  {
    id: "da_nang_availability", type: "single", eyebrow: "Edition 01 · Da Nang",
    question: "Could you be in Da Nang between January 12 and 26, 2027?", required: true,
    options: [
      option("yes", "Yes"), option("likely", "Likely"), option("partial", "For part of those dates"),
      option("unsure", "I’m not sure yet"), option("unavailable", "Not for this edition"),
    ],
  },
  {
    id: "duration_preference", type: "single", eyebrow: "Time in Da Nang",
    question: "Which experience length feels right?", required: true,
    options: [
      option("7-day", "7 days · January 12–19"),
      option("14-day", "14 days · January 12–26"),
      option("either", "Either—help me choose"),
      option("future-only", "A future edition instead"),
    ],
  },
  {
    id: "future_destinations", type: "multi", eyebrow: "Where ASCENSION travels",
    question: "Which future destinations would you consider?", required: true,
    options: destinations.map((entry) => option(entry.value, entry.label)),
  },
  {
    id: "suggested_destination", type: "text", eyebrow: "Your suggested place",
    question: "Where should ASCENSION travel next?", placeholder: "City, country", required: true,
  },
  {
    id: "accommodation_style", type: "single", eyebrow: "Shape your stay",
    question: "Which accommodation style feels most like you?", required: true,
    options: accommodationStyles.map((entry) => option(entry.value, entry.label)),
  },
  {
    id: "room_type", type: "single", eyebrow: "Your room",
    question: "What room arrangement would you prefer?", required: true,
    options: roomTypes.map((entry) => option(entry.value, entry.label)),
  },
  {
    id: "accommodation_priorities", type: "multi", eyebrow: "What matters most",
    question: "What should your accommodation prioritize?", help: "Choose up to three.", required: true, max: 3,
    options: accommodationPriorities.map((entry) => option(entry.value, entry.label)),
  },
  {
    id: "nightly_budget", type: "single", eyebrow: "Approximate nightly budget",
    question: "What nightly range should we plan around?", required: true,
    options: hotelBudgets.map((entry) => option(entry.value, entry.label)),
  },
];

export function questionIsVisible(question, answers) {
  if (question.id === "body_areas") return !["none", "prefer-not"].includes(answers.discomfort_frequency);
  if (question.id === "suggested_destination") return Array.isArray(answers.future_destinations) && answers.future_destinations.includes("other");
  return true;
}

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
