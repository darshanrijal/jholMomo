/**
 * An array of routes accessible to public
 * do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * An array of routes used for authentication
 * these routes redirects to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];
/**
 * Prefix for api authentication routes
 * used for api authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
