// ============================================================
// AKSCHOLAR — Page Paiement Réussi
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paiement confirmé — Merci !" };

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function PageSucces({ searchParams }: Props) {
  const { type } = await searchParams;
  const estGuide = type === "guide";

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: "var(--ak-gris-leger)" }}
    >
      <div className="w-full max-w-md text-center">
        <div className="ak-carte">
          <div className="text-6xl mb-4">{estGuide ? "📚" : "🏆"}</div>

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(16,185,129,0.1)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>
            Paiement confirmé !
          </h1>

          <p className="text-sm mb-6" style={{ color: "var(--ak-gris)" }}>
            {estGuide
              ? "Votre guide Premium est disponible. Vous recevrez un email avec le lien de téléchargement dans quelques minutes."
              : "Votre réservation Coaching VIP est confirmée. Notre équipe vous contactera sous 24h pour planifier votre session."}
          </p>

          <div
            className="rounded-xl p-4 mb-6 text-left space-y-2"
            style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}
          >
            {(estGuide
              ? ["📧 Email de confirmation envoyé", "📄 PDF accessible immédiatement", "🔄 Mises à jour gratuites incluses"]
              : ["📧 Confirmation par email sous 24h", "📅 Choix de votre créneau horaire", "💬 Support WhatsApp dédié"]
            ).map((item) => (
              <p key={item} className="text-sm font-medium" style={{ color: "#059669" }}>{item}</p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/bourses" className="ak-btn-primaire justify-center">
              Explorer les bourses
            </Link>
            <Link
              href={estGuide ? "/guides" : "/coaching"}
              className="text-sm font-medium"
              style={{ color: "var(--ak-gris)" }}
            >
              {estGuide ? "Voir d'autres guides" : "Voir les formules coaching"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
