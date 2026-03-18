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
          <button className="px-4 py-2 bg-zinc-900 dark:bg-white hover:opacity-80 active:scale-[0.97] text-white dark:text-zinc-900 font-semibold rounded-full text-[13px] transition-opacity duration-200 whitespace-nowrap">
            {t[lang].nav.signIn}
          </button>
        </SignInButton>
      )}
    </div>
  );
}
