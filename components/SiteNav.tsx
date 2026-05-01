"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { copy, type Lang } from "@/lib/formaCopy";

export default function SiteNav({ title }: { title?: string }) {
  const [lang, setLang] = useState<Lang>("it");
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <>
      {/* Utility bar */}
      <div className="fn-utility">
        <span>01 May 2026</span>
        <span>Marketplace di template digitali</span>
        <div className="fn-right">
          <div className="fn-lang">
            <button className={lang === "it" ? "active" : ""} onClick={() => setLang("it")}>IT</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="fn-topline" />

      {/* Logo hero */}
      <Link href="/" className="fn-logo-hero">FORMA</Link>

      {/* Navbar */}
      <nav className="fn-navbar">
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
