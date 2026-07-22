// ============================================================
// AKSCHOLAR — API Admin : Lister et ajouter des bourses
// GET  /api/admin/bourses
// POST /api/admin/bourses
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function verifierAdmin(request: NextRequest) {
  return !!request.cookies.get("ak-admin");
}

export async function GET(request: NextRequest) {
  if (!verifierAdmin(request))
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("bourses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });
  return NextResponse.json({ bourses: data });
}

export async function POST(request: NextRequest) {
  if (!verifierAdmin(request))
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });

  const body = await request.json();
  const { titre, pays, niveau, montant, deadline, description } = body;

  if (!titre || !pays) {
    return NextResponse.json({ erreur: "Titre et pays sont obligatoires." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("bourses")
    .insert({ titre, pays, niveau, montant, deadline, description })
    .select()
    .single();

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });
  return NextResponse.json({ bourse: data }, { status: 201 });
}
