"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function SnapHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Point ScrollTrigger at the snap container (not window)
    ScrollTrigger.defaults({ scroller: container });
    ScrollTrigger.refresh();

    // Long-press easter egg: reveal painting info tooltip
    const PAINTING_INFO: Record<string, string> = {
      catalogo: "Georges Seurat — Un dimanche après-midi, 1886",
      guida:    "Claude Monet — Nymphéas, 1906",
      studio:   "Wassily Kandinsky — Composition VIII, 1923",
      account:  "Vincent van Gogh — La Notte stellata, 1889",
    };

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
        });
        document.body.appendChild(tooltipEl);
        setTimeout(() => {
          if (tooltipEl) {
            gsap.to(tooltipEl, { opacity: 0, duration: 0.4, onComplete: () => tooltipEl?.remove() });
            tooltipEl = null;
          }
        }, 2000);
      }, 600);
    };

    const onTouchEnd = () => clearTimeout(pressTimer);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });

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
      clearTimeout(pressTimer);
      if (tooltipEl) tooltipEl.remove();
      observers.forEach((o) => o.disconnect());
      ScrollTrigger.defaults({ scroller: window });
    };
  }, []);

  return (
    <>
      {/* Skip-to-content (inherited from layout, but also at snap level) */}
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        Vai al catalogo
      </a>

      {/* Gallery spotlight — gold radial gradient follows cursor/touch */}
      <GallerySpotlight />

      {/* Fixed overlay nav (logo + tabs + hamburger) */}
      <SectionNav />

      {/* Section dot indicator */}
      <ScrollIndicator />

      {/* aria-live region */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Snap scroll container */}
      <div
        id="forma-snap-container"
        ref={containerRef}
        style={{
          height: "100svh",
          overflowY: "scroll",
          overflowX: "hidden",    // contain out-of-box card bleed
          scrollSnapType: "y mandatory",
          overscrollBehaviorY: "contain",
        }}
        // Keyboard: PgUp/PgDn/arrows work natively with scroll-snap
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
