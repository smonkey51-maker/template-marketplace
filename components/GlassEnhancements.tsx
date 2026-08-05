"use client";

import { useEffect } from "react";

const GLASS_SELECTOR = ".glass-surface, .glass-surface-pill, .forma-glass-card, .fn-filter";

/**
 * Two progressive enhancements layered on top of the CSS glass material,
 * neither of which changes anything if unsupported or if the visitor
 * prefers reduced motion:
 *
 * 1. Continuous ("squircle") corners via a CSS Paint API worklet — the mask
 *    only activates once the worklet is registered, so Safari/Firefox keep
 *    today's border-radius look untouched.
 * 2. A specular highlight that chases the pointer on hover-capable devices,
 *    instead of sitting in one fixed spot. Touch devices get a slow ambient
 *    sweep (CSS-only, see globals.css) rather than pointer tracking, since
 *    there's no continuous pointer to follow.
 */
export default function GlassEnhancements() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && "paintWorklet" in CSS) {
      const houdiniCSS = CSS as unknown as {
        paintWorklet: { addModule: (url: string) => Promise<void> };
      };
      houdiniCSS.paintWorklet
        .addModule("/squircle-paint.js")
        .then(() => document.documentElement.classList.add("squircle-ready"))
        .catch(() => {});
    }

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    let active: HTMLElement | null = null;
    let raf = 0;
    let pendingEvent: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = pendingEvent;
      if (!e) return;
      const el = (e.target as HTMLElement)?.closest?.(GLASS_SELECTOR) as HTMLElement | null;

      if (el !== active) {
        active?.style.removeProperty("--spec-o");
        active = el;
      }
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spec-x", `${x}%`);
      el.style.setProperty("--spec-y", `${y}%`);
      el.style.setProperty("--spec-o", "0.4");
    };

    const onPointerMove = (e: PointerEvent) => {
      pendingEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
      active?.style.removeProperty("--spec-o");
    };
  }, []);

  return null;
}
