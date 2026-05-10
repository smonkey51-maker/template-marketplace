"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

// Exit fast (200ms ease-in) so the old page disappears cleanly.
// Enter slow (520ms ease-out-quint) so the new page breathes in.
// Asymmetric timing is what makes page transitions feel cinematic vs. mechanical.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN  = [0.4, 0, 1, 1]     as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.52, ease: EASE_OUT },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.2, ease: EASE_IN },
        }}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
