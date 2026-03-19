---
name: TemplateLab design system — glassmorphism direction (March 2026)
description: Design tokens, aesthetic decisions, and component patterns after the glassmorphism redesign (March 2026). Previous monochrome direction was abandoned.
type: project
---

Design direction: glassmorphism aesthetic inspired by dashboard-fusion-v3.jsx. Accent color is indigo/violet (`--accent`), with frosted glass cards, specular top-edge highlights, and 3D tilt effects. Not fully opaque zinc anymore — cards use backdrop-filter blur.

**CSS variables (globals.css):**
- Light: `--bg: #FFFFFF`, `--surface: #FAFAFA`, `--nav-bg: rgba(255,255,255,0.82)`, `--accent: #5B4CF5`, `--accent-bg: rgba(91,76,245,0.08)`
- Dark: `--bg: #09090B`, `--surface: #111113`, `--nav-bg: rgba(9,9,11,0.82)`, `--accent: #7C6FF7`, `--accent-bg: rgba(124,111,247,0.12)`
- Glass tokens (both modes): `--glass-fill`, `--glass-shadow`, `--glass-stroke`, `--glass-top-edge`, `--glass-bright`, `--spec-hot`, `--spec-mid`, `--divider`

**`.glass` utility class (globals.css):**
- `backdrop-filter: blur(44px) saturate(180%) brightness(var(--glass-bright))`
- `background: var(--glass-fill)` | `box-shadow: var(--glass-shadow)` | `border: 1px solid var(--glass-stroke)`

**Card pattern (TemplateCard, BundleCard):**
- Outer wrapper `div`: holds `ref`, `onMouseMove`, `onMouseLeave`, tilt transform, `group` class, `willChange: transform`
- Inner card (`Link` or `article`): has `.glass` class + `rounded-2xl overflow-hidden`
- Specular top edge: `<div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-10" style={{ background: 'var(--glass-top-edge)' }} />`
- Tilt: `perspective(700px) rotateX rotateY scale3d(1.025)` on mousemove, spring reset on mouseleave via `cancelAnimationFrame` + rAF pattern

**Badges/pills:** Still `bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700`. No per-category accent.

**CTA buttons:**
- Primary / sign-in: `style={{ backgroundColor: 'var(--accent)' }}` + `text-white hover:opacity-90 rounded-2xl`
- Secondary: `bg-zinc-100 dark:bg-zinc-800` neutral (unchanged)
- Hero CTA uses inline style `backgroundColor: var(--accent)` — not a Tailwind class, to respect the CSS variable

**Typography:**
- Hero H1 gradient span: `className="bg-clip-text text-transparent"` + `style={{ backgroundImage: 'linear-gradient(135deg, var(--accent), #C77DFF)' }}`
- Card names, prices: unchanged zinc neutral

**Navigation:**
- `bg-nav backdrop-blur-xl` on `<nav>` — `--nav-bg` is 0.82 opacity to show blur effect
- NavButtons sign-in button uses `var(--accent)` background

**Hero:**
- Single ambient orb: `position:absolute, top:-200px, left:50%, translateX(-50%), width:600px, height:600px, radial-gradient(circle, var(--accent-bg) 0%, transparent 70%), opacity:0.6`

**New template added:**
- `dashboard-fusion-v3` (id) — glassmorphism analytics dashboard, category: "ui", price: 1999 cents, editorsPick: true, isNew: true, downloadType: "html"

**Why:** Owner was not satisfied with the monochrome zinc direction. Switched to glassmorphism inspired by dashboard-fusion-v3.jsx (March 2026).
**How to apply:** New UI components should use `.glass` class for surfaces, `var(--accent)` for primary interactive elements, and the tilt pattern for cards.
