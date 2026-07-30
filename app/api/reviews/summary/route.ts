import { NextResponse } from "next/server";
import { supabaseAdmin as getSupabase } from "@/lib/supabaseAdmin";

/**
 * Average rating and review count for every template, in one response.
 *
 * The existing GET /api/reviews takes a single `templateId`, which is right for
 * a product page and wrong for the catalogue: filtering sixteen cards by rating
 * through that endpoint would mean sixteen requests, and sixteen requests per
 * page load is exactly what the catalogue was just rebuilt to stop doing.
 *
 * Aggregation is done here in JS over two columns rather than in Postgres.
 * PostgREST can group and average server-side, but that feature is off by
 * default on Supabase projects and I had no way to confirm it is enabled for
 * this one — a facet is not worth an endpoint that might 400 in production. Two
 * columns over a reviews table is cheap while the table is small; if it ever
 * grows into the tens of thousands, the upgrade is a database view or an RPC
 * that groups server-side, and only this file changes.
 */
export interface RatingSummary {
  /** Mean rating, rounded to one decimal. */
  avg: number;
  count: number;
}

export async function GET() {
  try {
    const { data, error } = await getSupabase().from("reviews").select("template_id, rating");

    if (error) throw error;

    const totals: Record<string, { sum: number; count: number }> = {};
    for (const row of (data ?? []) as { template_id: string; rating: number }[]) {
      const t = (totals[row.template_id] ??= { sum: 0, count: 0 });
      t.sum += row.rating;
      t.count += 1;
    }

    const summary: Record<string, RatingSummary> = {};
    for (const [id, { sum, count }] of Object.entries(totals)) {
      summary[id] = { avg: Math.round((sum / count) * 10) / 10, count };
    }

    return NextResponse.json(
      { summary },
      {
        // Ratings move slowly and a slightly stale average is harmless, so let
        // the edge serve this and refresh behind the scenes rather than making
        // every visitor wait on a database round trip.
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
      },
    );
  } catch (err) {
    // An empty summary is a truthful answer, not a swallowed failure: the
    // catalogue reads "no ratings known" by hiding the rating filter, which is
    // exactly what it does before the first review is ever written. Failing
    // loudly here would take the catalogue down over one facet.
    console.error("[reviews/summary]", err);
    return NextResponse.json({ summary: {} });
  }
}
