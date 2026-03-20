"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

const NAV_LINKS = [
  { href: "/",        labelIt: "Homepage",  labelEn: "Homepage",  activeOn: [] },
  { href: "/guide",   labelIt: "Guida",     labelEn: "Guide",     activeOn: ["/guide"] },
  { href: "/studio",  labelIt: "AI Studio", labelEn: "AI Studio", activeOn: ["/studio"] },
  { href: "/account", labelIt: "Account",   labelEn: "Account",   activeOn: ["/account"] },
];

export default function SiteNav({ title }: { title?: string }) {
  const { lang } = useLang();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5">
      {/* Top specular line */}
      <div className="absolute inset-x-8 top-0 h-px rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div className="max-w-7xl mx-auto flex items-center gap-1">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-bold text-zinc-900 dark:text-white tracking-tight shrink-0 mr-2 hover:opacity-70 transition-opacity"
        >
          TemplateLab
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden sm:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            const label = lang === "it" ? link.labelIt : link.labelEn;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-theme bg-card"
                    : "text-muted hover:text-theme hover:bg-card"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Center title — mobile only */}
        {title && (
          <span className="sm:hidden flex-1 text-center text-[13px] font-semibold text-muted uppercase tracking-widest truncate">
            {title}
          </span>
        )}

        {/* Spacer — desktop (pushes UserButton right) */}
        <div className="hidden sm:flex flex-1" />

        <UserButton />
      </div>
    </nav>
  );
}
