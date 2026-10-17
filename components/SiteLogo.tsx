import { SITE } from "@/lib/site";

/** Wordmark: a solid rounded mark with the initial, plus the name in capitals. No gradients. */
export default function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand font-mono text-[13px] font-medium text-brand-fg"
      >
        {SITE.name.charAt(0)}
      </span>
      <span className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.1em] text-ink sm:text-[15px] sm:tracking-[0.14em]">
        {SITE.name}
      </span>
    </span>
  );
}
