"use client";

import { useState, useEffect } from "react";
import StarRating from "@/components/StarRating";
import ReviewForm from "@/components/ReviewForm";
import { useUser } from "@clerk/nextjs";

type Review = {
  id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export default function ReviewList({
  templateId,
  purchasedIds,
  lang,
}: {
  templateId: string;
  purchasedIds: string[];
  lang: "it" | "en";
}) {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const hasPurchased = purchasedIds.includes(templateId);
  const hasReviewed = reviews.some((r) => r.user_id === user?.id);

  function fetchReviews() {
    setLoading(true);
    fetch(`/api/reviews?templateId=${encodeURIComponent(templateId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`/api/reviews ${r.status}`))))
      .then((data) => {
        setReviews(data.reviews ?? []);
        setAvgRating(data.avgRating ?? 0);
        setCount(data.count ?? 0);
      })
      .catch((e) => console.error("[ReviewList]", e))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchReviews();
  }, [templateId]);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-[36px] font-bold text-theme leading-none">
            {avgRating > 0 ? avgRating.toFixed(1) : "—"}
          </p>
          <StarRating rating={avgRating} size={13} />
          <p className="text-[11px] text-muted mt-1">
            {count} {lang === "it" ? "recensioni" : "reviews"}
          </p>
        </div>
      </div>

      {/* Write review */}
      {hasPurchased && !hasReviewed && (
        <div className="border border-theme p-4">
          {showForm ? (
            <ReviewForm
              templateId={templateId}
              lang={lang}
              onSubmitted={() => {
                setShowForm(false);
                fetchReviews();
              }}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="text-[13px] font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {lang === "it" ? "+ Scrivi una recensione" : "+ Write a review"}
            </button>
          )}
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="animate-pulse h-20 bg-theme/5" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-theme pb-4 last:border-0">
              <div className="flex items-center gap-2 mb-1.5">
                <StarRating rating={review.rating} size={12} />
                <span className="text-[11px] text-muted">
                  {new Date(review.created_at).toLocaleDateString(
                    lang === "it" ? "it-IT" : "en-US",
                  )}
                </span>
              </div>
              {review.comment && (
                <p className="text-[13px] text-muted leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-muted">
          {lang === "it" ? "Nessuna recensione ancora." : "No reviews yet."}
        </p>
      )}
    </div>
  );
}
