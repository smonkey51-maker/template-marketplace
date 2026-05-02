"use client";

import { ReactNode, useRef, useEffect, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ArtSectionId = "hero" | "catalogo" | "guida" | "studio" | "account";

interface ArtSectionProps {
  id: ArtSectionId;
  buildTimeline: (tl: gsap.core.Timeline, container: HTMLElement) => void;
  start?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  scroller?: string | Element;
  "aria-label"?: string;
}

export default function ArtSection({
  id,
  buildTimeline,
  start = "top 70%",
  once = false,
  className = "",
  style,
  children,
  scroller,
  "aria-label": ariaLabel,
}: ArtSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      buildTimeline(tl, el);

      ScrollTrigger.create({
        trigger: el,
        start,
        end: "bottom 30%",
        once,
        scroller: scroller ?? "#forma-snap-container",
        onEnter: () => tl.play(0),
        onEnterBack: () => !once && tl.play(0),
        onLeave: () => !once && tl.pause(0),
        onLeaveBack: () => !once && tl.pause(0),
      });
    }, el);

    return () => ctx.revert();
  }, [buildTimeline, start, once, scroller]);

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
