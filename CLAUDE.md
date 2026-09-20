# CLAUDE.md — OSSERVATORIO

AI assistant reference for the **OSSERVATORIO** codebase. Read this before making changes.

---

## Project Overview

**OSSERVATORIO** is a static, bilingual content site (Italian primary, English secondary) built with Next.js 16 (App Router). It publishes two kinds of writing:

1. **Fan commentary** on "The Mentalist" and the character of Patrick Jane — his observation method, cold-reading-style techniques as portrayed in the show, character analysis. Written in the site's own words, as commentary and analysis, never verbatim dialogue, episode transcripts or reproduced show material.
2. **Practical psychology guides** — body language, active listening, memory techniques, cold reading (how it works and how to spot it), persuasion principles, observation training.

This project used to be **FORMA**, a template marketplace (Stripe payments, Clerk auth, Supabase DB, an Anthropic-powered "AI Studio", a product catalogue). All of that was removed in a full repurposing: there is no e-commerce, no user accounts, no database, no AI generation feature. What remains is a simple editorial site plus a newsletter signup. If you find references to the old product anywhere (variable names, stale comments), they are leftovers — do not resurrect Stripe/Clerk/Supabase/Anthropic integration to "restore" functionality; that functionality was deliberately removed.

**Tech stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 3 · Resend (newsletter notification email) · PostHog (analytics, optional) · Vitest (unit tests) · Playwright (e2e tooling, kept but currently has no suite)

---

## IMPORTANT — IP and disclaimer requirements (read before touching content)

"The Mentalist" and "Patrick Jane" are copyrighted properties of CBS / Warner Bros. Television. This site must always read as **unrestricted fan commentary**, never as an official or affiliated product. When adding or editing content:

- Every page that discusses the show must make clear this is an unofficial fan project — the footer disclaimer (`FormaFooter.tsx`, key `disclaimerShort` in `lib/i18n.ts`) must never be removed, and `/[lang]/chi-siamo` must keep its explicit non-affiliation statement.
- Never write or accept verbatim scripts, episode transcripts, screenshots, or any reproduction of the show's actual footage or images. Character/method analysis and educational technique write-ups in original words are fine.
- Never use copyrighted images of the actor or the show. `public/paintings/` holds public-domain artwork used purely as atmospheric page backdrops (see `components/ArtHeader.tsx`) — don't replace these with stills from the series.
- Never present the site as official, licensed, or as selling anything using the character's name or likeness.

If a request would violate any of the above, push back rather than implementing it.

---

## Repository Structure

