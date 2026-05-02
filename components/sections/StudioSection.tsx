"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(Flip, MotionPathPlugin);

// Kandinsky palette — Composition VIII
const K = {
  yellow:  "#F5C519",
  red:     "#CF2B3A",
  blue:    "#1B4B8A",
  violet:  "#6B3FA0",
  black:   "#1C1C1C",
  cream:   "#F2EBD9",
};

const SECTION_BG_FALLBACK = "#0d1520";

export default function StudioSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bg = container.querySelector(".studio-bg") as HTMLElement | null;
    const overlay = container.querySelector(".studio-overlay") as HTMLElement | null;
    const shapes = Array.from(container.querySelectorAll(".k-shape")) as SVGGraphicsElement[];
    const uiCta = container.querySelector(".studio-ui-cta") as HTMLElement | null;
    const uiGrid = container.querySelector(".studio-ui-grid") as HTMLElement | null;
    const uiSidebar = container.querySelector(".studio-ui-sidebar") as HTMLElement | null;
    const uiAvatar = container.querySelector(".studio-ui-avatar") as HTMLElement | null;
    const textarea = container.querySelector(".studio-textarea") as HTMLElement | null;
    const bodyCopy = Array.from(container.querySelectorAll(".studio-copy")) as HTMLElement[];
    const headline = container.querySelector(".studio-headline") as HTMLElement | null;

    if (reduceMotion) {
      gsap.set([bg, overlay, ...shapes, uiCta, uiGrid, uiSidebar, uiAvatar, textarea, ...bodyCopy, headline].filter(Boolean), {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
      });
      return;
    }

    // Background
    tl.from(bg, { opacity: 0, duration: 0.7, ease: "power2.out" }, 0)
      .from(overlay, { opacity: 0, duration: 0.7, ease: "power2.out" }, 0);

    // Kandinsky shapes burst-in via MotionPath arcs — back.out(2.2) overshoot
    const shapeConfigs = [
      { selector: ".k-triangle",   startX: -300, startY: -150, rot: -45 },
      { selector: ".k-circle-1",   startX:  300, startY: -200, rot:   0 },
      { selector: ".k-circle-2",   startX: -200, startY:  200, rot:  20 },
      { selector: ".k-diagonal",   startX:  250, startY:  150, rot:  30 },
      { selector: ".k-disc",       startX: -250, startY: -100, rot: -30 },
      { selector: ".k-line",       startX:  200, startY: -180, rot:  15 },
      { selector: ".k-checker",    startX: -180, startY:  180, rot: -20 },
      { selector: ".k-arc",        startX:  150, startY:  200, rot:  45 },
    ];

    shapeConfigs.forEach(({ selector, startX, startY, rot }, i) => {
      const el = container.querySelector(selector) as SVGGraphicsElement | null;
      if (!el) return;
      gsap.set(el, { x: startX, y: startY, rotation: rot, opacity: 0, scale: 0.3 });
      tl.to(
        el,
        {
          x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
          duration: 0.75,
          ease: "back.out(2.2)",
          motionPath: {
            path: `M ${startX} ${startY} Q ${startX * 0.3} ${startY * 0.3} 0 0`,
            autoRotate: false,
          },
        },
        0.2 + i * 0.07
      );
    });

    // Stroke-line entries (DrawSVG equivalent — manual dashoffset)
    const strokeEls = Array.from(container.querySelectorAll(".k-stroke-path")) as SVGPathElement[];
    strokeEls.forEach((path) => {
      try {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0.5);
      } catch {
        // getTotalLength unavailable in SSR — silently skip
      }
    });

    // Freeze 150ms after shapes arrive
    tl.addPause("+=0.15");

    // Desktop Flip reparent: shapes morph into UI roles
    if (isDesktop) {
      const triangle = container.querySelector(".k-triangle") as SVGGraphicsElement | null;
      const disc = container.querySelector(".k-disc") as SVGGraphicsElement | null;

      if (triangle && uiCta) {
        const state = Flip.getState(triangle);
        uiCta.appendChild(triangle);
        tl.add(
          Flip.from(state, {
            duration: 0.9,
            ease: "power2.inOut",
            absolute: true,
          }),
          "+=0"
        );
      }

      if (disc && uiAvatar) {
        const state2 = Flip.getState(disc);
        uiAvatar.appendChild(disc);
        tl.add(
          Flip.from(state2, {
            duration: 0.9,
            ease: "power2.inOut",
            absolute: true,
          }),
          "<0.07"
        );
      }
    } else {
      // Mobile lite: simple tweens to fixed positions
      const mobileTargets = [uiCta, uiGrid, uiSidebar, uiAvatar].filter(Boolean);
      tl.from(mobileTargets, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out", stagger: 0.08 }, 1.0);
    }

    // UI panel reveal
    tl.from([uiCta, uiGrid, uiSidebar, uiAvatar].filter(Boolean), {
      opacity: 0, scale: 0.95,
      duration: 0.6, ease: "power2.out",
      stagger: 0.06,
    }, isDesktop ? 1.6 : 1.2);

    // Textarea placeholder typing animation
    if (textarea) {
      const placeholder = textarea.querySelector(".studio-placeholder") as HTMLElement | null;
      if (placeholder) {
        const text = "Genera un template per…";
        placeholder.textContent = "";
        tl.to(
          {},
          {
            duration: text.length * 0.04,
            ease: "none",
            onUpdate: function () {
              const chars = Math.floor(this.progress() * text.length);
              placeholder.textContent = text.slice(0, chars);
            },
          },
          isDesktop ? 1.8 : 1.4
        );
        // Cursor blink
        tl.fromTo(
          placeholder,
          { borderRight: "2px solid rgba(212,175,55,0.8)" },
          { opacity: 0.3, duration: 0.5, ease: "none", yoyo: true, repeat: -1 },
          isDesktop ? 2.5 : 2.0
        );
      }
    }

    // Copy + headline
    tl.from(bodyCopy, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.08 }, 0.8)
      .from(headline, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, 0.9);

    // Desktop micro-glitch on STUDIO headline — triggered separately via CSS hover,
    // but we set up the base glitch keyframes here with a tiny initial glitch
    if (isDesktop && headline) {
      tl.to(
        headline,
        { x: 2, duration: 0.05, ease: "none", yoyo: true, repeat: 3 },
        1.8
      );
    }
  }, []);

  return (
    <ArtSection
      id="studio"
      buildTimeline={buildTimeline}
      className="relative overflow-hidden"
      aria-label="Sezione 4 di 5: Studio"
    >
      {/* Painting background */}
      <div className="studio-bg absolute inset-0 opacity-0" style={{ zIndex: 0, background: SECTION_BG_FALLBACK }}>
        <Image
          src="/paintings/kandinsky.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
          aria-hidden
          onError={() => {}}
        />
      </div>
      <div
        className="studio-overlay absolute inset-0 opacity-0"
        style={{ zIndex: 1, background: "rgba(8,12,22,0.72)" }}
      />

      {/* Kandinsky SVG composition */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Triangle (→ CTA) */}
        <polygon
          className="k-shape k-triangle"
          points="200,120 260,40 320,120"
          fill={K.yellow}
          style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
        />

        {/* Concentric circles (→ thumbnail grid) */}
        <g className="k-shape k-circle-1" style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}>
          <circle cx="700" cy="150" r="60" fill="none" stroke={K.blue} strokeWidth="3" />
          <circle cx="700" cy="150" r="40" fill="none" stroke={K.blue} strokeWidth="2" opacity="0.7" />
          <circle cx="700" cy="150" r="20" fill={K.blue} opacity="0.4" />
        </g>

        <g className="k-shape k-circle-2" style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}>
          <circle cx="550" cy="450" r="35" fill="none" stroke={K.red} strokeWidth="2" />
          <circle cx="550" cy="450" r="18" fill={K.red} opacity="0.3" />
        </g>

        {/* Diagonal bar (→ sidebar) */}
        <path
          className="k-shape k-diagonal k-stroke-path"
          d="M 100 480 L 400 120"
          stroke={K.black}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
        />

        {/* Disc (→ avatar) */}
        <circle
          className="k-shape k-disc"
          cx="820" cy="420" r="45"
          fill={K.violet}
          style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
        />

        {/* Fine line */}
        <path
          className="k-shape k-line k-stroke-path"
          d="M 400 80 L 850 200"
          stroke="rgba(242,235,217,0.4)"
          strokeWidth="1.5"
          fill="none"
          style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
        />

        {/* Checker grid */}
        <g className="k-shape k-checker" style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}>
          {[0, 1, 2, 3].flatMap((row) =>
            [0, 1, 2, 3].map((col) =>
              (row + col) % 2 === 0 ? (
                <rect key={`${row}-${col}`} x={120 + col * 16} y={320 + row * 16} width="14" height="14" fill="rgba(242,235,217,0.25)" />
              ) : null
            )
          )}
        </g>

        {/* Arc */}
        <path
          className="k-shape k-arc k-stroke-path"
          d="M 600 500 Q 750 380 880 480"
          stroke={K.yellow}
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
          style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0 }}
        />
      </svg>

      {/* UI panel — abstract→concrete targets */}
      <div
        className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2"
        style={{ zIndex: 8, width: "min(340px, 90vw)" }}
      >
        {/* Sidebar target */}
        <div
          className="studio-ui-sidebar absolute -left-6 top-0 bottom-0 hidden lg:flex flex-col items-center gap-2 py-4"
          style={{ width: "4px", background: "rgba(28,28,28,0.8)", borderRadius: "2px" }}
        />

        {/* Avatar target */}
        <div
          className="studio-ui-avatar flex items-center gap-2 mb-3"
        >
          <div
            style={{
              width: "32px", height: "32px",
              borderRadius: "50%",
              background: "rgba(107,63,160,0.35)",
              border: "1px solid rgba(107,63,160,0.6)",
            }}
          />
          <span className="text-white/50 text-xs font-semibold tracking-wider">AI Studio</span>
        </div>

        {/* Pseudo-textarea */}
        <div
          className="studio-textarea"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "2px",
            padding: "12px 14px",
            marginBottom: "10px",
            minHeight: "72px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="studio-placeholder text-white/35 text-sm font-light"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          />
        </div>

        {/* CTA target */}
        <div className="studio-ui-cta">
          <Link
            href="/ai-studio"
            className="block w-full text-center py-3 px-4 text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: K.yellow,
              color: K.black,
              borderRadius: "2px",
              letterSpacing: "0.12em",
              textDecoration: "none",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Genera template
          </Link>
        </div>

        {/* Grid target */}
        <div className="studio-ui-grid grid grid-cols-3 gap-1.5 mt-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 max-w-xs sm:max-w-sm">
        <p
          className="studio-copy text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: K.yellow, letterSpacing: "0.14em" }}
        >
          AI Studio
        </p>
        <h2
          className="studio-copy text-white font-light leading-snug mb-4 overflow-hidden"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          L&apos;astrazione che diventa forma.
        </h2>
        <p className="studio-copy text-white/60 text-sm leading-relaxed max-w-[32ch]">
          Descrivi ciò che vuoi creare.<br />
          Claude genera il template in secondi.
        </p>
      </div>

      {/* STUDIO oversized + micro-glitch on hover (desktop) */}
      <div
        className="studio-headline absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden group"
        style={{ zIndex: 6 }}
        aria-hidden
      >
        <span
          className="studio-glitch-text"
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
          STUDIO
        </span>
      </div>

      {/* Counter */}
      <div
        className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>04</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}
