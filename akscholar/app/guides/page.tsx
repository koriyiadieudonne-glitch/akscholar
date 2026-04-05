// ============================================================
// AKSCHOLAR — Page Guides Premium
// Server Component
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";
import { BOURSES_RECENTES } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Guides Premium — Maximisez vos chances",
  description:
    "Des guides pas-à-pas rédigés par des lauréats de bourses pour maximiser vos chances de succès.",
};

// Guides dérivés des bourses avec guide disponible
const guidesDisponibles = BOURSES_RECENTES.filter((b) => b.aGuideDisponible).map((b) => ({
  id: b.guideId!,
  bourseId: b.id,
  bourseNom: b.titre,
  paysNom: b.paysNom,
  prix: 9.99,
  note: 4.8,
  nombreVentes: Math.floor(b.favoris / 5),
  chapitres: [
    "Comprendre la bourse",
    "Rédiger une lettre de motivation parfaite",
    "Préparer les documents",
    "Passer l'entretien",
    "Checklist finale",
  ],
}));

export default function PageGuides() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">⭐</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#1a1a1a" }}>
            Guides Premium AKSCHOLAR
          </h1>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: "rgba(0,0,0,0.6)" }}>
            Des guides pas-à-pas rédigés par des lauréats de bourses. Exactement ce qu&apos;il faut
            écrire, comment vous démarquer, et les erreurs fatales à éviter.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {["📝 Lettres de motivation types", "📋 Checklists documents", "🎯 Stratégies gagnantes", "🎤 Préparer l'entretien"].map((item) => (
              <span key={item} className="text-sm font-semibold" style={{ color: "rgba(0,0,0,0.7)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { val: "4 800+", label: "Guides vendus", emoji: "📚" },
              { val: "4.8/5", label: "Note moyenne", emoji: "⭐" },
              { val: "95%", label: "Taux de satisfaction", emoji: "✅" },
              { val: "À partir de 9,99€", label: "Accès immédiat", emoji: "💳" },
            ].map(({ val, label, emoji }) => (
              <div key={label} className="rounded-xl p-4 text-center" style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}>
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="text-lg font-bold" style={{ color: "var(--ak-bleu)" }}>{val}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--ak-gris)" }}>{label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ak-gris-fonce)" }}>
            Guides disponibles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidesDisponibles.map((guide) => (
              <article key={guide.id} className="ak-carte">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="ak-badge-guide">⭐ Guide Premium</span>
                  <span className="ak-badge-pays">{guide.paysNom}</span>
                </div>

                <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: "var(--ak-gris-fonce)" }}>
                  Guide complet : {guide.bourseNom}
                </h3>

                {/* Chapitres */}
                <ul className="mb-4 space-y-1">
                  {guide.chapitres.map((ch) => (
                    <li key={ch} className="flex items-start gap-2 text-xs" style={{ color: "var(--ak-gris)" }}>
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      {ch}
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: "var(--ak-gris)" }}>
                  <span>⭐ {guide.note}/5</span>
                  <span>•</span>
                  <span>{guide.nombreVentes} achats</span>
                  <span>•</span>
                  <span>Accès immédiat</span>
                </div>

                <div className="flex-1" />

                {/* Prix & CTA */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-extrabold" style={{ color: "var(--ak-bleu)" }}>
                    {guide.prix.toFixed(2)}€
                  </span>
                  <Link href={`/guides/${guide.id}`} className="ak-btn-premium text-sm">
                    Acheter le guide
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Garantie */}
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{ background: "white", boxShadow: "var(--ak-ombre-carte)", border: "2px solid rgba(245,158,11,0.2)" }}
          >
            <span className="text-4xl block mb-3">🛡️</span>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>
              Satisfait ou remboursé — 30 jours
            </h3>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--ak-gris)" }}>
              Si notre guide ne vous aide pas à améliorer votre dossier, nous vous remboursons
              intégralement dans les 30 jours suivant l&apos;achat. Sans questions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
