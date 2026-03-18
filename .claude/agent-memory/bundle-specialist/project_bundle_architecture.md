---
name: project_bundle_architecture
description: Bundle data structure, checkout flow, and preview architecture for template-marketplace
type: project
---

## Bundle interface (lib/templates.ts line 2901)

```ts
interface Bundle {
  id: string;           // e.g. "bundle-saas-starter"
  name: string;
  tagline: string;
  description: string;
  templateIds: string[];    // array of Template.id references
  price: number;            // cents, e.g. 2999 = €29.99
  regularPrice: number;     // sum of individual prices, for savings display
  stripePriceId: string;    // Stripe Price ID
  emoji: string;
  accentColor: string;      // key into COLOR_MAP: "blue"|"violet"|"emerald"|"purple"|"amber"|"orange"
  tags: string[];
}
```

## 6 bundles defined (as of 2026-03-18)

| id | name | templates | price | accentColor |
|----|------|-----------|-------|-------------|
| bundle-saas-starter | SaaS Starter Kit | 5 (all UI) | €29.99 | blue |
| bundle-ai-content | AI Content Creator Pack | 5 (all prompt) | €22.99 | violet |
| bundle-freelancer-kit | Freelancer Essential Kit | 4 (mixed) | €19.99 | emerald |
| bundle-claude-power | Claude Power Bundle | 4 (all prompt) | €29.99 | purple |
| bundle-local-business | Local Business Web Pack | 4 (all UI) | €19.99 | amber |
| bundle-productivity | Focus & Productivity Bundle | 3 (mixed) | €24.99 | orange |

## Checkout flow for bundles (already implemented)

- POST /api/checkout with { bundleId } body
- Creates Stripe session using bundle.stripePriceId
- metadata: { userId, bundleId, templateIds: "id1,id2,..." }
- success_url redirects to /success?bundleId=XXX
- Webhook (checkout.session.completed) inserts one purchases row per templateId
- /api/purchases returns { templateIds: string[] } — flat list of owned template IDs

## Preview API (app/api/preview/[templateId]/route.ts)

- GET only, serves raw HTML with Tailwind CDN injected
- Only works for category === "ui" templates
- Used inside iframe in PreviewContent.tsx
- sandbox="allow-scripts" (no allow-same-origin — intentional security isolation)

## Missing from Bundle: no dedicated route /bundle/[bundleId] exists yet

**Why:** User wants to build SEO-friendly bundle landing pages for acquisition.
**How to apply:** When designing /bundle/[bundleId], reuse /api/preview/[templateId] iframes and mirror the static generation pattern from /preview/[templateId]/page.tsx.
