import { NextRequest, NextResponse } from "next/server";
import { resolveTemplate } from "@/lib/templatesDb";
import { TAILWIND_CDN } from "@/lib/productFiles";

/**
 * Marketing preview for a template, rendered inside a same-origin iframe on the
 * catalogue / detail / studio pages.
 *
 * Always the short teaser from `templates.content` — never the full
 * `content/products/*.html` file, which is the thing people pay for. Buyers
 * reach the real product through /api/download/[templateId], which checks the
 * purchase; a preview iframe is the wrong place to hand it out.
 *
 * That makes this endpoint completely public, which is what keeps it fast: it
 * is excluded from the Clerk middleware matcher, so the 16 iframes the
 * catalogue mounts no longer each trigger an authentication handshake, and the
 * response is identical for everyone and therefore cacheable.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  const { templateId } = await params;

  // Grid thumbnails render in a sandbox without allow-scripts, so the Tailwind
  // CDN <script> can never execute there — but the browser still fetches it,
  // once per card. Templates carry their own inline <style>, so the interactive
  // view is the only one that needs it.
  const interactive = req.nextUrl.searchParams.get("interactive") === "1";

  // Fall back to the local catalogue when the row isn't in the DB (or Supabase
  // isn't configured, as in local dev) — otherwise every preview iframe on the
  // site goes blank the moment a template is missing from the templates table.
  const template = await resolveTemplate(templateId);

  if (!template) {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
${interactive ? `  <script src="${TAILWIND_CDN}"></script>\n` : ""}  <style>body { margin: 0; } * { scrollbar-width: none; -ms-overflow-style: none; } *::-webkit-scrollbar { display: none; }</style>
</head>
<body>${template.content}</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
