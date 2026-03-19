import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getBundle } from "@/lib/templates";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, templateId, bundleId, templateIds } = session.metadata ?? {};
    const guestEmail = session.customer_details?.email ?? null;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Resolve the effective user_id: authenticated user or guest placeholder
    const effectiveUserId = userId ?? (guestEmail ? `guest:${guestEmail}` : null);

    if (bundleId && userId) {
      // Bundle purchase: always requires auth
      const bundle = getBundle(bundleId);
      const ids = bundle?.templateIds ?? (templateIds ? templateIds.split(",").filter(Boolean) : []);
      const rows = ids.map((tid) => ({
        user_id: userId,
        template_id: tid,
        stripe_session_id: session.id,
      }));
      const { error } = await supabase.from("purchases").insert(rows);
      if (error) {
        console.error("Supabase bundle insert error:", error);
      } else {
        console.log(`✅ Bundle salvato — userId: ${userId}, bundleId: ${bundleId}`);
      }
    } else if (templateId && effectiveUserId) {
      // Single template purchase (authenticated or guest)
      const { error } = await supabase.from("purchases").insert({
        user_id: effectiveUserId,
        template_id: templateId,
        stripe_session_id: session.id,
        guest_email: userId ? null : guestEmail,
      });
      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log(`✅ Acquisto salvato — userId: ${effectiveUserId}, templateId: ${templateId}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
