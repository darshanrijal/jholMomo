import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If the request is for an API auth route, allow it
  if (isApiAuthRoute) {
    return;
  }

  // If the request is for an auth route
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged in users from auth routes to the default login redirect page
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Allow access to auth routes if not logged in
    return;
  }

  // If the user is not logged in and the route is not public, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    let callbackURL = nextUrl.pathname;

    if (nextUrl.search) {
      callbackURL = nextUrl.search;
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return Response.redirect(`/auth/login?callbackUrL=${encodedCallbackURL}`);
  }

  // Allow access to the requested route
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
