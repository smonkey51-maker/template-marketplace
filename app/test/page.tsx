import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import TestBase from "@/components/TestBase";

// Internal component playground: not part of the public site.
export const metadata: Metadata = {
  title: "Test",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Test" }]}
        kicker="Pagina 1"
        title="Test"
        subtitle="Pagina di base: stato dell'ambiente, tipografia, pulsanti, campi e callout."
      />
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <TestBase />
      </div>
    </PageShell>
  );
}
