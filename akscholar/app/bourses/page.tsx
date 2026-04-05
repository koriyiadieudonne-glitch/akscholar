"use client";

// ============================================================
// AKSCHOLAR — Page Liste des Bourses
// Filtrage par pays, niveau, type, domaine + recherche
// ============================================================

import { useState, useMemo } from "react";
import ScholarshipCard from "@/components/bourses/ScholarshipCard";
import CountryFilter from "@/components/pays/CountryFilter";
import {
  BOURSES_RECENTES,
  PAYS_POPULAIRES,
} from "@/lib/data/mockData";
import type { NiveauEtude, TypeBourse } from "@/lib/types";

const NIVEAUX: NiveauEtude[] = ["Licence", "Master", "Doctorat", "Post-doctorat", "Tous niveaux"];
const TYPES: TypeBourse[] = ["Bourse complète", "Bourse partielle", "Stage", "Programme d'échange", "Résidence de recherche"];

export default function PageBourses() {
  const [recherche, setRecherche] = useState("");
  const [paysActifId, setPaysActifId] = useState<string | null>(null);
  const [niveauxActifs, setNiveauxActifs] = useState<NiveauEtude[]>([]);
  const [typeActif, setTypeActif] = useState<TypeBourse | null>(null);
  const [guideSeul, setGuideSeul] = useState(false);

  function toggleNiveau(n: NiveauEtude) {
    setNiveauxActifs((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  }

  const boursesFiltrees = useMemo(() => {
    return BOURSES_RECENTES.filter((b) => {
      const matchPays = !paysActifId || b.paysId === paysActifId;
      const matchType = !typeActif || b.typeBourse === typeActif;
      const matchNiveau =
        niveauxActifs.length === 0 ||
        niveauxActifs.some((n) => b.niveauEtude.includes(n));
      const matchGuide = !guideSeul || b.aGuideDisponible;
      const termeLower = recherche.toLowerCase();
      const matchRecherche =
        !recherche ||
        b.titre.toLowerCase().includes(termeLower) ||
        b.paysNom.toLowerCase().includes(termeLower) ||
        b.universite.toLowerCase().includes(termeLower) ||
        b.domaines.some((d) => d.toLowerCase().includes(termeLower));
      return matchPays && matchType && matchNiveau && matchGuide && matchRecherche;
    });
  }, [recherche, paysActifId, niveauxActifs, typeActif, guideSeul]);

  const nbFiltresActifs =
    (paysActifId ? 1 : 0) +
    niveauxActifs.length +
    (typeActif ? 1 : 0) +
    (guideSeul ? 1 : 0);

  function reinitialiserFiltres() {
    setPaysActifId(null);
    setNiveauxActifs([]);
    setTypeActif(null);
    setGuideSeul(false);
    setRecherche("");
  }

  return (
    <>
      {/* En-tête de page */}
      <section
        className="py-10"
        style={{ background: "var(--ak-gradient-hero)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Toutes les Bourses d&apos;Études
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base mb-6 max-w-2xl">
            Explorez notre catalogue complet de bourses internationales et trouvez celle
            qui correspond à votre profil académique.
          </p>
          {/* Barre de recherche */}
          <div className="relative max-w-2xl">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#94A3B8" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher une bourse, université, domaine..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="ak-recherche pl-12"
              aria-label="Rechercher des bourses"
            />
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ---- Sidebar filtres ---- */}
            <aside className="w-full lg:w-72 shrink-0">
              <div
                className="sticky top-20 rounded-xl p-5"
                style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}
              >
                {/* En-tête filtres */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--ak-gris)" }}>
                    Filtres
                  </h2>
                  {nbFiltresActifs > 0 && (
                    <button
                      onClick={reinitialiserFiltres}
                      className="text-xs font-medium transition-colors"
                      style={{ color: "var(--ak-bleu)" }}
                    >
                      Réinitialiser ({nbFiltresActifs})
                    </button>
                  )}
                </div>

                {/* Filtre par pays */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                    Pays
                  </h3>
                  <CountryFilter
                    pays={PAYS_POPULAIRES}
                    paysActifId={paysActifId ?? undefined}
                    onSelectPays={setPaysActifId}
                  />
                </div>

                <div style={{ borderTop: "1px solid rgba(30,58,138,0.08)" }} className="pt-5 mb-5">
                  {/* Filtre par niveau */}
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                    Niveau d&apos;études
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {NIVEAUX.map((n) => {
                      const actif = niveauxActifs.includes(n);
                      return (
                        <button
                          key={n}
                          onClick={() => toggleNiveau(n)}
                          className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                          style={{
                            background: actif ? "var(--ak-bleu)" : "rgba(30,58,138,0.06)",
                            color: actif ? "white" : "var(--ak-bleu)",
                          }}
                          aria-pressed={actif}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(30,58,138,0.08)" }} className="pt-5 mb-5">
                  {/* Filtre par type */}
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                    Type de bourse
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {TYPES.map((t) => {
                      const actif = typeActif === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setTypeActif(actif ? null : t)}
                          className="text-xs text-left px-3 py-2 rounded-lg font-medium transition-all"
                          style={{
                            background: actif ? "var(--ak-bleu)" : "rgba(30,58,138,0.04)",
                            color: actif ? "white" : "var(--ak-gris-fonce)",
                          }}
                          aria-pressed={actif}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(30,58,138,0.08)" }} className="pt-5">
                  {/* Filtre guide disponible */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className="relative w-10 h-5 rounded-full transition-colors shrink-0"
                      style={{ background: guideSeul ? "var(--ak-bleu)" : "rgba(30,58,138,0.15)" }}
                      onClick={() => setGuideSeul(!guideSeul)}
                    >
                      <div
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                        style={{ transform: guideSeul ? "translateX(1.25rem)" : "translateX(0.125rem)" }}
                      />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--ak-gris-fonce)" }}>
                      Guide Premium disponible
                    </span>
                  </label>
                </div>
              </div>
            </aside>

            {/* ---- Grille résultats ---- */}
            <main className="flex-1 min-w-0">
              {/* En-tête résultats */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "var(--ak-gris-fonce)" }}>
                    {boursesFiltrees.length} bourse{boursesFiltrees.length > 1 ? "s" : ""} trouvée
                    {boursesFiltrees.length > 1 ? "s" : ""}
                  </h2>
                  {recherche && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--ak-gris)" }}>
                      pour &quot;{recherche}&quot;
                    </p>
                  )}
                </div>
              </div>

              {boursesFiltrees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {boursesFiltrees.map((b) => (
                    <ScholarshipCard key={b.id} bourse={b} />
                  ))}
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-20 rounded-xl text-center"
                  style={{ background: "white", border: "2px dashed rgba(30,58,138,0.12)" }}
                >
                  <span className="text-5xl mb-4">🔍</span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>
                    Aucune bourse trouvée
                  </h3>
                  <p className="text-sm max-w-sm mb-5" style={{ color: "var(--ak-gris)" }}>
                    Essayez d&apos;autres termes ou modifiez vos filtres.
                  </p>
                  <button className="ak-btn-primaire text-sm" onClick={reinitialiserFiltres}>
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
