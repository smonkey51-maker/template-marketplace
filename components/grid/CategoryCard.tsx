"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Template } from "@/lib/templates";
import { SECTIONS, CATEGORY_IMAGES } from "@/lib/gridData";
import { t } from "@/lib/i18n";
import ScrambleText from "@/components/grid/ScrambleText";

type Lang = "it" | "en";

const KANJI_NUMS = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五"];

export function addRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  dot.style.left = `${e.clientX - rect.left}px`;
  dot.style.top = `${e.clientY - rect.top}px`;
  el.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove(), { once: true });
}

export default function CategoryCard({
  section,
  sectionTemplates,
  onClick,
  lang,
  index,
  featured = false,
}: {
  section: (typeof SECTIONS)[number];
  sectionTemplates: Template[];
  onClick: () => void;
  lang: Lang;
  index: number;
  featured?: boolean;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const frameRef  = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);
  const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];
  const imgSrc = CATEGORY_IMAGES[section.id];

  // Scroll reveal
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3-D tilt — respect reduced motion and hover capability
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const supportsHover        = typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !supportsHover) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(1)}deg) rotateY(${(x * 6).toFixed(1)}deg) scale3d(1.02,1.02,1.02)`;
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)";
    el.style.transform   = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 400);
  };

  return (
    <div
      ref={revealRef}
      className={`scroll-reveal${revealed ? " visible" : ""}`}
      style={{ transitionDelay: `${index * 45}ms` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${section.gradientFrom}88 0%, transparent 70%)` }}
      />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => { addRipple(e); onClick(); }}
        className="shoji-card group relative rounded-none overflow-hidden cursor-pointer border border-white/10 dark:border-white/8"
        style={{ willChange: "transform", height: featured ? "220px" : "172px" }}
      >
        {/* Background — Unsplash image or gradient fallback */}
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={section.id}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            priority={false}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none" style={{ fontSize: "3rem", filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.6))", opacity: 0.7 }}>
                {section.emoji}
              </span>
            </div>
          </div>
        )}

        {/* Permanent gradient — ensures text readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0.06) 100%)" }}
        />

        {/* Hover tint — category colour */}
        <div
          className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-20 transition-opacity duration-150 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` }}
        />

        {/* Specular top edge */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-30"
          style={{ background: "var(--glass-top-edge)" }}
        />

        {/* Kanji index — top right */}
        <span
          className="absolute top-2.5 right-3 z-20 select-none"
          style={{
            fontFamily: "var(--font-gatsunaga)",
            fontSize: featured ? "18px" : "14px",
            color: "rgba(255,255,255,0.22)",
            lineHeight: 1,
          }}
        >
          {KANJI_NUMS[index] ?? String(index + 1)}
        </span>

        {/* Text content — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3.5 pb-3">
          <p className="text-white/60 text-[9.5px] font-semibold uppercase tracking-[0.12em] mb-1.5 select-none">
            {section.emoji}&nbsp;&nbsp;{sectionTemplates.length}&nbsp;{lang === "it" ? "template" : "templates"}
          </p>
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-white text-[13.5px] font-semibold leading-snug truncate">
                <ScrambleText text={sectionMeta.label} />
              </h3>
              <p className="text-white/55 text-[10.5px] leading-snug mt-0.5 truncate">
                {sectionMeta.subtitle}
              </p>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-white/50 sm:text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0 mb-1"
            >
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
