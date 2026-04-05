"use client";

// ============================================================
// AKSCHOLAR — Page d'Accueil
// "use client" nécessaire pour useState (filtre pays + recherche)
// Les données seront récupérées depuis Firestore en production
// ============================================================

import { useState, useMemo } from "react";
import Link from "next/link";
import ScholarshipCard from "@/components/bourses/ScholarshipCard";
import CountryFilter from "@/components/pays/CountryFilter";
import {
  BOURSES_RECENTES,
  PAYS_POPULAIRES,
  TUTEURS_DISPONIBLES,
  STATS_PLATEFORME,
} from "@/lib/data/mockData";
import type { Bourse } from "@/lib/types";

// ----------------------------------------------------------
// Composant : Barre de recherche héro
// ----------------------------------------------------------
function BarreRechercheHero({
  valeur,
  onChange,
}: {
  valeur: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-2xl">
      {/* Icône loupe */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ color: "#94A3B8" }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        placeholder="Trouve ta bourse, université ou tuteur..."
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        className="ak-recherche pl-12 pr-36"
        aria-label="Rechercher une bourse, université ou tuteur"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 ak-btn-primaire text-sm px-4 py-2"
        aria-label="Lancer la recherche"
      >
        Rechercher
      </button>
    </div>
  );
}

