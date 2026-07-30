"use client";

import { createContext, useContext, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { toLocale, type Locale } from "@/lib/locales";

export type Lang = Locale;

const LangCtx = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "it",
  toggle: () => {},
});

export function useLang() {
  return useContext(LangCtx);
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Never hand a component a locale the copy tables don't have a key for:
  // `copy[lang]` would be undefined and every field read off it throws.
  const lang = toLocale(params?.lang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggle = () => {
    const nextLang = lang === "it" ? "en" : "it";
    if (pathname.startsWith(`/${lang}`)) {
      const newPathname = pathname.replace(`/${lang}`, `/${nextLang}`);
      router.push(newPathname || `/${nextLang}`, { scroll: false });
    } else {
      router.push(`/${nextLang}${pathname}`, { scroll: false });
    }
  };

  return <LangCtx.Provider value={{ lang, toggle }}>{children}</LangCtx.Provider>;
}
