import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import HeroUIDemo from "@/components/lab/HeroUIDemo";
import AntdDemo from "@/components/lab/AntdDemo";
import ArkDemo from "@/components/lab/ArkDemo";

export const metadata: Metadata = {
  title: "Laboratorio — OSSERVATORIO",
  robots: { index: false, follow: false },
};

const sections = [
  { name: "HeroUI", note: "v3 · React Aria + Tailwind v4", Demo: HeroUIDemo },
  { name: "Ant Design", note: "v6 · CSS-in-JS con tema personalizzato", Demo: AntdDemo },
  { name: "Ark UI", note: "headless · stile con Tailwind", Demo: ArkDemo },
];

export default function LabPage() {
  return (
    <div className="min-h-screen bg-page">
      <SiteNav />
      <main className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-10">
        <h1 className="font-display text-4xl">Laboratorio</h1>
        <p className="mt-2 text-[var(--muted)]">Test a confronto di tre librerie UI.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {sections.map(({ name, note, Demo }) => (
            <section key={name}>
              <h2 className="font-display text-2xl">{name}</h2>
              <p className="mb-4 text-xs text-[var(--muted)]">{note}</p>
              <Demo />
            </section>
          ))}
        </div>
      </main>
      <OsservatorioFooter />
    </div>
  );
}
