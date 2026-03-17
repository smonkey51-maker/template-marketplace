import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate } from "@/lib/templates";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const STUDIO_ACCESS_PRICE_ID = "price_1TBruJBoWNgrJbiy6Ry5WGB2";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const { templateId } = await req.json();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  let priceId: string;

  if (templateId === "studio-access") {
    priceId = STUDIO_ACCESS_PRICE_ID;
  } else {
    const template = getTemplate(templateId);
    if (!template) {
      return NextResponse.json({ error: "Template non trovato" }, { status: 404 });
    }
    priceId = template.stripePriceId;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?canceled=1`,
    metadata: { userId, templateId },
  });

  return NextResponse.json({ url: session.url });
}
