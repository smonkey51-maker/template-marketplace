"use client";

import { useEffect } from "react";
import type { LiquidGLLens } from "liquid-gl";
import { glassEffectsEnabled } from "@/lib/glassFx";

/** All lenses share one canvas, which requires one explicit z-index (see liquid-gl docs). */
const Z = 50;
/** Snapshot resolution: the cost of a lens grows with its square. */
const RESOLUTION = Number(process.env.NEXT_PUBLIC_LENS_RES ?? 0.6);

/**
 * Turns the sticky/fixed glass elements of the page into refracting WebGPU/WebGL
 * lenses with liquid-gl:
 *   - `.lens-bar`  the sticky nav row and the section index (mild refraction)
 *   - `.lens-dock` the floating navigation dock (stronger: bevel, aberration, fluid cursor)
 *
 * Skipped on small screens, for reduced motion/transparency and without a GPU
 * (see lib/glassFx.ts); the CSS glass
 * layer inside each element is the legible fallback in every case, and it is what
 * carries the text contrast — the lens only adds the refraction.
 *
 * liquid-gl refracts a snapshot of the page taken when it starts, so every lens is
 * rebuilt whenever the theme class on <html> changes.
 */
export default function GlassLenses() {
  useEffect(() => {
    const q = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)",
    );
    if (q.matches) return;

    let lenses: LiquidGLLens[] = [];
    let cancelled = false;
    let timer: number | undefined;

    const destroy = () => {
      for (const lens of lenses) {
        try {
          lens.destroy?.();
        } catch {}
      }
      lenses = [];
    };

    const start = async () => {
      try {
        // Wait for fonts and layout: the library snapshots the page when it starts.
        await document.fonts?.ready;
        if (!(await glassEffectsEnabled()) || cancelled) return;
        const { default: liquidGL } = await import("liquid-gl");
        if (cancelled) return;

        // ONE call = ONE snapshot of the whole page. The snapshot is the expensive part
        // (it blocks the main thread), so every lens shares a single call and a low
        // resolution: the lens only ever shows a frosted, refracted view of what is behind.
        if (document.querySelector(".lens-bar, .lens-dock")) {
          // With several targets liquidGL returns an array of lenses, not one lens.
          const made = liquidGL({
            target: ".lens-bar, .lens-dock",
            snapshot: "body",
            resolution: RESOLUTION,
            zIndex: Z,
            reveal: "none",
            refraction: 0.012,
            bevelDepth: 0.04,
            bevelWidth: 0.12,
            aberration: 0.12,
            frost: 6,
            shadow: false,
            specular: false,
            tilt: false,
          });
          lenses = Array.isArray(made) ? made : made ? [made] : [];
        }
      } catch (err) {
        console.warn("[liquid-gl] disabled:", err);
      }
    };

    const restart = (delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        destroy();
        void start();
      }, delay);
    };

    restart(400);

    const theme = new MutationObserver(() => restart(250));
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      theme.disconnect();
      destroy();
    };
  }, []);

  return null;
}
