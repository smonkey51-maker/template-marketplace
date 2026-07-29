"use client";

import { ReactNode, useRef, useEffect, type CSSProperties } from "react";

export type ArtSectionId = "hero" | "catalogo" | "guida" | "studio" | "account";

interface ArtSectionProps {
  id: ArtSectionId;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
}

export default function ArtSection({
  id,
  once = false,
  className = "",
  style,
  children,
  "aria-label": ariaLabel,
}: ArtSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.entered = "1";
      return;
    }

    const root = null;
    const triggerEl = document.getElementById(`trigger-${id}`) || el;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.entered = "1";
          if (once) obs.disconnect();
        } else if (!once) {
          delete el.dataset.entered;
        }
      },
      { root, threshold: 0.1 },
    );
    obs.observe(triggerEl);
    return () => obs.disconnect();
  }, [once]);

  return (
    <section
      ref={ref}
      id={id}
      className={`forma-section ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}
