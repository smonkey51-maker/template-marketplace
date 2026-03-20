---
name: TemplateLab project overview
description: Stack, architecture, and key decisions for the TemplateLab Next.js 15 template marketplace
type: project
---

Full-stack Next.js 15 (App Router) marketplace for premium UI and AI prompt templates.

**Stack:** Next.js 15 (next v16 in package.json — see note), React 19, TypeScript, Tailwind CSS 3, Clerk (auth), Stripe (payments), Supabase (purchase records), Anthropic SDK (AI Studio).

**Key architectural decisions:**
- All templates stored as static data in `lib/templates.ts` (no DB for catalogue).
- i18n is homegrown via `lib/i18n.ts` — two locales (it/en), stored in localStorage, no URL-based routing.
- The `html` class is hard-coded to `"dark"` in `app/layout.tsx`; theme toggling is CSS-variable-based via ThemeProvider.
- Preview iframes use `sandbox="allow-scripts"` (no `allow-same-origin`), which is intentional for isolation.
- Purchase flow: Stripe Checkout → webhook → Supabase `purchases` table; client hydrates from `/api/purchases`.
- `/api/purchases` returns 401 for unauthenticated users; clients silently swallow this (`catch(() => {})`).

**Why:** Bootstrapped solo product; speed-over-architecture tradeoffs are deliberate.
**How to apply:** Suggest incremental improvements compatible with the solo-dev/fast-iteration context; avoid over-engineering recommendations.
