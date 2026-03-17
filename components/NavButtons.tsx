"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

export default function NavButtons() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      {!isLoaded ? (
        <div className="w-8 h-8" />
      ) : isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-[#0A84FF] hover:bg-[#409CFF] active:scale-[0.97] text-white font-semibold rounded-2xl text-[14px] transition-all duration-200 ios-spring shadow-[0_2px_12px_rgba(10,132,255,0.25)]">
            Sign in
          </button>
        </SignInButton>
      )}
    </div>
  );
}
