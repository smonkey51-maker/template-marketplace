"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AmbientAuraProps {
  color?: "gold" | "blue" | "red" | "purple" | "green";
  intensity?: number;
}

const colorMaps = {
  gold: ["rgba(212, 175, 55, 0.15)", "rgba(180, 140, 40, 0.1)"],
  blue: ["rgba(90, 143, 176, 0.15)", "rgba(60, 110, 150, 0.1)"],
  red: ["rgba(200, 70, 70, 0.12)", "rgba(160, 50, 50, 0.08)"],
  purple: ["rgba(150, 90, 180, 0.12)", "rgba(120, 60, 150, 0.08)"],
  green: ["rgba(60, 150, 90, 0.12)", "rgba(40, 120, 70, 0.08)"],
};

export function AmbientAura({ color = "gold", intensity = 1 }: AmbientAuraProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Only run intense animations on desktop devices
    const checkMobile = () => setIsDesktop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const colors = colorMaps[color];

  if (!isDesktop) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: `radial-gradient(ellipse 70% 50% at 50% 35%, ${colors[0]}, transparent)`,
          opacity: intensity,
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2, opacity: intensity }}
    >
      <motion.div
        animate={{
          x: ["0%", "10%", "-10%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vh] rounded-full blur-[100px]"
        style={{
          top: "-20%",
          left: "10%",
          background: `radial-gradient(circle, ${colors[0]}, transparent 60%)`,
        }}
      />
      <motion.div
        animate={{
          x: ["0%", "-15%", "10%", "0%"],
          y: ["0%", "15%", "-5%", "0%"],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute w-[60vw] h-[60vh] rounded-full blur-[120px]"
        style={{
          bottom: "-10%",
          right: "10%",
          background: `radial-gradient(circle, ${colors[1]}, transparent 60%)`,
        }}
      />
    </div>
  );
}
