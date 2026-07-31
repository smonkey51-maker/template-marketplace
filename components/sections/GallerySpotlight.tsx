"use client";

import { useEffect, useRef } from "react";

export default function GallerySpotlight() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = el.current;
    if (!div) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const SPEED = 0.07;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const RADIUS = isMobile ? 280 : 560;

    const frame = () => {
      cx = lerp(cx, tx, SPEED);
      cy = lerp(cy, ty, SPEED);
      div.style.background = `radial-gradient(circle ${RADIUS}px at ${cx}px ${cy}px, rgba(212,175,55,0.065), transparent 72%)`;
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    const onMouse = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        tx = e.touches[0].clientX;
        ty = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 4, mixBlendMode: "screen" }}
    />
  );
}
