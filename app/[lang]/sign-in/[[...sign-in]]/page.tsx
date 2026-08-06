import { SignIn } from "@clerk/nextjs";
import BackLink from "@/components/BackLink";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      {/* This page carries no site nav — Clerk owns the whole viewport — so
          without this there is no way out of it but the browser's own button. */}
      <BackLink floating />
      <SignIn />
    </div>
  );
}
