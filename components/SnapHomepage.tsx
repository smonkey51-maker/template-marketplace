"use client";

import { useEffect, useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import CatalogoSection from "@/components/sections/CatalogoSection";
import GuidaSection from "@/components/sections/GuidaSection";
import StudioSection from "@/components/sections/StudioSection";
import AccountSection from "@/components/sections/AccountSection";
import SectionNav from "@/components/sections/SectionNav";
import ScrollIndicator from "@/components/sections/ScrollIndicator";
import GallerySpotlight from "@/components/sections/GallerySpotlight";

const SECTION_LABELS = [
  "Sezione 1 di 5: Home",
  "Sezione 2 di 5: Catalogo",
  "Sezione 3 di 5: Guida",
  "Sezione 4 di 5: Studio",
  "Sezione 5 di 5: Account",
];

const PAINTING_INFO: Record<string, string> = {
  catalogo: "Georges Seurat — Un dimanche après-midi, 1886",
  guida:    "Claude Monet — Nymphéas, 1906",
  studio:   "Wassily Kandinsky — Composition VIII, 1923",
  account:  "Vincent van Gogh — La Notte stellata, 1889",
};

export default function SnapHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Long-press easter egg: painting info tooltip
    let pressTimer: ReturnType<typeof setTimeout>;
    let tooltipEl: HTMLDivElement | null = null;

    const onTouchStart = (e: TouchEvent) => {
      const section = (e.target as Element).closest(".forma-section") as HTMLElement | null;
      if (!section || !PAINTING_INFO[section.id]) return;

      pressTimer = setTimeout(() => {
        if (tooltipEl) tooltipEl.remove();
        tooltipEl = document.createElement("div");
        tooltipEl.textContent = PAINTING_INFO[section.id];
        Object.assign(tooltipEl.style, {
          position: "fixed",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(6,6,6,0.88)",
          color: "rgba(242,235,217,0.9)",
          padding: "8px 16px",
          fontSize: "11px",
          fontFamily: "var(--font-jakarta, sans-serif)",
          letterSpacing: "0.06em",
          borderRadius: "2px",
          zIndex: "9999",
          pointerEvents: "none",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(212,175,55,0.2)",
          maxWidth: "90vw",
          textAlign: "center",
          transition: "opacity 0.4s ease",
          opacity: "1",
        });
        document.body.appendChild(tooltipEl);
        setTimeout(() => {
          if (tooltipEl) {
            tooltipEl.style.opacity = "0";
            setTimeout(() => { tooltipEl?.remove(); tooltipEl = null; }, 400);
          }
        }, 2000);
      }, 600);
    };

    const onTouchEnd = () => clearTimeout(pressTimer);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });

    // ── Parallax: paintings trail the content, so they read as further away.
    // Each layer is overscanned 7% top and bottom (see .parallax-layer), so a
    // shift of up to ±PARALLAX_RATIO of a viewport never exposes an edge.
    const PARALLAX_RATIO = 0.06;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(container.querySelectorAll(".parallax-layer")) as HTMLElement[];
    let parallaxFrame = 0;

    const applyParallax = () => {
      parallaxFrame = 0;
      const scrollTop = container.scrollTop;
      for (const layer of layers) {
        const section = layer.closest(".forma-section") as HTMLElement | null;
        if (!section) continue;
        // 0 when the section is exactly in view; ±1 one viewport away.
        const progress = (scrollTop - section.offsetTop) / container.clientHeight;
        if (Math.abs(progress) > 1.2) continue; // off-screen, skip the write
        const shift = progress * container.clientHeight * PARALLAX_RATIO;
        layer.style.setProperty("--parallax", `${shift.toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (parallaxFrame) return;
      parallaxFrame = requestAnimationFrame(applyParallax);
    };

    if (!reduceMotion && layers.length) {
      container.addEventListener("scroll", onScroll, { passive: true });
      applyParallax();
    }

    // IntersectionObserver for aria-live announcements
    const sections = Array.from(container.querySelectorAll(".forma-section")) as HTMLElement[];
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, i) => {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRatio >= 0.5 && liveRef.current) {
            liveRef.current.textContent = SECTION_LABELS[i];
          }
        },
        { root: container, threshold: 0.5 }
      );
      obs.observe(section);
      observers.push(obs);
    });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      container.removeEventListener("scroll", onScroll);
      if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
      clearTimeout(pressTimer);
      if (tooltipEl) tooltipEl.remove();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <>
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        Vai al catalogo
      </a>

      <GallerySpotlight />
      <SectionNav />
      <ScrollIndicator />

      <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />

      <div
        id="forma-snap-container"
        ref={containerRef}
        style={{
          height: "100svh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          overscrollBehaviorY: "contain",
        }}
      >
        <HeroSection />
        <CatalogoSection />
        <GuidaSection />
        <StudioSection />
        <AccountSection />
      </div>
    </>
  );
}
