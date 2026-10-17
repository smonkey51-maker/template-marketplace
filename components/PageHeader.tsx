import Link from "next/link";

type Crumb = { label: string; href?: string };

/** Breadcrumb, a big title and an optional subtitle, as a dark band at the top of every inner page. */
export default function PageHeader({
  crumbs,
  title,
  subtitle,
}: {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="band tone-blue">
      <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
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
        <h1 className="band-title mt-8 max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-[18px] text-muted">{subtitle}</p>}
      </div>
    </header>
  );
}
