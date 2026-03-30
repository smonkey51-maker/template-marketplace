"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 5;
const TRAIL_LERP    = [0.25, 0.20, 0.15, 0.12, 0.10];
const TRAIL_SIZE    = [5,    4.5,  4,    3,    2.5 ];
const TRAIL_OPACITY = [0.45, 0.35, 0.25, 0.18, 0.12];

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    const trailPos = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, [role='menuitem']";
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        ring.classList.add("cursor-ring--hover");
      } else {
        ring.classList.remove("cursor-ring--hover");
      }
    };

    const animate = () => {
      // Ring lerp
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      // Trail lerp — each dot chases the previous
      let prevX = mouseX, prevY = mouseY;
      trailPos.forEach((pos, i) => {
        pos.x += (prevX - pos.x) * TRAIL_LERP[i];
        pos.y += (prevY - pos.y) * TRAIL_LERP[i];
        const el = trailRef.current[i];
        if (el) {
          el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
        }
        prevX = pos.x;
        prevY = pos.y;
      });

      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRef.current[i] = el; }}
          className="cursor-trail"
          style={{ width: TRAIL_SIZE[i], height: TRAIL_SIZE[i], opacity: TRAIL_OPACITY[i] }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
