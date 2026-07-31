/**
 * Creates Stripe Products + Prices for all Notion templates and the bundle.
 * Run: node scripts/create-notion-stripe-products.mjs
 * Outputs price IDs to paste into lib/templates.ts
 */
import Stripe from "stripe";
import { readFileSync } from "fs";

// Load env
const envRaw = readFileSync(".env.local", "utf8");
const envMap = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim()];
    }),
);
const stripe = new Stripe(envMap.STRIPE_SECRET_KEY);

const templates = [
  {
    id: "notion-project-hub",
    name: "Notion Project Management Hub",
    price: 1299,
    description:
      "Complete Notion workspace for managing projects, tasks and deadlines with 5 pre-built views.",
  },
  {
    id: "notion-freelancer-crm",
    name: "Notion Freelancer CRM",
    price: 1299,
    description: "Manage clients, projects, invoices and follow-ups in one Notion database.",
  },
  {
    id: "notion-content-calendar",
    name: "Notion Content Calendar",
    price: 999,
    description: "Plan, schedule and track content across all channels with status tracking.",
  },
  {
    id: "notion-finance-tracker",
    name: "Notion Personal Finance Tracker",
    price: 1299,
    description: "Track income, expenses, savings goals and net worth in Notion.",
  },
  {
    id: "notion-second-brain",
    name: "Notion Second Brain (PKM)",
    price: 1499,
    description: "Full personal knowledge management system: capture, organize and retrieve ideas.",
  },
  {
    id: "notion-job-tracker",
    name: "Notion Job Application Tracker",
    price: 799,
    description: "Track job applications, interviews and offers with a Kanban pipeline.",
  },
  {
    id: "notion-weekly-review",
    name: "Notion Weekly Review System",
    price: 799,
    description: "Structured weekly and monthly review template to stay aligned with goals.",
  },
  {
    id: "notion-client-portal",
    name: "Notion Client Portal",
    price: 1299,
    description: "Shareable Notion workspace for client onboarding, deliverables and updates.",
  },
];

const bundle = {
  id: "bundle-notion-productivity",
  name: "Notion Productivity Pack",
  price: 3499,
  description:
    "5 premium Notion templates: Project Hub, CRM, Content Calendar, Finance Tracker, Second Brain. Save 42% vs buying individually.",
};

console.log("Creating Stripe products and prices...\n");

const results = [];

for (const tmpl of templates) {
  const product = await stripe.products.create({
    name: tmpl.name,
    description: tmpl.description,
    metadata: { templateId: tmpl.id, source: "templatelab" },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: tmpl.price,
    currency: "eur",
    metadata: { templateId: tmpl.id },
  });

  results.push({ id: tmpl.id, priceId: price.id, price: tmpl.price });
  console.log(`✓ ${tmpl.name}`);
  console.log(`  Product: ${product.id}`);
  console.log(`  Price:   ${price.id}  (€${(tmpl.price / 100).toFixed(2)})\n`);
}

// Bundle
const bundleProduct = await stripe.products.create({
  name: bundle.name,
  description: bundle.description,
  metadata: { bundleId: bundle.id, source: "templatelab" },
});
const bundlePrice = await stripe.prices.create({
  product: bundleProduct.id,
  unit_amount: bundle.price,
  currency: "eur",
  metadata: { bundleId: bundle.id },
});
console.log(`✓ BUNDLE: ${bundle.name}`);
console.log(`  Product: ${bundleProduct.id}`);
console.log(`  Price:   ${bundlePrice.id}  (€${(bundle.price / 100).toFixed(2)})\n`);

console.log("\n=== COPY THESE PRICE IDs INTO lib/templates.ts ===\n");
for (const r of results) {
  console.log(`  // ${r.id}`);
  console.log(`  stripePriceId: "${r.priceId}",`);
}
console.log(`\n  // bundle-notion-productivity`);
console.log(`  stripePriceId: "${bundlePrice.id}",`);
