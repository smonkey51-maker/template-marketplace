/**
 * An endless band of large outlined words. Decorative (the same services are listed in
 * text elsewhere), so it is hidden from assistive tech and from the contrast audit.
 * Two identical halves scroll by exactly one half's width, so the loop has no seam; it is
 * a `transform` animation only, paused on hover and static for reduced motion.
 */
export default function Marquee({ items }: { items: string[] }) {
  const half = (
    <div className="marquee-half">
      {items.map((t) => (
        <span key={t} className="marquee-item">
          {t}
          <i aria-hidden className="marquee-dot" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="marquee">
      <div className="marquee-track">
        {half}
        {half}
      </div>
    </div>
  );
}
