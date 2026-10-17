# CLAUDE.md — Studio HR

AI assistant reference for this codebase. Read it before making changes.

---

## Project overview

A **showcase website for an HR consulting practice** (business-to-business), **Italian only**, with a contact form, a newsletter signup and — planned — a client area. Built with Next.js 16 (App Router).

The business has **no name yet**: "Studio HR" is a working title kept in one place, `lib/site.ts`. The same file holds `SITE.draft`, a flag that, while `true`, shows a "Sito in costruzione" bar on every page, blocks indexing (`robots`) and marks placeholder sections. **Flip it to `false` at launch.** All copy is provisional; never invent facts (clients, figures, years, testimonials, certifications).

**Tech stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 (CSS-first config) · Ark UI (headless primitives) · liquid-gl + liquid-glass-react (refraction effects) · Zod · Resend (email) · PostHog (analytics, optional) · Vitest · Playwright (e2e smoke)

### Pages (no language prefix)

| Route                                       | Content                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `/`                                         | Hero, how we start, services, principles, client-area teaser                 |
| `/servizi` · `/metodo` · `/chi-siamo`       | Services (4 areas), method (4 steps), about (draft placeholder for the team) |
| `/contatti`                                 | Contact form (`components/ContactForm.tsx` → `POST /api/contact`)            |
| `/area-riservata`                           | Describes the client area; **login is not built yet**                        |
| `/privacy`                                  | Draft privacy notice — **needs review by a legal professional**              |
| `/test` · `/test-ma-di-piu` · `/rickrolled` | Internal component playground, `noindex`, not linked from the nav            |

The site used to have `/it` and `/en` prefixes and other sections; `next.config.ts` `redirects()` sends old links to the closest current page. There is no middleware.

---

## Roadmap

1. **Public site + contact form** — done (this is what exists).
2. Newsletter, legal pages, SEO, launch (set `SITE.draft = false`, real name, real copy, real privacy notice).
3. **Client area** — not started. Planned: Supabase (auth + Postgres + file storage) with strict row-level security. Each client sees only: their profile (name, surname), their company name, their appointments (calendar with a Meet link and the consultant), and their invoices (PDFs). Open questions: who creates appointments and invoices (admin UI vs Supabase dashboard vs Google Calendar sync), and GDPR retention rules.

---

## Contact form and newsletter

- `POST /api/contact`: `contactSchema` (`lib/schemas.ts`) → in-memory rate limit (5/min/IP) → email to `RESEND_NOTIFY_TO` via Resend with the visitor as reply-to. Visitor text is HTML-escaped (`escapeHtml`). The privacy consent must be an explicit `true`. A hidden **honeypot** field (`website`) is accepted by the schema on purpose and the route drops the message with a normal `200`, so a bot learns nothing.
- **Without `RESEND_API_KEY` in production the route returns 503 and the form shows an error** — a client enquiry must never be lost silently. In dev/preview it just accepts.
- `POST /api/subscribe`: newsletter signup, same pattern; it notifies the owner by email (no list stored; there is no database yet).

## Environment variables

| Variable                            | Required              | Description                                    |
| ----------------------------------- | --------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Yes                   | Canonical URL (sitemap, metadata)              |
| `RESEND_API_KEY`                    | **Yes in production** | Without it the contact form returns 503        |
| `RESEND_FROM` / `RESEND_NOTIFY_TO`  | Recommended           | Sender, and who receives enquiries and signups |
| `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST` | Optional              | Analytics (needs cookie consent if enabled)    |

---

## Look and feel — corporate, in liquid glass

- **Fonts:** IBM Plex Sans (text, headings) + IBM Plex Mono (labels, figures) via `next/font/google` in `app/layout.tsx`. **Do not use Inter** or other generic AI-site defaults.
- **Palette:** one navy brand hue, cool neutrals, one link blue. Tokens in `app/globals.css` (`:root` light, `.dark` dark), exposed as Tailwind colours (`bg-surface`, `text-ink`, `border-line`, `text-accent`, …). Text on glass is checked ≥ 4.5:1 against the worst-case background (lowest measured 5.04:1).
- **Liquid glass:** translucent fill + `backdrop-filter` + bright rim + inner highlight + soft shadow, over a fixed soft-blue ground (`body::before`). Classes: `.glass` (panel), `.glass-ctl`, `.glass-bar` (footer), `.glass-nav` (nav layer), glass-styled `.btn`, `.field`, `.callout`, command palette. Rounded radii (8–20 px). No solid `bg-bg`/`bg-surface` on page roots or body — it would hide the ground.
- **Never stack translucent surfaces:** inside a glass panel, `.field` and `.btn-outline` use a plain light fill with no second blur (Apple: legibility collapses when light translucent layers stack).
- **Fallbacks are mandatory:** `@supports not (backdrop-filter)` and `prefers-reduced-transparency` give solid `--surface`; the effect libraries are skipped for reduced motion/transparency and below 768 px.
- Dark mode: `.dark` class (`@custom-variant dark`), `ThemeToggle`; default light.

