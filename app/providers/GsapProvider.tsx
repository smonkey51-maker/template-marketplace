import React from 'react';

interface GsapProviderProps {
  children: React.ReactNode;
}

export default function GsapProvider({ children }: GsapProviderProps) {
  // Inizializzazione globale di GSAP rimossa.
  return (
    <>
      {children}
    </>
  );
}
