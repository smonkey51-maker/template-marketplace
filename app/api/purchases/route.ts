import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserPurchases } from "@/lib/purchases";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const { userId } = await auth();

  // Authenticated user — fetch by userId
  if (userId) {
    const templateIds = await getUserPurchases(userId);
    return NextResponse.json({ templateIds });
  }

  // Guest user — check for Stripe session ID in cookies
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("stripe_session_id")?.value;

  if (sessionId) {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase
      .from("purchases")
      .select("template_id")
      .eq("stripe_session_id", sessionId);

    if (data && data.length > 0) {
      return NextResponse.json({ templateIds: data.map((r) => r.template_id) });
    }
  }

  // No purchases found
  return NextResponse.json({ templateIds: [] });
}
