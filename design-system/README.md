# Forma Design System

> **Forma** (displayed as `For`**`ma`**) is an AI-powered template marketplace built with Next.js. Users browse, purchase, and download premium UI and prompt templates, then customise them in real-time with Claude AI via the built-in Studio.

---

## Sources

| Resource    | Location                                                      |
| ----------- | ------------------------------------------------------------- |
| GitHub repo | `smonkey51-maker/template-marketplace` (private)              |
| Site URL    | `https://forma.design` (inferred from `NEXT_PUBLIC_SITE_URL`) |
| Globals CSS | `app/globals.css` — all design tokens live here               |
| Layout      | `app/layout.tsx` — font loading, providers                    |

---

## Products / Surfaces

| Surface                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Marketplace (Home)** | Browse + filter UI and prompt templates        |
| **Template Preview**   | Detail page with iframe preview + buy CTA      |
| **AI Studio**          | Claude-powered template generator + customiser |
| **Account**            | Purchase history, downloads                    |
| **Bundle pages**       | Multi-template bundle offers                   |

---

## CONTENT FUNDAMENTALS

### Tone & Voice

- **Artisanal, premium, quiet confidence.** Forma positions itself as a craftsperson's marketplace — not a SaaS dashboard.
- Copy is concise, poetic, and slightly editorial. No filler phrases, no exclamation marks.
- Bilingual: **Italian primary, English secondary.** The default `lang` is `it`. Italian copy leans formal but warm — not corporate.

### Casing

- Product name: **Forma** (title case, never FORMA or forma)
- Nav items: UPPERCASE + letter-spacing (`tracking-[0.1em]`) for all nav labels
- Section headers: uppercase + tracked, small (`text-[10px]`), in accent color
- Body copy: sentence case

### I vs. You

- No heavy first-person "we". The brand speaks through the product.
- User-facing copy uses second person sparingly: _"Scopri i template"_, _"Personalizza con AI"_

### Key Phrases (IT/EN)

- _"Mercato del digitale artigianale"_ / _"Artisan digital marketplace"_
- _"Template premium e prompt AI, curati come piccoli oggetti artigianali."_
- _"Kanso · Shizen · Seijaku"_ — simplicity, naturalness, tranquility (footer philosophy)
- Kanji motif: **形** (katachi / forma / shape) — appears as watermark, decorative accent

### Emoji Usage

- ❌ No emoji in UI copy or headings
- One exception: Notion template preview uses 📋 as a faithful recreation of the Notion UI
- No decorative emoji anywhere in brand copy

### Numbers & Prices

- Prices displayed with DM Serif Display / Fraunces italic — e.g. `€12.99`
- Prices stored in cents in code (`1299` = €12.99)

---

## VISUAL FOUNDATIONS

### Colors

**Dark mode (default):**

| Token         | Value                    | Usage                                                |
| ------------- | ------------------------ | ---------------------------------------------------- |
| `--accent`    | `#C8915A`                | Primary gold/amber — CTAs, active states, highlights |
| `--terra`     | `#9C6B3C`                | Secondary warm brown — hover, gradient pairs         |
| `--bg`        | `rgba(20,16,12,0.55)`    | Page background (over bg-dark.jpg)                   |
| `--surface`   | `rgba(30,26,20,0.65)`    | Card/section bg                                      |
| `--surface-2` | `rgba(30,26,20,0.80)`    | Elevated surfaces                                    |
| `--text`      | `#EDE8DC`                | Primary text (washi cream)                           |
| `--muted`     | `rgba(237,232,220,0.55)` | Secondary text                                       |
| `--border`    | `rgba(237,232,220,0.09)` | Subtle borders                                       |

**Light mode:**

| Token      | Value                    | Usage                  |
| ---------- | ------------------------ | ---------------------- |
| `--accent` | `#9C7040`                | Muted gold — same role |
| `--terra`  | `#8C5028`                | Warm sienna            |
| `--bg`     | `rgba(250,247,240,0.38)` | Washi paper background |
| `--text`   | `#0A0805`                | Near-black ink         |
| `--muted`  | `#4A3828`                | Warm dark brown        |

**Semantic:**

- `--success` dark: `#7AAF4A` / light: `#5A7A32`
- `--error` dark: `#9C6B3C` / light: `#8C5028`

