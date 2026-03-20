import { Resend } from "resend";

const FROM = process.env.RESEND_FROM ?? "TemplateLab <noreply@templatelab.io>";

type PurchaseEmailParams = {
  to: string;
  type: "template" | "bundle" | "studio";
  itemName: string;
  downloadUrl?: string;   // guest download link for html/prompt templates
  previewUrl?: string;    // /preview/:id for studio link
  bundleTemplates?: string[];
};

export async function sendPurchaseEmail(params: PurchaseEmailParams) {
  if (!process.env.RESEND_API_KEY) return; // silently skip if not configured
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { to, type, itemName, downloadUrl, previewUrl, bundleTemplates } = params;

  const subject =
    type === "studio"
      ? "✦ Studio Access attivato — TemplateLab"
      : `Il tuo acquisto è pronto — ${itemName}`;

  const accentColor = type === "studio" ? "#5E5CE6" : "#0A84FF";

  const ctaBlock =
    type === "studio"
      ? `<a href="https://templatelab.io/studio" style="display:inline-block;background:${accentColor};color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;margin-top:8px;">Apri AI Studio →</a>`
      : downloadUrl
      ? `<a href="${downloadUrl}" style="display:inline-block;background:${accentColor};color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;margin-top:8px;">⬇ Scarica il template</a>`
      : previewUrl
      ? `<a href="${previewUrl}" style="display:inline-block;background:${accentColor};color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;margin-top:8px;">Accedi al template →</a>`
      : "";

  const bundleList =
    bundleTemplates && bundleTemplates.length > 0
      ? `<ul style="margin:12px 0 0;padding-left:20px;color:#86868b;font-size:13px;line-height:1.8;">${bundleTemplates.map((n) => `<li>${n}</li>`).join("")}</ul>`
      : "";

  const bodyText =
    type === "studio"
      ? "Hai attivato <strong>Studio Access</strong>. Puoi ora generare template illimitati con Claude AI."
      : type === "bundle"
      ? `Hai acquistato il bundle <strong>${itemName}</strong>. I seguenti template sono ora disponibili nel tuo account:${bundleList}`
      : `Hai acquistato <strong>${itemName}</strong>. Il tuo template è pronto per il download.`;

  const html = `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background:#1c1c1e;border-radius:24px;overflow:hidden;max-width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0a84ff 0%,#5e5ce6 100%);padding:28px 36px;">
          <p style="margin:0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.5px;">TemplateLab</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">AI-Powered Template Marketplace</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 36px;">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f5f5f7;letter-spacing:-0.3px;">Acquisto confermato ✓</p>
          <p style="margin:0 0 20px;font-size:15px;color:#86868b;line-height:1.6;">${bodyText}</p>
          ${ctaBlock}
          <hr style="border:none;border-top:1px solid #2c2c2e;margin:28px 0;"/>
          <p style="margin:0;font-size:12px;color:#48484a;line-height:1.7;">
            Hai domande? Scrivici a <a href="mailto:support@templatelab.io" style="color:#0a84ff;text-decoration:none;">support@templatelab.io</a><br/>
            <a href="https://templatelab.io/account" style="color:#48484a;">Vedi i tuoi acquisti</a> &nbsp;·&nbsp;
            <a href="https://templatelab.io" style="color:#48484a;">Marketplace</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#111113;padding:16px 36px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#3a3a3c;">© 2026 TemplateLab. Tutti i diritti riservati.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resend.emails.send({ from: FROM, to, subject, html });
}

export function buildNewsletterHtml(title: string, body: string): string {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `<p style="margin:0 0 14px;font-size:15px;color:#86868b;line-height:1.7;">${l}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background:#1c1c1e;border-radius:24px;overflow:hidden;max-width:100%;">
        <tr><td style="background:linear-gradient(135deg,#0a84ff 0%,#5e5ce6 100%);padding:28px 36px;">
          <p style="margin:0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.5px;">TemplateLab</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">AI-Powered Template Marketplace</p>
        </td></tr>
        <tr><td style="padding:32px 36px;">
          <p style="margin:0 0 20px;font-size:24px;font-weight:700;color:#f5f5f7;letter-spacing:-0.3px;">${title}</p>
          ${lines}
          <hr style="border:none;border-top:1px solid #2c2c2e;margin:28px 0;"/>
          <p style="margin:0;font-size:12px;color:#48484a;line-height:1.7;">
            Hai domande? Scrivici a <a href="mailto:support@templatelab.io" style="color:#0a84ff;text-decoration:none;">support@templatelab.io</a><br/>
            <a href="https://templatelab.io" style="color:#48484a;">Visita il Marketplace</a>
          </p>
        </td></tr>
        <tr><td style="background:#111113;padding:16px 36px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#3a3a3c;">© 2026 TemplateLab. Tutti i diritti riservati.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendNewsletterEmail(
  to: string[],
  subject: string,
  title: string,
  body: string
) {
  if (!process.env.RESEND_API_KEY) return { sent: 0, errors: 0 };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = buildNewsletterHtml(title, body);

  // Resend batch: max 100 per chiamata
  const BATCH = 100;
  let sent = 0;
  let errors = 0;
  for (let i = 0; i < to.length; i += BATCH) {
    const chunk = to.slice(i, i + BATCH);
    const result = await resend.batch.send(
      chunk.map((email) => ({ from: FROM, to: email, subject, html }))
    );
    sent += chunk.length - (result.error ? chunk.length : 0);
    if (result.error) errors += chunk.length;
  }
  return { sent, errors };
}
