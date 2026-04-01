---
name: TemplateLab animation patterns
description: Established animation conventions and infrastructure in the TemplateLab codebase
type: project
---

Scroll-reveal infrastructure is already in place and should be reused rather than reinvented.

**Why:** The project ships `ScrollRevealCard` (`components/grid/ScrollRevealCard.tsx`) and `.scroll-reveal` / `.scroll-reveal.visible` CSS in `globals.css`. Both are battle-tested and used throughout the template grid.

**How to apply:** For any new scroll-triggered entrance animation:
1. Define a new CSS class variant in `globals.css` under the SCROLL REVEAL section (e.g. `.scroll-reveal-bundle`).
2. Pass `className="scroll-reveal-bundle"` prop to `ScrollRevealCard` — the component now accepts an optional `className` prop (default: `"scroll-reveal"`).
3. Pass `delay={index * 100}` for stagger. Keep stagger ≤ 150 ms per card to avoid the sequence feeling sluggish.
4. Always add a `@media (prefers-reduced-motion: reduce)` override that sets `opacity: 1; transform: none; transition: none`.

**Established animation tokens:**
- Entrance easing: `cubic-bezier(0.22, 1, 0.36, 1)` ("ease-premium") — deceleration curve, matches iOS spring feel.
- Micro-interactions: 150–300 ms.
- Section-level entrances: 500–700 ms (`.scroll-reveal-bundle` uses 600 ms / 20 px lift).
- Stagger: 100 ms per card is the established value.

**Bundle section on homepage:**
- Bundle cards are rendered in `HomeContent.tsx` below the TemplateGrid section.
- `handleBundleBuy` is a `useCallback` in `HomeContent` that calls `POST /api/checkout` with `{ bundleId }`.
- BundleCard is intentionally kept animation-unaware; all scroll-reveal logic lives in the wrapping `ScrollRevealCard`.