### Typography

| Role              | Font                    | Weight     | Notes                                                                |
| ----------------- | ----------------------- | ---------- | -------------------------------------------------------------------- |
| Display hero      | **Fraunces** (variable) | 400 italic | `font-variation-settings: "opsz" 144, "SOFT" 100`                    |
| Display editorial | **Cormorant Garamond**  | 300–700    | Calligraphic; replaces paid "Gatsunaga"                              |
| H1–H3 headings    | **Montserrat**          | 700        | Tracked tight (`-0.02em`), uppercase labels                          |
| Body              | **Plus Jakarta Sans**   | 300–800    | 15px base, `line-height: 1.85`, `letter-spacing: 0.005em`            |
| Decorative accent | **DM Serif Display**    | 400        | Prices, edition badges, Kanji watermarks                             |
| Custom local      | **Slingday** (`.otf`)   | 400        | `fonts/Slingday.otf` — display override; digits fall back to Jakarta |

**Scale:**

- Nav labels: `11px` uppercase tracked
- Section labels: `10px` uppercase tracked `0.2em`
- Card titles: `13px` Montserrat semibold
- Body copy: `15px` Jakarta
- Price display: `22px` Fraunces/DM Serif Display

### Backgrounds

- **Dark default:** `bg-dark.jpg` (Japanese garden photo) + `seigaiha` SVG overlay (scale fish-tile pattern in accent color at 6% opacity) + radial accent glow at top-left
- **Light default:** Same `bg-dark.jpg` + `linear-gradient(rgba(250,247,240,0.68)…)` overlay
- Both modes use `background-attachment: fixed` for parallax feel
- Warm film grain overlay on dark body (`::before`, 2.2% opacity, SVG turbulence filter)

### Motion & Easing

Six brand easings (iOS/Vision OS-inspired):

| Token           | Curve                            | Use                                    |
| --------------- | -------------------------------- | -------------------------------------- |
| `--ease-glide`  | `cubic-bezier(0.22,1,0.36,1)`    | Generic smooth transitions             |
| `--ease-snap`   | `cubic-bezier(0.32,1.10,0.64,1)` | Gentle spring, modals                  |
| `--ease-bounce` | `cubic-bezier(0.34,1.56,0.64,1)` | Overshoot — wax seal rotate, heart pop |
| `--ease-brisk`  | `cubic-bezier(0.45,0,0.15,1)`    | Fast out, slow in                      |
| `--ease-fluid`  | `cubic-bezier(0.4,0,0.2,1)`      | Material standard                      |
| `--ease-linger` | `cubic-bezier(0.16,1,0.3,1)`     | Very slow end — hero reveals           |

Duration scale: `120ms · 200ms · 320ms · 520ms · 820ms`

### Cards

Cards layer multiple effects:

- `.shoji-card` — inner inset border appears on hover (障子 screen motif), using `::after`
- `.card-sweep` — gold gradient top-border sweeps in on hover (`::before`)
- `.card-tilt` — 3D perspective tilt on hover (`perspective(800px) rotateX(2deg)`)
- `.shine-sweep` — diagonal light pass on hover
- `.wax-seal` — circular price stamp, rotated -6°, springs to 0° on hover
- Background: `--card-bg` (semi-transparent), `border: 1px solid var(--card-border)`

### Borders & Radius

- **Default: sharp corners (`border-radius: 0`)** — the Japandi aesthetic is rectilinear
- Radius tokens used only for pills, phone bezels, special UI:
  - `--r-sm: 10px` · `--r-md: 16px` · `--r-lg: 22px` · `--r-xl: 28px`
- Borders use CSS vars: `--border-gold: 1px solid rgba(var(--accent-rgb), 0.28)`

### Shadows & Elevation

5-level system (`--elev-1` → `--elev-5`), heavier in dark mode:

- Light: subtle warm-tinted shadows (`rgba(28,22,16,…)`)
- Dark: deep black shadows for depth
- Named aliases: `--shadow-sm/md/lg/xl` for simpler usage

### Glassmorphism

`.glass` utility: `backdrop-filter: blur(16px) saturate(160%)` + `background: var(--glass-fill)` + `box-shadow: var(--glass-shadow)` — used for nav, command palette, modals.

