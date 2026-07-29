import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as getSupabase } from "@/lib/supabaseAdmin";
import { reviewSchema } from "@/lib/schemas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get("templateId");
  if (!templateId) return NextResponse.json({ error: "Missing templateId" }, { status: 400 });

  const { data, error } = await getSupabase()
    .from("reviews")
    .select("id, user_id, rating, comment, created_at")
    .eq("template_id", templateId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[reviews GET]", error);
    return NextResponse.json({ reviews: [], avgRating: 0, count: 0 });
  }

  const avgRating = data.length > 0 ? data.reduce((sum, r) => sum + r.rating, 0) / data.length : 0;

  return NextResponse.json({
    reviews: data,
    avgRating: Math.round(avgRating * 10) / 10,
    count: data.length,
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = reviewSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { templateId, rating, comment } = parsed.data;
  const supabase = getSupabase();

  // Verify user has purchased the template.
  // `limit(1)` rather than `.single()`: duplicate purchase rows would make
  // `.single()` error out and lock a genuine buyer out of reviewing.
  const { data: purchases } = await supabase
    .from("purchases")
    .select("template_id")
    .eq("user_id", userId)
    .eq("template_id", templateId)
    .limit(1);

  if (!purchases || purchases.length === 0) {
    return NextResponse.json({ error: "Must purchase template before reviewing" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .upsert(
      { user_id: userId, template_id: templateId, rating, comment: comment ?? null },
      { onConflict: "user_id,template_id" },
    )
    .select()
    .single();

  if (error) {
    console.error("[reviews POST]", error);
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }

  return NextResponse.json({ review: data });
}
