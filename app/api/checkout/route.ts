import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate } from "@/lib/templates";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const { templateId } = await req.json();
  const template = getTemplate(templateId);

  if (!template) {
    return NextResponse.json({ error: "Template non trovato" }, { status: 404 });
  }

  const origin = req.headers.get("origin") ?? req.nextUrl.origin ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: template.stripePriceId, quantity: 1 }],
    success_url: `${origin}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?canceled=1`,
    metadata: { userId, templateId },
  });

  return NextResponse.json({ url: session.url });
}