```
template-marketplace/
├── app/
│   ├── [lang]/                  # /it and /en — everything user-facing lives here
│   │   ├── layout.tsx           # Providers, fonts (Playfair Display + Inter), metadata
│   │   ├── page.tsx             # Homepage — hero, tagline, featured articles, section teasers
│   │   ├── articoli/            # "L'Archivio" — display label only, route path kept as /articoli
│   │   │   ├── page.tsx         # Article index — 4-category filter, one featured lead + grid
│   │   │   └── [slug]/page.tsx  # Article detail — metadata/OG, related articles
│   │   ├── dossier/
│   │   │   ├── page.tsx         # Dossier Personaggi index — every `person`-tagged article
│   │   │   └── [slug]/page.tsx  # Dossier article detail
│   │   ├── guide-pratiche/page.tsx  # Guide Pratiche index — every `isGuide` article (links into /articoli/[slug])
│   │   ├── biblioteca/page.tsx  # La Biblioteca — recommended books, reads lib/books.ts
│   │   ├── chi-siamo/page.tsx   # About — states the fan-project disclaimer plainly
│   │   ├── privacy/ terms/      # Simple content-site policies (no payments language)
│   │   ├── error.tsx            # Route-level error boundary
│   │   └── not-found.tsx        # 404 with a few suggested articles
│   ├── global-error.tsx         # Top-level error boundary (renders its own <html>)
│   ├── robots.ts / sitemap.ts   # SEO — sitemap enumerates every article in both locales
│   ├── icon.tsx                 # Favicon (dynamic ImageResponse)
│   └── api/
│       ├── og/route.tsx         # Dynamic OG image — generic or per-article
│       └── subscribe/route.ts   # Newsletter signup (rate-limited, emails a notification)
├── components/
│   ├── SiteNav.tsx              # Header — wordmark, nav links, theme toggle
│   ├── FormaFooter.tsx          # Footer — newsletter form, link columns, fan disclaimer
│   ├── FormaLogo.tsx            # OSSERVATORIO wordmark (kept the pre-refresh filename/export names)
│   ├── HomeHero.tsx             # Homepage hero section
│   ├── ArticleBody.tsx          # Renders the tiny markdown grammar used by lib/articles.ts
│   ├── ArtHeader.tsx            # Page header with a faint painting backdrop
│   ├── BackLink.tsx             # "Indietro" back-navigation control
│   ├── CommandPalette.tsx       # Ctrl/Cmd-K — searches articles + site navigation
│   ├── Toast.tsx                # Toast notification system (Context + hook)
│   ├── ThemeProvider.tsx / ThemeToggle.tsx   # Dark/light theme
│   ├── LanguageProvider.tsx     # IT/EN language context, reads the [lang] route param
│   ├── PostHogProvider.tsx      # Analytics wrapper (no-ops without a key)
│   └── PageTransition.tsx       # Route transition wrapper
├── lib/
│   ├── articles.ts              # ALL article content lives here — single source of truth
│   ├── books.ts                  # "La Biblioteca" reading list — 2 books, bilingual, no cover art
│   ├── i18n.ts                  # UI copy strings, IT + EN, one `copy` table
│   ├── locales.ts                # Locale list/guards (`LOCALES`, `isLocale`, `toLocale`)
│   ├── email.ts                  # Resend: newsletter signup notification only
│   ├── rateLimit.ts               # In-memory sliding-window rate limiter
│   ├── schemas.ts                 # Zod schemas — just `subscribeSchema` now
│   ├── siteUrl.ts                 # Canonical server-trusted base URL
│   └── reducedMotion.ts           # prefers-reduced-motion helpers
├── scripts/
│   └── screenshot.ts             # Local visual checks (output is gitignored)
├── middleware.ts                 # Locale detection + redirect only — no auth, no route protection
├── next.config.ts                # Security headers, CSP (much shorter — no third-party checkout/DB origins)
├── tailwind.config.ts             # Tailwind — darkMode: "class"
└── .env.local.example             # Required env vars (see below — a short list now)
```

---

## Content Model (`lib/articles.ts`)

Single source of truth for every article, mirroring the old `lib/templates.ts` pattern:

- `Article` = `{ slug, category, person?, isGuide?, publishedAt, tags, it: ArticleLocale, en: ArticleLocale }`.
- `category` is one of the four "Il Taccuino di Jane" macro-categories: `"corpo" | "persuasione" | "mentalismo" | "contro-manipolazione"` (see `CATEGORY_LABELS` / `getCategoryLabel()` for their IT/EN display labels — never hardcode a category label string at a call site).
- `person?: string` marks a "Dossier Personaggi" piece (e.g. `"patrick-jane"`, `"cal-lightman"`) — it still belongs to one of the four categories and appears in both `/articoli` and `/dossier`. `isGuide?: boolean` marks a long-form "Guide Pratiche" piece, surfaced in `/guide-pratiche` in addition to `/articoli`. Both flags are independent of `category` and of each other.
- `ArticleLocale` = `{ title, description, body }`. `body` uses a deliberately tiny markdown grammar — blank-line paragraphs, `"## "` headings, `"- "` bullet lists, `**bold**` spans, and a `":::callout Title"` ... `":::"` fenced block (the "L'Osservazione Chiave" / "The Key Observation" highlight box; title optional) — rendered by `components/ArticleBody.tsx`. No markdown dependency; don't add one for this.
- Helpers: `getArticle(slug)`, `getArticlesByCategory(category)`, `getAllArticlesSorted()`, `getRelatedArticles(current, limit)`, `getDossierArticles()` / `getDossierArticlesForPerson(person)`, `getGuideArticles()`.

**When adding a new article:**

