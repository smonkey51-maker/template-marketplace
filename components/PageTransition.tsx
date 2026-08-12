"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * No entrance animation: a fresh page painting with `opacity: 0` for even a
 * couple frames reads as a flash, and animating a wrapper around every route
 * (transform/opacity) forces a fresh compositing layer for the whole page on
 * every navigation, which is what showed up as a flash + tilt on entry. The
 * page just appears.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // The scroll lock belongs to whatever set it, but a navigation can unmount
  // that component before its cleanup runs.
  useEffect(() => {
    document.body.style.overflow = "";
  }, [pathname]);

  return <>{children}</>;
}
