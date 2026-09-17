import { NextResponse, type NextRequest } from "next/server";

// Only two concerns remain here now that Clerk is gone: detect the visitor's
// language and redirect any un-prefixed path to /it or /en. No route is
// auth-protected any more — this is a static content site.
const locales = ["it", "en"];

function getLocale(req: NextRequest): string {
  const acceptLanguage = req.headers.get("accept-language");
  if (!acceptLanguage) return "it";

  const langs = acceptLanguage
    .split(",")
    .map((lang: string) => lang.split(";")[0].trim().substring(0, 2).toLowerCase());

  for (const lang of langs) {
    if (lang === "it") return "it";
    if (lang === "en") return "en";
  }
  return "it"; // Italian is the site default.
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|webmanifest)).*)",
  ],
};
