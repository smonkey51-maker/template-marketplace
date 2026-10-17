import { SITE } from "@/lib/site";

/** The company mark (public/logo-mark.svg) followed by the name in capitals. */
export default function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" width={28} height={32} className="h-8 w-7 shrink-0" />
      <span className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.1em] text-ink sm:text-[15px] sm:tracking-[0.14em]">
        {SITE.name}
      </span>
    </span>
  );
}
