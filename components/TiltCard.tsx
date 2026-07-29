"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps, useMotionTemplate } from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"article"> {
  children: React.ReactNode;
  active?: boolean;
}

export function TiltCard({ children, active, className = "", style, ...props }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Disable intense interactions on mobile to save battery
  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [0, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!ref.current || !isDesktop || active) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    mouseX.set(mx / width);
    mouseY.set(my / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Convert percentages to pixels for radial gradient
  const glowX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);
  
  const background = useMotionTemplate`radial-gradient(circle 240px at ${glowX} ${glowY}, rgba(212, 175, 55, 0.12), transparent 80%)`;

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
      style={{
        ...style,
        perspective: isDesktop ? "1400px" : "none",
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <motion.div
        style={{
          rotateX: isDesktop && !active ? rotateX : 0,
          rotateY: isDesktop && !active ? rotateY : 0,
          z: isDesktop && isHovered && !active ? 20 : 0,
          transition: "box-shadow 0.4s ease, border-color 0.4s ease",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Glow Overlay */}
        {isDesktop && !active && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background,
              zIndex: 10,
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          />
        )}
      </motion.div>
    </motion.article>
  );
}