### Interaction and motion rules (from the vendored skills)

Press feedback `scale(0.97)` on `:active`; custom `--ease-out`; transitions name their properties (never `transition: all`); UI motion under 300 ms; **hover only inside `@media (hover: hover) and (pointer: fine)`**; no animation on keyboard-initiated actions (the ⌘K palette has none); reduced motion keeps fades and drops movement. Mobile: inputs are 16 px (no iOS zoom), tap targets ≥ 44 px, `min-h-dvh`, safe-area padding, `viewport-fit=cover`, per-scheme `theme-color`.

### Refraction libraries (MIT, lazy-loaded: ~64 KB gzip, none on first paint)

- **`liquid-gl`** (`components/GlassNavLens.tsx`): turns the sticky nav (`.liquidGL`) into a WebGPU/WebGL lens. Works only on `fixed`/`sticky` elements and refracts a **snapshot** of the page, so it is rebuilt on theme change. Hard-won gotchas: the CSP needs `worker-src 'self' blob:`; it sets `pointer-events: none` on the lens (undone by `.liquidGL > * { pointer-events: auto }`); it **makes the element's background transparent** (so the readable fill/blur lives on the inner `.glass-nav`); strong settings (bevel, specular) artefact — keep them mild. Not verified on a real GPU.
- **`liquid-glass-react`** (`components/GlassDock.tsx`): the floating "Richiedi un colloquio" pill. Built for **fixed, content-sized** elements; in page-flow panels it mispositions and overflows the page. Its content is a real `<Link>`, so it is keyboard-reachable. Do not use it for panels — use `.glass`.
- **Tailwind trap:** a custom class that sets `display` (like `.btn`) beats the `hidden` utility (unlayered CSS wins over layers). Hide a wrapper instead of `.btn hidden`.

---

## Structure

```
app/            layout.tsx · page.tsx · servizi/ metodo/ chi-siamo/ contatti/ area-riservata/ privacy/
                test/ test-ma-di-piu/ rickrolled/ · not-found · error · global-error · icon · robots · sitemap
                api/{contact,subscribe,og}/route.ts
components/     SiteNav · SiteFooter · SiteLogo · PageShell · PageHeader · ContactForm · CommandPalette
                GlassNavLens · GlassDock · ThemeToggle · ArticleBody · TestBase · lab/ArkDemo
lib/            site.ts · meta.ts · schemas.ts · email.ts · rateLimit.ts · siteUrl.ts · reducedMotion.ts
types/          liquid-gl.d.ts
.claude/skills/ vendored skills from emilkowalski/skills (MIT) — see README.md there
```

## UI libraries

**Ark UI** is the only component library. HeroUI and Ant Design were trialled and removed (HeroUI doubled the JS on every page via the shared footer; Ant Design needed a full theme remap and read as generic). Do not add another without a reason.

## Development workflow

```bash
npm install
npm run dev · build · typecheck · lint · test · test:e2e
```

Before pushing: typecheck, lint, `npm test`, `npm run build`, `npx prettier --check .`. Test layouts at 320 px and 390 px wide (the `break-ui` approach: worst-case data, long strings).

## Common tasks

- **Add a page:** `app/<route>/page.tsx` with `export const metadata = pageMeta(...)`, wrap in `<PageShell>`, add to `SiteNav.tsx`, `SiteFooter.tsx`, `CommandPalette.tsx` and `app/sitemap.ts`.
- **Rename the business / launch:** edit `lib/site.ts` (name, tagline, `draft: false`); replace placeholder copy and the privacy notice.
- **Animate the Rickrolled page:** add a GIF under `public/` and point the `<img>` in `app/rickrolled/page.tsx` at it.
