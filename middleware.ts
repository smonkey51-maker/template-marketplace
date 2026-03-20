import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes che richiedono login
const isProtected = createRouteMatcher([
  "/studio(.*)",
  "/account(.*)",
  "/admin(.*)",
  "/api/generate(.*)",
  "/api/customize(.*)",
  "/api/stripe-portal(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
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
