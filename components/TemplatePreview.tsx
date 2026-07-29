"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  height?: number;
  interactive?: boolean;
}

/** Design width the previewed templates are authored against. */
const PREVIEW_WIDTH = 1440;

/**
 * Scaled live preview of a template.
 *
 * Deferring off-screen frames is left to the browser: `loading="lazy"` replaces
 * the IntersectionObserver this used to run per card, which on the catalogue
 * meant 16 observers doing what the platform already does.
 *
 * The scale still has to be measured in JS. `transform: scale()` needs a
 * unitless ratio, and CSS cannot divide a length by a length to produce one —
 * `calc(100cqw / 1440)` yields a length, which `scale()` rejects — so container
 * query units can't express "fit 1440px into whatever this column is".
 */
export function TemplatePreview({ id, height = 220, interactive = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);

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
        borderRadius: "inherit",
        transform: "translateZ(0)", // Fixes border-radius clipping with transforms
      }}
    >
      {/* Gold gradient shimmer while loading (or before the width is known) */}
      {(!loaded || scale === 0) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(145deg, rgba(212,175,55,.07) 0%, rgba(212,175,55,.02) 100%)",
          }}
        />
      )}

      {scale > 0 && (
        <iframe
          src={`/api/preview/${id}${interactive ? "?interactive=1" : ""}`}
          title={`Preview ${id}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sandbox={interactive ? "allow-scripts allow-same-origin" : "allow-same-origin"}
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 55%, var(--surface) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
