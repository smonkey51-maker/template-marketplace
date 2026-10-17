import SiteNav from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import NavDock from "@/components/NavDock";
import IndexMenu from "@/components/IndexMenu";

/** Common frame for every page: nav, a main landmark that fills the screen, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <NavDock />
      <IndexMenu />
    </div>
  );
}
