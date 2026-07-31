import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  // GSAP e animazioni di transizione rimosse.
  // Restituiamo direttamente i children per evitare blocchi del routing e dell'overflow.
  return (
    <div className="anim-page-enter">
      {children}
    </div>
  );
}
