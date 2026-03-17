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
      <button className="px-4 py-2 bg-white/8 backdrop-blur-sm hover:bg-white/15 border border-white/15 rounded-2xl text-sm font-medium transition-all duration-200">
        Sign in
      </button>
    </SignInButton>
  );
}
