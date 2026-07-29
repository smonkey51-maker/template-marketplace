/**
 * Patches lib/templates.ts using the mapping produced by sync-stripe.mjs.
 * For each templateId, finds "id: \"templateId\"" and replaces the very
 * next stripePriceId value in the source file.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mapping = {
  "hero-saas": "price_1TBixDBoWNgrJbiydllw5Qig",
  "pricing-table": "price_1TBixDBoWNgrJbiyjst5ntr3",
  "dashboard-ui": "price_1TBz1sBoWNgrJbiyJ6Ovu5Q3",
  "login-form": "price_1TBz1tBoWNgrJbiyvITwlpMe",
  "blog-card-grid": "price_1TBixEBoWNgrJbiyhJfNG8k8",
  "ecommerce-product": "price_1TBz1uBoWNgrJbiy0QQhsPip",
  "newsletter-signup": "price_1TBz1uBoWNgrJbiyo2nbTRra",
  "team-section": "price_1TBz1vBoWNgrJbiyimDQ93FZ",
  "feature-grid": "price_1TBz1wBoWNgrJbiyEJFGQKjz",
  "chatgpt-copywriter": "price_1TBz1wBoWNgrJbiypuflXu3w",
  "seo-meta-writer": "price_1TBz1xBoWNgrJbiyWo24mDLO",
  "email-sequence": "price_1TBz1yBoWNgrJbiycfbb7tWI",
  "social-content-plan": "price_1TBz1yBoWNgrJbiyqKYDAzwO",
  "product-description": "price_1TBz1zBoWNgrJbiyxd6P0Jb4",
  "brand-voice-guide": "price_1TBz20BoWNgrJbiy9I3yMbhA",
  "job-post-writer": "price_1TBz21BoWNgrJbiyB6c9q2WU",
  "pitch-deck-narrative": "price_1TBz21BoWNgrJbiykeU6JMhs",
  "cold-email-writer": "price_1TBz22BoWNgrJbiyYosvfsDJ",
  "restaurant-menu": "price_1TBz23BoWNgrJbiyyFk0vJBh",
  "coffee-shop-landing": "price_1TBz23BoWNgrJbiyqDLxdo1I",
  "hotel-booking": "price_1TBz24BoWNgrJbiyThvqyfL5",
  "mobile-app-showcase": "price_1TBz25BoWNgrJbiy9Lsn21ma",
  "feature-showcase": "price_1TBz25BoWNgrJbiyIiw34qio",
  "saas-dashboard": "price_1TBz26BoWNgrJbiyAaT2x1l1",
  "digital-resume": "price_1TBz27BoWNgrJbiy4EzhrLu3",
  "link-in-bio": "price_1TBz28BoWNgrJbiy02owOzUD",
  "newsletter-landing": "price_1TBz28BoWNgrJbiykMdFUZHe",
};

const templatesPath = path.join(__dirname, "../lib/templates.ts");
let source = fs.readFileSync(templatesPath, "utf8");

let patched = 0;

for (const [templateId, priceId] of Object.entries(mapping)) {
  // Find the position of  id: "templateId"
  const idMarker = `id: "${templateId}"`;
  const idPos = source.indexOf(idMarker);
  if (idPos === -1) {
    console.warn(`⚠  id not found: ${templateId}`);
    continue;
  }

  // Find the next  stripePriceId: "..."  after that position
  const afterId = source.indexOf('stripePriceId: "', idPos);
  if (afterId === -1) {
    console.warn(`⚠  stripePriceId not found after: ${templateId}`);
    continue;
  }

  // Replace just that value
  const startQuote = afterId + 'stripePriceId: "'.length;
  const endQuote = source.indexOf('"', startQuote);
  if (endQuote === -1) {
    console.warn(`⚠  closing quote not found: ${templateId}`);
    continue;
  }

  const oldPrice = source.slice(startQuote, endQuote);
  source = source.slice(0, startQuote) + priceId + source.slice(endQuote);
  console.log(`✓  ${templateId.padEnd(28)} ${oldPrice} → ${priceId}`);
  patched++;
}

fs.writeFileSync(templatesPath, source, "utf8");
console.log(
  `\n✅  Patched ${patched}/${Object.keys(mapping).length} stripePriceId values in lib/templates.ts`,
);
