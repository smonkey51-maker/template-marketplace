import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserPurchases } from "@/lib/purchases";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const templateIds = await getUserPurchases(userId);
  return NextResponse.json({ templateIds });
}
