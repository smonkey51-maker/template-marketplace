import { NextRequest, NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rateLimit";
import { sendNewsletterSignupNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`subscribe:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await sendNewsletterSignupNotification(parsed.data.email);
  } catch (err) {
    console.error("Subscribe notification error:", err);
    // Don't fail the request over a downstream email hiccup — the visitor's
    // signup intent is what matters, and there's nothing else to roll back.
  }

  return NextResponse.json({ ok: true });
}
