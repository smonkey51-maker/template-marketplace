import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getTemplate, getDownloadType } from "@/lib/templates";
import { templateTranslations } from "@/lib/i18n";
import { getUserPurchases } from "@/lib/purchases";

/** Apply basic Italian localisation to an HTML template string. */
function localiseHtml(html: string, lang: "it" | "en", templateId: string): string {
  if (lang === "en") return html;

  const tr = templateTranslations[templateId];
  // Swap any English title/name in the HTML with the Italian one when available
  // (light-touch: only affects visible text nodes)
  let result = html;

  // Common UI strings → Italian
  const replacements: [RegExp, string][] = [
    [/\bStart for free\b/g, "Inizia gratis"],
    [/\bGet started\b/g, "Inizia ora"],
    [/\bWatch demo\b/g, "Guarda la demo"],
    [/\bNo credit card required\b/g, "Nessuna carta richiesta"],
    [/\bFree tier available\b/g, "Piano gratuito disponibile"],
    [/\bCancel anytime\b/g, "Disdici quando vuoi"],
    [/\bLearn more\b/g, "Scopri di più"],
    [/\bSign up\b/g, "Registrati"],
    [/\bSign in\b/g, "Accedi"],
    [/\bContact us\b/g, "Contattaci"],
    [/\bSee all\b/g, "Vedi tutti"],
    [/\bView all\b/g, "Vedi tutti"],
    [/\bAdd to cart\b/g, "Aggiungi al carrello"],
    [/\bSave to wishlist\b/g, "Salva nei preferiti"],
    [/\bFree shipping on orders over\b/g, "Spedizione gratuita per ordini superiori a"],
    [/\b30-day free returns\b/g, "30 giorni di reso gratuito"],
    [/\bHandcrafted in Italy\b/g, "Fatto a mano in Italia"],
    [/\bSubscribe to newsletter\b/g, "Iscriviti alla newsletter"],
    [/\bView courses\b/g, "Vedi i corsi"],
    [/\bLatest posts\b/g, "Ultimi post"],
    [/\bRecent videos\b/g, "Video recenti"],
    [/\bActive Sequences\b/g, "Sequenze attive"],
    [/\bActive Workflows\b/g, "Workflow attivi"],
    [/\bNew sequence\b/g, "Nuova sequenza"],
    [/\bNew workflow\b/g, "Nuovo workflow"],
    [/\bSearch conversations\.\.\./g, "Cerca conversazioni..."],
    [/\bMessage Aria\.\.\./g, "Scrivi ad Aria..."],
    [/\bCustomize channel\b/g, "Personalizza il canale"],
    [/\bNew Project\b/g, "Nuovo progetto"],
    [/\bMy Projects\b/g, "I miei progetti"],
    [/\bKnowledge Base\b/g, "Knowledge Base"],
    [/\bSystem Instructions\b/g, "Istruzioni di sistema"],
    [/\bUsage stats\b/g, "Statistiche utilizzo"],
  ];

  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const purchases = await getUserPurchases(userId);
  if (!purchases.includes(templateId)) {
    return NextResponse.json({ error: "Not purchased" }, { status: 403 });
  }

  // Language preference from query string (defaults to "en")
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as "it" | "en";

  const downloadType = getDownloadType(template);

  switch (downloadType) {
    case "html": {
      const body = localiseHtml(template.content, lang, templateId);
      const htmlLang = lang === "it" ? "it" : "en";
      const titleSuffix = lang === "it" ? "— TemplateLab" : "— TemplateLab";

      // Use Italian name if available
      const tr = templateTranslations[templateId];
      const displayName = lang === "it" && tr ? tr.name : template.name;

      const html = `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${displayName} ${titleSuffix}</title>
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

    case "prompt": {
      return new NextResponse(template.content, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${template.id}.txt"`,
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
      if (template.downloadUrl) {
        return NextResponse.json({ url: template.downloadUrl });
      }
      return NextResponse.json(
        { error: "Download link not configured yet" },
        { status: 404 }
      );
    }
  }
}
