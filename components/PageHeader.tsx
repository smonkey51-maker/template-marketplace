import Link from "next/link";

type Crumb = { label: string; href?: string };

/** Breadcrumb + kicker + title + optional subtitle, shared by every inner page. */
export default function PageHeader({
  crumbs,
  kicker,
  title,
  subtitle,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 sm:pt-10">
      <div className="glass-panel px-6 py-8 sm:px-10 sm:py-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>
        {kicker && (
          <p className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-accent">
            {kicker}
          </p>
        )}
        <h1 className={`${kicker ? "mt-2" : "mt-6"} max-w-3xl text-[clamp(1.75rem,4vw,2.5rem)]`}>
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-[16px] text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
