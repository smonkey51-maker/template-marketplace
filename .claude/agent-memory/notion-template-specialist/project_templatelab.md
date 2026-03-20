---
name: TemplateLab Marketplace Structure
description: Key facts about the TemplateLab codebase — Template interface, Bundle interface, pricing conventions, Notion template conventions, existing content
type: project
---

## Core files
- `lib/templates.ts` — Template and Bundle interfaces, all template data, getTemplate(), getBundle(), formatPrice()
- `lib/i18n.ts` — IT/EN translations, templateTranslations record, SEARCH_SYNONYMS

## Template Interface (key fields)
- `id` — kebab-case string
- `name` — display name
- `category` — "ui" | "prompt"
- `price` — cents (integer)
- `stripePriceId` — Stripe price ID (must be configured in Stripe dashboard after adding)
- `tags` — string array
- `downloads` — integer
- `content` — the actual template content string
- `downloadType?` — defaults to "html" for ui, "prompt" for prompt. Use "notion" for Notion templates
- `downloadUrl?` — required for notion/canva/excel/sheets/webflow/framer types
- `editorsPick?` — boolean
- `isNew?` — boolean

## Notion Template Convention
- Notion templates use `category: "prompt"` (NOT "ui")
- The `content` field contains structured text instructions for building the template in Notion
- `downloadType: "notion"` and `downloadUrl` can be added later when a Notion duplicate link exists
- Content must be detailed: database schemas, property types, views, formulas, dashboard layout, pro tips

## Pricing (as of March 2026)
- UI templates: €5.99–€14.99 (599–1499 cents)
- Prompt templates: €6.99–€12.99 (699–1299 cents)
- Notion templates (designed as prompts): €7.99–€14.99 (799–1499 cents)
- Bundles: 40–55% discount off sum of individual prices

## Bundle Interface (key fields)
- `id`, `name`, `tagline`, `description`
- `templateIds` — array of template ids included
- `highlights` — exactly 3 bullet USP strings
- `price` — bundle price in cents
- `regularPrice` — sum of individual template prices (for savings display)
- `stripePriceId` — Stripe price ID
- `emoji` — single emoji
- `accentColor` — Tailwind color name (e.g. "emerald", "blue", "violet", "amber")
- `tags` — string array

## Existing template IDs (as of March 2026)
UI: hero-saas, pricing-table, blog-card-grid, real-estate-agent, airbnb-property-listing, therapist-profile, law-firm-services, budget-tracker, personal-finance-dashboard, artisan-product-catalog, revenue-analytics, saas-landing-dark, creative-agency-portfolio, freelance-tech-profile, startup-product-launch, restaurant-menu, coffee-shop-landing, hotel-booking, mobile-app-showcase, feature-showcase, saas-dashboard, digital-resume, link-in-bio, newsletter-landing, saas-pricing-full, ecommerce-product-page, invoice-html, ai-tech-portfolio
Prompts: cold-email-b2b, product-description-ecom, ai-assistant-system-prompt, linkedin-prompt-pack, youtube-script-pack, claude-projects-pack, ai-workflow-pack, adhd-focus-tracker

## Existing bundle IDs
bundle-saas-starter, bundle-ai-content, bundle-freelancer-kit, bundle-claude-power, bundle-local-business, bundle-productivity

## Notion templates designed (March 2026 session)
notion-project-hub (1299), notion-freelancer-crm (1199), notion-content-calendar (999), notion-finance-tracker (1099), notion-second-brain (1499), notion-job-tracker (799), notion-weekly-review (899), notion-client-portal (1299)
Bundle: bundle-notion-productivity (2999, regularPrice 5995, includes 5 of the above)

**Why:** Need to add stripePriceId values in Stripe dashboard before these templates go live.
**How to apply:** When adding more templates, check this list to avoid ID collisions and stay consistent with pricing range.
