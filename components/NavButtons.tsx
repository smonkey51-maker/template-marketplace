"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { t } from "@/lib/i18n";

// showMobileLinks kept for API compatibility but navigation is handled by MobileNav bottom bar
export default function NavButtons({ showMobileLinks: _ = true }: { showMobileLinks?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();
  const { lang } = useLang();

  return (
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">

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
