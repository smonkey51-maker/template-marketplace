/**
 * Webhook Stripe — registra gli acquisti completati.
 * In produzione aggiunge l'acquisto al database.
 * In questa versione logga l'evento (da sostituire con Supabase/Prisma).
 */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(body, signature, webhookSecret)
      : (JSON.parse(body) as Stripe.Event); // dev senza secret
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, templateId } = session.metadata ?? {};

    console.log(`✅ Acquisto completato — userId: ${userId}, templateId: ${templateId}`);
    // TODO: salva in database (es. Supabase):
    // await db.purchases.create({ userId, templateId, sessionId: session.id })
  }

  return NextResponse.json({ received: true });
}
