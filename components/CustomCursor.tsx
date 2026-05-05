"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT   = 5;
const TRAIL_LERP    = [0.24, 0.18, 0.13, 0.10, 0.08];
const TRAIL_SIZE    = [4.5,  3.5,  2.8,  2.0,  1.4 ];
const TRAIL_OPACITY = [0.40, 0.28, 0.18, 0.12, 0.07];

export default function CustomCursor() {
  const brushRef = useRef<HTMLDivElement>(null);
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
      brush.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) rotate(-45deg)`;
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
      <div ref={brushRef} className="cursor-brush" aria-hidden="true" />
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
