import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { subscribeSchema } from "@/lib/schemas";
import { rateLimitRedis } from "@/lib/rateLimitRedis";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await rateLimitRedis(`subscribe:${ip}`, 5, 60_000))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await supabaseAdmin()
    .from("subscribers")
    .upsert({ email: parsed.data.email }, { onConflict: "email" });

  if (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
