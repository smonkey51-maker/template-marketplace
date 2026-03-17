import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]" style={{ background: "radial-gradient(ellipse at top, #1a1a1a 0%, #000 60%)" }}>
      <SignUp />
    </div>
  );
}
