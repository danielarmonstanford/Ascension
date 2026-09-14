import { pathwayCopy } from "../content/profile";

const SITE_ORIGIN = "https://www.ascensionsenses.com";
const TAKE_HOME = "Move with greater ease. Breathe with greater awareness. Rest more deeply. Feel more present. Leave with a clearer understanding of what your body needs—and practices you can continue at home.";

function escapeHtml(value) {
  return String(value || "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[character]));
}

function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ASCENSION_FROM_EMAIL?.trim();
  const notificationEmail = process.env.ASCENSION_NOTIFICATION_EMAIL?.trim();
  return {
    apiKey,
    from,
    notificationEmail,
    participantReady: Boolean(apiKey && from),
    notificationReady: Boolean(apiKey && from && notificationEmail),
  };
}

async function sendResendEmail(config, message, idempotencyKey) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ from: config.from, ...message }),
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Resend request failed (${response.status})`);
  return response.json().catch(() => ({}));
}

function buildParticipantEmail({ firstName, pathway, leadRoute }) {
  const pathwayName = escapeHtml(pathway);
  const guideUrl = `${SITE_ORIGIN}/profile/guide?pathway=${encodeURIComponent(pathway.toLowerCase())}`;
  const downloadUrl = `${SITE_ORIGIN}/profile/guide/download`;
  const daNangUrl = `${SITE_ORIGIN}/join#apply`;
  const nextStep = leadRoute === "da-nang-cohort"
    ? { label: "Request your Da Nang cohort invitation", url: daNangUrl }
    : { label: "Tell us where ASCENSION should travel next", url: `${SITE_ORIGIN}/join` };
  const interpretation = escapeHtml(pathwayCopy[pathway] || "Your pathway offers a starting point for shaping an ASCENSION experience around what matters to you.");
  const greeting = escapeHtml(firstName);

  return {
    to: [firstName.email],
    subject: `Your ASCENSION pathway: ${pathway}`,
    text: `Hello ${firstName.name},\n\nYour primary ASCENSION pathway is ${pathway}.\n\n${pathwayCopy[pathway] || "Your pathway offers a starting point for shaping an ASCENSION experience around what matters to you."}\n\nWhat you take home\n${TAKE_HOME}\n\nOpen your guide: ${guideUrl}\nDownload your guide: ${downloadUrl}\n\n${nextStep.label}: ${nextStep.url}\n\nASCENSION · Da Nang, Vietnam · January 12–26, 2027`,
    html: `<!doctype html><html><body style="margin:0;background:#e7f0ef;color:#173744;font-family:Arial,sans-serif"><main style="max-width:620px;margin:0 auto;padding:40px 24px"><p style="margin:0 0 28px;color:#a65f45;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">ASCENSION · Your pathway</p><h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:48px;font-weight:400;line-height:.95">Hello ${greeting}.</h1><p style="font-size:18px;line-height:1.6">Your primary ASCENSION pathway is <strong style="color:#a65f45">${pathwayName}</strong>.</p><p style="font-size:18px;line-height:1.6">${interpretation}</p><section style="margin:32px 0;padding:24px;background:#f4ede1"><p style="margin:0 0 10px;color:#a65f45;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase">What you take home</p><p style="margin:0;font-size:17px;line-height:1.6">${escapeHtml(TAKE_HOME)}</p></section><p style="margin:32px 0"><a href="${guideUrl}" style="display:inline-block;padding:16px 22px;border-radius:14px;background:#ffd45f;color:#102932;font-size:13px;font-weight:700;letter-spacing:1px;text-decoration:none;text-transform:uppercase">Open your Body &amp; Senses Guide</a></p><p style="font-size:16px;line-height:1.6"><a href="${downloadUrl}" style="color:#173744">Download the guide PDF</a></p><p style="font-size:16px;line-height:1.6"><a href="${nextStep.url}" style="color:#173744">${escapeHtml(nextStep.label)} →</a></p><hr style="margin:36px 0;border:0;border-top:1px solid #b7c7c6"><p style="margin:0;color:#526d74;font-size:13px;line-height:1.6">ASCENSION · Da Nang, Vietnam · January 12–26, 2027<br>This guide supports experience personalisation only. ASCENSION does not provide medical diagnosis, advice or treatment.</p></main></body></html>`,
  };
}

function adminEmail({ firstName, email, pathway, supportingPathways, leadRoute, sourcePath, attribution }) {
  const attributionSummary = Object.entries(attribution || {}).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join("\n") || "None";
  return {
    to: [email],
    subject: `New ASCENSION profile: ${pathway}`,
    text: `A new ASCENSION profile has been saved.\n\nName: ${firstName}\nEmail: ${email}\nPrimary pathway: ${pathway}\nSupporting pathways: ${(supportingPathways || []).join(", ") || "None"}\nRecommended route: ${leadRoute}\nSource path: ${sourcePath}\nAttribution:\n${attributionSummary}\n\nNo body, discomfort, mobility, accommodation or complete questionnaire answers are included in this notification.`,
    html: `<p>A new ASCENSION profile has been saved.</p><p><strong>Name:</strong> ${escapeHtml(firstName)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Primary pathway:</strong> ${escapeHtml(pathway)}<br><strong>Supporting pathways:</strong> ${escapeHtml((supportingPathways || []).join(", ") || "None")}<br><strong>Recommended route:</strong> ${escapeHtml(leadRoute)}<br><strong>Source path:</strong> ${escapeHtml(sourcePath)}</p><p>No body, discomfort, mobility, accommodation or complete questionnaire answers are included in this notification.</p>`,
  };
}

export async function sendProfileDelivery({ profileId, firstName, participantEmail: email, pathway, supportingPathways, leadRoute, sourcePath, attribution }) {
  const config = emailConfig();
  if (!config.participantReady) {
    console.error("Profile email delivery is not configured: RESEND_API_KEY and ASCENSION_FROM_EMAIL are required.");
    return { participant: "not_configured", notification: "not_configured" };
  }

  let participant = "failed";
  let notification = "not_configured";
  try {
    await sendResendEmail(config, buildParticipantEmail({ firstName: { name: firstName, email }, pathway, leadRoute }), `ascension-profile-${profileId}-participant`);
    participant = "sent";
  } catch (error) {
    console.error("Profile participant email failed", error instanceof Error ? error.message : "Unknown error");
  }

  if (config.notificationReady) {
    try {
      await sendResendEmail(config, adminEmail({ firstName, email, pathway, supportingPathways, leadRoute, sourcePath, attribution }), `ascension-profile-${profileId}-notification`);
      notification = "sent";
    } catch (error) {
      notification = "failed";
      console.error("Profile administrative notification failed", error instanceof Error ? error.message : "Unknown error");
    }
  } else {
    console.error("Profile administrative notification is not configured: ASCENSION_NOTIFICATION_EMAIL is required.");
  }

  return { participant, notification };
}
