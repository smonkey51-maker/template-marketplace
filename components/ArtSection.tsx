"use client";

import { ReactNode, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
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
    },
    { scope: ref, dependencies: [buildTimeline, start, once] }
  );

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
