"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS: string[] = ["hero", "catalogo", "guida", "studio", "account"];
const LABELS = ["01 / 05", "02 / 05", "03 / 05", "04 / 05", "05 / 05"];

export default function ScrollIndicator() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scroller.current = document.getElementById("forma-snap-container") as HTMLElement;
    const container = scroller.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio >= 0.5) setActive(i);
          });
        },
        { root: container, threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const container = document.getElementById("forma-snap-container");
    const el = document.getElementById(id);
    if (!container || !el) return;
    container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: "SCROLL DOWN" vertical text + dots, left side */}
      <nav
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4"
        aria-label="Section navigation"
      >
        <span
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll Down
        </span>
        <div className="flex flex-col items-center gap-3 mt-2">
          {SECTIONS.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Sezione ${i + 1} di 5`}
              aria-current={active === i ? "page" : undefined}
              className="group relative flex items-center justify-center w-5 h-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: active === i ? "8px" : "4px",
                  height: active === i ? "8px" : "4px",
                  background: active === i ? "var(--accent)" : "rgba(255,255,255,0.4)",
                  boxShadow: active === i ? "0 0 8px var(--accent)" : "none",
                }}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile: dots, right side */}
      <nav
        className="lg:hidden fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label="Section navigation"
      >
        {SECTIONS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Sezione ${i + 1} di 5`}
            aria-current={active === i ? "page" : undefined}
            className="flex items-center justify-center w-6 h-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active === i ? "7px" : "4px",
                height: active === i ? "7px" : "4px",
                background: active === i ? "var(--accent)" : "rgba(255,255,255,0.35)",
              }}
            />
          </button>
        ))}
      </nav>

      {/* aria-live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {LABELS[active]}
      </div>
    </>
  );
}
