// ============================================================
// AKSCHOLAR — Page Annuaire des Universités
// Server Component
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";
import { UNIVERSITES_POPULAIRES, PAYS_POPULAIRES } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Annuaire des Universités",
  description:
    "Explorez les meilleures universités mondiales par pays, consultez leurs classements et découvrez les bourses associées.",
};

export default function PageUniversites() {
  const paysMap = Object.fromEntries(PAYS_POPULAIRES.map((p) => [p.id, p]));

  return (
    <>
      {/* En-tête */}
      <section className="py-12" style={{ background: "var(--ak-gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏛️</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Annuaire des Universités
            </h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base max-w-2xl">
            Explorez les meilleures universités mondiales, consultez leurs classements QS
            et découvrez toutes les bourses disponibles.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { val: "850+", label: "Universités indexées", emoji: "🏛️" },
              { val: "68", label: "Pays couverts", emoji: "🌍" },
              { val: "Top 100", label: "QS World Rankings", emoji: "🏆" },
              { val: "1 240+", label: "Bourses associées", emoji: "🎓" },
            ].map(({ val, label, emoji }) => (
              <div
                key={label}
                className="rounded-xl p-5 text-center"
                style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="text-xl font-bold" style={{ color: "var(--ak-bleu)" }}>{val}</p>
                <p className="text-xs mt-1" style={{ color: "var(--ak-gris)" }}>{label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ak-gris-fonce)" }}>
            Universités en vedette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIVERSITES_POPULAIRES.map((univ) => {
              const pays = paysMap[univ.paysId];
              return (
                <article key={univ.id} className="ak-carte">
                  {/* En-tête */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ background: "var(--ak-gradient-hero)" }}
                    >
                      {univ.nom[0]}
                    </div>
                    {univ.classementQS && (
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full shrink-0"
                        style={{ background: "rgba(245,158,11,0.12)", color: "#B45309" }}
                      >
                        🏆 QS #{univ.classementQS}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base mb-1 leading-snug" style={{ color: "var(--ak-gris-fonce)" }}>
                    {univ.nom}
                  </h3>
                  <p className="text-sm mb-3 flex items-center gap-1.5" style={{ color: "var(--ak-gris)" }}>
                    {pays ? (
                      <>
                        <span>{pays.drapeau}</span>
                        <span>{univ.ville}, {univ.paysNom}</span>
                      </>
                    ) : (
                      <span>{univ.ville}, {univ.paysNom}</span>
                    )}
                  </p>

                  {/* Domaines */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {univ.domaines.slice(0, 4).map((d) => (
                      <span
                        key={d}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(30,58,138,0.06)", color: "var(--ak-bleu)" }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Bourses associées */}
                  {univ.boursesAssociees.length > 0 && (
                    <div
                      className="flex items-center gap-2 mb-4 p-2 rounded-lg"
                      style={{ background: "rgba(16,185,129,0.06)" }}
                    >
                      <span className="text-base">🎓</span>
                      <span className="text-xs font-medium" style={{ color: "#059669" }}>
                        {univ.boursesAssociees.length} bourse{univ.boursesAssociees.length > 1 ? "s" : ""} disponible{univ.boursesAssociees.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <a
                      href={univ.lienOfficiel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 ak-btn-primaire text-sm justify-center"
                    >
                      Site officiel
                    </a>
                    {univ.boursesAssociees.length > 0 && (
                      <Link
                        href={`/bourses/${univ.boursesAssociees[0]}`}
                        className="text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                        style={{ background: "rgba(30,58,138,0.06)", color: "var(--ak-bleu)" }}
                      >
                        Voir la bourse
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA ajouter */}
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{ background: "var(--ak-gradient-hero)" }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Votre université n&apos;est pas listée ?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm mb-5 max-w-md mx-auto">
              Notre annuaire s&apos;enrichit continuellement. Suggérez une université
              et nous l&apos;ajouterons rapidement.
            </p>
            <Link href="/contact" className="ak-btn-premium">
              Suggérer une université
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
