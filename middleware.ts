import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes che richiedono login
const isProtected = createRouteMatcher([
  "/:locale/studio(.*)",
  "/:locale/account(.*)",
  "/:locale/admin(.*)",
  "/api/generate(.*)",
  "/api/customize(.*)",
  "/api/stripe-portal(.*)",
  "/api/admin(.*)",
]);

const locales = ["it", "en"];
function getLocale(req: any): string {
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

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    if (isProtected(req)) await auth.protect();
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
