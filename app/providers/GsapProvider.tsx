"use client";

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrazione dei plugin globali in ambiente browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface GsapProviderProps {
  children: React.ReactNode;
}

export default function GsapProvider({ children }: GsapProviderProps) {
  return <>{children}</>;
}
