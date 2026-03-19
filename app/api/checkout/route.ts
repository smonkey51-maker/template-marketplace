import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTemplate, getBundle } from "@/lib/templates";

const STUDIO_ACCESS_PRICE_ID = "price_1TBruJBoWNgrJbiy6Ry5WGB2";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // userId is optional — single-template purchases allow guest checkout
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch { /* guest checkout */ }

  const body = await req.json();
  const { templateId, bundleId } = body;
  const requestOrigin =
    req.headers.get("origin") ??
    req.headers.get("referer")?.match(/^https?:\/\/[^/]+/)?.[0];
  const appUrl = requestOrigin ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // ── Bundle checkout — requires auth ───────────────────────────────────────
  if (bundleId) {
    if (!userId) {
      return NextResponse.json({ error: "Login required for bundles", requireAuth: true }, { status: 401 });
    }
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

  // ── Studio Access — requires auth ─────────────────────────────────────────
  if (templateId === "studio-access" || templateId === "studio-access-lifetime") {
    if (!userId) {
      return NextResponse.json({ error: "Login required for Studio Access", requireAuth: true }, { status: 401 });
    }
    const priceId =
      templateId === "studio-access-lifetime"
        ? process.env.STUDIO_ACCESS_LIFETIME_PRICE_ID
        : STUDIO_ACCESS_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: "Price not configured" }, { status: 404 });
    }
    const isSubscription = templateId === "studio-access";
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/studio`,
      ...(isSubscription
        ? { subscription_data: { metadata: { userId, templateId } } }
        : { payment_intent_data: { metadata: { userId, templateId } } }),
      metadata: { userId, templateId },
    });
    return NextResponse.json({ url: session.url });
  }

  // ── Single template — guest checkout allowed ───────────────────────────────
  const template = getTemplate(templateId);
  if (!template) {
    return NextResponse.json({ error: "Template non trovato" }, { status: 404 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: template.stripePriceId, quantity: 1 }],
    success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/preview/${templateId}`,
    payment_intent_data: {
      metadata: { templateId, ...(userId ? { userId } : {}) },
    },
    metadata: { templateId, ...(userId ? { userId } : {}) },
  });

  return NextResponse.json({ url: session.url });
}
