// ============================================================
// AKSCHOLAR — Page Tutor Match
// Server Component
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";
import { TUTEURS_DISPONIBLES } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Tutor Match — Tuteurs certifiés",
  description:
    "Trouvez votre tuteur certifié parmi des centaines d'étudiants et diplômés disponibles pour vous accompagner.",
};

export default function PageTuteurs() {
  return (
    <>
      {/* Hero */}
      <section className="py-14" style={{ background: "var(--ak-gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.95)" }}>
            🎓 Tutor Match AKSCHOLAR
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Réussissez avec un tuteur certifié
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base max-w-2xl mx-auto mb-8">
            Des étudiants et diplômés vérifiés, disponibles en ligne ou à domicile.
            Chaque tuteur a passé notre test de validation.
          </p>
          {/* Avantages rapides */}
          <div className="flex flex-wrap justify-center gap-4">
            {["✅ Tuteurs vérifiés", "🎯 Cours personnalisés", "💬 En ligne ou domicile", "⭐ Satisfaction garantie"].map((item) => (
              <span key={item} className="text-sm text-white font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* En-tête */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--ak-gris-fonce)" }}>
                Tuteurs disponibles
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--ak-gris)" }}>
                {TUTEURS_DISPONIBLES.length} tuteurs sur {320}+ disponibles
              </p>
            </div>
            {/* Devenez tuteur */}
            <Link
              href="/tuteurs/inscription"
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ background: "rgba(30,58,138,0.07)", color: "var(--ak-bleu)", border: "1px solid rgba(30,58,138,0.15)" }}
            >
              + Devenir tuteur
            </Link>
          </div>

          {/* Grille tuteurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TUTEURS_DISPONIBLES.map((tuteur) => (
              <article key={tuteur.id} className="ak-carte">
                {/* En-tête */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-bold"
                    style={{ background: "var(--ak-gradient-hero)" }}
                  >
                    {tuteur.prenom[0]}{tuteur.nom[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h3 className="font-bold text-base" style={{ color: "var(--ak-gris-fonce)" }}>
                        {tuteur.prenom} {tuteur.nom}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-bold" style={{ color: "var(--ak-gris-fonce)" }}>{tuteur.note}</span>
                      </div>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--ak-gris)" }}>
                      {tuteur.niveauEtude}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--ak-gris)" }}>
                      {tuteur.universite}
                    </p>
                  </div>
                </div>

                {/* Matières */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tuteur.matieres.slice(0, 4).map((m) => (
                    <span key={m} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(30,58,138,0.07)", color: "var(--ak-bleu)" }}>
                      {m}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--ak-gris)" }}>
                  {tuteur.bio}
                </p>

                {/* Infos */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="rounded-lg p-2" style={{ background: "rgba(30,58,138,0.04)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--ak-bleu)" }}>{tuteur.tarif}€</p>
                    <p className="text-xs" style={{ color: "var(--ak-gris)" }}>/heure</p>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: "rgba(30,58,138,0.04)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--ak-bleu)" }}>{tuteur.nombreCours}</p>
                    <p className="text-xs" style={{ color: "var(--ak-gris)" }}>cours</p>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: "rgba(30,58,138,0.04)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--ak-bleu)" }}>
                      {tuteur.modeCours.includes("en_ligne") ? "🖥️" : "🏠"}
                    </p>
                    <p className="text-xs" style={{ color: "var(--ak-gris)" }}>
                      {tuteur.modeCours.includes("en_ligne") && tuteur.modeCours.includes("domicile")
                        ? "Hybride"
                        : tuteur.modeCours.includes("en_ligne")
                        ? "En ligne"
                        : "Domicile"}
                    </p>
                  </div>
                </div>

                <Link href={`/tuteurs/${tuteur.id}`} className="ak-btn-primaire w-full justify-center text-sm">
                  Voir le profil & Réserver
                </Link>
              </article>
            ))}

            {/* Carte "Voir plus" */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl p-8 text-center"
              style={{ background: "white", border: "2px dashed rgba(30,58,138,0.15)", boxShadow: "var(--ak-ombre-carte)" }}
            >
              <span className="text-4xl mb-3">👩‍🎓</span>
              <p className="text-base font-semibold mb-1" style={{ color: "var(--ak-gris-fonce)" }}>
                320+ tuteurs disponibles
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--ak-gris)" }}>
                Affinez votre recherche par matière, disponibilité ou mode de cours.
              </p>
              <button className="ak-btn-primaire text-sm">
                Voir tous les tuteurs
              </button>
            </div>
          </div>

          {/* Section Devenir Tuteur */}
          <div
            className="mt-14 rounded-2xl p-8"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Vous êtes étudiant ou diplômé ?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base">
                  Rejoignez notre réseau de tuteurs certifiés et gagnez de l&apos;argent en partageant
                  vos connaissances. Validez votre profil en 48h.
                </p>
              </div>
              <Link href="/tuteurs/inscription" className="ak-btn-premium shrink-0">
                Devenir tuteur AKSCHOLAR
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