1. Add an `Article` object to the `articles` array in `lib/articles.ts`, with full `it` and `en` content — never publish IT-only or EN-only.
2. Keep body content original commentary/analysis — see the IP section above.
3. A few hundred words minimum, structured with `## ` headings; this is an editorial site, not a filler blog.
4. No new build step is needed — `app/sitemap.ts`, the article index and `generateStaticParams` on the detail page all read `lib/articles.ts` directly.

## Internationalisation (`lib/i18n.ts`)

- The site is primarily **Italian**, with English support. `Lang = "it" | "en"`. Default is Italian.
- One `copy` table (`copy.it` / `copy.en`) holds all UI strings — nav, homepage, footer, page kickers, error/404 copy. There is no separate `formaCopy.ts` any more; that split existed only because the old site had far more copy than this one does.
- Use `useLang()` from `LanguageProvider` in client components to get `{ lang, toggle }`.
- Article content is localised separately, inline on each `Article` (`it`/`en` fields) — not through the `copy` table.

## Routing / Middleware

- `middleware.ts` only detects the visitor's language (from `Accept-Language`) and redirects an un-prefixed path to `/it` or `/en`. There is no auth, no protected route matcher — that whole concern was Clerk's and is gone.
- No route requires sign-in. There are no `/account`, `/admin`, `/sign-in` routes any more.

## Newsletter (`/api/subscribe`)

