// Sends transactional notification emails via Resend's HTTP API.
// If RESEND_API_KEY isn't configured yet, this logs instead of throwing —
// so form submissions still save to the database even before email is set up.
export async function sendEmail({ subject, html, replyTo, to: toOverride }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM_EMAIL;
  const to = toOverride || process.env.NOTIFY_TO_EMAIL;

  if (!apiKey || apiKey.startsWith("re_xxxx")) {
    console.warn(
      `[email skipped — RESEND_API_KEY not configured] Would have sent: "${subject}" to ${to}`
    );
    return { skipped: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }

  return res.json();
}

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Renders a simple, consistent notification email from a flat field map.
export function renderNotificationHtml(title, fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748B;font-family:sans-serif;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;font-family:sans-serif;font-size:13px;color:#111827;">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#243B8F;">${escapeHtml(title)}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="color:#94A3B8;font-size:12px;margin-top:24px;">Sent automatically from the QuantEdge website.</p>
    </div>
  `;
}
