// ============================================================
// AKSCHOLAR — API Admin : Supprimer une bourse
// DELETE /api/admin/bourses/[id]
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const adminCookie = request.cookies.get("ak-admin");
  if (!adminCookie)
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from("bourses").delete().eq("id", id);

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
