import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/data-pulls"];

  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
  const isLoggedIn = req.cookies.get("loggedIn")?.value === "true";

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/data-pulls/:path*"],
};
