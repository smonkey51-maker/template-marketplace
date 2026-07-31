"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrazione dei plugin globali in ambiente browser (senza @gsap/react)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapProviderProps {
  children: React.ReactNode;
}

export default function GsapProvider({ children }: GsapProviderProps) {
  return <>{children}</>;
}
