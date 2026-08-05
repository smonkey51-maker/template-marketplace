/**
 * Crea i prodotti e i prezzi Stripe per i template gratuiti e il bundle Free Starter Kit.
 * I template gratuiti hanno price=0 su Stripe (per tracking/analytics, anche se il checkout li bypassa).
 *
 * Esegui: npx tsx scripts/seed-free-bundle.ts
 *
 * Dopo l'esecuzione, aggiorna i stripePriceId in lib/templates.ts con i valori stampati.
 */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const FREE_TEMPLATES = [
  {
    id: "free-email-optin",
    name: "Email Opt-in Section (Free)",
    description: "Minimal email capture section with value proposition and social proof.",
    category: "ui",
  },
  {
    id: "free-testimonial-cards",
    name: "Testimonial Cards Grid (Free)",
    description: "3-column testimonial grid with star ratings and editorial styling.",
    category: "ui",
  },
  {
    id: "free-cold-intro-prompt",
    name: "Cold Intro Email Prompt (Free)",
    description: "AI prompt template for personalized cold introduction emails.",
    category: "prompt",
  },
];

const FREE_BUNDLE = {
  id: "bundle-free-starter",
  name: "Free Starter Kit",
  description: "3 template premium gratuiti: email opt-in, testimonial cards e cold email prompt.",
};

async function main() {
  console.log("Creazione prodotti gratuiti su Stripe...\n");

  const priceIds: Record<string, string> = {};

  for (const tmpl of FREE_TEMPLATES) {
    const product = await stripe.products.create({
      name: tmpl.name,
      description: tmpl.description,
      metadata: { templateId: tmpl.id, category: tmpl.category, free: "true" },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 0,
      currency: "eur",
    });

    priceIds[tmpl.id] = price.id;
    console.log(`${tmpl.name}`);
    console.log(`   Product ID: ${product.id}`);
    console.log(`   Price ID:   ${price.id}\n`);
  }

  // Bundle product
  const bundleProduct = await stripe.products.create({
    name: FREE_BUNDLE.name,
    description: FREE_BUNDLE.description,
    metadata: { bundleId: FREE_BUNDLE.id, free: "true" },
  });

  const bundlePrice = await stripe.prices.create({
    product: bundleProduct.id,
    unit_amount: 0,
    currency: "eur",
  });

  priceIds[FREE_BUNDLE.id] = bundlePrice.id;
  console.log(`${FREE_BUNDLE.name} (Bundle)`);
  console.log(`   Product ID: ${bundleProduct.id}`);
  console.log(`   Price ID:   ${bundlePrice.id}\n`);

  console.log("══════════════════════════════════════════════");
  console.log("Aggiorna lib/templates.ts con questi Price ID:");
  console.log("══════════════════════════════════════════════");
  for (const [id, priceId] of Object.entries(priceIds)) {
    console.log(`  ${id}: "${priceId}"`);
  }
}

main().catch(console.error);
