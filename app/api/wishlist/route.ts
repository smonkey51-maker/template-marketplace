import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { wishlistSchema } from "@/lib/schemas";

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function GET() {
  const supabase = getSupabase();
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ ids: [] });

  const { data, error } = await supabase
    .from("wishlists")
    .select("template_id")
    .eq("user_id", userId);

  if (error) {
    console.error("[wishlist GET]", error);
    return NextResponse.json({ ids: [] });
  }

  return NextResponse.json({ ids: data.map((row) => row.template_id) });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = wishlistSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { templateId } = parsed.data;

  // Check if exists
  const { data: existing } = await supabase
    .from("wishlists")
    .select("template_id")
    .eq("user_id", userId)
    .eq("template_id", templateId)
    .single();

  if (existing) {
    // Remove
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", userId)
      .eq("template_id", templateId);
    if (error) console.error("[wishlist DELETE]", error);
    return NextResponse.json({ action: "removed" });
  } else {
    // Add
    const { error } = await supabase
      .from("wishlists")
      .insert({ user_id: userId, template_id: templateId });
    if (error) console.error("[wishlist INSERT]", error);
    return NextResponse.json({ action: "added" });
  }
}