- Rate-limited via `lib/rateLimit.ts` (in-memory; fine at this traffic level — resets on redeploy, not shared across instances, and that's an accepted tradeoff, not a bug to fix with Redis).
- Validates the email with `subscribeSchema` (`lib/schemas.ts`).
- There is **no database**. A signup does not get stored server-side; instead `lib/email.ts`'s `sendNewsletterSignupNotification()` emails the site owner (`RESEND_NOTIFY_TO`, falling back to `RESEND_FROM`) so they can add the address to whatever list tool they use. Silently no-ops without `RESEND_API_KEY` (safe in dev/preview).

## Design System — "Il Taccuino di Jane" exact-hex palette

The site's palette is the site owner's exact hex codes from the "Il Taccuino di Jane" content/design brief — a vintage-notebook / investigative-club look. **Never add a fifth colour**; every other token is a literal shade, tint or opacity of these four:

| Element          | Name                    | Hex       | Role                                                          |
| ----------------- | ----------------------- | --------- | -------------------------------------------------------------- |
| Sfondo Dominante   | Panna Vintage            | `#FDFBF7` | `--bg` — dominant page/article background                     |
| Testo e Struttura  | Verde Abete / Oxford     | `#1B362F` | `--text` — headings, menus, body text, thin divider lines      |
| Accento e Focus    | Rosso Tè / Cremisi Muto  | `#8B2635` | `--accent` — CTAs, important links, highlighted detail (~10% of the page) |
| Sfondi Secondari   | Grigio-Verde Salvia      | `#EAEFE9` | `--surface-2` — callout boxes, quotes, card previews           |

Two things to know before touching colour:

- **`#8B2635` needs no separate "text-safe" shade** — checked against the WCAG 2.2 relative-luminance formula, it measures 8.4:1 on `#FDFBF7` and cream text on a solid `#8B2635` fill measures 8.65:1, both comfortably above the 4.5:1 AA floor. Unlike the previous (Pantone-swatch) palette pass, `--accent` and `--terra` are therefore the *same* colour now — `--terra` is kept only as a backward-compat CSS variable alias, not a second red.
- **No stray neutrals.** Shadows and overlays are tinted with the green (`rgba(27, 54, 47, …)`), not a generic black/brown. Dark mode remaps the same four colours onto a dark-green ground (`#0C1815` background, `#FDFBF7` text, `#B4727C` — the accent red lightened toward white until it clears 4.5:1 on that dark ground) rather than introducing a fifth hue.

Other tokens:

- **Fonts**: Playfair Display (display — h1–h3, article titles; CSS variable `--font-display`, still named that even though it once loaded Fraunces — see the layout.tsx comment) + Inter (body/UI). Only these two families are loaded. Playfair Display is a static-weight family, not a variable font, so display type is tuned with `font-weight`/`font-style`, not `font-variation-settings`.
- **Radius tokens**: editorial and sharp, not rounded. Use `.r-md` (4px — cards, panels, buttons), `.r-sm` (2px — chips), `.r-lg`/`.r-xl` for larger surfaces. Only genuinely circular elements use `border-radius: 50%` directly.
- **Shadows**: `--shadow-sm` / `--shadow-md` / `--shadow-lg` / `--shadow-xl` in `globals.css`.
- **Buttons**: `.btn-brand` (solid red CTA, uses `--accent`) / `.btn-brand-sm` (compact variant).
- **Callout box**: `.fn-callout` — the "L'Osservazione Chiave" / "The Key Observation" highlight box, salvia (`--surface-2`) background with a load-bearing accent-red left rule. Written via a tiny `:::callout Title` ... `:::` grammar in article bodies — see `components/ArticleBody.tsx`.
- **Texture & separators**: a barely-perceptible SVG-turbulence grain sits behind every page in both themes (`body::before` in `globals.css`, fainter in light mode than dark — paper reads noisier at a given opacity than a near-black ground). `.fn-separator` renders a small retro diamond-glyph section break.
- **Depth**: one material — flat opaque paper, no blur, no glass, no specular highlight. The `.glass-surface` etc. class names persist from the earlier naming (see the CSS for why) but render flat paper, not glass. The rim border on any panel is load-bearing for contrast (WCAG 1.4.11) — never drop it.
- Theme is `dark`-class-based (`tailwind.config.ts` `darkMode: "class"`), opt-in via `ThemeToggle`, default light.

When adding a new page or component, reuse these tokens rather than hand-rolling new colors/radii/shadows — and if a design calls for a colour outside this table, that's a decision for the site owner, not something to add unilaterally.

---

## Environment Variables

| Variable                   | Required  | Description                                                     |
| --------------------------- | --------- | ----------------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL`       | Yes       | Full canonical site URL, e.g. `https://osservatorio.example.com`        |
| `RESEND_API_KEY`             | Optional  | Enables the newsletter-signup notification email                 |
| `RESEND_FROM`                | Optional  | Sender address for that email                                    |
| `RESEND_NOTIFY_TO`           | Optional  | Who receives the "new subscriber" notification (defaults to `RESEND_FROM`) |
| `NEXT_PUBLIC_POSTHOG_KEY`    | Optional  | PostHog project API key                                          |
| `NEXT_PUBLIC_POSTHOG_HOST`   | Optional  | PostHog host (defaults to `https://eu.i.posthog.com`)             |

Copy `.env.local.example` to `.env.local` and fill in values before running locally. All of the above are optional except `NEXT_PUBLIC_SITE_URL` — the site works locally without any of them set.

---

## Development Workflow

```bash
npm install       # Install dependencies
npm run dev        # Run dev server
npm run build       # Production build
npm start            # Start production server
npm run test          # Vitest unit tests
npm run test:e2e       # Playwright — no suite currently checked in, tooling only
npm run typecheck        # tsc --noEmit
npm run lint               # eslint .
```

---

## Common Tasks

### Add a new article

1. Add an `Article` object to `lib/articles.ts` with a unique `slug`, `category`, `publishedAt`, `tags`, and full `it`/`en` `title`/`description`/`body`.
2. Keep it original commentary — see the IP section at the top of this file.
3. No other file needs to change — the index, sitemap and static params all read the array.

### Add a new UI copy string

Add the key to both `copy.it` and `copy.en` in `lib/i18n.ts`. Never add a key to only one locale — every `copy[lang][key]` lookup assumes both exist.

### Add a new top-level page

1. Create `app/[lang]/<route>/page.tsx`.
2. Read `params` for `lang`, call `toLocale()` on it.
3. Render `<SiteNav />` … content … `<FormaFooter />`, matching the existing pages' structure.
4. Add the route to `SiteNav.tsx` / `FormaFooter.tsx` if it should appear in navigation, and to `app/sitemap.ts`.

### Debug the newsletter signup

There's no database to query. If a signup isn't producing a notification email, check `RESEND_API_KEY` is set and check the Resend dashboard's activity log — `lib/email.ts` no-ops silently without a key, which is expected in local dev.
