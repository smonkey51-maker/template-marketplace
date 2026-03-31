import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserPreferences, saveUserPreferences } from "@/lib/userMemory";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prefs = await getUserPreferences(userId);
  return NextResponse.json(prefs);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { brand_tone, preferred_style, color_notes, extra_context } = body;

  await saveUserPreferences(userId, {
    brand_tone: brand_tone?.trim() || undefined,
    preferred_style: preferred_style?.trim() || undefined,
    color_notes: color_notes?.trim() || undefined,
    extra_context: extra_context?.trim() || undefined,
  });

  return NextResponse.json({ ok: true });
}
