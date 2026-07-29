import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { resolveTemplate } from "@/lib/templatesDb";
import { getUserPurchases } from "@/lib/purchases";
import { readProductFile, TAILWIND_CDN } from "@/lib/productFiles";

/**
 * Marketing preview for a template, rendered inside a same-origin iframe on
 * the catalogue / detail / studio pages.
 *
 * Non-owners get the short teaser stored in `templates.content` — never the
 * full `content/products/*.html` file, which is the thing they are paying for.
 * Owners (and anyone taking a free template) get the real product.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  const { templateId } = await params;

  // Fall back to the local catalogue when the row isn't in the DB (or Supabase
  // isn't configured, as in local dev). The teaser is public either way, so the
  // fallback costs nothing — but without it every preview iframe on the site
  // goes blank the moment a template is missing from the templates table.
  const template = await resolveTemplate(templateId);

  if (!template) {
    return new NextResponse("Not found", { status: 404 });
  }

  let owns = template.price === 0;
  if (!owns) {
    const { userId } = await auth().catch(() => ({ userId: null }));
    if (userId) {
      const purchases = await getUserPurchases(userId);
      owns = purchases.includes(templateId);
    }
  }

  const full = owns ? readProductFile(templateId) : null;
  if (full) {
    return new NextResponse(full, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
      },
    });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="${TAILWIND_CDN}"></script>
  <style>body { margin: 0; } * { scrollbar-width: none; -ms-overflow-style: none; } *::-webkit-scrollbar { display: none; }</style>
</head>
<body>${template.content}</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Teaser only — safe to cache for everyone
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
