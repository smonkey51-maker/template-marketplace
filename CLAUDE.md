# CLAUDE.md — FORMA

AI assistant reference for the **FORMA** codebase. Read this before making changes.

---

## Project Overview

**FORMA** is an AI-powered template marketplace built with Next.js 16 (App Router). Users browse, purchase, and download premium UI/prompt templates, then customise them in real-time with Claude AI via the built-in Studio.

A 2026 visual refresh (explored under the working name "Atelier Nove", not adopted — the brand stayed FORMA) replaced the near-black/gold "liquid glass" identity with a warm paper/bordeaux editorial system — see **Fonts**, **Brand Colors**, **Design Tokens** and **Depth** below. The wordmark is the one deliberate exception: it kept its original gold gradient and letter-drawn animation rather than moving to bordeaux, see `FormaLogo.tsx`. The refresh did not change the product: still one catalogue of digital templates (no physical-art second catalogue), same routing, same Stripe/Supabase/Clerk stack.

**Tech stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 3 · Clerk (auth) · Stripe (payments) · Supabase (purchases DB) · Anthropic Claude API · PostHog (analytics) · Resend (email)

---

## Repository Structure

```
template-marketplace/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout — providers, fonts (Fraunces + Inter)
│   ├── page.tsx                # Home / marketplace listing
│   ├── studio/page.tsx         # AI Studio (generate & customise templates)
│   ├── preview/[templateId]/   # Template detail / preview page
│   ├── bundle/[bundleId]/      # Bundle detail page
│   ├── account/                # User account & purchase history (auth required)
│   ├── success/                # Post-checkout success page
│   ├── admin/newsletter/       # Admin newsletter sender (auth required)
│   ├── wishlist/               # Client-side wishlist page
│   ├── guide/                  # Buyer's guide
│   ├── sign-in/ sign-up/       # Clerk auth pages
│   ├── terms/ privacy/         # Legal pages
│   ├── not-found.tsx           # 404 page
│   └── api/
│       ├── checkout/route.ts   # Stripe checkout session creation
│       ├── webhook/route.ts    # Stripe webhook → Supabase insert + email
│       ├── download/[templateId]/route.ts  # Authenticated template download
│       ├── download-session/route.ts       # Guest download (via Stripe session ID)
│       ├── preview/[templateId]/route.ts   # Template HTML preview (sandboxed iframe)
│       ├── generate/route.ts   # Claude AI generation (streaming)
│       ├── customize/route.ts  # Claude AI customisation (streaming)
│       ├── purchases/route.ts  # List user purchases
│       ├── subscribe/route.ts  # Newsletter subscription
│       ├── stripe-portal/route.ts  # Stripe customer portal redirect
│       ├── admin/newsletter/route.ts  # Admin newsletter send
│       └── og/route.tsx        # Dynamic Open Graph image
├── components/                 # Shared React components
│   ├── SiteNav.tsx             # Inner-page navigation (with dropdowns)
│   ├── MobileNav.tsx           # Mobile bottom navigation
│   ├── SnapHomepage.tsx        # Snap-scroll homepage shell + parallax driver
│   ├── sections/               # The five homepage sections + SectionNav
│   ├── studio/                 # AI Studio panels
│   ├── ArtSection.tsx          # Snap section wrapper (entrance observer)
│   ├── TemplateCard.tsx        # Individual template card (wishlist)
│   ├── TemplatePreview.tsx     # Scaled live iframe preview of a template
│   ├── BundleDetailContent.tsx # Bundle detail view
│   ├── PreviewContent.tsx      # Iframe preview of HTML templates
│   ├── DownloadButton.tsx      # Download + auth gate button
│   ├── RelatedTemplates.tsx    # Related templates carousel
│   ├── ReviewSection.tsx       # Reviews (list + form)
│   ├── EmailCapture.tsx        # Newsletter sign-up form
│   ├── CommandPalette.tsx      # Ctrl-K palette
│   ├── Toast.tsx               # Toast notification system (Context + hook)
│   ├── ThemeProvider.tsx       # Dark/light theme context
│   ├── ThemeToggle.tsx         # Theme toggle button
│   ├── LanguageProvider.tsx    # IT/EN language context
│   ├── LanguageToggle.tsx      # Language toggle button
│   ├── PostHogProvider.tsx     # PostHog analytics wrapper
│   ├── PageTransition.tsx      # Route transition wrapper
│   ├── FormaLogo.tsx           # Wordmark (animated / static)
│   └── Footer.tsx / FormaFooter.tsx  # Site footers
├── lib/
│   ├── templates.ts            # ALL template data lives here — single source of truth
│   ├── i18n.ts                 # IT/EN translation strings + templateTranslations
│   ├── claude.ts               # Anthropic SDK client (singleton)
│   ├── email.ts                # Resend email helpers (purchase, newsletter)
│   ├── purchases.ts            # Supabase purchases query
│   ├── rateLimit.ts            # In-memory sliding-window rate limiter
│   ├── useRecentlyViewed.ts    # localStorage hook for recently viewed templates
│   └── useWishlist.ts          # localStorage hook for wishlist
├── scripts/
│   ├── export-for-marketplace.ts  # Generates exports/ dir for Gumroad/Etsy
│   └── *.mjs / *.ts            # One-off Stripe/Notion/Supabase seed scripts
├── middleware.ts               # Clerk auth middleware — protects /studio, /account, /admin, /api/generate, /api/customize, /api/stripe-portal, /api/admin
├── instrumentation.ts          # Next.js instrumentation (runs export-for-marketplace on startup)
├── next.config.ts              # Next.js config — security headers, image optimisation
├── tailwind.config.ts          # Tailwind — darkMode: "class"
└── .env.local.example          # Required env vars (see Environment Variables section)
```

