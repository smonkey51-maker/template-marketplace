import { Resend } from "resend";

const FROM = process.env.RESEND_FROM ?? "ACUME <onboarding@resend.dev>";
const NOTIFY_TO = process.env.RESEND_NOTIFY_TO ?? undefined;

/**
 * Newsletter signup notification.
 *
 * This site has no database (Supabase was removed along with the rest of the
 * e-commerce infrastructure — see CLAUDE.md), so there is nowhere to persist
 * a subscriber list server-side. Instead, each signup sends a short
 * notification email to the site owner (`RESEND_NOTIFY_TO`, falling back to
 * `RESEND_FROM`'s own address), who adds it to whatever mailing list tool
 * they use. Silently no-ops if `RESEND_API_KEY` is not set, so local dev and
 * previews never fail on a missing key.
 */
export async function sendNewsletterSignupNotification(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = NOTIFY_TO ?? FROM;

  await resend.emails.send({
    from: FROM,
    to,
    subject: "Nuova iscrizione alla newsletter — ACUME",
    html: `<p style="font-family:sans-serif;font-size:14px;">Nuovo iscritto: <strong>${email}</strong></p>`,
  });
}
