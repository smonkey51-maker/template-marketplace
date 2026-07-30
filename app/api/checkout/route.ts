import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { resolveTemplate, resolveBundle } from "@/lib/templatesDb";
import { checkoutSchema } from "@/lib/schemas";
import { siteUrl } from "@/lib/siteUrl";

/**
 * A price ID that was never created in Stripe.
 *
 * Templates are added to lib/templates.ts with a `price_TODO_*` placeholder and
 * the real Price is meant to be minted afterwards. When that second step is
 * skipped, Stripe answers "No such price" and the buyer got an unexplained
 * error at the moment they tried to pay. Catch it here so the response says
 * what is actually wrong.
 */
function isPlaceholderPrice(priceId: string): boolean {
  return priceId.startsWith("price_TODO");
}

/**
 * Stripe throws on any rejected request — an unhandled one leaves the route
 * returning a bare 500 with nothing in it, which is what the buyer saw. Log the
 * real reason and answer with something the UI can show.
 */
async function createSession(
  stripe: Stripe,
  params: Stripe.Checkout.SessionCreateParams,
): Promise<NextResponse> {
  const priceId = params.line_items?.[0]?.price;
  if (typeof priceId === "string" && isPlaceholderPrice(priceId)) {
    console.error(`[checkout] placeholder price ID never created in Stripe: ${priceId}`);
    return NextResponse.json(
      { error: "Questo articolo non è ancora acquistabile. Riprova più tardi." },
      { status: 503 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe rejected the session:", err);
    return NextResponse.json(
      { error: "Non è stato possibile avviare il pagamento. Riprova più tardi." },
      { status: 502 },
    );
  }
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // userId is optional — single-template purchases allow guest checkout
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch {
    /* guest checkout */
  }

  const parsed = checkoutSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { templateId, bundleId } = parsed.data;
  // Never derive redirect URLs from Origin/Referer — those are client-controlled
  // and would let an attacker point Stripe's success_url at their own domain.
  const appUrl = siteUrl();

  // ── Bundle checkout — requires auth ───────────────────────────────────────
  if (bundleId) {
    if (!userId) {
      return NextResponse.json(
        { error: "Login required for bundles", requireAuth: true },
        { status: 401 },
      );
    }
    const bundle = await resolveBundle(bundleId);
    if (!bundle) {
      return NextResponse.json({ error: "Bundle non trovato" }, { status: 404 });
    }

    // Free bundles skip Stripe entirely
    if (bundle.price === 0) {
      return NextResponse.json({ url: `${appUrl}/success?bundleId=${bundleId}&free=1` });
    }

    const bundleMeta = { userId, bundleId, templateIds: bundle.templateIds.join(",") };
    return createSession(stripe, {
      mode: "payment",
      line_items: [{ price: bundle.stripePriceId, quantity: 1 }],
      success_url: `${appUrl}/success?bundleId=${bundleId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      payment_intent_data: { metadata: bundleMeta },
      metadata: bundleMeta,
    });
  }

  // ── Studio Access — requires auth ─────────────────────────────────────────
  if (templateId === "studio-access" || templateId === "studio-access-lifetime") {
    if (!userId) {
      return NextResponse.json(
        { error: "Login required for Studio Access", requireAuth: true },
        { status: 401 },
      );
    }
    const priceId =
      templateId === "studio-access-lifetime"
        ? process.env.STUDIO_ACCESS_LIFETIME_PRICE_ID
        : process.env.STUDIO_ACCESS_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: "Price not configured" }, { status: 404 });
    }
    const isSubscription = templateId === "studio-access";
    return createSession(stripe, {
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/studio`,
      ...(isSubscription
        ? { subscription_data: { metadata: { userId, templateId } } }
        : { payment_intent_data: { metadata: { userId, templateId } } }),
      metadata: { userId, templateId },
    });
  }

  // ── Single template — guest checkout allowed ───────────────────────────────
  const template = await resolveTemplate(templateId as string);
  if (!template) {
    return NextResponse.json({ error: "Template non trovato" }, { status: 404 });
  }

  // Free templates skip Stripe entirely
  if (template.price === 0) {
    return NextResponse.json({ url: `${appUrl}/success?templateId=${templateId}&free=1` });
  }

  const templateMeta = { templateId: templateId as string, ...(userId ? { userId } : {}) };
  return createSession(stripe, {
    mode: "payment",
    line_items: [{ price: template.stripePriceId, quantity: 1 }],
    success_url: `${appUrl}/success?templateId=${templateId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/preview/${templateId}`,
    payment_intent_data: { metadata: templateMeta },
    metadata: templateMeta,
  });
}