---

## Key Conventions

### Template Data (`lib/templates.ts`)

This is the **single source of truth** for all templates. It is a large file (~300 KB).

- Every template is a `Template` object in the exported `templates` array.
- `price` is always in **cents** (e.g. `1299` = €12.99).
- `stripePriceId` must match a live Stripe Price object — never fabricate one.
- `downloadType` defaults to `"html"` for `category: "ui"` and `"prompt"` for `category: "prompt"`. Set it explicitly for Canva/Notion/Excel/Sheets/Webflow/Framer types.
- External-link types (`canva`, `notion`, `excel`, `sheets`, `webflow`, `framer`) require `downloadUrl`.
- `content` holds the raw HTML or prompt text inline.
- Helper functions: `getTemplate(id)`, `getBundle(id)`, `formatPrice(cents)`, `getDownloadType(template)`.

**When adding a new template:**

1. Add the `Template` object to `lib/templates.ts`.
2. Add a real `stripePriceId` (create a Stripe Price if needed via `scripts/seed-stripe.ts`).
3. Add Italian translations in `lib/i18n.ts` under `templateTranslations`.
4. Run `npm run export-templates` to regenerate `exports/`.

### Internationalisation (`lib/i18n.ts`)

- The site is primarily **Italian**, with English support.
- `Lang = "it" | "en"`. Default is Italian.
- All UI strings live in the `t` object keyed by language.
- Use `useLang()` from `LanguageProvider` in client components to get `{ lang, setLang, t: tStrings }`.
- Template names/descriptions have Italian overrides in `templateTranslations`.

### Authentication (Clerk)

- Auth is handled entirely by Clerk (`@clerk/nextjs`).
- Protected routes are declared in `middleware.ts`: `/studio`, `/account`, `/admin`, `/api/generate`, `/api/customize`, `/api/stripe-portal`, `/api/admin`.
- In Server Components/Route Handlers use `auth()` from `@clerk/nextjs/server`.
- Guest checkout is **allowed** for single-template purchases — `userId` may be null.

### Payments (Stripe)

Three purchase flows:

1. **Single template** — guest or authenticated, `mode: "payment"`.
2. **Bundle** — requires auth, `mode: "payment"`, expands to multiple template rows in Supabase.
3. **Studio Access** — requires auth, subscription (`mode: "subscription"`) or lifetime (`mode: "payment"`).

The Stripe webhook (`/api/webhook`) writes purchase records to Supabase and sends a confirmation email via Resend.

