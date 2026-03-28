"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";

export default function ReviewForm({
  templateId,
  lang,
  onSubmitted,
}: {
  templateId: string;
  lang: "it" | "en";
  onSubmitted?: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError(lang === "it" ? "Seleziona un voto" : "Please select a rating"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? (lang === "it" ? "Errore durante il salvataggio" : "Error saving review"));
      } else {
        setSuccess(true);
        onSubmitted?.();
      }
    } catch (e) {
      console.error("[ReviewForm]", e);
      setError(lang === "it" ? "Errore di rete" : "Network error");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="py-4 text-center">
        <p className="text-[14px] font-semibold" style={{ color: "var(--accent)" }}>
          {lang === "it" ? "✓ Recensione inviata!" : "✓ Review submitted!"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <p className="text-[12px] font-semibold text-muted mb-2">
          {lang === "it" ? "Il tuo voto" : "Your rating"}
        </p>
        <StarRating rating={rating} interactive onRate={setRating} size={20} />
      </div>
      <div>
        <label className="text-[12px] font-semibold text-muted mb-1 block" htmlFor="review-comment">
          {lang === "it" ? "Commento (opzionale)" : "Comment (optional)"}
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full text-[13px] border border-theme bg-input rounded-none px-3 py-2 resize-none outline-none focus:border-accent transition-colors"
          style={{ background: "var(--input-bg)", color: "var(--text)" }}
          placeholder={lang === "it" ? "Racconta la tua esperienza..." : "Share your experience..."}
        />
      </div>
      {error && <p className="text-[12px]" style={{ color: "var(--error, #FF453A)" }}>{error}</p>}
      <button type="submit" disabled={loading} className="btn-brand-sm self-start">
        {loading ? (lang === "it" ? "Invio..." : "Submitting...") : (lang === "it" ? "Invia recensione" : "Submit review")}
      </button>
    </form>
  );
}
