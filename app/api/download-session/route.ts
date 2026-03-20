import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate, getDownloadType } from "@/lib/templates";
import { templateTranslations } from "@/lib/i18n";
import { rateLimit } from "@/lib/rateLimit";

function localiseHtml(html: string, lang: "it" | "en", templateId: string): string {
  if (lang === "en") return html;
  const replacements: [RegExp, string][] = [
    [/\bStart for free\b/g, "Inizia gratis"],
    [/\bGet started\b/g, "Inizia ora"],
    [/\bWatch demo\b/g, "Guarda la demo"],
    [/\bNo credit card required\b/g, "Nessuna carta richiesta"],
    [/\bCancel anytime\b/g, "Disdici quando vuoi"],
    [/\bLearn more\b/g, "Scopri di più"],
    [/\bSign up\b/g, "Registrati"],
    [/\bSign in\b/g, "Accedi"],
    [/\bContact us\b/g, "Contattaci"],
    [/\bSee all\b/g, "Vedi tutti"],
    [/\bView all\b/g, "Vedi tutti"],
    [/\bAdd to cart\b/g, "Aggiungi al carrello"],
  ];
  let result = html;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const templateId = req.nextUrl.searchParams.get("templateId");
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as "it" | "en";

  if (!sessionId || !templateId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Rate limit: 10 requests per session_id per hour
  if (!rateLimit(`dl-session:${sessionId}`, 10, 3_600_000)) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment is complete
    if (session.status !== "complete" && session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
    }

    // Verify this session is for the requested template
    if (session.metadata?.templateId !== templateId) {
      return NextResponse.json({ error: "Template mismatch" }, { status: 403 });
    }

    const template = getTemplate(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const downloadType = getDownloadType(template);

    if (downloadType === "html") {
      const body = localiseHtml(template.content, lang, templateId);
      const htmlLang = lang === "it" ? "it" : "en";
      const tr = templateTranslations[templateId];
      const displayName = lang === "it" && tr ? tr.name : template.name;
      const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${displayName} — TemplateLab</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>body { margin: 0; }</style>
</head>
<body>${body}
</body>
</html>`;
      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": `attachment; filename="${template.id}-${lang}.html"`,
        },
      });
    }

    if (downloadType === "prompt") {
      return new NextResponse(template.content, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${template.id}.txt"`,
        },
      });
    }

    // External link types (Canva, Notion, etc.)
    if (template.downloadUrl) {
      return NextResponse.json({ url: template.downloadUrl });
    }
    return NextResponse.json({ error: "Download link not configured" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
