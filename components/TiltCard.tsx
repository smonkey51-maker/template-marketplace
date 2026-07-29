"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
  useMotionTemplate,
} from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"article"> {
  children: React.ReactNode;
  active?: boolean;
}

export const TiltCard = React.forwardRef<HTMLElement, TiltCardProps>(
  ({ children, active, className = "", style, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLElement>) || internalRef;
    const [isHovered, setIsHovered] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // Disable intense interactions on mobile to save battery.
    // Listening to the media query itself rather than to `resize`: resize fires
    // on every frame of a window drag, and the catalogue mounts 16 of these.
    useEffect(() => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      const sync = () => setIsDesktop(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
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

          {/* Dynamic glow — mounted only while hovered, so idle cards cost
              nothing to composite. */}
          {isDesktop && isHovered && !active && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                background,
                zIndex: 10,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          )}
        </motion.div>
      </motion.article>
    );
  },
);
