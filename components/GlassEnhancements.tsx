"use client";

import { useEffect } from "react";

const GLASS_SELECTOR =
  ".glass-surface, .glass-surface-pill, .glass-bar, .forma-glass-card, .fn-filter";

/**
 * Three progressive enhancements layered on top of the CSS glass material,
 * none of which change anything if unsupported or if the visitor prefers
 * reduced motion:
 *
 * 1. Continuous ("squircle") corners via a CSS Paint API worklet — the mask
 *    only activates once the worklet is registered, so Safari/Firefox keep
 *    today's border-radius look untouched.
 * 2. A specular highlight that chases the pointer on hover-capable devices,
 *    instead of sitting in one fixed spot. Touch devices get a slow ambient
 *    sweep (CSS-only, see globals.css) rather than pointer tracking, since
 *    there's no continuous pointer to follow.
 * 3. Actual refraction: an SVG feDisplacementMap filter chained onto
 *    backdrop-filter, warping what's behind the glass instead of just
 *    blurring it. Gated behind the same Paint API check as (1) — combining
 *    backdrop-filter with a custom SVG filter is inconsistent enough across
 *    engines that some browsers render the element blank rather than
 *    ignoring it, so this only ever reaches browsers already confirmed
 *    Chromium-family by the worklet registration succeeding.
 */
export default function GlassEnhancements() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && "paintWorklet" in CSS) {
      const houdiniCSS = CSS as unknown as {
        paintWorklet: { addModule: (url: string) => Promise<void> };
      };
      houdiniCSS.paintWorklet
        .addModule("/squircle-paint.js")
        .then(() => {
          document.documentElement.classList.add("squircle-ready");
          document.documentElement.classList.add("glass-fx-ready");
        })
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

  // 4. Pause the idle ambient sweep (the touch-only `glass-sweep` @keyframes
  // in globals.css) on glass surfaces currently scrolled off-screen. Nothing
  // about the sweep's own cost changes for a card the visitor is looking at;
  // this only stops paying for the ones they aren't. Scoped to touch/no-hover
  // devices because that's the only place the animation is ever running —
  // hover-capable devices use the pointer-tracking highlight above instead,
  // so there is nothing here for them to pause.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduced || !touch) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused";
        }
      },
      { rootMargin: "200px" }, // resume a little before it scrolls into view, not the instant it does
    );

    const observeAll = () => {
      document.querySelectorAll(GLASS_SELECTOR).forEach((el) => io.observe(el));
    };
    observeAll();

    // Client-side navigation mounts a fresh set of glass elements the
    // observer above never saw. Re-scanning on every DOM mutation would be
    // wasteful during something like search-as-you-type, so this only
    // re-scans once per animation frame no matter how many mutations land in
    // it — one full re-scan per burst of DOM changes, not one per node.
    let scanQueued = false;
    const mo = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Zero-size and aria-hidden: these <filter> defs are never drawn on their
  // own, only referenced via backdrop-filter: url(#...) from CSS once
  // .glass-fx-ready is set. Two variants — large surfaces can take a wide
  // displacement without it reading as noise; a 26px-tall pill can't, so it
  // gets a much smaller scale.
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="glass-distortion-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.015"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="glass-distortion-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.09"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
