import { Resend } from "resend";
import { SITE } from "@/lib/site";
import type { ContactInput } from "@/lib/schemas";

const FROM = process.env.RESEND_FROM ?? `${SITE.name} <onboarding@resend.dev>`;
const NOTIFY_TO = process.env.RESEND_NOTIFY_TO ?? undefined;

/** True when an email can actually be delivered (a Resend key is configured). */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Visitor-supplied text goes into an HTML email: never interpolate it raw. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Newsletter signup notification.
 *
 * There is no database yet, so each signup sends a short notification email to
 * the site owner (`RESEND_NOTIFY_TO`, falling back to `RESEND_FROM`'s own
 * address), who adds it to whatever mailing list tool they use. Silently no-ops
 * without `RESEND_API_KEY`, so local dev and previews never fail on a missing key.
 */
export async function sendNewsletterSignupNotification(email: string): Promise<void> {
  if (!emailConfigured()) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO ?? FROM,
    subject: `Nuova iscrizione alla newsletter — ${SITE.name}`,
    html: `<p style="font-family:sans-serif;font-size:14px;">Nuovo iscritto: <strong>${escapeHtml(email)}</strong></p>`,
  });
}

/**
 * A contact-form message, emailed to the owner with the visitor as reply-to.
 * Unlike the newsletter this must not fail silently: callers check
 * `emailConfigured()` first and surface an error if delivery is impossible.
 */
export async function sendContactNotification(input: ContactInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#4a5968;">${label}</td><td style="padding:4px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO ?? FROM,
    replyTo: input.email,
    subject: `Nuova richiesta di contatto — ${input.company}`,
    html: `<div style="font-family:sans-serif;font-size:14px;color:#14202e;">
      <table>${row("Nome", input.name)}${row("Azienda", input.company)}${row("Email", input.email)}${input.phone ? row("Telefono", input.phone) : ""}</table>
      <p style="margin-top:16px;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
    </div>`,
  });
  if (error) throw new Error(error.message);
}
