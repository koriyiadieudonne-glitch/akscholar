// ============================================================
// AKSCHOLAR — Page Détail d'une Bourse
// Server Component — params est une Promise (voir AGENTS.md)
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";
import { BOURSES_RECENTES } from "@/lib/data/mockData";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const bourse = BOURSES_RECENTES.find((b) => b.id === id);
  if (!bourse) return { title: "Bourse introuvable" };
  return {
    title: bourse.titre,
    description: bourse.description,
  };
}

export default async function PageDetailBourse({ params }: Props) {
  const { id } = await params;
  const bourse = BOURSES_RECENTES.find((b) => b.id === id);

  if (!bourse) notFound();

  const dateLimite = new Date(bourse.dateLimite);
  const maintenant = new Date();
  const joursRestants = Math.ceil(
    (dateLimite.getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24)
  );
  const estExpiree = joursRestants < 0;
  const estUrgente = !estExpiree && joursRestants <= 30;

  const dateFormatee = dateLimite.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Fil d'Ariane */}
      <div className="py-3" style={{ background: "white", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--ak-gris)" }}>
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/bourses" className="hover:underline">Bourses</Link>
            <span>/</span>
            <span style={{ color: "var(--ak-gris-fonce)" }} className="font-medium truncate max-w-xs">
              {bourse.titre}
            </span>
          </nav>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ---- Contenu principal ---- */}
            <article className="flex-1 min-w-0">

              {/* En-tête */}
              <div className="ak-carte mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="ak-badge-pays">{bourse.paysNom}</span>
                  {bourse.estVerifiee && (
                    <span className="ak-badge-verifie">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Vérifié
                    </span>
                  )}
                  {bourse.aGuideDisponible && (
                    <span className="ak-badge-guide">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Guide dispo
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                  {bourse.titre}
                </h1>
                <p className="flex items-center gap-2 text-sm mb-4" style={{ color: "var(--ak-gris)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {bourse.universite}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--ak-gris-fonce)" }}>
                  {bourse.description}
                </p>
              </div>

              {/* Informations clés */}
              <div className="ak-carte mb-6">
                <h2 className="font-bold text-lg mb-5" style={{ color: "var(--ak-gris-fonce)" }}>
                  Informations clés
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Montant", valeur: bourse.montant, icone: "💰" },
                    { label: "Type", valeur: bourse.typeBourse, icone: "🎓" },
                    { label: "Pays", valeur: bourse.paysNom, icone: "🌍" },
                  ].map(({ label, valeur, icone }) => (
                    <div
                      key={label}
                      className="rounded-xl p-4 text-center"
                      style={{ background: "rgba(30,58,138,0.04)" }}
                    >
                      <div className="text-2xl mb-1">{icone}</div>
                      <p className="text-xs mb-1" style={{ color: "var(--ak-gris)" }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: "var(--ak-bleu)" }}>{valeur}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Niveaux + Langues + Domaines */}
              <div className="ak-carte mb-6">
                <h2 className="font-bold text-lg mb-5" style={{ color: "var(--ak-gris-fonce)" }}>
                  Critères d&apos;éligibilité
                </h2>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--ak-gris)" }}>Niveaux d&apos;études acceptés</p>
                  <div className="flex flex-wrap gap-2">
                    {bourse.niveauEtude.map((n) => (
                      <span key={n} className="text-sm px-3 py-1 rounded-full font-medium" style={{ background: "rgba(30,58,138,0.08)", color: "var(--ak-bleu)" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--ak-gris)" }}>Domaines concernés</p>
                  <div className="flex flex-wrap gap-2">
                    {bourse.domaines.map((d) => (
                      <span key={d} className="text-sm px-3 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--ak-gris)" }}>Langues d&apos;enseignement</p>
                  <div className="flex flex-wrap gap-2">
                    {bourse.langueInstruction.map((l) => (
                      <span key={l} className="text-sm px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#B45309" }}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="ak-carte">
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--ak-gris-fonce)" }}>
                  Popularité
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "var(--ak-bleu)" }}>
                      {bourse.vues.toLocaleString("fr-FR")}
                    </p>
                    <p className="text-sm" style={{ color: "var(--ak-gris)" }}>Vues</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "var(--ak-or)" }}>
                      {bourse.favoris.toLocaleString("fr-FR")}
                    </p>
                    <p className="text-sm" style={{ color: "var(--ak-gris)" }}>Favoris</p>
                  </div>
                </div>
              </div>
            </article>

            {/* ---- Sidebar actions ---- */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-20">

                {/* Date limite */}
                <div
                  className="rounded-xl p-5 mb-4"
                  style={{
                    background: estUrgente
                      ? "rgba(239,68,68,0.05)"
                      : estExpiree
                      ? "rgba(100,116,139,0.05)"
                      : "rgba(30,58,138,0.04)",
                    border: `1px solid ${estUrgente ? "rgba(239,68,68,0.2)" : "rgba(30,58,138,0.1)"}`,
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--ak-gris)" }}>
                    Date limite
                  </p>
                  <p className="text-lg font-bold mb-1" style={{ color: estUrgente ? "var(--ak-rouge)" : "var(--ak-gris-fonce)" }}>
                    {dateFormatee}
                  </p>
                  {estExpiree ? (
                    <p className="text-sm" style={{ color: "var(--ak-gris)" }}>Cette bourse est clôturée</p>
                  ) : estUrgente ? (
                    <p className="text-sm font-semibold" style={{ color: "var(--ak-rouge)" }}>
                      ⚠️ Plus que {joursRestants} jour{joursRestants > 1 ? "s" : ""} !
                    </p>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--ak-gris)" }}>
                      {joursRestants} jours restants
                    </p>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a
                    href={bourse.lienOfficiel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ak-btn-primaire justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Candidater sur le site officiel
                  </a>

                  {bourse.aGuideDisponible && (
                    <Link href={`/guides/${bourse.guideId}`} className="ak-btn-premium justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Acheter le Guide de Réussite
                    </Link>
                  )}

                  <Link
                    href={`/coaching?bourse=${bourse.id}`}
                    className="text-sm font-medium text-center py-3 rounded-lg transition-colors"
                    style={{
                      background: "rgba(30,58,138,0.06)",
                      color: "var(--ak-bleu)",
                      border: "1px solid rgba(30,58,138,0.12)",
                    }}
                  >
                    Accompagnement VIP Personnalisé
                  </Link>
                </div>

                {/* Retour à la liste */}
                <div className="mt-6">
                  <Link
                    href="/bourses"
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--ak-gris)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Retour aux bourses
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
