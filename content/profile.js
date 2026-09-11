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
  { value: "other", label: "Suggest another place" },
];

export const accommodationStyles = [
  { value: "quiet-boutique", label: "Quiet boutique hotel" },
  { value: "wellness-resort", label: "Wellness resort" },
  { value: "design-hotel", label: "Design-led hotel" },
  { value: "simple-comfort", label: "Simple, comfortable base" },
  { value: "undecided", label: "I’m open to guidance" },
];

export const hotelBudgets = [
  { value: "under-75", label: "Under US$75 per night" },
  { value: "75-150", label: "US$75–150 per night" },
  { value: "150-250", label: "US$150–250 per night" },
  { value: "250-plus", label: "US$250+ per night" },
  { value: "undecided", label: "Not decided yet" },
];

const option = (value, label, scores = {}) => ({ value, label, scores });

export const profileQuestions = [
  {
    id: "wellness_priority", type: "single", eyebrow: "Begin with now",
    question: "What would you most like to make space for?",
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
    id: "current_experience", type: "multi", eyebrow: "Experience planning",
    question: "What has been showing up in everyday life?",
    help: "This helps shape an experience; it is not a clinical assessment. Select any that apply.", required: true,
    sensitive: true,
    options: [
      option("discomfort", "Recurring physical discomfort", { RESTORE: 3, EMBODY: 1 }),
      option("stiffness", "Stiffness or reduced ease", { EMBODY: 3, RESTORE: 2 }),
      option("fatigue", "Fatigue or low energy", { BREATHE: 2, RESTORE: 3 }),
      option("stress", "Stress or difficulty switching off", { BREATHE: 3, RESONATE: 2 }),
      option("none", "None of these / prefer not to say", {}),
    ],
  },
  {
    id: "body_areas", type: "multi", eyebrow: "Experience planning",
    question: "Are there areas you would want considered in planning?",
    help: "Optional and non-diagnostic. Choose only what you are comfortable sharing.", required: false, sensitive: true,
    when: { id: "current_experience", includesAny: ["discomfort", "stiffness"] },
    options: [
      option("neck-shoulders", "Neck and shoulders", { RESTORE: 2, EMBODY: 1 }),
      option("back", "Back", { RESTORE: 2, EMBODY: 1 }),
      option("hips-legs", "Hips and legs", { EMBODY: 2, RESTORE: 1 }),
      option("hands-feet", "Hands and feet", { RESTORE: 2 }),
      option("whole-body", "Whole-body ease", { RESTORE: 2, EMBODY: 2 }),
      option("prefer-not", "Prefer not to say", {}),
    ],
  },
  {
    id: "movement_limitations", type: "multi", eyebrow: "Everyday movement",
    question: "Which everyday movements would you like to feel easier?",
    help: "Non-diagnostic experience planning only. Select any that apply.", required: true, sensitive: true,
    options: [
      option("walking", "Walking or exploring for longer", { EMBODY: 2, RESTORE: 1 }),
      option("stairs", "Stairs, rising or changing levels", { EMBODY: 2 }),
      option("reach", "Reaching, turning or bending", { EMBODY: 2, RESTORE: 1 }),
      option("stillness", "Sitting or resting comfortably", { RESTORE: 2, BREATHE: 1 }),
      option("none", "No meaningful limitation / prefer not to say", {}),
    ],
  },
  {
    id: "sensory_preferences", type: "multi", eyebrow: "Follow your senses",
    question: "Which experiences draw you in?",
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
    id: "travel_readiness", type: "single", eyebrow: "The journey",
    question: "How possible does Southeast Asia feel in 2027?", required: true,
    options: [
      option("ready", "I’m ready to plan", {}),
      option("considering", "Possible—I need the right details", {}),
      option("future", "Not in 2027, but keep me close", {}),
      option("unsure", "I’m not sure yet", {}),
    ],
  },
  {
    id: "danang_availability", type: "single", eyebrow: "Edition 01 · Da Nang",
    question: "Could January 12–26, 2027 work for you?", required: true,
    options: [
      option("yes", "Yes", {}), option("maybe", "Possibly", {}),
      option("partial", "Only part of those dates", {}), option("no", "Not this edition", {}),
    ],
  },
  {
    id: "duration", type: "single", eyebrow: "Time in Da Nang",
    question: "Which experience are you considering?", required: true,
    when: { id: "danang_availability", notIn: ["no"] },
    options: [
      option("7-day", "7 days · January 12–19", {}),
      option("14-day", "14 days · January 12–26", {}),
      option("undecided", "I’d like help deciding", {}),
    ],
  },
  {
    id: "future_destinations", type: "multi", eyebrow: "The travelling series",
    question: "Where should ASCENSION travel next?",
    help: "Choose every destination you would seriously consider.", required: false,
    options: destinations,
  },
  {
    id: "suggested_market", type: "text", eyebrow: "Your suggestion",
    question: "Which city or country should we consider?",
    placeholder: "City, country", required: true,
    when: { id: "future_destinations", includesAny: ["other"] },
  },
  {
    id: "accommodation_style", type: "single", eyebrow: "Your home base",
    question: "What kind of accommodation feels right?", required: true,
    when: { id: "danang_availability", notIn: ["no"] }, options: accommodationStyles,
  },
  {
    id: "accommodation_budget", type: "single", eyebrow: "Your home base",
    question: "What nightly accommodation range are you considering?", required: true,
    when: { id: "danang_availability", notIn: ["no"] }, options: hotelBudgets,
  },
  {
    id: "travel_party", type: "single", eyebrow: "Who you travel with",
    question: "How do you imagine arriving?", required: true,
    when: { id: "danang_availability", notIn: ["no"] },
    options: [
      option("solo", "Solo", {}), option("partner", "With a partner", {}),
      option("friend", "With a friend", {}), option("shared", "Open to a shared room", {}),
    ],
  },
];

export function questionIsVisible(question, answers) {
  if (!question.when) return true;
  const value = answers[question.when.id];
  if (question.when.notIn) return !question.when.notIn.includes(value);
  if (question.when.includesAny) return Array.isArray(value) && question.when.includesAny.some((item) => value.includes(item));
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

