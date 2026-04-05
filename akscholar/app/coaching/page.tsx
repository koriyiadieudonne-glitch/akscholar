// ============================================================
// AKSCHOLAR — Page Coaching VIP
// Server Component
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching VIP — Accompagnement personnalisé",
  description:
    "Travaillez directement avec un expert AKSCHOLAR pour maximiser vos chances de décrocher une bourse compétitive.",
};

const FORMULES = [
  {
    id: "decouverte",
    nom: "Session Découverte",
    prix: 49,
    duree: "45 min",
    badge: null,
    description: "Idéale pour un premier bilan et une orientation stratégique.",
    inclus: [
      "Analyse de votre profil académique",
      "Identification des 3 meilleures bourses pour vous",
      "Conseils prioritaires pour votre dossier",
      "Compte-rendu écrit envoyé par email",
    ],
  },
  {
    id: "intensif",
    nom: "Pack Intensif",
    prix: 149,
    duree: "3 × 60 min",
    badge: "⭐ Le plus populaire",
    description: "L'accompagnement complet pour un dossier de candidature au top.",
    inclus: [
      "Tout ce qui est inclus dans Session Découverte",
      "Révision complète de votre lettre de motivation",
      "Correction de CV et dossier académique",
      "Simulation d'entretien avec feedback détaillé",
      "Accès à tous les guides premium AKSCHOLAR",
      "Support email pendant 30 jours",
    ],
  },
  {
    id: "vip",
    nom: "Accompagnement VIP",
    prix: 299,
    duree: "Sessions illimitées — 3 mois",
    badge: "👑 Premium",
    description: "Le suivi ultime pour décrocher la bourse de vos rêves.",
    inclus: [
      "Tout ce qui est inclus dans Pack Intensif",
      "Sessions illimitées pendant 3 mois",
      "Soumission complète de votre dossier",
      "Suivi en temps réel jusqu'à la réponse",
      "Plan B : autres bourses en cas de refus",
      "Réseau d'anciens lauréats",
    ],
  },
];

export default function PageCoaching() {
  return (
    <>
      {/* Hero */}
      <section className="py-16" style={{ background: "var(--ak-gradient-hero)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">🏆</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Coaching VIP Personnalisé
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)" }} className="text-base md:text-lg max-w-2xl mx-auto mb-6">
            Travaillez directement avec un expert AKSCHOLAR qui a aidé des centaines
            d&apos;étudiants à décrocher des bourses compétitives.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white">
            {["✅ Experts certifiés", "🎯 Résultats prouvés", "🛡️ Satisfait ou remboursé", "📅 Disponible 7j/7"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "var(--ak-gris-fonce)" }}>
            Choisissez votre formule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULES.map((formule) => {
              const estPopulaire = formule.badge === "⭐ Le plus populaire";
              return (
                <div
                  key={formule.id}
                  className="ak-carte flex flex-col relative"
                  style={estPopulaire ? { border: "2px solid var(--ak-bleu)", boxShadow: "var(--ak-ombre-hover)" } : {}}
                >
                  {/* Badge */}
                  {formule.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                      style={
                        estPopulaire
                          ? { background: "var(--ak-bleu)", color: "white" }
                          : { background: "var(--ak-gradient-premium)", color: "#1a1a1a" }
                      }
                    >
                      {formule.badge}
                    </div>
                  )}

                  <h3 className="font-bold text-lg mb-1 mt-2" style={{ color: "var(--ak-gris-fonce)" }}>
                    {formule.nom}
                  </h3>
                  <p className="text-xs mb-4" style={{ color: "var(--ak-gris)" }}>{formule.description}</p>

                  <div className="mb-4">
                    <span className="text-3xl font-extrabold" style={{ color: "var(--ak-bleu)" }}>
                      {formule.prix}€
                    </span>
                    <span className="text-sm ml-1" style={{ color: "var(--ak-gris)" }}>
                      — {formule.duree}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {formule.inclus.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--ak-gris-fonce)" }}>
                        <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={estPopulaire ? "ak-btn-primaire w-full justify-center" : "w-full py-2.5 rounded-lg text-sm font-semibold transition-all"}
                    style={!estPopulaire ? {
                      background: "rgba(30,58,138,0.06)",
                      color: "var(--ak-bleu)",
                      border: "1px solid rgba(30,58,138,0.15)",
                    } : {}}
                  >
                    Réserver maintenant
                  </button>
                </div>
              );
            })}
          </div>

          {/* Comment ça marche */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "var(--ak-gris-fonce)" }}>
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", titre: "Choisissez votre formule", desc: "Sélectionnez le pack adapté à votre situation et vos objectifs." },
                { step: "2", titre: "Réservez votre créneau", desc: "Choisissez un horaire qui vous convient parmi nos disponibilités." },
                { step: "3", titre: "Session avec l'expert", desc: "Session en visio avec un expert AKSCHOLAR dédié à votre dossier." },
                { step: "4", titre: "Candidatez et réussissez", desc: "Soumettez un dossier optimisé et augmentez vos chances de 3x." },
              ].map(({ step, titre, desc }) => (
                <div key={step} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                    style={{ background: "var(--ak-gradient-hero)" }}
                  >
                    {step}
                  </div>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ak-gris-fonce)" }}>{titre}</h3>
                  <p className="text-xs" style={{ color: "var(--ak-gris)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Témoignages */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--ak-gris-fonce)" }}>
              Ils ont réussi avec AKSCHOLAR
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  nom: "Mariam K.",
                  bourse: "Bourse Eiffel Excellence",
                  temoignage: "Grâce au coaching VIP, j'ai compris exactement ce que le jury cherchait. Ma lettre de motivation a été transformée. J'ai été acceptée du premier coup !",
                  note: 5,
                },
                {
                  nom: "Kofi A.",
                  bourse: "DAAD — Allemagne",
                  temoignage: "L'expert m'a aidé à raconter mon histoire de façon convaincante. La simulation d'entretien était très proche de la réalité. Merci AKSCHOLAR !",
                  note: 5,
                },
              ].map(({ nom, bourse, temoignage, note }) => (
                <div key={nom} className="ak-carte">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: note }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic mb-3 leading-relaxed" style={{ color: "var(--ak-gris-fonce)" }}>
                    &quot;{temoignage}&quot;
                  </p>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--ak-gris-fonce)" }}>{nom}</p>
                    <p className="text-xs" style={{ color: "var(--ak-bleu)" }}>Lauréat(e) — {bourse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ rapide */}
          <div
            className="mt-12 rounded-2xl p-8"
            style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}
          >
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "var(--ak-gris-fonce)" }}>
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { q: "Les sessions sont-elles en ligne ?", r: "Oui, toutes les sessions se tiennent en visioconférence (Zoom, Google Meet)." },
                { q: "Puis-je choisir mon expert ?", r: "Nous vous assignons l'expert le plus adapté à votre domaine et bourse cible." },
                { q: "Que se passe-t-il si je ne suis pas satisfait ?", r: "Remboursement intégral garanti dans les 30 jours sans justification." },
                { q: "Y a-t-il un suivi après les sessions ?", r: "Le Pack Intensif et le VIP incluent un support email dédié après les sessions." },
              ].map(({ q, r }) => (
                <div key={q}>
                  <p className="font-semibold text-sm mb-1" style={{ color: "var(--ak-gris-fonce)" }}>{q}</p>
                  <p className="text-sm" style={{ color: "var(--ak-gris)" }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: "var(--ak-gris)" }}>
              Vous avez une question avant de réserver ?
            </p>
            <Link href="/contact" className="ak-btn-primaire">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
