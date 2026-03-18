import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate, getBundle } from "@/lib/templates";

const STUDIO_ACCESS_PRICE_ID = "price_1TBruJBoWNgrJbiy6Ry5WGB2";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const body = await req.json();
  const { templateId, bundleId } = body;
  const requestOrigin =
    req.headers.get("origin") ??
    req.headers.get("referer")?.match(/^https?:\/\/[^/]+/)?.[0];
  const appUrl = requestOrigin ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // ── Bundle checkout ────────────────────────────────────────────────────────
  if (bundleId) {
    const bundle = getBundle(bundleId);
    if (!bundle) {
      return NextResponse.json({ error: "Bundle non trovato" }, { status: 404 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: bundle.stripePriceId, quantity: 1 }],
      success_url: `${appUrl}/success?bundleId=${bundleId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      payment_intent_data: { metadata: { userId, bundleId, templateIds: bundle.templateIds.join(",") } },
      metadata: { userId, bundleId, templateIds: bundle.templateIds.join(",") },
    });
    return NextResponse.json({ url: session.url });
  }

  // ── Single template / studio checkout ─────────────────────────────────────
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

  const isSubscription = templateId === "studio-access";

  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/`,
    ...(isSubscription
      ? { subscription_data: { metadata: { userId, templateId } } }
      : { payment_intent_data: { metadata: { userId, templateId } } }),
    metadata: { userId, templateId },
  });

  return NextResponse.json({ url: session.url });
}
