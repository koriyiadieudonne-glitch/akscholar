"use client";

// ============================================================
// AKSCHOLAR — Page Opportunités (ex-Bourses)
// Filtrage par pays, niveau, type d'opportunité + recherche
// ============================================================

import { useState, useMemo, useEffect } from "react";
import ScholarshipCard from "@/components/bourses/ScholarshipCard";
import CountryFilter from "@/components/pays/CountryFilter";
import { PAYS_POPULAIRES } from "@/lib/data/mockData";
import { supabase } from "@/lib/supabase";
import type { Bourse, NiveauEtude } from "@/lib/types";

const NIVEAUX: NiveauEtude[] = ["Licence", "Master", "Doctorat", "Post-doctorat", "Tous niveaux"];

const TYPES_OPPORTUNITE = [
  { id: "bourse",      label: "Bourse",      emoji: "🎓" },
  { id: "stage",       label: "Stage",        emoji: "💼" },
  { id: "formation",   label: "Formation",    emoji: "📚" },
  { id: "conférence",  label: "Conférence",   emoji: "🎤" },
];

// Mappe les colonnes Supabase vers l'interface Bourse
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBourse(row: any): Bourse {
  return {
    id: row.id,
    titre: row.titre,
    description: row.description ?? "",
    paysId: (row.pays ?? "").toLowerCase().replace(/\s+/g, "-"),
    paysNom: row.pays ?? "",
    universite: row.universite ?? "",
    niveauEtude: Array.isArray(row.niveau) ? row.niveau : row.niveau ? [row.niveau] : [],
    typeBourse: row.type_bourse ?? "Bourse complète",
    montant: row.montant ?? "",
    dateLimite: row.deadline ?? row.date_limite ?? "",
    lienOfficiel: row.url_officiel ?? row.lien_officiel ?? "#",
    domaines: row.domaines ?? [],
    langueInstruction: row.langue_instruction ?? [],
    imageUrl: row.image_url ?? undefined,
    estVerifiee: row.est_verifiee ?? false,
    aGuideDisponible: row.a_guide_disponible ?? false,
    guideId: row.guide_id ?? undefined,
    vues: row.vues ?? 0,
    favoris: row.favoris ?? 0,
    creeLe: row.created_at ?? "",
    misAJourLe: row.updated_at ?? row.created_at ?? "",
    sourceUrl: row.source_url ?? undefined,
    typeOpportunite: row.type_opportunite ?? undefined,
  };
}

export default function PageOpportunites() {
  const [bourses, setBourses] = useState<Bourse[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");
  const [paysActifId, setPaysActifId] = useState<string | null>(null);
  const [niveauxActifs, setNiveauxActifs] = useState<NiveauEtude[]>([]);
  const [typeOpportuniteActif, setTypeOpportuniteActif] = useState<string | null>(null);
  const [guideSeul, setGuideSeul] = useState(false);

  useEffect(() => {
    async function chargerBourses() {
      setChargement(true);
      setErreur(null);
      const { data, error } = await supabase
        .from("bourses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setErreur(error.message);
      else setBourses((data ?? []).map(mapBourse));
      setChargement(false);
    }
    chargerBourses();
  }, []);

  function toggleNiveau(n: NiveauEtude) {
    setNiveauxActifs((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  }

  const opportunitesFiltrees = useMemo(() => {
    return bourses.filter((b) => {
      const matchPays = !paysActifId || b.paysId === paysActifId;
      const matchType = !typeOpportuniteActif || b.typeOpportunite === typeOpportuniteActif;
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
  }, [recherche, paysActifId, niveauxActifs, typeOpportuniteActif, guideSeul, bourses]);

  const nbFiltresActifs =
    (paysActifId ? 1 : 0) +
    niveauxActifs.length +
    (typeOpportuniteActif ? 1 : 0) +
    (guideSeul ? 1 : 0);

  function reinitialiserFiltres() {
    setPaysActifId(null);
    setNiveauxActifs([]);
    setTypeOpportuniteActif(null);
    setGuideSeul(false);
    setRecherche("");
  }

  const nb = opportunitesFiltrees.length;

  return (
    <>
      {/* En-tête de page */}
      <section className="py-10" style={{ background: "var(--ak-gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Toutes les Opportunités
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base mb-6 max-w-2xl">
            Bourses, stages, formations et conférences — explorez notre catalogue complet
            et trouvez l&apos;opportunité qui correspond à votre profil.
          </p>
          {/* Barre de recherche */}
          <div className="relative max-w-2xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher une opportunité, pays, domaine..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="ak-recherche pl-12"
              aria-label="Rechercher des opportunités"
            />
          </div>

          {/* Filtres rapides par type — en-tête */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TYPES_OPPORTUNITE.map(({ id, label, emoji }) => {
              const actif = typeOpportuniteActif === id;
              return (
                <button
                  key={id}
                  onClick={() => setTypeOpportuniteActif(actif ? null : id)}
                  className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all"
                  style={{
                    background: actif ? "white" : "rgba(255,255,255,0.15)",
                    color: actif ? "var(--ak-bleu)" : "white",
                  }}
                  aria-pressed={actif}
                >
                  {emoji} {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ---- Sidebar filtres ---- */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="sticky top-20 rounded-xl p-5" style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}>
                {/* En-tête filtres */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--ak-gris)" }}>
                    Filtres
                  </h2>
                  {nbFiltresActifs > 0 && (
                    <button onClick={reinitialiserFiltres} className="text-xs font-medium" style={{ color: "var(--ak-bleu)" }}>
                      Réinitialiser ({nbFiltresActifs})
                    </button>
                  )}
                </div>

                {/* Filtre par type d'opportunité */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                    Type d&apos;opportunité
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {TYPES_OPPORTUNITE.map(({ id, label, emoji }) => {
                      const actif = typeOpportuniteActif === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setTypeOpportuniteActif(actif ? null : id)}
                          className="text-sm text-left px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                          style={{
                            background: actif ? "var(--ak-bleu)" : "rgba(30,58,138,0.04)",
                            color: actif ? "white" : "var(--ak-gris-fonce)",
                          }}
                          aria-pressed={actif}
                        >
                          <span>{emoji}</span> {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(30,58,138,0.08)" }} className="pt-5 mb-5">
                  {/* Filtre par pays */}
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
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "var(--ak-gris-fonce)" }}>
                    {chargement ? "Chargement..." : `${nb} opportunité${nb > 1 ? "s" : ""} trouvée${nb > 1 ? "s" : ""}`}
                  </h2>
                  {recherche && !chargement && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--ak-gris)" }}>
                      pour &quot;{recherche}&quot;
                    </p>
                  )}
                </div>
              </div>

              {chargement ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "var(--ak-bleu)", borderTopColor: "transparent" }} />
                </div>
              ) : erreur ? (
                <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center"
                  style={{ background: "white", border: "2px dashed rgba(239,68,68,0.2)" }}>
                  <span className="text-5xl mb-4">⚠️</span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>Erreur de chargement</h3>
                  <p className="text-sm max-w-sm" style={{ color: "var(--ak-gris)" }}>{erreur}</p>
                </div>
              ) : opportunitesFiltrees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {opportunitesFiltrees.map((b) => (
                    <ScholarshipCard key={b.id} bourse={b} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-xl text-center"
                  style={{ background: "white", border: "2px dashed rgba(30,58,138,0.12)" }}>
                  <span className="text-5xl mb-4">🔍</span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>Aucune opportunité trouvée</h3>
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
