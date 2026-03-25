import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate, getDownloadType } from "@/lib/templates";
import { rateLimit } from "@/lib/rateLimit";
import { localiseHtml, getDisplayName } from "@/lib/localise";
import { buildShopifyZip, buildWordPressZip } from "@/lib/zip-templates";

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
    if (session.status !== "complete" || session.payment_status !== "paid") {
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

    const displayName = getDisplayName(templateId, template.name, lang);

    switch (downloadType) {
      case "html": {
        const body = localiseHtml(template.content, lang, templateId);
        const htmlLang = lang === "it" ? "it" : "en";
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

      case "shopify": {
        const zip = buildShopifyZip(template, displayName);
        return new NextResponse(Buffer.from(zip), {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${template.id}.zip"`,
          },
        });
      }

      case "wordpress": {
        const zip = buildWordPressZip(template, displayName);
        return new NextResponse(Buffer.from(zip), {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${template.id}.zip"`,
          },
        });
      }

      // External link types (Canva, Notion, etc.)
      default: {
        if (template.downloadUrl && template.downloadUrl.trim() !== "") {
          return NextResponse.json({ url: template.downloadUrl });
        }
        return NextResponse.json({ error: "Download link not configured yet" }, { status: 404 });
      }
    }
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
