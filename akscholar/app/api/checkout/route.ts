// ============================================================
// AKSCHOLAR — API Route : Créer une Stripe Checkout Session
// POST /api/checkout
// Body: { type: 'guide' | 'coaching', id: string, nom: string, prix: number }
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { type, id, nom, prix } = await request.json();

    if (!type || !id || !nom || typeof prix !== "number") {
      return NextResponse.json({ erreur: "Paramètres manquants." }, { status: 400 });
    }

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: nom,
              description:
                type === "guide"
                  ? "Guide Premium AKSCHOLAR — PDF téléchargeable, accès à vie"
                  : "Coaching VIP AKSCHOLAR — Accompagnement personnalisé",
            },
            unit_amount: Math.round(prix * 100), // centimes
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}&type=${type}`,
      cancel_url: `${origin}/paiement/annule`,
      metadata: { type, id },
      payment_method_types: ["card"],
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Checkout] Erreur Stripe :", err);
    return NextResponse.json({ erreur: "Erreur lors de la création du paiement." }, { status: 500 });
  }
}
