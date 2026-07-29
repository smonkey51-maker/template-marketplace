"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import HeroSection from "@/components/sections/HeroSection";
import CatalogoSection from "@/components/sections/CatalogoSection";
import GuidaSection from "@/components/sections/GuidaSection";
import StudioSection from "@/components/sections/StudioSection";
import AccountSection from "@/components/sections/AccountSection";
import SectionNav from "@/components/sections/SectionNav";
import GallerySpotlight from "@/components/sections/GallerySpotlight";

function ScrollDot({ i, scrollYProgress }: { i: number; scrollYProgress: any }) {
  const start = i * 0.25 - 0.1;
  const center = i * 0.25;
  const end = i * 0.25 + 0.1;
  const isActive = useTransform(scrollYProgress, [start, center, end], [0, 1, 0]);

  return (
    <button
      onClick={() => window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" })}
      className="group relative flex items-center justify-center w-5 h-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
    >
      <motion.span
        className="block rounded-full"
        style={{
          width: useTransform(isActive, (v) => (v > 0.5 ? "8px" : "4px")),
          height: useTransform(isActive, (v) => (v > 0.5 ? "8px" : "4px")),
          background: useTransform(isActive, (v) =>
            v > 0.5 ? "var(--accent)" : "rgba(255,255,255,0.4)",
          ),
          boxShadow: useTransform(isActive, (v) => (v > 0.5 ? "0 0 8px var(--accent)" : "none")),
        }}
      />
    </button>
  );
}

export default function CinematicHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Se non siamo su desktop, facciamo un fallback fluido senza sticky pesanti
  if (!isDesktop) {
    return (
      <div
        id="forma-snap-container"
        className="relative flex flex-col"
        style={{ overflowX: "hidden" }}
      >
        <GallerySpotlight />
        <SectionNav />
        <div id="trigger-hero">
          <HeroSection />
        </div>
        <div id="trigger-catalogo">
          <CatalogoSection />
        </div>
        <div id="trigger-guida">
          <GuidaSection />
        </div>
        <div id="trigger-studio">
          <StudioSection />
        </div>
        <div id="trigger-account">
          <AccountSection />
        </div>
      </div>
    );
  }

  // --- ANIMAZIONI CINEMATICHE (DESKTOP) ---

  // Hero (0% - 25%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const heroPointer = useTransform(scrollYProgress, [0, 0.2], ["auto", "none"]);

  // Catalogo (15% - 50%)
  const catOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const catScale = useTransform(scrollYProgress, [0.15, 0.25, 0.5], [1.05, 1, 0.95]);
  const catPointer = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.4, 0.5],
    ["none", "auto", "auto", "none"],
  );

  // Guida (40% - 75%)
  const guiOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const guiScale = useTransform(scrollYProgress, [0.4, 0.5, 0.75], [1.05, 1, 0.95]);
  const guiPointer = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.75],
    ["none", "auto", "auto", "none"],
  );

  // Studio (65% - 90%)
  const stuOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.92], [0, 1, 1, 0]);
  const stuScale = useTransform(scrollYProgress, [0.65, 0.75, 0.92], [1.05, 1, 0.95]);
  const stuPointer = useTransform(
    scrollYProgress,
    [0.65, 0.75, 0.85, 0.92],
    ["none", "auto", "auto", "none"],
  );

  // Account (85% - 100%)
  const accOpacity = useTransform(scrollYProgress, [0.85, 0.92, 1], [0, 1, 1]);
  const accScale = useTransform(scrollYProgress, [0.85, 0.92, 1], [1.05, 1, 1]);
  const accPointer = useTransform(scrollYProgress, [0.85, 0.92], ["none", "auto"]);

  return (
    // <main> rather than <div>: every page needs one main landmark so screen
    // readers can skip past the nav straight to the content. This page had none.
    <main ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      <GallerySpotlight />
      <SectionNav />

      {/* Desktop Cinematic Scroll Indicator */}
      <nav className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4">
        <span
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll Down
        </span>
        <div className="flex flex-col items-center gap-3 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <ScrollDot key={i} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </nav>

      {/* Pinned Cinematic Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Layer 1: Hero */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointer as any }}
          className="absolute inset-0 origin-center"
        >
          <HeroSection />
        </motion.div>

        {/* Layer 2: Catalogo */}
        <motion.div
          style={{ opacity: catOpacity, scale: catScale, pointerEvents: catPointer as any }}
          className="absolute inset-0 origin-center"
        >
          <CatalogoSection />
        </motion.div>

        {/* Layer 3: Guida */}
        <motion.div
          style={{ opacity: guiOpacity, scale: guiScale, pointerEvents: guiPointer as any }}
          className="absolute inset-0 origin-center"
        >
          <GuidaSection />
        </motion.div>

        {/* Layer 4: Studio */}
        <motion.div
          style={{ opacity: stuOpacity, scale: stuScale, pointerEvents: stuPointer as any }}
          className="absolute inset-0 origin-center"
        >
          <StudioSection />
        </motion.div>

        {/* Layer 5: Account */}
        <motion.div
          style={{ opacity: accOpacity, scale: accScale, pointerEvents: accPointer as any }}
          className="absolute inset-0 origin-center"
        >
          <AccountSection />
        </motion.div>
      </div>

      {/* Invisible triggers for CSS intersection observer animations (ArtSection) */}
      <div
        id="trigger-hero"
        style={{
          position: "absolute",
          top: "0",
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        id="trigger-catalogo"
        style={{
          position: "absolute",
          top: "100vh",
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        id="trigger-guida"
        style={{
          position: "absolute",
          top: "200vh",
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        id="trigger-studio"
        style={{
          position: "absolute",
          top: "300vh",
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        id="trigger-account"
        style={{
          position: "absolute",
          top: "400vh",
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
    </main>
  );
}
