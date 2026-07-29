import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getDownloadType } from "@/lib/templates";
import { getTemplateFromDb } from "@/lib/templatesDb";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getUserPurchases } from "@/lib/purchases";
import { localiseHtml, getDisplayName } from "@/lib/localise";
import { buildShopifyZip, buildWordPressZip } from "@/lib/zip-templates";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { templateId } = await params;
    const template = await getTemplateFromDb(templateId);
    if (!template) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Free templates (price=0) skip purchase check
    if (template.price > 0) {
      const purchases = await getUserPurchases(userId);
      if (!purchases.includes(templateId)) {
        return NextResponse.json({ error: "Not purchased" }, { status: 403 });
      }
    }

    // Language preference from query string (defaults to "en")
    const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as "it" | "en";

    const downloadType = getDownloadType(template);

    switch (downloadType) {
      case "html": {
        // For ready-to-use products, serve the full standalone HTML file directly
        const staticPath = join(process.cwd(), "public", "products", `${templateId}.html`);
        if (existsSync(staticPath)) {
          const staticHtml = readFileSync(staticPath, "utf-8");
          return new NextResponse(staticHtml, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Content-Disposition": `attachment; filename="${templateId}.html"`,
            },
          });
        }

        const body = localiseHtml(template.content, lang, templateId);
        const htmlLang = lang === "it" ? "it" : "en";
        const displayName = getDisplayName(templateId, template.name, lang);

        const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${displayName} — Forma</title>
  <script src="https://cdn.tailwindcss.com"></script>
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
        const displayName = getDisplayName(templateId, template.name, lang);
        const zip = buildShopifyZip(template, displayName);
        return new NextResponse(Buffer.from(zip), {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${template.id}.zip"`,
          },
        });
      }

      case "wordpress": {
        const displayName = getDisplayName(templateId, template.name, lang);
        const zip = buildWordPressZip(template, displayName);
        return new NextResponse(Buffer.from(zip), {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="${template.id}.zip"`,
          },
        });
      }

      // External-link types → return JSON with the URL so the client can open it
      case "canva":
      case "excel":
      case "sheets":
      case "notion":
      case "webflow":
      case "framer": {
        if (template.downloadUrl && template.downloadUrl.trim() !== "") {
          return NextResponse.json({ url: template.downloadUrl });
        }
        return NextResponse.json({ error: "Download link not configured yet" }, { status: 404 });
      }

      default:
        return NextResponse.json(
          { error: `Unsupported download type: ${downloadType}` },
          { status: 400 },
        );
    }
  } catch (err) {
    console.error("[download] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
