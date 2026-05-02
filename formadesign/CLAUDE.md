# CLAUDE.md — FORMA Marketplace

AI assistant reference for the **FORMA Marketplace** codebase. Read this before making changes.

---

## Project Overview

**FORMA Marketplace** is an AI-powered template marketplace built with React + Vite. Users browse, preview, and customize premium UI templates with an immersive snap-scroll experience inspired by art and cinema. The design features famous paintings as section backgrounds, golden accents, custom cursor, and entrance animations.

**Tech stack:** React 19 · Vite 6 · TypeScript 5 · Tailwind CSS 4 · Framer Motion · Custom Animations

---

## Repository Structure

```
forma-marketplace/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main app with snap-scroll sections
│   │   └── components/
│   │       ├── ArtSection.tsx          # Section wrapper with IntersectionObserver
│   │       ├── HeroSection.tsx         # Hero with animated FORMA logo
│   │       ├── CatalogSection.tsx      # Template grid (Seurat painting)
│   │       ├── GuideSection.tsx        # 3-step process (Monet painting)
│   │       ├── StudioSection.tsx       # AI generation UI (Kandinsky painting)
│   │       ├── AccountSection.tsx      # User account (Van Gogh painting)
│   │       ├── FormaLogo.tsx          # Animated/static logo components
│   │       ├── CustomCursor.tsx       # Particle trail cursor
│   │       └── ScrollIndicator.tsx    # Section navigation dots
│   ├── styles/
│   │   ├── index.css            # Main CSS entry point
│   │   ├── theme.css            # Design tokens & color palette
│   │   ├── fonts.css            # Font imports
│   │   └── animations.css       # Animation keyframes & classes
│   └── imports/                 # Imported assets from Figma
├── .claude/
│   └── agents/                  # Specialized AI agents
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── .npmrc                      # npm configuration
├── package.json               # Dependencies
└── vite.config.ts             # Vite configuration
```

---

## Key Conventions

### Design System

**Brand Colors (Gold + Dark palette):**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--accent` | `#D4AF37` | `#D4AF37` | Primary gold accent (unchanged) |
| `--bg` | `#FDFAF5` | `#060606` | Page background |
| `--surface` | `#F5EFE3` | `#0f0f0f` | Card/section background |
| `--text` | `#1C1610` | `#eaeaea` | Primary text |
| `--muted` | `#7A6B56` | `#8a8a8a` | Secondary text |

**Typography:**
- **Montserrat**: Headings, display text (700-900)
- **Plus Jakarta Sans**: Body text, UI elements (300-800)
- **Cormorant Garamond**: Hero headlines, editorial text (300-700, italic)
- **Arial/Helvetica**: FORMA logo letters

**Spacing Scale:** 8 / 16 / 24 / 40 / 64 / 120px

### Section-Based Architecture

The app uses **full-screen snap-scroll sections**:

1. **Hero** (id: `hero`) - FORMA logo animation, floating cards, "Arte in tasca"
2. **Catalogo** (id: `catalogo`) - Template grid, Seurat dots overlay
3. **Guida** (id: `guida`) - 3-step process, Monet painting background
4. **Studio** (id: `studio`) - AI generation interface, Kandinsky geometry
5. **Account** (id: `account`) - User auth/profile, Van Gogh sunflowers

Each section:
- Uses `ArtSection` wrapper with `IntersectionObserver`
- Is `100svh` (mobile-safe viewport height)
- Has `scroll-snap-align: start`
- Features entrance animations (`.anim-in`, `.anim-up`, `.anim-bg`)
- Has section counter (01/05, 02/05, etc.) and oversized outline text

### Animation System

**Entrance Animations:**
```css
.forma-section[data-entered] .anim-in {
  animation: forma-fade-in 0.6s var(--ease-glide) forwards;
}

.forma-section[data-entered] .anim-up {
  animation: forma-fade-up 0.8s var(--ease-glide) forwards;
  animation-delay: var(--delay, 0s);
}
```

**Easing Functions:**
- `--ease-glide`: cubic-bezier(0.22, 1, 0.36, 1) - smooth deceleration
- `--ease-snap`: cubic-bezier(0.32, 1.10, 0.64, 1) - gentle spring
- `--ease-bounce`: cubic-bezier(0.34, 1.56, 0.64, 1) - playful overshoot

**Custom Cursor:**
- Desktop-only (respects `prefers-reduced-motion`)
- Dot + ring + 5 particle trail
- Golden color `#D4AF37`
- Lerp-based smooth following

### FORMA Logo

Three variants in `FormaLogo.tsx`:
- **FormaLogoAnimated**: Self-writing animation (SVG `<animate>`)
- **FormaLogoStatic**: Static version
- **FormaLogoIcon**: Circle O icon for favicons/small uses

Logo structure:
- F, R, M: Text elements with gold gradient
- O: Perfect circle (stroke-dasharray animation)
- A: Full triangle path (no crossbar)

---

## Development Workflow

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

**Vite auto-refresh** is enabled for instant HMR.

---

## Common Tasks

### Add a New Section

1. Create component in `src/app/components/[SectionName].tsx`
2. Import and use `ArtSection` wrapper in `App.tsx`
3. Add section ID to `ScrollIndicator` sections array
4. Add painting background URL (if desired)
5. Add section counter (e.g., `06 / 06`)
6. Add oversized outline text at bottom

### Modify Animations

Edit animation keyframes in `src/styles/animations.css`. All entrance animations use the `[data-entered]` attribute trigger pattern via `IntersectionObserver` in `ArtSection.tsx`.

### Update Design Tokens

Edit `src/styles/theme.css` for colors, spacing, shadows, and other design system values. Use CSS custom properties for theme consistency.

### Add Famous Painting Background

In `App.tsx`, pass `backgroundImage` prop to `ArtSection`:
```tsx
<ArtSection
  id="new-section"
  backgroundImage="https://upload.wikimedia.org/wikipedia/commons/..."
  overlayOpacity={0.75}
>
```

Wikipedia Commons URLs are used for famous paintings to avoid copyright issues.

---

## Architecture Notes

### Providers & Global State

Currently no global state management. Future implementations may add:
- Theme context (dark/light mode)
- Language context (IT/EN)
- Auth context (Clerk or similar)
- Purchase/wishlist context

### Scroll Snap Container

The main `App.tsx` container uses:
```css
scroll-snap-type: y mandatory;
overflow-y: scroll;
height: 100vh;
```

Each `ArtSection` has `scroll-snap-align: start` for full-screen snap behavior.

### Performance

- Animations use `transform` and `opacity` (GPU-accelerated)
- Custom cursor disabled on mobile and when `prefers-reduced-motion`
- Images lazy-loaded via browser native loading
- Painting backgrounds have dark overlay to ensure text readability

---

## Quality Standards

- **Accessibility**: Semantic HTML, keyboard navigation, `prefers-reduced-motion` support
- **Performance**: 60fps animations, optimized bundle size
- **Responsive**: Mobile-first, works on all screen sizes
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge latest 2 versions)

---

## Future Enhancements

Potential features to implement:
- [ ] Template data from CMS or JSON
- [ ] Authentication (Clerk)
- [ ] Stripe checkout integration
- [ ] Supabase purchases database
- [ ] Email notifications (Resend)
- [ ] AI template customization (Claude API)
- [ ] Template preview modal
- [ ] Download functionality
- [ ] Admin panel
- [ ] Analytics (PostHog)

---

**This is a living document.** Update it as the project evolves, adding new conventions, gotchas, and architectural decisions.
