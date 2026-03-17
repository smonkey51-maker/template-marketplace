"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavButtons() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div className="w-8 h-8" />;

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <SignInButton mode="modal">
      <button className="px-4 py-2 bg-[#FF9F0A] hover:bg-[#FFB340] active:scale-[0.97] text-white font-semibold rounded-2xl text-[14px] transition-all duration-200 ios-spring shadow-[0_2px_12px_rgba(255,159,10,0.25)]">
        Sign in
      </button>
    </SignInButton>
  );
}
