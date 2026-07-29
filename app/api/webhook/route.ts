import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getTemplateFromDb, getBundleFromDb } from "@/lib/templatesDb";
import { sendPurchaseEmail } from "@/lib/email";
import { isStudioProduct } from "@/lib/purchases";

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

    const supabase = supabaseAdmin();

    // Resolve the effective user_id: authenticated user or guest placeholder
    const effectiveUserId = userId ?? (guestEmail ? `guest:${guestEmail}` : null);

    if (bundleId) {
      // Bundle purchase. `userId` is normally present (bundles require auth at
      // checkout), but if the metadata is missing we must NOT drop the order on
      // the floor — the customer has already paid. Fall back to the guest id.
      if (!userId) {
        console.error(
          `[webhook] bundle ${bundleId} paid without userId metadata (session ${session.id})`,
        );
      }
      if (!effectiveUserId) {
        console.error(
          `[webhook] bundle ${bundleId} paid with no userId AND no email (session ${session.id}) — manual fulfilment required`,
        );
        return NextResponse.json({ received: true });
      }
      const bundle = await getBundleFromDb(bundleId);
      const ids =
        bundle?.templateIds ?? (templateIds ? templateIds.split(",").filter(Boolean) : []);
      const rows = ids.map((tid) => ({
        user_id: effectiveUserId,
        template_id: tid,
        stripe_session_id: session.id,
        guest_email: userId ? null : guestEmail,
      }));
      // Stripe retries webhooks — upsert on the natural key so a redelivery
      // doesn't duplicate the buyer's rows.
      const { error } = await supabase
        .from("purchases")
        .upsert(rows, { onConflict: "user_id,template_id", ignoreDuplicates: true });
      if (error) {
        console.error("Supabase bundle insert error:", error);
      } else {
        console.log(`✅ Bundle salvato — userId: ${effectiveUserId}, bundleId: ${bundleId}`);
        if (guestEmail && bundle) {
          await sendPurchaseEmail({
            to: guestEmail,
            type: "bundle",
            itemName: bundle.name,
            previewUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            bundleTemplates: await Promise.all(
              ids.map(async (tid) => (await getTemplateFromDb(tid))?.name ?? tid),
            ),
          }).catch(console.error);
        }
      }
    } else if (templateId && effectiveUserId) {
      // Single template purchase (authenticated or guest)
      const { error } = await supabase.from("purchases").upsert(
        {
          user_id: effectiveUserId,
          template_id: templateId,
          stripe_session_id: session.id,
          guest_email: userId ? null : guestEmail,
        },
        { onConflict: "user_id,template_id", ignoreDuplicates: true },
      );
      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log(`✅ Acquisto salvato — userId: ${effectiveUserId}, templateId: ${templateId}`);
        if (guestEmail) {
          const isStudio = isStudioProduct(templateId);
          const tmpl = isStudio ? null : await getTemplateFromDb(templateId);
          const downloadUrl = tmpl
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/download-session?session_id=${session.id}&templateId=${templateId}&lang=it`
            : undefined;
          await sendPurchaseEmail({
            to: guestEmail,
            type: isStudio ? "studio" : "template",
            itemName: isStudio ? "Studio Access" : (tmpl?.name ?? templateId),
            downloadUrl: isStudio ? undefined : downloadUrl,
            previewUrl: tmpl ? `${process.env.NEXT_PUBLIC_SITE_URL}/preview/${tmpl.id}` : undefined,
          }).catch(console.error);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
