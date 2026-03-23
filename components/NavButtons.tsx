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
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
            className="btn-brand btn-brand-sm whitespace-nowrap"
          >
            {t[lang].nav.signIn}
          </button>
        </SignInButton>
      )}
    </div>
  );
}