### Hover & Interaction States

- Links: `.link-muted` → muted at rest, full `--text` on hover
- Nav underline: animated `width: 0 → 100%` with `--ease-glide`
- Buttons: `.btn-brand` — gold bg → `--text` bg on hover; shimmer sweep child span
- Wishlist heart: spring pop animation on toggle
- Custom cursor: gold dot (7px) + tracking ring (34px → 52px on hover)
- Cards lift: `translateY(-4px)` + tilt on hover

### Japandi Decorative Motifs

| Class           | Description                                     |
| --------------- | ----------------------------------------------- |
| `.zen-divider`  | Centered ◇ with tapered accent gradient lines   |
| `.ma-divider`   | Shorter variant with 間 kanji                   |
| `.torii-accent` | Two horizontal marks above sections (鳥居 gate) |
| `.hanko-seal`   | Square rotated seal (判子)                      |
| `.mon-ring`     | Circle with inner diamond (家紋 crest)          |
| `.tategaki`     | Vertical writing mode label (縦書き)            |
| `.ink-line`     | Asymmetric brush-stroke underline on headings   |
| `.wax-seal`     | Circular price stamp                            |
| `.kanji-num`    | Large decorative step numbers in Fraunces       |

### Imagery

- Photography: Warm-toned, natural, Japanese-garden aesthetic
- Color grade: Warm, slightly desaturated, filmic
- No illustrations — photography + typographic decoration only

---

## ICONOGRAPHY

- **No icon library/font.** All icons are hand-authored inline SVGs directly in component files.
- Stroke style: 1.4–1.8px stroke, round linecaps, minimal geometry
- Colors: `currentColor` (inherits from parent `color`)
- Common icons: search (circle + path), heart (wishlist), star (rating), check, download arrow, platform icons (Canva, Notion, Excel, Sheets, Webflow, Framer, Shopify, WordPress, HTML)
- Platform icons live in `TemplateCard.tsx` as `<PlatformIcon>` component
- The Kanji character **形** acts as a brand glyph/logo mark — rendered in Fraunces/Cormorant

### Logo / Wordmark

- Text logo: `For` + `ma` where `ma` is in `--accent` color
- Font: Montserrat 800, uppercase, `tracking-[0.06em]`
- Sub-tagline: `"Mercato del digitale artigianale"` in accent, `font-weight: 500`, `tracking-[0.14em]`
- No SVG logo file — the wordmark is pure CSS + HTML text

---

## Files in This Design System

| Path                  | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `README.md`           | This file — full brand + design system reference              |
| `colors_and_type.css` | All CSS custom properties: colors, type, spacing, motion      |
| `fonts/Slingday.otf`  | Custom display font (Slingday)                                |
| `assets/bg-dark.jpg`  | Brand background photo (Japanese garden)                      |
| `preview/`            | Design system card previews (registered in Design System tab) |
| `ui_kits/forma/`      | Full UI kit — marketplace, studio, preview page               |
| `SKILL.md`            | Agent skill descriptor for Claude Code                        |

---

## UI Kits

| Kit               | Path                              | Description                                               |
| ----------------- | --------------------------------- | --------------------------------------------------------- |
| Forma Marketplace | `ui_kits/forma/index.html`        | Full click-thru prototype: home, preview, studio, account |
| — Nav + Footer    | `ui_kits/forma/Nav.jsx`           | `<FormaNav>` + `<FormaFooter>` components                 |
| — Template Card   | `ui_kits/forma/TemplateCard.jsx`  | `<TemplateCardUI>` with hover, badge, wax-seal price      |
| — Home Screen     | `ui_kits/forma/HomeScreen.jsx`    | Catalog, hero, filter chips, grid, bundles, newsletter    |
| — Preview Screen  | `ui_kits/forma/PreviewScreen.jsx` | Template detail, iframe mock, buy CTA sidebar             |
| — Studio Screen   | `ui_kits/forma/StudioScreen.jsx`  | AI Studio — prompt input, Claude generation, live preview |
| — Account Screen  | `ui_kits/forma/AccountScreen.jsx` | Purchases, Studio Access, settings tabs                   |
| — Tokens          | `ui_kits/forma/tokens.js`         | JS constants mirroring CSS design tokens                  |
