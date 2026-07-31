import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserPreferences, saveUserPreferences } from "@/lib/userMemory";
import { preferencesSchema } from "@/lib/schemas";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prefs = await getUserPreferences(userId);
  return NextResponse.json(prefs);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = preferencesSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  // Empty strings mean "clear this field", not "store an empty string"
  const prefs = Object.fromEntries(
    Object.entries(parsed.data).filter(([, v]) => v !== undefined && v !== ""),
  );

  await saveUserPreferences(userId, prefs);
  return NextResponse.json({ ok: true });
}
