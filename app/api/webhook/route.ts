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

    if (!userId) return NextResponse.json({ received: true });

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (bundleId) {
      // Bundle purchase: resolve template IDs from bundle definition (avoids 500-char metadata limit)
      const bundle = getBundle(bundleId);
      const ids = bundle?.templateIds ?? (templateIds ? templateIds.split(",").filter(Boolean) : []);
      const rows = ids.map((tid) => ({
        user_id: userId,
        template_id: tid,
        session_id: session.id,
      }));
      const { error } = await supabase.from("purchases").insert(rows);
      if (error) {
        console.error("Supabase bundle insert error:", error);
      } else {
        console.log(`✅ Bundle salvato — userId: ${userId}, bundleId: ${bundleId}, templates: ${templateIds}`);
      }
    } else if (templateId) {
      // Single template purchase
      const { error } = await supabase.from("purchases").insert({
        user_id: userId,
        template_id: templateId,
        session_id: session.id,
      });
      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log(`✅ Acquisto salvato — userId: ${userId}, templateId: ${templateId}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
