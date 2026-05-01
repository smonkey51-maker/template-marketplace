"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  height?: number;
}

export function TemplatePreview({ id, height = 220 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height,
        overflow: "hidden",
        position: "relative",
        background: "#0f0f0f",
        flexShrink: 0,
      }}
    >
      {/* Gold gradient shimmer while loading */}
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(145deg, rgba(212,175,55,.07) 0%, rgba(212,175,55,.02) 100%)",
        }} />
      )}

      {visible && (
        <iframe
          src={`/api/preview/${id}`}
          title={`Preview ${id}`}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: "1440px",
            height: `${Math.round(height / 0.28)}px`,
            border: "none",
            pointerEvents: "none",
            display: "block",
            transformOrigin: "top left",
            transform: "scale(0.28)",
          }}
        />
      )}

      {/* Subtle gradient overlay at bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 55%, #060606 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
