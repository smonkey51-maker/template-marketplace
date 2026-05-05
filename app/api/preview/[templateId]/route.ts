import { NextRequest, NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  const template = getTemplate(templateId);

  if (!template) {
    return new NextResponse("Not found", { status: 404 });
  }

  // For ready-to-use products stored as standalone HTML files in public/products/
  const staticPath = join(process.cwd(), "public", "products", `${templateId}.html`);
  if (existsSync(staticPath)) {
    const html = readFileSync(staticPath, "utf-8");
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; } * { scrollbar-width: none; -ms-overflow-style: none; } *::-webkit-scrollbar { display: none; }</style>
</head>
<body>${template.content}</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
