import CatalogoHub from "./CatalogoHub";

/**
 * The catalogue hub: three format tiles + bundles, each a real navigation
 * into its own page (catalogo/[gruppo], catalogo/bundle) — see CatalogoHub
 * for why. This route used to read `?gruppo=` and render the whole grid
 * itself; that state now lives in the URL path instead of a query param, so
 * there's nothing left for this server shell to do beyond rendering the hub.
 */
export default function CatalogoPage() {
  return <CatalogoHub />;
}
