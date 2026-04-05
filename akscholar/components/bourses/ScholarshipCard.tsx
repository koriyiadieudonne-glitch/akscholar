// ============================================================
// AKSCHOLAR — Carte de Bourse
// Affiche les infos publiques + CTA "Guide" et "Coaching VIP"
// ============================================================

import Link from "next/link";
import type { Bourse } from "@/lib/types";

interface ScholarshipCardProps {
  bourse: Bourse;
}

// Formate la date limite et signale l'urgence si < 30 jours
function FormatDateLimite({ dateISO }: { dateISO: string }) {
  const dateLimite = new Date(dateISO);
  const maintenant = new Date();
  const joursRestants = Math.ceil(
    (dateLimite.getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dateFormatee = dateLimite.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (joursRestants < 0) {
    return (
      <span className="text-xs font-medium" style={{ color: "var(--ak-gris)" }}>
        Clôturée
      </span>
    );
  }

  if (joursRestants <= 30) {
    return (
      <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--ak-rouge)" }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {joursRestants}j restants — {dateFormatee}
      </span>
    );
  }

  return (
    <span className="text-xs" style={{ color: "var(--ak-gris)" }}>
      {dateFormatee}
    </span>
  );
}

export default function ScholarshipCard({ bourse }: ScholarshipCardProps) {
  return (
    <article className="ak-carte flex flex-col h-full">

      {/* En-tête : Pays + Badges */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="ak-badge-pays">
            {bourse.paysNom}
          </span>
          {bourse.estVerifiee && (
            <span className="ak-badge-verifie">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Vérifié
            </span>
          )}
        </div>
        {bourse.aGuideDisponible && (
          <span className="ak-badge-guide shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Guide dispo
          </span>
        )}
      </div>

      {/* Titre */}
      <h3
        className="font-bold text-base leading-snug mb-2 line-clamp-2"
        style={{ color: "var(--ak-gris-fonce)" }}
      >
        <Link
          href={`/bourses/${bourse.id}`}
          className="hover:underline"
          style={{ textDecorationColor: "var(--ak-bleu)" }}
        >
          {bourse.titre}
        </Link>
      </h3>

      {/* Université */}
      <p className="text-xs mb-3 flex items-center gap-1" style={{ color: "var(--ak-gris)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        {bourse.universite}
      </p>

      {/* Infos rapides */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Montant */}
        <div
          className="rounded-lg p-2.5 text-center"
          style={{ background: "rgba(30,58,138,0.04)" }}
        >
          <p className="text-xs mb-0.5" style={{ color: "var(--ak-gris)" }}>Montant</p>
          <p className="text-xs font-semibold leading-tight" style={{ color: "var(--ak-bleu)" }}>
            {bourse.montant}
          </p>
        </div>
        {/* Type */}
        <div
          className="rounded-lg p-2.5 text-center"
          style={{ background: "rgba(16,185,129,0.05)" }}
        >
          <p className="text-xs mb-0.5" style={{ color: "var(--ak-gris)" }}>Type</p>
          <p className="text-xs font-semibold leading-tight" style={{ color: "#059669" }}>
            {bourse.typeBourse}
          </p>
        </div>
      </div>

      {/* Niveaux d'étude */}
      <div className="flex flex-wrap gap-1 mb-4">
        {bourse.niveauEtude.slice(0, 3).map((niveau) => (
          <span
            key={niveau}
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "rgba(30,58,138,0.06)",
              color: "var(--ak-bleu)",
            }}
          >
            {niveau}
          </span>
        ))}
      </div>

      {/* Spacer pour pousser le footer en bas */}
      <div className="flex-1" />

      {/* Date limite */}
      <div
        className="flex items-center gap-1.5 mb-4 pb-4"
        style={{ borderBottom: "1px solid rgba(30,58,138,0.08)" }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--ak-gris)", flexShrink: 0 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-xs" style={{ color: "var(--ak-gris)" }}>Date limite :</span>
        <FormatDateLimite dateISO={bourse.dateLimite} />
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        {/* Bouton Guide Premium (si disponible) */}
        {bourse.aGuideDisponible && (
          <Link
            href={`/guides/${bourse.guideId}`}
            className="ak-btn-premium w-full text-sm justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Acheter le Guide de Réussite
          </Link>
        )}
        {/* Bouton Coaching VIP */}
        <Link
          href={`/coaching?bourse=${bourse.id}`}
          className="text-sm font-medium text-center py-2 rounded-lg transition-colors"
          style={{
            background: "rgba(30,58,138,0.06)",
            color: "var(--ak-bleu)",
            border: "1px solid rgba(30,58,138,0.12)",
          }}
        >
          Accompagnement Personnalisé VIP
        </Link>
        {/* Lien voir le détail */}
        <Link
          href={`/bourses/${bourse.id}`}
          className="text-xs text-center font-medium transition-colors hover:underline"
          style={{ color: "var(--ak-gris)" }}
        >
          Voir les détails complets →
        </Link>
      </div>
    </article>
  );
}
