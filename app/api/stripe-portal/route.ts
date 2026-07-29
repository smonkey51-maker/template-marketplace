import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { siteUrl } from "@/lib/siteUrl";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: "Email non trovata" }, { status: 400 });
  }

  // Not the Origin header — it is client-controlled, and feeding it to Stripe
  // as a return_url is the same open redirect that was fixed in /api/checkout.
  const origin = siteUrl();

  // Find or create Stripe customer by email
  const customers = await stripe.customers.list({ email, limit: 1 });
  let customerId: string;

  if (customers.data.length > 0) {
    customerId = customers.data[0].id;
  } else {
    const customer = await stripe.customers.create({ email, metadata: { userId } });
    customerId = customer.id;
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/account`,
  });

  return NextResponse.json({ url: session.url });
}
