useGSAP(() => {
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    if (sheetRef.current) {
      gsap.fromTo(
        sheetRef.current,
        { y: "100vh" }, 
        { 
          y: 0, 
          duration: 0.5, 
          ease: "power3.out", 
          clearProps: "transform"
        } 
      );
    }
  });
