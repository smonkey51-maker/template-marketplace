"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT   = 5;
const TRAIL_LERP    = [0.24, 0.18, 0.13, 0.10, 0.08];
const TRAIL_SIZE    = [4.0,  3.0,  2.2,  1.6,  1.1 ];
const TRAIL_OPACITY = [0.38, 0.26, 0.17, 0.11, 0.06];

export default function CustomCursor() {
  const brushRef = useRef<SVGSVGElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const brush = brushRef.current;
    if (!brush) return;

    let mouseX = 0, mouseY = 0;
    const trailPos = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // tip of the brush (bottom of SVG) tracks the cursor
      brush.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -92%) rotate(-45deg)`;
    };

    const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, [role='menuitem']";
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        brush.classList.add("cursor-brush--hover");
      } else {
        brush.classList.remove("cursor-brush--hover");
      }
    };

    const animate = () => {
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
      {/* Paintbrush SVG — handle + ferrule + bristles */}
      <svg
        ref={brushRef}
        className="cursor-brush"
        viewBox="0 0 14 48"
        width="14"
        height="48"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handle — tapered wooden stick */}
        <rect x="5.5" y="0" width="3" height="26" rx="1.5" fill="#7B4F1A" />
        {/* Handle highlight */}
        <rect x="6" y="1" width="1.2" height="22" rx="0.6" fill="rgba(255,220,160,0.22)" />
        {/* Ferrule — metal band */}
        <rect x="4" y="25" width="6" height="5" rx="0.5" fill="#B8A88A" />
        <rect x="4" y="25" width="6" height="1.5" rx="0.5" fill="rgba(255,255,255,0.25)" />
        {/* Bristles — wide at ferrule, pointed tip */}
        <path d="M4 30 C3 38 7 47 7 47 C7 47 11 38 10 30 Z" fill="#C8A96E" />
        {/* Bristle sheen */}
        <path d="M5.5 30 C5 37 7 44 7 44 C7 44 8 37 8 30 Z" fill="rgba(255,235,180,0.28)" />
        {/* Tip — darker point */}
        <path d="M6 44 Q7 48 8 44 Q7 46 6 44Z" fill="#8B6318" />
      </svg>

      {/* Ink-dot trail */}
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
