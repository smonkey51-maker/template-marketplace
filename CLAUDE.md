# CLAUDE.md — SANDBOX

AI assistant reference for the **SANDBOX** codebase. Read this before making changes.

---

## Project Overview

**SANDBOX** is a bilingual (Italian primary, English secondary) test environment built with Next.js 16 (App Router). It exists to try out layouts, copy and UI components. Everything on it is sample material; it does not represent a real organisation.

It has **three pages** per locale and nothing else:

| Route                    | Purpose                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/[lang]/test`           | "Test" — base page: environment status, typography, buttons/fields, callout                                                                         |
| `/[lang]/test-ma-di-piu` | "Test ma di più" — the same base plus Ark UI primitives, data table, long-form text, palette                                                        |
| `/[lang]/rickrolled`     | A single image, nothing else. `noindex`; shows `public/rickrolled.png` (a static still — to animate it, add a GIF and change the `src` in the page) |

`/[lang]` redirects to `/[lang]/test`. `middleware.ts` redirects un-prefixed paths to `/it` or `/en` from `Accept-Language`.

The site used to be an editorial fan site about a TV series. That identity was removed on purpose: **do not reintroduce show-related names, characters, imagery or quotes.**

**Tech stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 (CSS-first config) · Ark UI (headless primitives) · Resend (newsletter notification email) · PostHog (analytics, optional) · Vitest · Playwright (e2e, one smoke spec)

---

## Look and feel — "corporate"

- **Fonts:** IBM Plex Sans (text and headings) + IBM Plex Mono (labels, dates, figures), via `next/font/google` in `app/[lang]/layout.tsx`. Variables `--font-sans` / `--font-mono`. **Do not use Inter** or other defaults of generic AI-generated sites.
- **Palette:** one navy brand hue, cool neutrals, one link blue. Tokens live in `app/globals.css` (`:root` light, `.dark` dark): `--bg --surface --surface-2 --ink --muted --line --line-strong --brand --accent --bar`. They are exposed as Tailwind colours (`bg-surface`, `text-ink`, `border-line`, `text-accent`, …) through `@theme inline`. Text pairs are checked at ≥ 4.5:1; `--line-strong` (form controls) at ≥ 3:1.
- **Shape:** radii 2–4 px, 1 px borders, no gradients, no glass/blur, no grain texture, no pills, no decorative emoji or icons.
- **Environment bar:** `SiteNav.tsx` always shows a dark "TEST ENVIRONMENT" bar above the header, and the footer repeats `ENV: TEST · CONTENT: SAMPLE`. Keep both: the site must never read as production.
- Shared classes in `globals.css`: `.btn .btn-primary .btn-outline`, `.field`, `.article-body`, `.callout`, `.cmdk-*` (command palette).
- Dark mode is `.dark`-class based (`@custom-variant dark`), toggled by `ThemeToggle`; default light.

## Structure

```
app/
├── [lang]/{layout,page,not-found,error}.tsx
├── [lang]/test/page.tsx · test-ma-di-piu/page.tsx · rickrolled/page.tsx
├── global-error.tsx · icon.tsx · robots.ts · sitemap.ts   (sitemap lists the two Test pages)
└── api/{og,subscribe}/route.ts
components/
├── SiteNav · SiteFooter · SiteLogo · PageHeader · ThemeToggle · CommandPalette
├── TestBase.tsx      # base sections shared by both Test pages
├── ArticleBody.tsx   # tiny markdown grammar: paragraphs, "## ", "- ", **bold**, :::callout
└── lab/ArkDemo.tsx   # Ark UI Tabs / Accordion / Switch
lib/  i18n.ts · locales.ts · meta.ts · email.ts · rateLimit.ts · schemas.ts · siteUrl.ts · reducedMotion.ts
```

## Internationalisation

`lib/i18n.ts` holds one `copy` table (`copy.it` / `copy.en`). Add every key to **both** locales; a compile-time check enforces it. Use `useLang()` in client components; server pages call `toLocale(params.lang)`.

## Newsletter (`/api/subscribe`)

Rate-limited in memory (`lib/rateLimit.ts`; resets on redeploy, accepted tradeoff). Validated with `subscribeSchema`. No database: `lib/email.ts` emails the owner (`RESEND_NOTIFY_TO`, falling back to `RESEND_FROM`) and silently no-ops without `RESEND_API_KEY`.

## UI libraries

**Ark UI** is the only component library. HeroUI and Ant Design were trialled and removed (see PR history): HeroUI doubled the JS on every page because it sat in the shared footer and needed its tokens remapped; Ant Design needed a full theme remap and read as generic. Do not add a second library without a reason.

## Environment variables

| Variable                                               | Required | Description                                            |
| ------------------------------------------------------ | -------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                 | Yes      | Canonical site URL, e.g. `https://sandbox.example.com` |
| `RESEND_API_KEY` / `RESEND_FROM` / `RESEND_NOTIFY_TO`  | Optional | Newsletter signup notification email                   |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | Optional | PostHog analytics                                      |

Copy `.env.local.example` to `.env.local`. The site runs locally with none of them set.

## Development workflow

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
npm test           # Vitest
npm run test:e2e   # Playwright smoke spec
```

## Common tasks

- **Add a page:** create `app/[lang]/<route>/page.tsx` (read `params`, call `toLocale`), render `<SiteNav /> … <SiteFooter />`, add it to `SiteNav.tsx`, `SiteFooter.tsx`, the command palette and `app/sitemap.ts`.
- **Add a UI string:** add the key to both locales in `lib/i18n.ts`.
- **Animate the Rickrolled page:** add a GIF under `public/` and point the `<img>` in `app/[lang]/rickrolled/page.tsx` at it.
