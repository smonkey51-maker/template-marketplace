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
      <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition">
        Sign in
      </button>
    </SignInButton>
  );
}