// ----------------------------------------------------------
// Composant : Section des statistiques
// ----------------------------------------------------------
function SectionStats() {
  const stats = [
    { valeur: `${STATS_PLATEFORME.totalBourses}+`, label: "Bourses indexées", emoji: "🎓" },
    { valeur: `${STATS_PLATEFORME.totalPays}`, label: "Pays couverts", emoji: "🌍" },
    { valeur: `${STATS_PLATEFORME.totalUniversites}+`, label: "Universités", emoji: "🏛️" },
    { valeur: `${STATS_PLATEFORME.etudiants.toLocaleString("fr-FR")}+`, label: "Étudiants aidés", emoji: "✨" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        >
          <div className="text-2xl mb-1">{stat.emoji}</div>
          <div className="text-2xl font-bold text-white">{stat.valeur}</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------------
// Composant : Navigation rapide par pays (scrollable)
// ----------------------------------------------------------
function NavigationPaysRapide({
  paysActifId,
  onSelect,
}: {
  paysActifId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="ak-scroll-horizontal flex gap-3 pb-2">
      {/* Bouton "Tous" */}
      <button
        onClick={() => onSelect(null)}
        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        style={{
          background: !paysActifId ? "var(--ak-bleu)" : "white",
          color: !paysActifId ? "white" : "var(--ak-gris-fonce)",
          border: !paysActifId ? "none" : "1.5px solid rgba(30,58,138,0.15)",
          boxShadow: !paysActifId ? "0 2px 8px rgba(30,58,138,0.3)" : "var(--ak-ombre-carte)",
        }}
      >
        🌍 Tous
      </button>
      {PAYS_POPULAIRES.map((pays) => {
        const estActif = paysActifId === pays.id;
        return (
          <button
            key={pays.id}
            onClick={() => onSelect(estActif ? null : pays.id)}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: estActif ? "var(--ak-bleu)" : "white",
              color: estActif ? "white" : "var(--ak-gris-fonce)",
              border: estActif ? "none" : "1.5px solid rgba(30,58,138,0.15)",
              boxShadow: estActif ? "0 2px 8px rgba(30,58,138,0.3)" : "var(--ak-ombre-carte)",
            }}
            aria-pressed={estActif}
          >
            <span>{pays.drapeau}</span>
            <span>{pays.nom}</span>
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: estActif ? "rgba(255,255,255,0.25)" : "rgba(30,58,138,0.08)",
                color: estActif ? "white" : "var(--ak-bleu)",
              }}
            >
              {pays.nombreBourses}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------
// Composant : Aperçu d'un tuteur
// ----------------------------------------------------------
function CarteTuteurApercu() {
  return (
    <section className="py-16" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--ak-gris-fonce)" }}
            >
              Tutor Match
            </h2>
            <p style={{ color: "var(--ak-gris)" }} className="text-sm">
              Des tuteurs certifiés pour vous accompagner dans vos études
            </p>
          </div>
          <Link href="/tuteurs" className="ak-btn-primaire text-sm">
            Voir tous les tuteurs
          </Link>
        </div>

        {/* Grille tuteurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TUTEURS_DISPONIBLES.map((tuteur) => (
            <div
              key={tuteur.id}
              className="ak-carte flex items-start gap-4 p-4"
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "var(--ak-gradient-hero)" }}
              >
                {tuteur.prenom[0]}{tuteur.nom[0]}
              </div>
              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "var(--ak-gris-fonce)" }}
                  >
                    {tuteur.prenom} {tuteur.nom}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-bold" style={{ color: "var(--ak-gris-fonce)" }}>
                      {tuteur.note}
                    </span>
                  </div>
                </div>
                <p className="text-xs mb-2 truncate" style={{ color: "var(--ak-gris)" }}>
                  {tuteur.niveauEtude} — {tuteur.universite}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tuteur.matieres.slice(0, 3).map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(30,58,138,0.06)", color: "var(--ak-bleu)" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: "var(--ak-bleu)" }}>
                    {tuteur.tarif}€/h
                  </span>
                  <Link
                    href={`/tuteurs/${tuteur.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: "var(--ak-bleu)", color: "white" }}
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------
// PAGE PRINCIPALE
// ----------------------------------------------------------
export default function PageAccueil() {
  const [recherche, setRecherche] = useState("");
  const [paysActifId, setPaysActifId] = useState<string | null>(null);

  // Filtrage des bourses selon pays sélectionné + terme de recherche
  const boursesFiltrees = useMemo<Bourse[]>(() => {
    return BOURSES_RECENTES.filter((b) => {
      const matchPays = !paysActifId || b.paysId === paysActifId;
      const termeLower = recherche.toLowerCase();
      const matchRecherche =
        !recherche ||
        b.titre.toLowerCase().includes(termeLower) ||
        b.paysNom.toLowerCase().includes(termeLower) ||
        b.universite.toLowerCase().includes(termeLower) ||
        b.domaines.some((d) => d.toLowerCase().includes(termeLower));
      return matchPays && matchRecherche;
    });
  }, [recherche, paysActifId]);

  return (
    <>
      {/* ====================================================
          SECTION HÉRO
          ==================================================== */}
      <section className="ak-hero py-16 md:py-24 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge d'accroche */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.95)" }}
            >
              <span className="text-base">🚀</span>
              La plateforme #1 des bourses africaines vers le monde
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center leading-tight mb-4">
            Trouve ta{" "}
            <span
              className="relative"
              style={{
                color: "var(--ak-or)",
                textShadow: "0 0 30px rgba(245,158,11,0.4)",
              }}
            >
              bourse d&apos;études
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
              et réalise ton rêve académique
            </span>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-center text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Bourses, stages, universités, tuteurs — tout ce dont tu as besoin pour étudier
            en France, Canada, Allemagne, Royaume-Uni et bien plus encore.
          </p>

          {/* Barre de recherche */}
          <div className="flex justify-center mb-12">
            <BarreRechercheHero valeur={recherche} onChange={setRecherche} />
          </div>

          {/* Statistiques */}
          <SectionStats />
        </div>
      </section>

      {/* ====================================================
          NAVIGATION PAR PAYS (scrollable, sticky)
          ==================================================== */}
      <section
        className="py-6 sticky top-16 z-40"
        style={{
          background: "var(--ak-gris-leger)",
          borderBottom: "1px solid rgba(30,58,138,0.08)",
          boxShadow: "0 2px 8px rgba(30,58,138,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationPaysRapide
            paysActifId={paysActifId}
            onSelect={setPaysActifId}
          />
        </div>
      </section>

      {/* ====================================================
          SECTION PRINCIPALE : BOURSES + FILTRE
          ==================================================== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ---- Sidebar filtre pays (desktop) ---- */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div
                className="sticky top-36 rounded-xl p-4"
                style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}
              >
                <h2
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--ak-gris)", letterSpacing: "0.08em" }}
                >
                  Filtrer par pays
                </h2>
                <CountryFilter
                  pays={PAYS_POPULAIRES}
                  paysActifId={paysActifId ?? undefined}
                  onSelectPays={setPaysActifId}
                />
              </div>
            </aside>

            {/* ---- Contenu principal ---- */}
            <main className="flex-1 min-w-0">
              {/* En-tête résultats */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--ak-gris-fonce)" }}
                  >
                    {paysActifId
                      ? `Bourses — ${PAYS_POPULAIRES.find((p) => p.id === paysActifId)?.nom}`
                      : "Dernières Bourses Disponibles"}
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: "var(--ak-gris)" }}>
                    {boursesFiltrees.length} bourse{boursesFiltrees.length > 1 ? "s" : ""} trouvée
                    {boursesFiltrees.length > 1 ? "s" : ""}
                    {recherche && ` pour "${recherche}"`}
                  </p>
                </div>

                {/* Lien "Voir tout" */}
                <Link href="/bourses" className="ak-btn-primaire text-sm">
                  Toutes les bourses
                </Link>
              </div>

              {/* Grille des bourses */}
              {boursesFiltrees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {boursesFiltrees.map((bourse) => (
                    <ScholarshipCard key={bourse.id} bourse={bourse} />
                  ))}
                </div>
              ) : (
                /* État vide */
                <div
                  className="flex flex-col items-center justify-center py-16 rounded-xl text-center"
                  style={{ background: "white", border: "2px dashed rgba(30,58,138,0.12)" }}
                >
                  <span className="text-5xl mb-4">🔍</span>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--ak-gris-fonce)" }}
                  >
                    Aucune bourse trouvée
                  </h3>
                  <p className="text-sm max-w-sm" style={{ color: "var(--ak-gris)" }}>
                    Essayez d&apos;autres termes ou sélectionnez un autre pays.
                  </p>
                  <button
                    className="mt-4 ak-btn-primaire text-sm"
                    onClick={() => {
                      setRecherche("");
                      setPaysActifId(null);
                    }}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}

              {/* CTA "Voir plus" */}
              {boursesFiltrees.length > 0 && (
                <div className="text-center mt-10">
                  <Link href="/bourses" className="ak-btn-primaire">
                    Voir toutes les bourses disponibles
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION GUIDES PREMIUM
          ==================================================== */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span
                className="ak-badge-guide inline-flex mb-4"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }}
              >
                ⭐ Guides Premium AKSCHOLAR
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Maximisez vos chances de succès
              </h2>
              <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
                Nos guides pas-à-pas sont rédigés par des lauréats de bourses. Ils vous
                donnent exactement ce qu&apos;il faut écrire, comment vous démarquer, et
                les erreurs fatales à éviter.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-white text-sm">
                  <span className="text-base">✅</span> Lettre de motivation type
                </div>
                <div className="flex items-center gap-2 text-white text-sm">
                  <span className="text-base">✅</span> Calendrier de candidature
                </div>
                <div className="flex items-center gap-2 text-white text-sm">
                  <span className="text-base">✅</span> Checklist documents
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Link href="/guides" className="ak-btn-premium text-base px-8 py-3">
                ⭐ Découvrir les Guides
              </Link>
              <p className="text-center mt-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                À partir de 9,99€ · Accès immédiat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION TUTOR MATCH
          ==================================================== */}
      <CarteTuteurApercu />

      {/* ====================================================
          SECTION COACHING VIP
          ==================================================== */}
      <section
        className="py-16"
        style={{ background: "var(--ak-gris-leger)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl block mb-4">🏆</span>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--ak-gris-fonce)" }}
          >
            Accompagnement VIP Personnalisé
          </h2>
          <p className="text-base mb-8 max-w-2xl mx-auto" style={{ color: "var(--ak-gris)" }}>
            Travaillez directement avec un expert AKSCHOLAR qui a aidé des centaines
            d&apos;étudiants à décrocher des bourses compétitives. Session individuelle,
            révision de dossier, coaching entretien.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "📝", titre: "Révision de dossier", desc: "Votre CV, LM et dossier passés au crible par un expert" },
              { icon: "🎯", titre: "Stratégie de candidature", desc: "Sélection des meilleures bourses selon votre profil" },
              { icon: "🎤", titre: "Coaching entretien", desc: "Simulation d'entretien et feedback détaillé" },
            ].map((service) => (
              <div
                key={service.titre}
                className="ak-carte text-center p-5"
              >
                <span className="text-3xl block mb-3">{service.icon}</span>
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--ak-gris-fonce)" }}
                >
                  {service.titre}
                </h3>
                <p className="text-xs" style={{ color: "var(--ak-gris)" }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <Link href="/coaching" className="ak-btn-primaire text-base px-8 py-3">
            Réserver une session VIP
          </Link>
        </div>
      </section>

      {/* ====================================================
          CTA FINAL — Annuaire Universités
          ==================================================== */}
      <section className="py-12 text-center" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--ak-gris-fonce)" }}
          >
            🏛️ Annuaire des Universités Mondiales
          </h2>
          <p className="text-sm mb-5 max-w-lg mx-auto" style={{ color: "var(--ak-gris)" }}>
            Explorez les meilleures universités par pays, consultez leurs classements
            et découvrez toutes les bourses associées.
          </p>
          <Link href="/universites" className="ak-btn-primaire">
            Explorer l&apos;annuaire →
          </Link>
        </div>
      </section>
    </>
  );
}
