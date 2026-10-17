"use client";

import { useEffect } from "react";

/**
 * A specular highlight that follows the pointer across glass panels.
 *
 * One document-level listener finds the `.glass-panel` panel under the pointer, marks it
 * `data-lit` and eases `--lx`/`--ly` (the light's position inside it) toward the
 * pointer, so the light has weight instead of snapping. Decorative, so: only for
 * devices with a real hover pointer, and never with reduced motion.
 */
export default function GlassLight() {
  useEffect(() => {
    const q = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!q.matches) return;

    let panel: HTMLElement | null = null;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;

    const apply = () => {
      if (!panel) return;
      panel.style.setProperty("--lx", `${current.x}px`);
      panel.style.setProperty("--ly", `${current.y}px`);
    };

    const tick = () => {
      // Critically damped ease: ~16% of the remaining distance per frame.
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      apply();
      const settled = Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const release = () => {
      panel?.removeAttribute("data-lit");
      panel = null;
    };

    const onMove = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest<HTMLElement>(".glass-panel") ?? null;
      if (hit !== panel) {
        release();
        panel = hit;
        if (panel) {
          const r = panel.getBoundingClientRect();
          current = { x: e.clientX - r.left, y: e.clientY - r.top };
          panel.setAttribute("data-lit", "");
        }
      }
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      cancelAnimationFrame(raf);
      release();
    };
  }, []);

  return null;
}
