/**
 * Crea i prodotti e i prezzi su Stripe per ogni template.
 * Esegui una sola volta: npx tsx scripts/seed-stripe.ts
 */
import Stripe from "stripe";
import { templates } from "../lib/templates";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function main() {
  console.log("Creazione prodotti su Stripe...\n");

  for (const template of templates) {
    const product = await stripe.products.create({
      name: template.name,
      description: template.description,
      metadata: { templateId: template.id, category: template.category },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: template.price,
      currency: "eur",
    });

    console.log(`${template.name}`);
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Price ID:   ${price.id}\n`);
  }

  console.log("Fatto! Copia i Price ID nel file lib/templates.ts (campo stripePriceId).");
}

main().catch(console.error);
