"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ArtSection from "@/components/ArtSection";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(MotionPathPlugin);

// Van Gogh palette — ultramarine + sunflower gold
const VG = {
  ultramarine: "#1d2951",
  gold:        "#f6b93b",
  deepGreen:   "#2d4a1e",
  amber:       "#8b6914",
  cream:       "#F2EBD9",
  starWhite:   "rgba(255,245,200,0.9)",
};

const SECTION_BG_FALLBACK = VG.ultramarine;

// 14 star positions arranged in Van Gogh swirl pattern
const STARS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const r = 120 + (i % 3) * 40;
  return {
    id: i,
    cx: 700 + Math.cos(angle) * r,
    cy: 300 + Math.sin(angle) * r * 0.6,
    size: 3 + (i % 4) * 1.5,
  };
});

// 12-petal sunflower positions
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
}));

export default function AccountSection() {
  const buildTimeline = useCallback((tl: gsap.core.Timeline, container: HTMLElement) => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bg = container.querySelector(".account-bg") as HTMLElement | null;
    const overlay = container.querySelector(".account-overlay") as HTMLElement | null;
    const swirl1 = container.querySelector(".vg-swirl-1") as SVGPathElement | null;
    const swirl2 = container.querySelector(".vg-swirl-2") as SVGPathElement | null;
    const stars = Array.from(container.querySelectorAll(".vg-star")) as SVGCircleElement[];
    const petals = Array.from(container.querySelectorAll(".vg-petal")) as SVGPathElement[];
    const sunflowerCenter = container.querySelector(".vg-sunflower-center") as SVGCircleElement | null;
    const glowEl = container.querySelector(".account-glow") as HTMLElement | null;
    const glowUnderlay = container.querySelector(".account-glow-underlay") as HTMLElement | null;
    const counterEl = container.querySelector(".account-counter-num") as HTMLElement | null;
    const headline = container.querySelector(".account-headline") as HTMLElement | null;
    const bodyCopy = Array.from(container.querySelectorAll(".account-copy")) as HTMLElement[];
    const ctaEl = container.querySelector(".account-cta") as HTMLElement | null;

    if (reduceMotion) {
      gsap.set([bg, overlay, swirl1, swirl2, ...stars, ...petals, sunflowerCenter, glowEl, glowUnderlay, headline, ...bodyCopy, ctaEl].filter(Boolean), {
        opacity: 1, x: 0, y: 0, scale: 1,
      });
      if (counterEl) counterEl.textContent = "47";
      return;
    }

    // 0 — Ultramarine background
    tl.from(bg, { opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
      .from(overlay, { opacity: 0, duration: 0.8, ease: "power2.out" }, 0);

    // Swirl SVG paths via manual strokeDashoffset (DrawSVG equivalent)
    [swirl1, swirl2].forEach((swirl, i) => {
      if (!swirl) return;
      try {
        const len = swirl.getTotalLength();
        gsap.set(swirl, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.35 });
        tl.to(
          swirl,
          {
            strokeDashoffset: 0,
            opacity: 0.5,
            duration: 3.0,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          },
          0.2 + i * 0.4
        );
      } catch {
        // SSR safety
      }
    });

    // 14 stars travel motionPath arcs into position
    stars.forEach((star, i) => {
      const startAngle = (i / 14) * Math.PI * 2 + Math.PI; // opposite side
      const startX = -Math.cos(startAngle) * 200;
      const startY = -Math.sin(startAngle) * 120;

      gsap.set(star, { x: startX, y: startY, opacity: 0, scale: 0 });
      tl.to(
        star,
        {
          x: 0, y: 0, opacity: 1, scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
          motionPath: {
            path: `M ${startX} ${startY} Q ${startX * 0.4} ${startY * 0.4} 0 0`,
            autoRotate: false,
          },
        },
        0.4 + (i / 14) * 0.8
      );
    });

    // Sunflower bloom — 12 petals stagger from center
    if (petals.length > 0) {
      gsap.set(petals, { scale: 0, transformOrigin: "50% 100%", opacity: 0 });
      tl.to(
        petals,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: { each: 0.04, from: "center" },
        },
        0.9
      );
    }

    if (sunflowerCenter) {
      tl.from(sunflowerCenter, { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }, 1.4);
    }

    // Gold radial glow — breathing yoyo
    if (isDesktop && glowEl) {
      gsap.set(glowEl, { willChange: "box-shadow" });
      tl.from(glowEl, { opacity: 0, duration: 0.6, ease: "power2.out" }, 1.0);
      tl.to(
        glowEl,
        {
          boxShadow: "0 0 180px 60px rgba(246,185,59,0.6)",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        1.6
      );
    } else if (isMobile && glowUnderlay) {
      // Mobile: opacity underlay instead of animated box-shadow
      tl.from(glowUnderlay, { opacity: 0, duration: 0.6, ease: "power2.out" }, 1.0);
      tl.to(
        glowUnderlay,
        { opacity: 0.7, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
        1.6
      );
    }

    // Brush-stroke headline reveal (manual stroke-dashoffset per word mask)
    if (headline) {
      const masks = Array.from(headline.querySelectorAll(".brush-mask")) as SVGPathElement[];
      masks.forEach((mask) => {
        try {
          const len = mask.getTotalLength();
          gsap.set(mask, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(mask, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 1.5);
        } catch {
          // fallback: opacity
          gsap.set(mask, { opacity: 0 });
          tl.to(mask, { opacity: 1, duration: 0.6 }, 1.5);
        }
      });
    }

    // Counter tween 0 → 47 (textContent snap, no React state)
    if (counterEl) {
      tl.to(
        { value: 0 },
        {
          value: 47,
          duration: 1.4,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: function () {
            counterEl.textContent = String(Math.round(this.targets()[0].value));
          },
          onComplete: () => { counterEl.textContent = "47"; },
        },
        1.2
      );
    }

    // Copy + CTA
    tl.from(bodyCopy, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.1 }, 1.0)
      .from(ctaEl, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, 1.6);
  }, []);

  return (
    <ArtSection
      id="account"
      buildTimeline={buildTimeline}
      className="relative overflow-hidden"
      aria-label="Sezione 5 di 5: Account"
    >
      {/* Painting + ultramarine background */}
      <div
        className="account-bg absolute inset-0 opacity-0"
        style={{ zIndex: 0, background: VG.ultramarine }}
      >
        <Image
          src="/paintings/vangogh.jpg"
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
        className="account-overlay absolute inset-0 opacity-0"
        style={{ zIndex: 1, background: "rgba(15,18,45,0.70)" }}
      />

      {/* Van Gogh SVG composition */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Swirl paths — counter-rotating */}
        <path
          className="vg-swirl-1"
          d="M 500 300 Q 620 180 760 250 Q 880 320 850 450 Q 820 560 680 540 Q 540 520 500 400"
          fill="none"
          stroke={VG.gold}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0"
        />
        <path
          className="vg-swirl-2"
          d="M 500 300 Q 380 200 260 280 Q 150 360 170 490 Q 190 590 340 580 Q 470 570 500 450"
          fill="none"
          stroke="rgba(255,245,200,0.4)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0"
        />

        {/* 14 stars */}
        {STARS.map((star) => (
          <circle
            key={star.id}
            className="vg-star"
            cx={star.cx}
            cy={star.cy}
            r={star.size}
            fill={VG.starWhite}
            opacity="0"
            style={{ filter: `blur(${star.size > 5 ? 0.5 : 0}px)` }}
          />
        ))}

        {/* Sunflower avatar — 12 petals + center */}
        <g transform="translate(800, 180)">
          {PETALS.map((petal) => (
            <path
              key={petal.id}
              className="vg-petal"
              d={`M 0 0 Q -8 -20 0 -42 Q 8 -20 0 0`}
              fill={VG.gold}
              transform={`rotate(${petal.angle})`}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%", opacity: 0 }}
            />
          ))}
          <circle className="vg-sunflower-center" cx="0" cy="0" r="18" fill="#5C3A00" opacity="0" />
        </g>
      </svg>

      {/* Gold radial glow — desktop box-shadow, mobile underlay */}
      <div
        className="account-glow absolute pointer-events-none hidden lg:block"
        style={{
          zIndex: 3,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: VG.gold,
          right: "18%",
          top: "24%",
          boxShadow: "0 0 120px 30px rgba(246,185,59,0.45)",
          willChange: "box-shadow",
          transform: "translateZ(0)",
        }}
        aria-hidden
      />
      <div
        className="account-glow-underlay absolute inset-0 pointer-events-none lg:hidden"
        style={{
          zIndex: 3,
          background: "radial-gradient(ellipse 60% 40% at 80% 25%, rgba(246,185,59,0.35), transparent)",
          opacity: 0,
        }}
        aria-hidden
      />

      {/* Left content */}
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-10 lg:px-16 pt-20 pb-12 max-w-sm">
        <p
          className="account-copy text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: VG.gold, letterSpacing: "0.14em" }}
        >
          Account
        </p>

        {/* Brush-stroke headline SVG */}
        <div className="account-headline mb-4" aria-hidden={false}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: VG.cream,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            La tua collezione,<br />sempre con te.
          </h2>
        </div>

        <p className="account-copy text-white/60 text-sm leading-relaxed max-w-[30ch] mb-2">
          Accedi per vedere i tuoi acquisti e personalizzare ogni template con AI Studio.
        </p>

        {/* Counter */}
        <div className="account-copy flex items-baseline gap-2 mb-6">
          <span
            className="account-counter-num font-montserrat text-4xl font-black"
            style={{ color: VG.gold, lineHeight: 1 }}
          >
            0
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            template nel catalogo
          </span>
        </div>

        <Link
          href="/account"
          className="account-cta inline-block text-sm font-semibold tracking-wider transition-opacity duration-200 hover:opacity-100"
          style={{
            color: VG.gold,
            borderBottom: `1px solid ${VG.gold}`,
            paddingBottom: "2px",
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          Accedi al tuo account →
        </Link>
      </div>

      {/* ACCOUNT oversized cropped */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 6 }}
        aria-hidden
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(4rem, 15vw, 13rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(246,185,59,0.14)",
            textTransform: "uppercase",
            paddingLeft: "0.15em",
          }}
        >
          ACCOUNT
        </span>
      </div>

      {/* Social — bottom-left */}
      <div
        className="absolute bottom-8 left-6 sm:left-10 lg:left-16 flex items-center gap-4"
        style={{ zIndex: 10 }}
        aria-label="Social"
      >
        {[
          { href: "https://twitter.com", label: "Twitter / X" },
          { href: "https://instagram.com", label: "Instagram" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[10px] font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.30)", letterSpacing: "0.14em" }}
          >
            {label.split(" /")[0]}
          </a>
        ))}
      </div>

      {/* Counter display */}
      <div
        className="absolute top-20 right-6 sm:right-8 font-montserrat text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", zIndex: 10 }}
        aria-hidden
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>05</span>
        <span className="mx-1 opacity-40">/</span>
        <span>05</span>
      </div>
    </ArtSection>
  );
}