The €9.99/month Studio Access subscription has a **default price ID in `app/api/checkout/route.ts`** (`STUDIO_ACCESS_MONTHLY_PRICE_ID`), so the subscription is sellable with no env var set. `STUDIO_ACCESS_PRICE_ID` overrides it when you need a different account or a different price. A Stripe price ID is not a secret — the twenty template prices live in `lib/templates.ts` for the same reason.

The lifetime option is env-only (`STUDIO_ACCESS_LIFETIME_PRICE_ID`) and no such Price exists in the account, but the button is behind `NEXT_PUBLIC_STUDIO_LIFETIME_AVAILABLE === "true"` and stays hidden, so nothing is broken by leaving it unset.

The lifetime button is behind `NEXT_PUBLIC_STUDIO_LIFETIME_AVAILABLE === "true"` and is hidden otherwise, so `STUDIO_ACCESS_LIFETIME_PRICE_ID` is only needed if that flag is on.

### Database (Supabase)

- Single table: **`purchases`** with columns `user_id`, `template_id`, `stripe_session_id`, `guest_email`.
- Guest purchases use `user_id = "guest:<email>"`.
- `lib/purchases.ts` provides `getUserPurchases(userId): Promise<string[]>`.
- Always use `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never expose to client).

### Claude AI Integration

- Client singleton: `lib/claude.ts` exports `anthropic` (Anthropic SDK instance).
- **`/api/generate`** — generates new templates from scratch. Uses `claude-opus-4-6`. UI templates use extended thinking (`betas: ["interleaved-thinking-2025-05-14"]`, `budget_tokens: 3000`). Prompt templates use standard streaming. Rate limit: 10 req/min per IP.
- **`/api/customize`** — customises an existing template. Uses `claude-opus-4-6` with standard streaming. Rate limit: 20 req/min per IP.
- Both endpoints stream plain text (`text/plain; charset=utf-8`) back to the client.
- Both require `ANTHROPIC_API_KEY` env var.

### Rate Limiting

`lib/rateLimit.ts` — simple **in-memory** sliding-window limiter. Resets on server restart. Not suitable for multi-instance deployments without Redis. Keyed by `"generate:<ip>"` and `"customize:<ip>"`.

### Email (Resend)

`lib/email.ts`:

- `sendPurchaseEmail()` — sends post-purchase confirmation with download link.
- `sendNewsletterEmail()` — batch sends up to 100 emails per Resend API call.
- Silently no-ops if `RESEND_API_KEY` is not set (safe in dev).
- From address: `RESEND_FROM` env var, defaults to `FORMA <noreply@template-marketplace-psi.vercel.app>`.

### Template Export Script

```bash
npm run export-templates
```

Generates `exports/gumroad/` and `exports/etsy/` from all templates in `lib/templates.ts`. Called automatically during `npm run build`. Do not commit the `exports/` directory — it is generated.

---

## Environment Variables

| Variable                            | Required           | Description                                          |
| ----------------------------------- | ------------------ | ---------------------------------------------------- |
| `ANTHROPIC_API_KEY`                 | Yes                | Claude API key                                       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes                | Clerk publishable key                                |
| `CLERK_SECRET_KEY`                  | Yes                | Clerk secret key                                     |
| `STRIPE_SECRET_KEY`                 | Yes                | Stripe secret key                                    |
| `STRIPE_WEBHOOK_SECRET`             | Yes                | Stripe webhook signing secret                        |
| `STUDIO_ACCESS_PRICE_ID`            | Optional           | Overrides the built-in €9.99/month Studio price      |
| `STUDIO_ACCESS_LIFETIME_PRICE_ID`   | Yes (for lifetime) | Stripe price ID for lifetime Studio Access           |
| `SUPABASE_URL`                      | Yes                | Supabase project URL                                 |
| `SUPABASE_SERVICE_ROLE_KEY`         | Yes                | Supabase service role key (server-only)              |
| `NEXT_PUBLIC_SITE_URL`              | Yes                | Full site URL e.g. `https://template-marketplace-psi.vercel.app`          |
| `NEXT_PUBLIC_APP_URL`               | Optional           | Fallback for checkout redirect URLs                  |
| `RESEND_API_KEY`                    | Optional           | Resend email API key                                 |
| `RESEND_FROM`                       | Optional           | Sender address for emails                            |
| `NEXT_PUBLIC_POSTHOG_KEY`           | Optional           | PostHog project API key                              |
| `NEXT_PUBLIC_POSTHOG_HOST`          | Optional           | PostHog host (defaults to `https://app.posthog.com`) |

