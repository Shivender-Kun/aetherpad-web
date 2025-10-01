import { auth } from "@/auth";

const authenticationPages = ["/signin", "/signup", "/forgot", "/reset"];
const authorizedPages = ["/archive", "/bin", "/home", "/labels", "/profile"];
const authorizedAPIs = [
  "/api/v1/notes",
  "/api/v1/labels",
  "/api/v1/user/profile",
  "/api/v1/user/logout",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticationPage = authenticationPages.some((page) =>
    pathname.startsWith(page),
  );

  const isLoggedIn = !!req.auth;

  if (isAuthenticationPage && isLoggedIn) {
    return Response.redirect(new URL("/home", req.url));
  }

  const isAuthorizedPage = authorizedPages.some((page) =>
    pathname.startsWith(page),
  );
  const isAuthorizedAPI = authorizedAPIs.some((api) =>
    pathname.startsWith(api),
  );

  if ((isAuthorizedPage || isAuthorizedAPI) && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!screenshots|icons|favicon|api/auth|_next|.well-known|manifest).*)",
  ], // runs everywhere except these paths
};
