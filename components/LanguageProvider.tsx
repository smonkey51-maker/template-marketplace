"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "it" | "en";

const LangCtx = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "it",
  toggle: () => {},
});

export function useLang() {
  return useContext(LangCtx);
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("it");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "it" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "it" ? "en" : "it";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return <LangCtx.Provider value={{ lang, toggle }}>{children}</LangCtx.Provider>;
}
