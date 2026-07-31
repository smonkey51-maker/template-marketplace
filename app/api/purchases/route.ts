import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserPurchases } from "@/lib/purchases";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    // Guests own nothing on the server. Guest downloads go through
    // /api/download-session, which verifies the Stripe session directly.
    return NextResponse.json({ templateIds: [] });
  }

  const templateIds = await getUserPurchases(userId);
  return NextResponse.json({ templateIds });
}
