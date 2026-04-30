"use client";
import { createContext, useContext, useState } from "react";

type LayoutMode = "editorial" | "compact";
const Ctx = createContext<{ mode: LayoutMode; toggle: () => void }>({ mode: "editorial", toggle: () => {} });

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LayoutMode>("editorial");
  return (
    <Ctx.Provider value={{ mode, toggle: () => setMode(m => m === "editorial" ? "compact" : "editorial") }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLayoutMode() { return useContext(Ctx); }
