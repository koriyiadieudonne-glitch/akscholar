// ============================================================
// AKSCHOLAR — API Admin : Authentification par mot de passe
// POST /api/admin/auth
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { motDePasse } = await request.json();

  if (!motDePasse || motDePasse !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ erreur: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ak-admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 heures
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("ak-admin", "", { maxAge: 0, path: "/" });
  return response;
}
