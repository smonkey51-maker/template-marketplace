"use client";

import { useEffect, useRef } from "react";

/**
 * Three small interactions, all decorative and all off for reduced motion:
 *   - a dot that replaces the pointer arrow and grows over links and buttons (hover devices
 *     only; text fields keep the native text cursor);
 *   - magnetic buttons: every `.btn` leans a few pixels toward the pointer;
 *   - scroll reveal: `[data-reveal]` fades up the first time it enters the viewport.
 *     Content is fully visible without JavaScript; elements already on screen at load are
 *     never hidden, so nothing flashes.
 */
export default function InteractionFx() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return;
    const cleanups: (() => void)[] = [];

    // ── Scroll reveal ───────────────────────────────────────────────────────────
    const html = document.documentElement;
    const io = new IntersectionObserver(
      (list) => {
        for (const { target, isIntersecting } of list) {
          if (!isIntersecting) continue;
          target.classList.add("in");
          io.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-seen])").forEach((el) => {
        el.dataset.seen = "1";
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) {
          el.classList.add("in"); // already on screen: leave it alone
          return;
        }
        const i = Array.from(el.parentElement?.children ?? []).indexOf(el);
        el.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
        io.observe(el);
      });
    };
    html.classList.add("reveal-ready");
    watch();
    // Pages swap their content on navigation.
    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById("main-content") ?? document.body, {
      childList: true,
      subtree: true,
    });
    cleanups.push(() => {
      html.classList.remove("reveal-ready");
      io.disconnect();
      mo.disconnect();
    });

    // ── Pointer effects: only with a real hover pointer ─────────────────────────
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const dot = ring.current;
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      let raf = 0;
      let seen = false;

      const tick = () => {
        cx += (tx - cx) * 0.7;
        cy += (ty - cy) * 0.7;
        if (dot) dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.2 ? requestAnimationFrame(tick) : 0;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        tx = e.clientX;
        ty = e.clientY;
        if (!seen) {
          seen = true;
          cx = tx;
          cy = ty;
          dot?.setAttribute("data-on", "");
          html.classList.add("fx-cursor"); // from now on the dot is the only cursor
        }
        if (!raf) raf = requestAnimationFrame(tick);

        const m = (e.target as Element | null)?.closest<HTMLElement>(".btn");
        document.querySelectorAll<HTMLElement>(".btn[data-lean]").forEach((el) => {
          if (el !== m) {
            el.style.removeProperty("--mx");
            el.style.removeProperty("--my");
            el.removeAttribute("data-lean");
          }
        });
        if (m) {
          const r = m.getBoundingClientRect();
          m.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
          m.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.28}px`);
          m.setAttribute("data-lean", "");
        }

        const hot = (e.target as Element | null)?.closest("a, button, summary, [data-cursor]");
        dot?.toggleAttribute("data-hot", !!hot);
        // In a text field the native text cursor takes over.
        const typing = !!(e.target as Element | null)?.closest("input, textarea, select");
        dot?.toggleAttribute("data-on", !typing);
      };
      const onLeave = () => {
        dot?.removeAttribute("data-on");
        html.classList.remove("fx-cursor");
        seen = false;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(raf);
        html.classList.remove("fx-cursor");
      });
    }

    // Focus rings only for keyboard users: after a click (or when focus returns to the
    // "Indice" button) a ring on top of the border reads as a doubled outline.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") document.documentElement.classList.add("kbd-nav");
    };
    const onPointer = () => document.documentElement.classList.remove("kbd-nav");
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, { passive: true });
    cleanups.push(() => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div ref={ring} aria-hidden className="fx-ring" />;
}
