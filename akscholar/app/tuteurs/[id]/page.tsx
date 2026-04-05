// ============================================================
// AKSCHOLAR — Page Profil Tuteur
// Server Component — params est une Promise (voir AGENTS.md)
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";
import { TUTEURS_DISPONIBLES } from "@/lib/data/mockData";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tuteur = TUTEURS_DISPONIBLES.find((t) => t.id === id);
  if (!tuteur) return { title: "Tuteur introuvable" };
  return {
    title: `${tuteur.prenom} ${tuteur.nom} — Tuteur AKSCHOLAR`,
    description: tuteur.bio,
  };
}

export default async function PageProfilTuteur({ params }: Props) {
  const { id } = await params;
  const tuteur = TUTEURS_DISPONIBLES.find((t) => t.id === id);

  if (!tuteur) notFound();

  const modeLabel =
    tuteur.modeCours.includes("en_ligne") && tuteur.modeCours.includes("domicile")
      ? "En ligne & à domicile"
      : tuteur.modeCours.includes("en_ligne")
      ? "En ligne uniquement"
      : "À domicile uniquement";

  return (
    <>
      {/* Fil d'Ariane */}
      <div className="py-3" style={{ background: "white", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--ak-gris)" }}>
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/tuteurs" className="hover:underline">Tutor Match</Link>
            <span>/</span>
            <span style={{ color: "var(--ak-gris-fonce)" }} className="font-medium">
              {tuteur.prenom} {tuteur.nom}
            </span>
          </nav>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* ---- Profil ---- */}
            <article className="flex-1">
              {/* Carte identité */}
              <div className="ak-carte mb-6">
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center text-white font-bold text-2xl"
                    style={{ background: "var(--ak-gradient-hero)" }}
                  >
                    {tuteur.prenom[0]}{tuteur.nom[0]}
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold mb-1" style={{ color: "var(--ak-gris-fonce)" }}>
                      {tuteur.prenom} {tuteur.nom}
                    </h1>
                    <p className="text-sm mb-1" style={{ color: "var(--ak-gris)" }}>
                      {tuteur.niveauEtude} — {tuteur.universite}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                            fill={i <= Math.round(tuteur.note) ? "#F59E0B" : "#E2E8F0"}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-bold" style={{ color: "var(--ak-gris-fonce)" }}>
                        {tuteur.note}
                      </span>
                      <span className="text-xs" style={{ color: "var(--ak-gris)" }}>
                        ({tuteur.nombreCours} cours donnés)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-base leading-relaxed" style={{ color: "var(--ak-gris-fonce)" }}>
                  {tuteur.bio}
                </p>
              </div>

              {/* Matières */}
              <div className="ak-carte mb-6">
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--ak-gris-fonce)" }}>
                  Matières enseignées
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tuteur.matieres.map((m) => (
                    <span key={m} className="text-sm px-3 py-1.5 rounded-full font-medium"
                      style={{ background: "rgba(30,58,138,0.08)", color: "var(--ak-bleu)" }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disponibilités */}
              <div className="ak-carte mb-6">
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--ak-gris-fonce)" }}>
                  Disponibilités
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tuteur.disponibilites.map((d) => (
                    <span key={d} className="text-sm px-3 py-1.5 rounded-full font-medium"
                      style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}>
                      📅 {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div className="ak-carte">
                <h2 className="font-bold text-lg mb-4" style={{ color: "var(--ak-gris-fonce)" }}>
                  Langues de cours
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tuteur.langues.map((l) => (
                    <span key={l} className="text-sm px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(245,158,11,0.1)", color: "#B45309" }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* ---- Sidebar réservation ---- */}
            <aside className="w-full md:w-72 shrink-0">
              <div className="sticky top-20">
                <div className="ak-carte mb-4">
                  {/* Tarif */}
                  <div className="text-center mb-5">
                    <p className="text-3xl font-extrabold" style={{ color: "var(--ak-bleu)" }}>
                      {tuteur.tarif}€<span className="text-base font-normal" style={{ color: "var(--ak-gris)" }}>/heure</span>
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--ak-gris)" }}>{modeLabel}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="rounded-xl p-3 text-center" style={{ background: "rgba(30,58,138,0.04)" }}>
                      <p className="text-lg font-bold" style={{ color: "var(--ak-bleu)" }}>{tuteur.note}</p>
                      <p className="text-xs" style={{ color: "var(--ak-gris)" }}>Note</p>
                    </div>
                    <div className="rounded-xl p-3 text-center" style={{ background: "rgba(30,58,138,0.04)" }}>
                      <p className="text-lg font-bold" style={{ color: "var(--ak-bleu)" }}>{tuteur.nombreCours}</p>
                      <p className="text-xs" style={{ color: "var(--ak-gris)" }}>Cours</p>
                    </div>
                    <div className="rounded-xl p-3 text-center col-span-2" style={{ background: "rgba(16,185,129,0.06)" }}>
                      <p className="text-sm font-bold" style={{ color: "#059669" }}>
                        Score test : {tuteur.scoreTest}/100
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ak-gris)" }}>Certifié AKSCHOLAR</p>
                    </div>
                  </div>

                  <button className="ak-btn-primaire w-full justify-center mb-3">
                    Réserver un cours
                  </button>
                  <button
                    className="w-full text-sm font-medium py-2.5 rounded-lg transition-colors"
                    style={{
                      background: "rgba(30,58,138,0.06)",
                      color: "var(--ak-bleu)",
                      border: "1px solid rgba(30,58,138,0.12)",
                    }}
                  >
                    Envoyer un message
                  </button>
                </div>

                <Link href="/tuteurs" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ak-gris)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Retour aux tuteurs
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
