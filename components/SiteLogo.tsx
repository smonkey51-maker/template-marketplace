/** SANDBOX wordmark: a solid square mark plus the name in capitals. No gradients. */
export default function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-sm bg-brand font-mono text-[13px] font-medium text-brand-fg"
      >
        S
      </span>
      <span className="text-[15px] font-semibold tracking-[0.14em] text-ink">SANDBOX</span>
    </span>
  );
}
