"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function NavButtons() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile-only quick links */}
      <div className="flex sm:hidden items-center gap-1">
        <Link href="/guide" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          Guida
        </Link>
        <Link href="/studio" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          Studio
        </Link>
        <Link href="/account" className="text-[13px] text-muted px-2.5 py-1.5 rounded-xl hover:bg-card hover:text-theme transition-colors">
          Account
        </Link>
      </div>

      <ThemeToggle />

      {!isLoaded ? (
        <div className="w-8 h-8" />
      ) : isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button className="px-3.5 sm:px-4 py-2 bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] text-white font-semibold rounded-2xl text-[13px] sm:text-[14px] transition-all duration-200 ios-spring shadow-[0_2px_12px_rgba(10,132,255,0.25)] whitespace-nowrap">
            Sign in
          </button>
        </SignInButton>
      )}
    </div>
  );
}
