"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small count badge (wishlist/cart) that pops when its value changes,
 * instead of just silently re-rendering a new number.
 */
export default function CountBadge({ count, className, style }: { count: number; className?: string; style?: React.CSSProperties }) {
  const [popping, setPopping] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      setPopping(true);
      prevCount.current = count;
      const t = setTimeout(() => setPopping(false), 400);
      return () => clearTimeout(t);
    }
  }, [count]);

  if (count <= 0) return null;

  return (
    <span
      className={className}
      style={{
        ...style,
        animation: popping ? "badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" : undefined,
      }}
    >
      {count}
    </span>
  );
}