Copy `.env.local.example` to `.env.local` and fill in values before running locally.

---

## Development Workflow

```bash
# Install dependencies
npm install

# Run dev server (also runs export-templates via instrumentation.ts)
npm run dev

# Production build (runs export-templates first, then next build)
npm run build

# Start production server
npm start

# Manually regenerate exports/ directory
npm run export-templates
```

**No test suite is configured.** Validate changes manually in the browser.

---

## Architecture Notes

### Providers (Root Layout)

The root layout (`app/layout.tsx`) wraps everything in this order:

```
ClerkProvider
  PostHogProvider
    ThemeProvider
      LanguageProvider
        ToastProvider
          GsapProvider
            PageTransition > {children}
            MobileNav
            CommandPalette
```

### Fonts

**Fraunces** (display) + **Inter** (body), everywhere:

- **Fraunces** (`--font-fraunces`) — h1–h3, hero/section headings, prices and other display moments.
- **Inter** (`--font-inter`) — body text, labels, buttons, nav.

The FormaLogo wordmark is the exception — it's set in `system-ui` at a fixed weight/size as part of its SVG letterforms, not Fraunces. The pre-refresh font variables (`--font-syne`, `--font-montserrat`, `--font-cormorant`, `--font-dm-serif`, `--font-jakarta`, `--font-gatsunaga`) are still loaded/defined and still referenced by class name across older components, but each now resolves to Fraunces or Inter — see the typography comment block near the top of `app/globals.css` and the `fontFamily` map in `tailwind.config.ts`. Prefer `var(--font-fraunces)` / `var(--font-inter)` directly in new code rather than reaching for a legacy name.

### Brand Colors

The brand is a warm **paper + bordeaux** palette — light by default:

| Token       | Light     | Dark                      | Usage                   |
| ----------- | --------- | -------------------------- | ------------------------ |
| `--accent`  | `#7A2E28` | `#C1716A`                  | Primary bordeaux accent (single accent site-wide — no more per-section "gallery room" colours) |
| `--terra`   | derived from `--accent` via `color-mix` | derived from `--accent` | Secondary warm accent   |
| `--bg`      | `#F4F0E8` | `#14110D`                  | Page background (paper / ink) |
| `--surface` | `#FBF9F4` | `#1C1814`                  | Card/section background |
| `--text`    | `#1C1A17` | `#F2ECE0`                  | Primary text            |
| `--muted`   | `#7A7266` | `#A89A86`                  | Secondary text          |

### Design Tokens

- **Border radius**: editorial and sharp — **not** rounded/pill. Use the radius utilities rather than raw pixel values: `.r-glass` (`--glass-radius`, tracks `--r-md`), `.r-md` (`--r-md`, 4px — cards, panels, buttons), `.r-sm` (`--r-sm`, 2px — small chips), `.r-pill` (kept as a class name for compat; now renders `--r-md`, not a true pill). The underlying scale is `--r-sm` (2px) / `--r-md` (4px) / `--r-lg` (6px) / `--r-xl` (8px). Only genuinely circular elements (avatars, small icon badges, dots) still use `border-radius: 50%` directly. When adding any surface with a background or a border, give it one of these tokens — a bare `bg-*` or `border` class is a bug.
- **Shadows**: Use CSS custom properties `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` defined in `globals.css`.
- **Buttons**: All primary CTA buttons use the `.btn-brand` CSS class (solid bordeaux, sharp corners, lift on hover). Use `.btn-brand-sm` for compact variant. Defined in `globals.css`.

### Depth: one material — flat paper

