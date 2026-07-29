import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function GET(_req: Request, { params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, user_id, rating, comment, created_at")
    .eq("template_id", templateId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[reviews/[templateId] GET]", error);
    return NextResponse.json({ reviews: [], avgRating: 0, count: 0 });
  }

  const avgRating = data.length > 0 ? data.reduce((sum, r) => sum + r.rating, 0) / data.length : 0;

  return NextResponse.json({
    reviews: data,
    avgRating: Math.round(avgRating * 10) / 10,
    count: data.length,
  });
}
