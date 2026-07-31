useGSAP(() => {
    // 1. Animazione dell'overlay scuro (Fade In)
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    // 2. Animazione del pannello del template (Slide Up fisso)
    // Partiamo sempre da 100vh (fuori dallo schermo in basso) e andiamo a 0
    if (sheetRef.current) {
      gsap.fromTo(
        sheetRef.current,
        { y: "100vh" }, 
        { 
          y: 0, 
          duration: 0.5, 
          ease: "power3.out", 
          clearProps: "transform" // Fondamentale: rimuove i residui di transform a fine animazione per evitare bug di scroll
        } 
      );
    }
  });
