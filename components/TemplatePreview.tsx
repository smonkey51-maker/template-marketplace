"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  height?: number;
}

/** Design width the previewed templates are authored against. */
const PREVIEW_WIDTH = 1440;

export function TemplatePreview({ id, height = 220 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);

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

  // The scale has to follow the container: a fixed one only ever filled
  // PREVIEW_WIDTH × scale pixels, leaving the rest of a wider card blank.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = width > 0 ? width / PREVIEW_WIDTH : 0;

  return (
    <div
      ref={ref}
      style={{
        height,
        // The iframe is laid out at its full PREVIEW_WIDTH (transform: scale()
        // does not shrink layout size), so the wrapper must be pinned to the
        // container width or it inflates the surrounding grid track.
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        background: "#0f0f0f",
        flexShrink: 0,
      }}
    >
      {/* Gold gradient shimmer while loading (or before the width is known) */}
      {(!loaded || scale === 0) && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(145deg, rgba(212,175,55,.07) 0%, rgba(212,175,55,.02) 100%)",
        }} />
      )}

      {visible && scale > 0 && (
        <iframe
          src={`/api/preview/${id}`}
          title={`Preview ${id}`}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: `${PREVIEW_WIDTH}px`,
            // Tall enough that, once scaled down, it still covers the wrapper.
            height: `${Math.ceil(height / scale)}px`,
            border: "none",
            pointerEvents: "none",
            display: "block",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        />
      )}

      {/* Subtle gradient overlay at bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 55%, var(--surface) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
