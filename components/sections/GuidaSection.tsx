"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(SplitText);

// Monet palette — extracted from Nymphéas
const MONET_ACCENT = "#7a9e60"; // lily green
const SECTION_BG_FALLBACK = "#1e2d3b"; // deep water blue-green

export default function GuidaSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bg = container.querySelector(".guida-bg") as HTMLElement | null;
    const overlay = container.querySelector(".guida-overlay") as HTMLElement | null;
    const featureImg = container.querySelector(".guida-feature-img") as HTMLElement | null;
    const layers = Array.from(container.querySelectorAll(".guida-layer")) as HTMLElement[];
    const copyEls = Array.from(container.querySelectorAll(".guida-copy")) as HTMLElement[];
    const ctaEl = container.querySelector(".guida-cta") as HTMLElement | null;
    const headline = container.querySelector(".guida-headline") as HTMLElement | null;
    const turbEl = container.querySelector("feTurbulence") as SVGFETurbulenceElement | null;

    if (reduceMotion) {
      gsap.set([bg, overlay, featureImg, ...layers, ...copyEls, ctaEl, headline].filter(Boolean), {
        opacity: 1, y: 0, x: 0,
      });
      return;
    }

    // 0.8s — background fade
    tl.from(bg, { opacity: 0, duration: 0.8, ease: "power1.inOut" }, 0)
      .from(overlay, { opacity: 0, duration: 0.8, ease: "power1.inOut" }, 0);

    // Feature image reveal + SVG turbulence animation (desktop only)
    if (featureImg) {
      tl.from(featureImg, { opacity: 0, scale: 1.04, duration: 1.2, ease: "power1.inOut" }, 0.3);

      if (isDesktop && turbEl) {
        // Animate feTurbulence baseFrequency: calm → ripple → loop
        // Using gsap attr plugin — works with SVG attributes
        tl.to(
          turbEl,
          {
            attr: { baseFrequency: "0.018 0.04" },
            duration: 2.1,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 1,
          },
          1.2
        );
      }
    }

    // 4-layer parallax (reduce to 2 on mobile)
    const layerCount = isMobile ? Math.min(2, layers.length) : layers.length;
    const layerSpeeds = [8, 5, 3, 2]; // seconds per drift cycle
    const layerDists = [20, 14, 8, 5]; // y-distance in px

    layers.slice(0, layerCount).forEach((layer, i) => {
      tl.from(layer, { opacity: 0, y: 30, duration: 0.9, ease: "power1.inOut" }, 0.4 + i * 0.15);
      // Slow ambient drift after reveal
      tl.to(
        layer,
        {
          y: `-=${layerDists[i]}`,
          duration: layerSpeeds[i],
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        1.5 + i * 0.2
      );
    });

    // SplitText body copy — power1.inOut, line-mask reveal
    if (copyEls.length > 0) {
      const splits = copyEls.map(
        (el) => new SplitText(el, { type: "lines, words", mask: "lines" })
      );
      const allLines = splits.flatMap((s) => s.lines);

      tl.from(
        allLines,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.9,
          ease: "power1.inOut",
          stagger: 0.06,
          onComplete: () => splits.forEach((s) => s.revert()),
        },
        0.8
      );
    }

    // CTA
    if (ctaEl) tl.from(ctaEl, { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, 1.4);

    // Desktop mouse parallax on feature img
    if (isDesktop && featureImg) {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        gsap.to(featureImg, {
          x: (clientX - cx) * 0.015,
          y: (clientY - cy) * 0.01,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      container.addEventListener("mousemove", onMouseMove);
      // Cleanup handled by GSAP context via useGSAP scope
    }
  }, []);

  return (
    <ArtSection
      id="guida"
      buildTimeline={buildTimeline}
      className="relative overflow-hidden"
      aria-label="Sezione 3 di 5: Guida"
    >
      {/* SVG filter for Monet ripple effect */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden>
        <defs>
          <filter id="monet-ripple" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.025"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Painting background */}
      <div className="guida-bg absolute inset-0 opacity-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image
          src="/paintings/monet.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
          aria-hidden
          onError={() => {}}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="guida-overlay absolute inset-0 opacity-0"
        style={{ zIndex: 1, background: "rgba(10,18,26,0.65)" }}
      />

      {/* Parallax layer 0 — deep water shimmer */}
      <div
        className="guida-layer absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(74,103,65,0.18), transparent)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        aria-hidden
      />

      {/* Parallax layer 1 — lily pad clip-path */}
      <div
        className="guida-layer absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          zIndex: 3,
          background: "radial-gradient(ellipse 80% 40% at 30% 70%, rgba(74,103,65,0.22), transparent)",
          clipPath: "ellipse(60% 30% at 30% 75%)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        aria-hidden
      />

      {/* Feature image — Monet ripple filtered */}
      <div
        className="guida-feature-img absolute hidden lg:block opacity-0 pointer-events-none"
        style={{
          right: "8%",
          top: "50%",
          transform: "translateY(-50%) translateZ(0)",
          width: "480px",
          height: "320px",
          zIndex: 4,
          willChange: "transform",
          filter: "url(#monet-ripple)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
        aria-hidden
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="text-white/20 text-sm font-light tracking-widest uppercase">
            Guida all'uso
          </span>
        </div>
      </div>

      {/* Parallax layer 2 — reflection sheen */}
      <div
        className="guida-layer absolute inset-x-0 bottom-0 pointer-events-none hidden lg:block"
        style={{
          zIndex: 5,
          height: "30%",
          background: "linear-gradient(to top, rgba(74,103,65,0.15), transparent)",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 lg:pb-16 max-w-lg">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: MONET_ACCENT, letterSpacing: "0.14em" }}
        >
          Guida
        </p>

        <h2
          className="guida-copy text-white font-light leading-snug mb-4 overflow-hidden"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Ogni template è un punto di partenza.
        </h2>

        <p className="guida-copy text-white/65 text-sm sm:text-base leading-relaxed max-w-[32ch] overflow-hidden">
          La guida ti mostra come usarli, personalizzarli e renderli tuoi — in pochi minuti.
        </p>

        <Link
          href="/guida"
          className="guida-cta inline-block mt-6 text-sm font-semibold tracking-wider transition-opacity duration-200 hover:opacity-100"
          style={{
            color: MONET_ACCENT,
            borderBottom: `1px solid ${MONET_ACCENT}`,
            paddingBottom: "2px",
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          Inizia il percorso →
        </Link>

        {/* Parallax content card layer */}
        <div
          className="guida-layer mt-8 hidden sm:block"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "16px",
            borderRadius: "2px",
            backdropFilter: "blur(6px)",
            maxWidth: "280px",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <p className="text-white/50 text-[11px] font-semibold tracking-widest uppercase mb-2">
            In questa guida
          </p>
          {["Scegli il template", "Personalizza con AI", "Esporta e usa"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold" style={{ color: MONET_ACCENT }}>0{i + 1}</span>
              <span className="text-white/60 text-xs">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GUIDA oversized cropped */}
      <div
        className="guida-headline absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 6 }}
        aria-hidden
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(5rem, 18vw, 16rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.10)",
            textTransform: "uppercase",
            paddingLeft: "0.15em",
            opacity: 0,
          }}
        >
          GUIDA
        </span>
      </div>

      {/* Counter */}
      <div
        className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>03</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}