**There is no glass on this site.** The pre-refresh "liquid glass" material (backdrop blur, pointer-tracked specular highlight, squircle masking, SVG refraction) was removed wholesale — `GlassEnhancements.tsx` and `public/squircle-paint.js` are deleted, and the `--glass-*` / `--glass-s-*` / `--glass-bar-*` tokens now resolve to an opaque paper fill with **no blur** and **no specular highlight**. Every raised surface is the same material: an opaque paper sheet, one load-bearing rim border, and a small flat cast shadow. Panels still **lift** slightly toward the viewer on hover (a small `translateY`), but nothing refracts, blurs or shimmers.

The class names are unchanged on purpose — `.glass-surface`, `.glass-surface-pill`, `.glass-bar`, `.forma-glass-card`, `.glass-pill`, `.glass-panel` — so existing components didn't need touching; only what those classes render changed. `.glass-surface` is still the shared base — reach for it before hand-rolling a panel.

Two rules the material still depends on:

- **The rim border is load-bearing.** It is what keeps a card or control findable against the page (WCAG 1.4.11); never drop it for a "cleaner" look.
- **State is never carried by shadow alone.** A selected control also changes fill, rim colour and text colour, so it survives forced-colors mode and low-vision viewing. The primary CTA stays solid bordeaux — it is not glass.

There used to be a "gallery rooms" system where `[data-section]` on `<html>` (set by `SectionAccent.tsx`) gave each site section (`catalogo`/`guida`/`studio`/`account`) its own accent colour. That was retired in the same pass: `--accent` is bordeaux everywhere, one gallery rather than separate rooms. `SectionAccent.tsx` still sets the attribute, but no CSS reads it anymore.

### Theme

Tailwind `darkMode: "class"`. The `<html>` element starts **without** `class="dark"` (light/paper is the default); dark mode is opt-in via the toggle, which adds the class and persists the choice to `localStorage`. `ThemeProvider` defaults its own state to `"light"`. Custom theme tokens are defined in `app/globals.css` (e.g. `bg-page`, `text-theme`).

### API Route Patterns

- All API routes use the Next.js App Router convention (`app/api/.../route.ts`).
- Auth-protected routes call `await auth()` from `@clerk/nextjs/server` at the top.
- Streaming responses return `new Response(readableStream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked", "Cache-Control": "no-cache" } })`.
- Error responses always include a meaningful message string in the body.

### Security Headers (next.config.ts)

- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN` — **except** `/api/preview/*` which must be embeddable in same-origin iframes.
- Static assets cached with `Cache-Control: public, max-age=31536000, immutable`.

### Preview Iframe

`/api/preview/[templateId]` serves raw HTML for template previews. The `/preview/[templateId]` page loads it in a sandboxed `<iframe>`. The `X-Frame-Options` exemption in `next.config.ts` is intentional and required.

---

## Common Tasks

### Add a new UI template

1. Add to `lib/templates.ts` `templates` array with a unique `id`, `category: "ui"`, `price` in cents, valid `stripePriceId`, and inline HTML in `content`.
2. Add Italian name/description override in `lib/i18n.ts` `templateTranslations`.
3. Run `npm run export-templates` to update `exports/`.

### Add a new template category/section

1. Add the section key to `lib/i18n.ts` under `sections` for both `it` and `en`.
2. Add matching accent colour in `app/globals.css` or wherever category colours are defined.
3. Add the filter chip in `app/catalogo/page.tsx` (`FilterKey` + `FILTERS`), and a matching entry in `CATALOGO_ITEMS` in `components/SiteNav.tsx` so it appears in the nav dropdown.

### Modify Claude prompts

Edit the `system` prompt strings in `app/api/generate/route.ts` or `app/api/customize/route.ts`. Keep the "output ONLY" constraint to avoid unwanted preamble in streamed output.

### Add a new Stripe product

1. Create the Price in Stripe Dashboard (or run the relevant seed script in `scripts/`).
2. Copy the `price_...` ID into the template definition in `lib/templates.ts`.

### Debug purchases

Query the Supabase `purchases` table directly. Guest purchases have `user_id` like `guest:user@example.com`. Check `stripe_session_id` against the Stripe Dashboard if a purchase is missing.
