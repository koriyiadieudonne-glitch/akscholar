// ============================================================
// AKSCHOLAR — Page Détail d'un Guide Premium
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
  const bourse = BOURSES_RECENTES.find((b) => b.guideId === id);
  if (!bourse) return { title: "Guide introuvable" };
  return {
    title: `Guide : ${bourse.titre}`,
    description: `Guide complet pas-à-pas pour décrocher la bourse ${bourse.titre}.`,
  };
}

export default async function PageDetailGuide({ params }: Props) {
  const { id } = await params;
  const bourse = BOURSES_RECENTES.find((b) => b.guideId === id);

  if (!bourse) notFound();

  const chapitres = [
    {
      titre: "Comprendre la bourse",
      items: ["Histoire et contexte", "Critères de sélection détaillés", "Profil type du lauréat"],
    },
    {
      titre: "Rédiger une lettre de motivation parfaite",
      items: ["Structure gagnante (avec template)", "Les phrases qui font la différence", "Les erreurs fatales à éviter"],
    },
    {
      titre: "Préparer les documents",
      items: ["Liste exhaustive des pièces requises", "Mise en forme du CV académique", "Lettres de recommandation : comment les obtenir"],
    },
    {
      titre: "Passer l'entretien",
      items: ["Questions fréquentes + réponses types", "Simulation d'entretien commentée", "Conseils de présentation"],
    },
    {
      titre: "Checklist finale",
      items: ["Calendrier de candidature jour par jour", "Points de vérification avant envoi", "Que faire après la soumission"],
    },
  ];

  return (
    <>
      {/* Fil d'Ariane */}
      <div className="py-3" style={{ background: "white", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--ak-gris)" }}>
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/guides" className="hover:underline">Guides Premium</Link>
            <span>/</span>
            <span style={{ color: "var(--ak-gris-fonce)" }} className="font-medium truncate max-w-xs">
              {bourse.titre}
            </span>
          </nav>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ---- Contenu ---- */}
            <div className="flex-1 min-w-0">
              {/* En-tête */}
              <div className="ak-carte mb-6">
                <span className="ak-badge-guide inline-flex mb-4">⭐ Guide Premium AKSCHOLAR</span>
                <h1 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
                  Guide complet : {bourse.titre}
                </h1>
                <p className="text-base leading-relaxed mb-5" style={{ color: "var(--ak-gris)" }}>
                  Rédigé par un lauréat de la bourse, ce guide vous donne exactement ce qu&apos;il
                  faut faire pour maximiser vos chances. Rien de superflu — que de la valeur.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--ak-gris)" }}>
                  <span>⭐ 4.8/5</span>
                  <span>•</span>
                  <span>📚 {chapitres.length} chapitres</span>
                  <span>•</span>
                  <span>📄 PDF téléchargeable</span>
                  <span>•</span>
                  <span>🔄 Mis à jour 2025</span>
                </div>
              </div>

              {/* Ce que vous apprendrez */}
              <div className="ak-carte mb-6">
                <h2 className="font-bold text-xl mb-5" style={{ color: "var(--ak-gris-fonce)" }}>
                  Ce que contient ce guide
                </h2>
                <div className="space-y-4">
                  {chapitres.map((ch, i) => (
                    <div key={ch.titre}>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: "var(--ak-bleu)" }}
                        >
                          {i + 1}
                        </div>
                        <h3 className="font-semibold text-base" style={{ color: "var(--ak-gris-fonce)" }}>
                          {ch.titre}
                        </h3>
                      </div>
                      <ul className="ml-10 space-y-1">
                        {ch.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--ak-gris)" }}>
                            <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* À propos de la bourse */}
              <div className="ak-carte">
                <h2 className="font-bold text-xl mb-4" style={{ color: "var(--ak-gris-fonce)" }}>
                  À propos de la bourse
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ak-gris)" }}>
                  {bourse.description}
                </p>
                <Link href={`/bourses/${bourse.id}`} className="text-sm font-medium" style={{ color: "var(--ak-bleu)" }}>
                  Voir la fiche complète de la bourse →
                </Link>
              </div>
            </div>

            {/* ---- Sidebar achat ---- */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-20">
                <div className="ak-carte mb-4">
                  {/* Prix */}
                  <div className="text-center mb-5">
                    <p className="text-4xl font-extrabold mb-1" style={{ color: "var(--ak-bleu)" }}>9,99€</p>
                    <p className="text-sm" style={{ color: "var(--ak-gris)" }}>Accès à vie · PDF inclus</p>
                  </div>

                  <button className="ak-btn-premium w-full justify-center text-base mb-3">
                    ⭐ Acheter maintenant
                  </button>

                  <p className="text-center text-xs mb-4" style={{ color: "var(--ak-gris)" }}>
                    🛡️ Satisfait ou remboursé 30 jours
                  </p>

                  <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(30,58,138,0.08)" }}>
                    {[
                      "✅ Accès immédiat après paiement",
                      "📄 PDF téléchargeable",
                      "🔄 Mises à jour gratuites",
                      "💬 Support email inclus",
                    ].map((item) => (
                      <p key={item} className="text-xs" style={{ color: "var(--ak-gris)" }}>{item}</p>
                    ))}
                  </div>
                </div>

                {/* Coaching VIP */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: "var(--ak-gradient-hero)" }}
                >
                  <p className="text-sm font-bold text-white mb-1">Besoin d&apos;un accompagnement personnalisé ?</p>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Nos experts vous coachent individuellement.
                  </p>
                  <Link href={`/coaching?bourse=${bourse.id}`} className="ak-btn-premium w-full justify-center text-xs py-2">
                    Coaching VIP
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
