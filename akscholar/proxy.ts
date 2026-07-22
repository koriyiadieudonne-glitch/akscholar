// ============================================================
// AKSCHOLAR — Proxy (ex-Middleware) — Next.js 16
// Protection des routes privées via le cookie ak-session
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("ak-session");
  if (!session) {
    const url = request.nextUrl.clone();
    const redirect = url.pathname;
    url.pathname = "/connexion";
    url.searchParams.set("redirect", redirect);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/coaching/:path*", "/mon-compte/:path*", "/favoris/:path*"],
};
