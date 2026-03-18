---
name: project_stack
description: Core stack, toolchain versions, and architecture decisions for template-marketplace
type: project
---

Next.js ^16.1.6 (App Router), React 19, TypeScript 5, Tailwind CSS 3.4.17 — private SPA/marketplace.

**Key dependencies:**
- @clerk/nextjs ^7.0.4 (auth, wraps entire app in ClerkProvider in root layout)
- @stripe/stripe-js ^8.10.0 + stripe ^20.4.1 (payments)
- @supabase/supabase-js ^2.99.2 (database/purchases)
- @anthropic-ai/sdk ^0.39.0 (AI customization via /api/generate and /api/customize)
- No tsx/ts-node in dependencies — export script uses `npx tsx`

**Architecture decisions:**
- `lib/templates.ts` is a single monolithic file (~3005 lines, ~190 KB raw) containing ALL template data (HTML strings as template literals + prompt strings + bundle definitions + type definitions + helper functions)
- `next.config.ts` is completely empty (no optimizations configured at all)
- `tsconfig.json` target is ES2017 — no browserslist configured
- `tailwind.config.ts` includes `./lib/**/*.{ts,tsx}` in content scan — causes Tailwind to parse all 190 KB of embedded HTML strings at build time
- `instrumentation.ts` runs only in dev, only on nodejs runtime — triggers export script and watches templates.ts with 300ms debounce
- `scripts/export-for-marketplace.ts` uses `require.main === module` check — incompatible with ESM but works via tsx
- `.npmrc` has `legacy-peer-deps=true`

**Routes:** / (home), /preview/[templateId], /studio, /account, /guide, /sign-in, /sign-up, /success, /privacy, /terms + ~8 API routes
- `app/page.tsx` is a Server Component that renders `<HomeContent />` (Client Component) directly — entire home page is client-side rendered
- `PreviewContent.tsx` and `TemplateGrid.tsx` are both "use client" and import the full templates array

**Why:** Project is a template marketplace for selling UI/HTML and AI prompt templates on Gumroad/Etsy, with an AI Studio (Claude-powered) for customization.
**How to apply:** Any optimization must preserve the single-file template data source (used by both the web app and the export script). Splitting or lazy-loading templates requires careful coordination between Next.js data fetching and the export CLI.
