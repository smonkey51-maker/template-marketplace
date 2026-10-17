# CLAUDE.md — Studio HR

AI assistant reference for this codebase. Read it before making changes.

---

## Project overview

A **showcase website for an HR consulting practice** (business-to-business), **Italian only**, with a contact form, a newsletter signup and — planned — a client area. Built with Next.js 16 (App Router).

The business has **no name yet**: "Studio HR" is a working title kept in one place, `lib/site.ts`. The same file holds `SITE.draft`, a flag that, while `true`, shows a "Sito in costruzione" bar on every page, blocks indexing (`robots`) and marks placeholder sections. **Flip it to `false` at launch.** All copy is provisional; never invent facts (clients, figures, years, testimonials, certifications).

**Tech stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 (CSS-first config) · Ark UI (headless primitives) · liquid-gl (refraction lenses) · Zod · Resend (email) · PostHog (analytics, optional) · Vitest · Playwright (e2e smoke)

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

## Look and feel — reliable and human: bands of white, blue and yellow, with liquid glass only for floating UI

- **Fonts:** IBM Plex Sans (text, headings) + IBM Plex Mono (labels, figures) via `next/font/google` in `app/layout.tsx`. **Do not use Inter** or other generic AI-site defaults.
- **Sections are full-width bands, not rounded cards.** `components/Band.tsx` (`tone="white|soft|blue|yellow"`) divides every page: white, soft blue-white (`#eef3ff`), **blue** (`#1740b5`, white text, yellow buttons — the brand band) and **yellow** (`#ffd23f`, navy ink, navy buttons — used once or twice per page for the one thing to do). A tone only redefines the colour tokens, so `text-ink`, `text-muted`, `border-line`, `.btn-*` and `.field` inside adapt by themselves (use `text-danger`, not a hard-coded red). **Colour is inherited as a computed value, so anything that sets tokens outside a `Band` (the hero, the index overlay) must also set `text-ink`**, or its text keeps the page's navy. Alternate the tones down the page; inner pages start with a blue `PageHeader` band and end with a yellow call to action. Content is set in hairline rows (`.row-link`, `.row-line`, `.col-rule`) and flat `.panel` boxes (4 px corners); **no pills, no stacks of rounded glass cards**. Buttons are flat and squared. Humanity comes from the warm photos (two, bright and smiling), plain warm copy and big editorial type.
- **Palette:** white / blue / yellow with a deep-navy ink (`#0b1c3d`). Tokens in `app/globals.css` (`:root`, plus the `.tone-*` overrides), exposed as Tailwind colours (`bg-surface`, `text-ink`, `border-line`, `text-accent`, …). Text on glass is checked ≥ 4.5:1 against the worst-case background (lowest measured 5.04:1).
- **Liquid glass (floating UI only now: the nav bar and the bottom dock, which also holds the "Indice" button):** translucent fill + `backdrop-filter` + bright rim + inner highlight + soft shadow, over the page itself. Classes: `.glass-panel` (panel — **not** `.glass`: liquid-glass-react names its own inner element `glass`, and sharing the name put our fill and shadow on it, which made its button grey), `.glass-ctl`, `.glass-bar` (footer), `.glass-nav` / `.glass-lens` (the legible glass inside a lens), glass-styled `.btn`, `.field`, `.callout`, command palette. Rounded radii (8–20 px). No solid `bg-bg`/`bg-surface` on page roots or body — it would hide the ground.
- **Legibility is measured, not assumed:** `npm run audit:contrast` (with the site running on :3111; `CHROMIUM_PATH=…` if Playwright's browser is missing) hides all text, screenshots the real page, and computes the WCAG contrast of every text line against the worst pixel behind it — light and dark, three scroll positions, pointer over a panel. It must pass (≥ 4.5:1, 3:1 large). Run it after any change to glass, ground, colours or lenses. It forces the effects on (`AUDIT_LENSES=on`, the worst case); run it also with `AUDIT_LENSES=off`, which is what visitors without a GPU get. It found that muted/accent text on the bare ground (glows + grid lines) fell to ~3.4:1, so `--muted`/`--accent` are darker/lighter than a pure token check would suggest and the ground glows and grid lines are deliberately faint. Text that passes under the fixed dock/pill is not measured.
- **Glass over the page:** refraction only shows where real content (a band edge, the hero photo) is behind the glass. **There is no SVG refraction on panels any more:** `backdrop-filter: url(#filter)` with displacement maps on many large panels made scrolling and animations very slow on a real machine; only the liquid-gl lenses refract. `.glass-panel` panels materialise on load (`materialize`, 380 ms, transform + opacity only, applied to the glass element itself — an ancestor with opacity < 1 would switch the backdrop blur off).
- **Never stack translucent surfaces:** inside a glass panel, `.field` and `.btn-outline` use a plain light fill with no second blur (Apple: legibility collapses when light translucent layers stack).
- **Fallbacks are mandatory:** `@supports not (backdrop-filter)` and `prefers-reduced-transparency` give solid `--surface`; the effect libraries are skipped for reduced motion/transparency and below 768 px.
- **The site is light (white/blue/yellow).** There is no dark mode, no toggle and no stored theme.

### Interaction and motion rules (from the vendored skills)

Press feedback `scale(0.97)` on `:active`; custom `--ease-out`; transitions name their properties (never `transition: all`); UI motion under 300 ms; **hover only inside `@media (hover: hover) and (pointer: fine)`**; reduced motion keeps fades and drops movement. Mobile: inputs are 16 px (no iOS zoom), tap targets ≥ 44 px, `min-h-dvh`, safe-area padding, `viewport-fit=cover`, per-scheme `theme-color`.

### Refraction libraries (MIT, lazy-loaded; none on first paint)

- **`liquid-gl`** (`components/GlassLenses.tsx`) makes WebGPU/WebGL lenses of the sticky/fixed glass elements: `.lens-bar` (the sticky nav row; `components/SectionIndex.tsx` is now a plain hairline list, not a lens) and `.lens-dock` (the floating navigation dock `components/NavDock.tsx`, with a stronger bevel, aberration and the fluid-cursor interaction). It only works on `fixed`/`sticky` elements and refracts a **snapshot** of the page, so lenses are rebuilt on theme change and on every page mount. Rules from its docs and from experience: **all lenses share one canvas and must share one explicit `zIndex`** (50); the snapshot ignores fixed elements; the CSP needs `worker-src 'self' blob:`; it sets `pointer-events: none` on the lens (undone by `.lens-bar > *, .lens-dock > *`); it **makes the element's own background transparent**, so the fill and blur that carry the text contrast live on the inner `.glass-nav`/`.glass-lens` and hold with or without the lens; strong settings artefact — keep them mild. **One `liquidGL()` call = one snapshot of the whole page, and the snapshot is the expensive part, so all lenses go through a single call at a low resolution.** Skipped below 768 px and for reduced motion/transparency. **The lenses and the SVG refraction only run when there is a GPU** (`lib/glassFx.ts`: off with software rendering, ≤ 3 cores or data-saver; the probe runs once, when idle, and is remembered for the session; `?lenses=on|off` overrides it): measured in a software-rendered browser the lens set-up alone blocked the main thread for ~7.5 s (worst task 3.8 s) and the page ignored clicks. Not verified on a real GPU, where it should be far cheaper. Unused options worth knowing: `tint`, `interaction: "fluid"` (used on the dock), `magnify`, `draggable`, `registerDynamic()`, `engine`/`?liquidGL-engine=` for debugging, `data-liquid-ignore`, narrowing `snapshot` to save memory.
- **Tailwind trap:** a custom class that sets `display` (like `.btn`) beats the `hidden` utility (unlayered CSS wins over layers). Hide a wrapper instead of `.btn hidden`.

---

## Structure

```
app/            layout.tsx · page.tsx · servizi/ metodo/ chi-siamo/ contatti/ area-riservata/ privacy/
                test/ test-ma-di-piu/ rickrolled/ · not-found · error · global-error · icon · robots · sitemap
                api/{contact,subscribe,og}/route.ts
components/     SiteNav · SiteFooter · SiteLogo · PageShell · PageHeader · ContactForm
                GlassLenses · NavDock · IndexMenu · SectionIndex · FloatingCta · HeroReady · InteractionFx · BigWordmark · ArticleBody · TestBase · lab/ArkDemo
lib/            site.ts · meta.ts · schemas.ts · email.ts · rateLimit.ts · siteUrl.ts · reducedMotion.ts
types/          liquid-gl.d.ts
scripts/        contrast-audit.mjs (npm run audit:contrast)
.claude/skills/ vendored skills from emilkowalski/skills (MIT) — see README.md there
```

## UI libraries

**Ark UI** is the only component library. HeroUI and Ant Design were trialled and removed (HeroUI doubled the JS on every page via the shared footer; Ant Design needed a full theme remap and read as generic). Do not add another without a reason.

## Development workflow

```bash
npm install
npm run dev · build · typecheck · lint · test · test:e2e
```

Before pushing: typecheck, lint, `npm test`, `npm run build`, `npx prettier --check .`. Run `npm run audit:contrast`. Test layouts at 320 px and 390 px wide (the `break-ui` approach: worst-case data, long strings).

## Common tasks

- **Add a page:** `app/<route>/page.tsx` with `export const metadata = pageMeta(...)`, wrap in `<PageShell>`, add to `SiteNav.tsx`, `SiteFooter.tsx` and `app/sitemap.ts`.
- **Rename the business / launch:** edit `lib/site.ts` (name, tagline, `draft: false`); replace placeholder copy and the privacy notice.
- **Animate the Rickrolled page:** add a GIF under `public/` and point the `<img>` in `app/rickrolled/page.tsx` at it.

- **liquidGL returns an array when the target matches several elements** (nav + dock); destroy every lens, or the old ones stay on top with a stale snapshot (the nav vanished after toggling the theme).

- **Hero photo:** `public/hero-2.webp` (the bright, smiling group) sits behind the home hero; `public/hero.webp` is reused in the home's people band. It as an in-flow `next/image` (not a fixed background: the liquid-gl snapshot ignores fixed elements, so only in-flow content is refracted by the sticky nav and dock lenses), with a blue `.hero-wash` (the giant title stays ≥ 3:1 on the brightest pixels).

- **Motion accents** (`components/InteractionFx.tsx`, inspired by the interactions of diventaredesigner.com, own code): a dot that replaces the pointer arrow and grows over links (hover devices only; fields keep the text cursor), `[data-magnet]` buttons that lean toward the pointer (CSS `translate`, composes with the `:active` scale), and `[data-reveal]` fade-up on first view (hidden only after JS runs and only if below the fold; all off for reduced motion). Do not put `data-reveal` on `.glass-panel`: an ancestor with opacity < 1 switches its backdrop blur off.

- **Scenic layer** (home): a hero photo that drifts and zooms with the scroll, a statement whose words brighten as it scrolls in (resting state stays ≥ 4.5:1), and a `BigWordmark` (the name fitted to the footer width). Scroll-driven animations are `@supports (animation-timeline: …)` progressive enhancement; reduced motion keeps everything still. Decorative pieces are `aria-hidden`. There is no site search / command palette any more.

- **Van Schneider-style layer** (home + site): a full-screen hero with a giant headline that rises word by word (`.hero-word`, masked per word) over a photo that fades/zooms in (`.hero-wipe`) and a blue wash (`.hero-wash`, tuned so the headline stays ≥ 3:1 on the brightest photo pixels); `[data-reveal]` fades up; cards scale to 1.01 on hover (`a.glass-panel`); and `IndexMenu` (the "Indice" item of the bottom dock, opening a full-screen blue list of huge links, portalled to `<body>`; Escape/backdrop closes it, focus returns to the button). Not taken on purpose: numbered sections, kicker labels and the outlined marquee (removed earlier at the owner's request).

- **Arrival animation must stay smooth:** animate only `transform` and `opacity` (no `filter: blur`, no `clip-path`: both repaint every frame), and start the liquid-gl lenses only after the intro (`GlassLenses` waits 2.6 s) because their page snapshot blocks the main thread.

- **Arrival, second pass (the first one was still heavy on a real machine):** the intro is short (≈ 1 s) and starts only when `HeroReady` says the hero photo is decoded (an inline script in `app/layout.tsx` sets `hero-pending` on `<html>` before the first paint, with a 2.5 s failsafe; CSS keeps the intro elements hidden until it is removed); the bottom dock appears only after the intro, with no fade (a fading ancestor of a `backdrop-filter` element recomputes the blur every frame); `liquid-glass-react` was removed (its SVG displacement filter on the backdrop of the old CTA pill was the heaviest thing on screen) and the CTA is the flat `FloatingCta` (shown after scrolling past the first screen, wide screens only).
