"use client";

import { MotionConfig } from "framer-motion";

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="never">
      {children}
    </MotionConfig>
  );
}
