/**
 * Crea prodotti e prezzi su Stripe per tutti i template/bundle con
 * stripePriceId placeholder, poi aggiorna lib/templates.ts in-place.
 *
 * Esegui con:
 *   npx tsx scripts/create-stripe-prices.ts
 */

import Stripe from "stripe";
import fs from "node:fs";
import path from "node:path";

// Load .env.local from project root (process.cwd() = cartella progetto)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
} else {
  console.error("❌ .env.local non trovato in", envPath);
  process.exit(1);
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error("❌ STRIPE_SECRET_KEY non trovata in .env.local");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_KEY);

interface Item {
  placeholder: string;
  name: string;
  description: string;
  amount: number; // cents
  currency?: string;
}

const TEMPLATES: Item[] = [
  {
    placeholder: "price_PLACEHOLDER_waitinglist01",
    name: "Waitlist Coming Soon Page",
    description: "HTML UI template — Forma",
    amount: 999,
  },
  {
    placeholder: "price_PLACEHOLDER_saaspricingfull",
    name: "SaaS Full Pricing Page",
    description: "HTML UI template — Forma",
    amount: 1499,
  },
  {
    placeholder: "price_PLACEHOLDER_ecommerceproduct",
    name: "E-commerce Product Page",
    description: "HTML UI template — Forma",
    amount: 1299,
  },
  {
    placeholder: "price_PLACEHOLDER_adhdfocustracker",
    name: "ADHD Focus Tracker Dashboard",
    description: "HTML UI template — Forma",
    amount: 999,
  },
  {
    placeholder: "price_PLACEHOLDER_invoicehtml01",
    name: "Professional Invoice Template",
    description: "HTML UI template — Forma",
    amount: 799,
  },
  {
    placeholder: "price_PLACEHOLDER_aitechportfolio",
    name: "AI & Tech Portfolio",
    description: "HTML UI template — Forma",
    amount: 1299,
  },
  {
    placeholder: "price_PLACEHOLDER_personaltrainer",
    name: "Personal Trainer Profile",
    description: "HTML UI template — Forma",
    amount: 999,
  },
  {
    placeholder: "price_PLACEHOLDER_linkedinpack01",
    name: "LinkedIn Content Pack (5 formati)",
    description: "Prompt template — Forma",
    amount: 999,
  },
  {
    placeholder: "price_PLACEHOLDER_youtubescriptpack",
    name: "YouTube Script Builder",
    description: "Prompt template — Forma",
    amount: 1299,
  },
  {
    placeholder: "price_PLACEHOLDER_claudeprojectspack",
    name: "Claude Projects Starter Pack",
    description: "Prompt template — Forma",
    amount: 1499,
  },
  {
    placeholder: "price_PLACEHOLDER_aiworkflowpack01",
    name: "AI Workflow Automation Pack",
    description: "Prompt template — Forma",
    amount: 1699,
  },
];

const BUNDLES: Item[] = [
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_saas01",
    name: "Bundle: SaaS Starter Kit",
    description: "Bundle 5 template — Forma",
    amount: 2999,
  },
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_aicontent",
    name: "Bundle: AI Content Creator Pack",
    description: "Bundle 5 template — Forma",
    amount: 2299,
  },
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_freelancer",
    name: "Bundle: Freelancer Essential Kit",
    description: "Bundle 4 template — Forma",
    amount: 1999,
  },
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_claudepower",
    name: "Bundle: Claude Power Bundle",
    description: "Bundle 4 template — Forma",
    amount: 2999,
  },
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_localbiz",
    name: "Bundle: Local Business Web Pack",
    description: "Bundle 4 template — Forma",
    amount: 1999,
  },
  {
    placeholder: "price_BUNDLE_PLACEHOLDER_productivity",
    name: "Bundle: Focus & Productivity Bundle",
    description: "Bundle 3 template — Forma",
    amount: 2499,
  },
];

async function createPrice(item: Item): Promise<{ placeholder: string; priceId: string }> {
  // Crea il prodotto
  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: { source: "forma", placeholder: item.placeholder },
  });

  // Crea il prezzo one-time
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: item.amount,
    currency: item.currency ?? "eur",
    metadata: { source: "forma", placeholder: item.placeholder },
  });

  console.log(`  ✅ ${item.name.padEnd(40)} ${item.placeholder} → ${price.id}`);
  return { placeholder: item.placeholder, priceId: price.id };
}

async function main() {
  console.log("\n🔧 Creazione prezzi Stripe...\n");

  const allItems = [...TEMPLATES, ...BUNDLES];
  const results: { placeholder: string; priceId: string }[] = [];

  for (const item of allItems) {
    const result = await createPrice(item);
    results.push(result);
  }

  // Aggiorna lib/templates.ts
  const templatesPath = path.resolve(__dirname, "../lib/templates.ts");
  let src = fs.readFileSync(templatesPath, "utf-8");

  for (const { placeholder, priceId } of results) {
    src = src.replaceAll(`"${placeholder}"`, `"${priceId}"`);
  }

  fs.writeFileSync(templatesPath, src, "utf-8");
  console.log("\n✅ lib/templates.ts aggiornato con i veri price ID Stripe.");
  console.log(`\n📋 Riepilogo (${results.length} prezzi creati):\n`);
  for (const r of results) {
    console.log(`  ${r.placeholder.padEnd(45)} → ${r.priceId}`);
  }
  console.log(
    "\nRicorda di eseguire 'git add lib/templates.ts && git commit' per salvare le modifiche.\n",
  );
}

main().catch((err) => {
  console.error("❌ Errore:", err.message);
  process.exit(1);
});
