import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]" style={{ background: "radial-gradient(ellipse at top, #1a1a1a 0%, #000 60%)" }}>
      <SignIn />
    </div>
  );
}
