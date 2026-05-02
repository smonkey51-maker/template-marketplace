"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    const checkMotion = () =>
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

    checkDesktop();
    checkMotion();
    window.addEventListener("resize", checkDesktop);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", checkMotion);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      motionQuery.removeEventListener("change", checkMotion);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    for (let i = 0; i < 5; i++) {
      particles.current.push({ x: 0, y: 0, vx: 0, vy: 0 });
    }

    let animationId: number;
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) =>
        start + (end - start) * factor;

      smoothPos.current.x = lerp(smoothPos.current.x, cursorPos.current.x, 0.15);
      smoothPos.current.y = lerp(smoothPos.current.y, cursorPos.current.y, 0.15);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#D4AF37";
      ctx.beginPath();
      ctx.arc(smoothPos.current.x, smoothPos.current.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(smoothPos.current.x, smoothPos.current.y, 20, 0, Math.PI * 2);
      ctx.stroke();

      particles.current.forEach((p, i) => {
        const targetX = smoothPos.current.x;
        const targetY = smoothPos.current.y;
        const lag = 0.08 - i * 0.015;

        p.vx = (targetX - p.x) * lag;
        p.vy = (targetY - p.y) * lag;
        p.x += p.vx;
        p.y += p.vy;

        const opacity = 0.5 - i * 0.08;
        const size = 5 - i * 0.6;

        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ cursor: "none" }}
    />
  );
}
