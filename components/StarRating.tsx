"use client";

export default function StarRating({
  rating,
  max = 5,
  interactive = false,
  onRate,
  size = 16,
}: {
  rating: number;
  max?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: number;
}) {
  return (
    <div
      className="flex gap-0.5"
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(rating);
        return interactive ? (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i < rating}
            aria-label={`${i + 1} stelle`}
            onClick={() => onRate?.(i + 1)}
            className="focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            style={{
              color: filled ? "var(--accent)" : "var(--border)",
              cursor: "pointer",
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" aria-hidden>
              <path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z" />
            </svg>
          </button>
        ) : (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 10 10"
            fill="currentColor"
            style={{ color: filled ? "var(--accent)" : "var(--border)" }}
            aria-hidden
          >
            <path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z" />
          </svg>
        );
      })}
    </div>
  );
}
