// ============================================================
// AKSCHOLAR — Webhook Stripe
// POST /api/webhooks/stripe
// Enregistre les paiements confirmés dans Supabase
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ erreur: "Signature manquante." }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Webhook] Signature invalide :", err);
    return NextResponse.json({ erreur: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { type, id } = session.metadata ?? {};

    await supabaseAdmin.from("ventes").insert({
      produit_type: type === "guide" ? "guide" : "coaching_vip",
      produit_id: id,
      montant: (session.amount_total ?? 0) / 100,
      devise: (session.currency ?? "eur").toUpperCase(),
      statut: "complete",
      methode_paiement: "stripe",
      reference_paiement: session.payment_intent as string,
      email_acheteur: session.customer_details?.email ?? null,
      complete_le: new Date().toISOString(),
    });
  }

  return NextResponse.json({ recu: true });
}
