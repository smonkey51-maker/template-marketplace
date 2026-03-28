"use client";

import { useRef } from "react";

export default function MagneticWrap({ children, strength = 0.38 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  const onMove = (e: React.MouseEvent) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
    el.style.transform   = "translate(0px, 0px)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
