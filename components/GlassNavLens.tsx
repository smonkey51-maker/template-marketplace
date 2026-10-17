"use client";

import { useEffect } from "react";
import type { LiquidGLLens } from "liquid-gl";

/**
 * Turns the sticky nav row (`.liquidGL`) into a refracting WebGPU/WebGL lens
 * with liquid-gl. Skipped on small screens and for reduced motion/transparency;
 * the CSS `.glass-bar` underneath stays as the fallback in every case.
 *
 * liquid-gl refracts a snapshot of the page taken when it starts, so the lens is
 * rebuilt whenever the theme class on <html> changes.
 */
export default function GlassNavLens() {
  useEffect(() => {
    const q = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)",
    );
    if (q.matches) return;

    let lens: LiquidGLLens | undefined;
    let cancelled = false;
    let timer: number | undefined;

    const destroy = () => {
      try {
        lens?.destroy?.();
      } catch {}
      lens = undefined;
    };

    const start = async () => {
      try {
        // Wait for fonts and layout: the library snapshots the page when it starts.
        await document.fonts?.ready;
        const { default: liquidGL } = await import("liquid-gl");
        if (cancelled || !document.querySelector(".liquidGL")) return;
        lens = liquidGL({
          target: ".liquidGL",
          snapshot: "body",
          resolution: 1.5,
          refraction: 0.006,
          bevelDepth: 0,
          bevelWidth: 0.02,
          frost: 0,
          shadow: false,
          specular: false,
          reveal: "none",
          tilt: false,
        });
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
