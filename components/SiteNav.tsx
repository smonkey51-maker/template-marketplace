"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { FormaLogoStatic } from "@/components/FormaLogo";

const NAV_LINKS = [
  { href: "/#system", label: "System" },
  { href: "/app",     label: "App"    },
  { href: "/brand",   label: "Brand kit" },
];

export default function SiteNav({ title }: { title?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="forma-nav" style={{ zIndex: 50 }}>
      {/* Logo */}
      <Link
        href="/"
        aria-label="FORMA — home"
        style={{ transition: "transform 0.4s ease, filter 0.4s ease" }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
          (e.currentTarget as HTMLAnchorElement).style.filter = "drop-shadow(0 0 10px rgba(212,175,55,0.4))";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.filter = "none";
        }}
      >
        <FormaLogoStatic width={120} />
      </Link>

      {/* Center links */}
      <nav className="forma-navlinks">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{ color: pathname.startsWith(link.href.split("#")[0]) && link.href !== "/#system" ? "var(--text)" : undefined }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTA + user */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/app" className="forma-btn" style={{ fontSize: 14, padding: "10px 20px" }}>
          Enter Platform
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}
