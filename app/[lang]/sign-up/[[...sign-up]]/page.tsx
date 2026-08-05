import { SignUp } from "@clerk/nextjs";
import BackLink from "@/components/BackLink";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      {/* Same as sign-in: Clerk owns the viewport, so the way out has to be
          supplied here. */}
      <BackLink floating />
      <SignUp />
    </div>
  );
}
