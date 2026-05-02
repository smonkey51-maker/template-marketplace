"use client";

import { ReactNode } from "react";

// GSAP removed — this provider is kept as a no-op to avoid layout.tsx changes.
export default function GsapProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
