import { SITE } from "@/lib/site";

/**
 * The company mark (public/logo-mark.png) followed by the name in capitals. `tile` sets the
 * mark on a white square, for the blue footer band where the navy mark would sink.
 */
export default function SiteLogo({
  className = "",
  tile = false,
}: {
  className?: string;
  tile?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt=""
        width={30}
        height={34}
        className={`h-[34px] w-[30px] shrink-0 object-contain ${tile ? "rounded-[4px] bg-white p-1" : ""}`}
      />
      <span className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.1em] text-ink sm:text-[15px] sm:tracking-[0.14em]">
        {SITE.name}
      </span>
    </span>
  );
}
