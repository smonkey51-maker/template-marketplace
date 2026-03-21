"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/i18n";

export default function NavButtons({ showMobileLinks = true }: { showMobileLinks?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();
  const { lang } = useLang();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile-only quick links */}
      {showMobileLinks && (
        <div className="flex sm:hidden items-center gap-1">
          <Link href="/guide" className="text-[13px] text-muted px-2.5 py-1.5 hover:bg-card hover:text-theme transition-colors">
            {t[lang].nav.guide}
          </Link>
          <Link href="/studio" className="text-[13px] text-muted px-2.5 py-1.5 hover:bg-card hover:text-theme transition-colors">
            {t[lang].nav.studio}
          </Link>
          <Link href="/account" className="text-[13px] text-muted px-2.5 py-1.5 hover:bg-card hover:text-theme transition-colors">
            {t[lang].nav.account}
          </Link>
        </div>
      )}

      <LanguageToggle />
      <ThemeToggle />

      {!isLoaded ? (
        <div className="w-8 h-8" />
      ) : isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button
            className="px-4 py-2 active:scale-[0.97] font-bold uppercase tracking-[0.12em] text-[10px] transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
          >
            {t[lang].nav.signIn}
          </button>
        </SignInButton>
      )}
    </div>
  );
}
