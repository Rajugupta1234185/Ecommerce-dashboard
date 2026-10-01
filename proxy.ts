import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/features/auth/constants";

const PROTECTED_PATHS = ["/cart"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoggedIn = request.cookies.has(AUTH_COOKIE);

  if (isProtected(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/cart/:path*", "/login"],
};