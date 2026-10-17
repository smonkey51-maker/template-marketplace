import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rateLimit";
import { emailConfigured, sendContactNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Troppe richieste. Riprova tra poco." }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    const fields = Object.fromEntries(
      parsed.error.issues.map((i) => [String(i.path[0] ?? "form"), i.message]),
    );
    return NextResponse.json({ error: "Dati non validi", fields }, { status: 400 });
  }

  // Honeypot filled: pretend it worked, deliver nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  // Losing a client enquiry silently is worse than showing an error. In
  // production without a mail key, say so; in dev and previews just accept.
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is not set: message not delivered");
      return NextResponse.json({ error: "Servizio non disponibile" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactNotification(parsed.data);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json({ error: "Invio non riuscito" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
