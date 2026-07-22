// ============================================================
// AKSCHOLAR — Proxy — Next.js 16
// Routes user  : cookie ak-session  → /connexion
// Routes admin : cookie ak-admin    → /admin/login
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Routes admin ---
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminCookie = request.cookies.get("ak-admin");
    if (!adminCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // --- Routes utilisateur privées ---
  const session = request.cookies.get("ak-session");
  if (!session) {
    const url = request.nextUrl.clone();
    url.searchParams.set("redirect", pathname);
    url.pathname = "/connexion";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/coaching/:path*",
    "/mon-compte/:path*",
    "/favoris/:path*",
  ],
};
