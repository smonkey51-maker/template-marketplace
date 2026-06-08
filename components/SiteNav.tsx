"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { copy } from "@/lib/formaCopy";
import { useLang } from "@/components/LanguageProvider";
import { FormaLogoAnimated } from "@/components/FormaLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteNav() {
  const { lang, toggle } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("fn-scrolled", window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="fn-utility">
        <span>{t("date")}</span>
        <span>{t("tagline")}</span>
        <div className="fn-right">
          <ThemeToggle />
          <div className="fn-lang">
            <button className={lang === "it" ? "active" : ""} onClick={() => lang === "en" && toggle()}>IT</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => lang === "it" && toggle()}>EN</button>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="fn-topline" />

      {/* SVG logo */}
      <Link href="/" className="fn-logo-hero" aria-label="FORMA home">
        <FormaLogoAnimated className="fn-logo-svg" />
      </Link>

      {/* Navbar */}
      <nav ref={navRef} className="fn-navbar">
        <div className="fn-nav-left">
          <Link className="fn-drop" href="/catalogo">{t("catalogo")}</Link>
          <Link className="fn-drop" href="/guida">{t("guida")}</Link>
          <Link className="fn-drop" href="/ai-studio">{t("studioAi")}</Link>
          <Link className="fn-drop" href="/account">{t("account")}</Link>
        </div>
        <div />
        <div className="fn-nav-right">
          <Link href="/catalogo">{t("cerca")} <span className="fn-kbd">Ctrl K</span></Link>
          <Link className="fn-outline fn-drop" href="/studio">{t("studio")}</Link>
        </div>
      </nav>
    </>
  );
}
