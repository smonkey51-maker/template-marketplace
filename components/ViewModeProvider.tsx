"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ViewMode = "desktop" | "mobile";

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  viewMode: "desktop",
  setViewMode: () => {},
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>("desktop");

  useEffect(() => {
    const saved = localStorage.getItem("viewMode") as ViewMode | null;
    if (saved === "mobile" || saved === "desktop") setViewModeState(saved);
  }, []);

  const setViewMode = (m: ViewMode) => {
    setViewModeState(m);
    localStorage.setItem("viewMode", m);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}

export function ViewModeWrapper({ children }: { children: ReactNode }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "mobile") return <>{children}</>;

  return (
    <div style={{ background: "var(--bg-outer, #0a0804)", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          position: "relative",
          boxShadow: "0 0 0 1px var(--border), -20px 0 60px rgba(0,0,0,0.25), 20px 0 60px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
