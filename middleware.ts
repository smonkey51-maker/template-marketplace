import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Routes che richiedono login
const isProtected = createRouteMatcher([
  "/:locale/studio(.*)",
  "/:locale/account(.*)",
  "/:locale/admin(.*)",
]);

const locales = ["it", "en"];
function getLocale(req: NextRequest): string {
  const acceptLanguage = req.headers.get("accept-language");
  if (!acceptLanguage) return "en";

  const langs = acceptLanguage
    .split(",")
    .map((lang: string) => lang.split(";")[0].trim().substring(0, 2).toLowerCase());

  for (const lang of langs) {
    if (lang === "it") return "it";
    if (lang === "en") return "en";
  }
  return "en"; // Fallback globale ad inglese se la lingua non è tra quelle supportate
}

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // API routes authenticate themselves and answer with a JSON 401. Calling
  // auth.protect() here instead redirected the request into a page render,
  // which then threw — so an unauthenticated POST to /api/generate came back
  // as a 500 HTML error page rather than a 401. Every protected route under
  // /api (generate, customize, stripe-portal, admin/*) already checks auth()
  // and returns 401 itself, so the middleware just gets out of the way.
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (isProtected(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // /api/preview is deliberately outside Clerk's reach: it serves a public
    // teaser, and running the middleware over it made each of the catalogue's
    // 16 preview iframes trigger an authentication handshake redirect.
    // This single pattern already covers /api/*; it is written as one negative
    // lookahead because path-to-regexp only accepts (?!...) at the start of a
    // group, so the exclusion cannot be bolted onto a separate /(api|trpc) entry.
    "/((?!_next|api/preview|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
