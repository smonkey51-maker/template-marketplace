"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(Array(5).fill({ x: 0, y: 0 }));

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const lerpFactor = 0.11;

      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      for (let i = 0; i < 5; i++) {
        const delay = (i + 1) * 0.02;
        trailPositions.current[i] = {
          x: trailPositions.current[i].x + (mousePos.current.x - trailPositions.current[i].x) * (lerpFactor * delay),
          y: trailPositions.current[i].y + (mousePos.current.y - trailPositions.current[i].y) * (lerpFactor * delay),
        };
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) scale(${isHovering ? 1.5 : 1})`;
      }
      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          trail.style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering, isVisible]);

  if (typeof window === "undefined") return null;

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div className="custom-cursor-container" style={{ opacity: isVisible ? 1 : 0 }}>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#D4AF37",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212, 175, 55, 0.5)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s ease",
        }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${4 - i * 0.5}px`,
            height: `${4 - i * 0.5}px`,
            borderRadius: "50%",
            backgroundColor: `rgba(212, 175, 55, ${0.3 - i * 0.05})`,
            pointerEvents: "none",
            zIndex: 9997 - i,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
