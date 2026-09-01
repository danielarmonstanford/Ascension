export const experienceVideos = [
  {
    id: "hero-orbit",
    chapter: "hero",
    title: "ASCENSION yoga orbit",
    src: "https://res.cloudinary.com/dno3ruh4b/video/upload/v1788041873/Bodakon_wheel_Yoga_Ascension_qfdctl.mp4",
    poster: "https://res.cloudinary.com/dno3ruh4b/image/upload/f_auto,q_auto/v1787491510/Screen_Shot_2026-08-23_at_9.24.02_AM_finbe7.png",
    alt: "A woman in a yoga wheel pose on a Pacific beach in Da Nang",
    status: "approved",
    hasAudio: false,
  },
  { id: "dien-chan-proof", chapter: "dien-chan", title: "Diện Chẩn treatment", alt: "Diện Chẩn treatment video pending", status: "pending", hasAudio: false },
  { id: "ecstatic-dance-proof", chapter: "ecstatic-dance", title: "Ecstatic Dance", alt: "Ecstatic Dance video pending", status: "pending", hasAudio: false },
  { id: "sound-preview", chapter: "sound", title: "A moment of sound", alt: "Sixty-second sound preview pending", status: "pending", hasAudio: true },
  { id: "taste-proof", chapter: "taste", title: "Shared Vietnamese dining", alt: "Vietnamese dining video pending", status: "pending", hasAudio: false },
  { id: "community-proof", chapter: "community", title: "Lived experience", alt: "Participant and community video pending", status: "pending", hasAudio: true },
];

// Nothing renders publicly until consent is confirmed and status is approved.
export const testimonials = [];

export const languages = [
  { code: "en", label: "English", status: "approved" },
  { code: "fr", label: "Français", status: "draft" },
  { code: "vi", label: "Tiếng Việt", status: "draft" },
  { code: "ko", label: "한국어", status: "draft" },
  { code: "zh-CN", label: "中文", status: "draft" },
];

export const emailCapture = { enabled: false, provider: null };
