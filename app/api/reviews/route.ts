import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { reviewSchema } from "@/lib/schemas";

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get("templateId");
  if (!templateId) return NextResponse.json({ error: "Missing templateId" }, { status: 400 });

  const { data, error } = await supabase
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
  const supabase = getSupabase();
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

  // Verify user has purchased the template
  const { data: purchase } = await supabase
    .from("purchases")
    .select("template_id")
    .eq("user_id", userId)
    .eq("template_id", templateId)
    .single();

  if (!purchase) {
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
