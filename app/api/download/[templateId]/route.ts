import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getTemplate, getDownloadType } from "@/lib/templates";
import { getUserPurchases } from "@/lib/purchases";

export async function GET(
  _req: NextRequest,
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

  const downloadType = getDownloadType(template);

  switch (downloadType) {
    case "html": {
      const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${template.name} — TemplateLab</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; }</style>
</head>
<body>${template.content}
</body>
</html>`;
      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": `attachment; filename="${template.id}.html"`,
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
