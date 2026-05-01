"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { FormaLogoStatic } from "@/components/FormaLogo";

type Lang = "it" | "en";

const NAV = [
  { href: "/#explore", labelIt: "Esplora",  labelEn: "Explore"  },
  { href: "/app",      labelIt: "Prodotto",  labelEn: "Product"  },
  { href: "/brand",    labelIt: "Brand kit", labelEn: "Brand kit" },
];

export default function SiteNav({ title }: { title?: string }) {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>("it");

  return (
    <nav className="fp-nav" style={{ zIndex: 50 }}>
      {/* Logo */}
      <Link
        href="/"
        aria-label="FORMA — home"
        style={{ transition: "transform 0.4s ease, filter 0.4s ease" }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
          (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 0 10px rgba(212,175,55,0.4))";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.filter = "none";
        }}
      >
        <FormaLogoStatic width={120} />
      </Link>

      {/* Center links */}
      <div className="fp-navlinks">
        {NAV.map(link => (
          <Link key={link.href} href={link.href}>
            {lang === "it" ? link.labelIt : link.labelEn}
          </Link>
        ))}
      </div>

      {/* Right: IT/EN + CTA + user */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="fp-lang">
          <button onClick={() => setLang("it")} className={lang === "it" ? "active" : ""}>IT</button>
          <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
        </div>
        <Link href="/app" className="fp-btn primary" style={{ fontSize: 14, padding: "10px 20px" }}>
          {lang === "it" ? "Apri app" : "Open app"}
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}
