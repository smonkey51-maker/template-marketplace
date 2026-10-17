"use client";

import { Accordion } from "@ark-ui/react/accordion";
import { Tabs } from "@ark-ui/react/tabs";

export type LibraryBook = { slug: string; title: string; meta: string; description: string };
export type LibrarySource = { label: string; href: string };

const display = { fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 } as const;

/** La Biblioteca — built entirely with Ark UI primitives (Tabs + Accordion),
 * styled with the site's own tokens. */
export default function BibliotecaArk({
  books,
  sources,
  labels,
}: {
  books: LibraryBook[];
  sources: LibrarySource[];
  labels: { books: string; sources: string; notesTitle: string; notesIntro: string };
}) {
  const tab =
    "border-b-2 border-transparent px-1 pb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-(--muted) transition-colors data-selected:border-(--accent) data-selected:text-(--text)";
  return (
    <Tabs.Root defaultValue="books">
      <Tabs.List className="flex gap-8 border-b border-theme">
        <Tabs.Trigger value="books" className={tab}>
          {labels.books}
        </Tabs.Trigger>
        <Tabs.Trigger value="sources" className={tab}>
          {labels.sources}
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="books" className="pt-8">
        <Accordion.Root collapsible multiple defaultValue={[books[0]?.slug ?? ""]}>
          {books.map((book) => (
            <Accordion.Item
              key={book.slug}
              value={book.slug}
              className="mb-4 border border-theme r-md"
              style={{ background: "var(--surface)" }}
            >
              <Accordion.ItemTrigger className="flex w-full items-start justify-between gap-4 p-6 text-left">
                <span>
                  <span className="block text-[1.25rem] leading-snug" style={display}>
                    {book.title}
                  </span>
                  <span
                    className="mt-1 block text-[12px] font-semibold uppercase text-(--accent)"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {book.meta}
                  </span>
                </span>
                <Accordion.ItemIndicator className="text-(--accent) transition-transform data-[state=open]:rotate-180">
                  ▾
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent className="px-6 pb-6 text-[14px] leading-relaxed text-(--muted)">
                {book.description}
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Tabs.Content>

      <Tabs.Content value="sources" className="pt-8">
        <h2 className="text-[clamp(1.4rem,2.6vw,2rem)]" style={{ ...display, fontWeight: 600 }}>
          {labels.notesTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-(--muted)">{labels.notesIntro}</p>
        <ul className="mt-6 grid gap-4">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-4 border border-theme r-md p-5 text-[13px] leading-5 transition-colors hover:border-(--accent)"
                style={{ background: "var(--surface)" }}
              >
                <span>{source.label}</span>
                <span aria-hidden className="text-(--accent)">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Tabs.Content>
    </Tabs.Root>
  );
}
