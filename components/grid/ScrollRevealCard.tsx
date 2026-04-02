"use client";

import { useRef, useState, useEffect } from "react";

export default function ScrollRevealCard({
  children,
  delay = 0,
  className = "scroll-reveal",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  /** Base CSS class that owns the hidden→visible transition. Defaults to "scroll-reveal". */
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className}${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
