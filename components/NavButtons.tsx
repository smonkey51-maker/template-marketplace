"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/i18n";

export default function NavButtons() {
  const { isSignedIn, isLoaded } = useUser();
  const { lang } = useLang();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile-only quick links */}
      <div className="flex sm:hidden items-center gap-1">
        <Link href="/guide" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          {t[lang].nav.guide}
        </Link>
        <Link href="/studio" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          {t[lang].nav.studio}
        </Link>
        <Link href="/account" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          {t[lang].nav.account}
        </Link>
      </div>

      <LanguageToggle />
      <ThemeToggle />

      {!isLoaded ? (
        <div className="w-8 h-8" />
      ) : isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button className="px-3.5 sm:px-4 py-2 bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] text-white font-semibold rounded-2xl text-[13px] sm:text-[14px] transition-all duration-200 ios-spring shadow-[0_2px_12px_rgba(10,132,255,0.25)] whitespace-nowrap">
            {t[lang].nav.signIn}
          </button>
        </SignInButton>
      )}
    </div>
  );
}
