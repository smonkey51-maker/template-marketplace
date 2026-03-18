---
name: TemplateLab design system — monochrome minimal direction
description: Design tokens, aesthetic decisions, and component patterns after the March 2026 monochrome redesign
type: project
---

Design direction: minimal, clean, premium — inspired by peony.ink (monochrome, generous whitespace) and blendful.com (dark minimal gallery-first). No glassmorphism, no neon glows.

**CSS variables (globals.css):**
- Light: `--bg: #FFFFFF`, `--surface: #FAFAFA`, `--card-bg: #FFFFFF`, `--nav-bg: rgba(255,255,255,0.94)`, `--muted: #6B7280`
- Dark: `--bg: #09090B`, `--surface: #111113`, `--card-bg: #111113`, `--nav-bg: rgba(9,9,11,0.94)`, `--muted: #9CA3AF`
- `--glow-blue` and `--glow-purple` have been removed — do not reference them.

**Card pattern (TemplateCard, BundleCard):**
- `bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl`
- Hover: `hover:shadow-lg transition-shadow duration-200` — no translate, no colored shadow.
- `.glass-subtle` class is still in globals.css but is now opaque (no backdrop-filter) — use explicit zinc classes for new components instead.

**Badges/pills:** Always `bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700`. No per-category or per-bundle accent colors.

**CTA buttons:**
- Primary: `bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-80 transition-opacity duration-200 rounded-full` (or `rounded-2xl` for large CTAs).
- Secondary: `bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700`.
- No `ios-spring`, no `btn-glow-blue` hover shadow, no `shadow-[0_..._rgba(10,132,255,...)]`.

**Typography:** Headings use `text-zinc-900 dark:text-white` — no gradient `bg-clip-text`. Card names use `text-[14px] font-semibold`. Prices use `text-[16px] font-bold text-zinc-900 dark:text-white`.

**Focus ring:** `outline: 2px solid #09090B` in light, `#FFFFFF` in dark (set in globals.css).

**What was removed:**
- All `backdrop-filter`/`-webkit-backdrop-filter` from `.glass` and `.glass-subtle`.
- `.btn-glow-blue:hover` box-shadow glow (class kept but gutted to only `transition: opacity`).
- `--glow-blue` and `--glow-purple` CSS variables.
- Ambient orb divs from HomeContent (referenced removed vars).
- Colored rings on cards (`ring-[#5E5CE6]/30`, `ring-[#FF9F0A]/25`).
- `hover:-translate-y-1` on cards.
- `ios-spring` from CTA buttons and NavButtons sign-in.

**Why:** Owner wanted a premium, monochrome aesthetic matching peony.ink/blendful.com references.
**How to apply:** All new UI components must follow the zinc/neutral palette. Never introduce `0A84FF`, `5E5CE6`, `FF9F0A`, `30D158` as UI accent colors on interactive elements (fine to keep in iframe preview thumbnails which show actual template content).
