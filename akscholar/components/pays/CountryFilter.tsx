"use client";

// ============================================================
// AKSCHOLAR — Filtre de Navigation par Pays
// Client Component car gère l'état de sélection
// ============================================================

import { useState } from "react";
import type { Pays } from "@/lib/types";

interface CountryFilterProps {
  pays: Pays[];
  paysActifId?: string;
  onSelectPays: (paysId: string | null) => void;
}

export default function CountryFilter({
  pays,
  paysActifId,
  onSelectPays,
}: CountryFilterProps) {
  const [recherche, setRecherche] = useState("");

  // Filtrage local par nom de pays
  const paysFiltres = pays.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      {/* Barre de recherche de pays */}
      <div className="relative mb-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--ak-gris)" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Filtrer par pays..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none transition-all"
          style={{
            borderColor: "rgba(30,58,138,0.15)",
            color: "var(--ak-gris-fonce)",
            background: "white",
          }}
          aria-label="Rechercher un pays"
        />
      </div>

      {/* Bouton "Tous les pays" */}
      <button
        onClick={() => onSelectPays(null)}
        className="ak-carte-pays w-full flex items-center justify-between mb-2 text-left"
        style={
          !paysActifId
            ? {
                borderColor: "var(--ak-bleu)",
                background: "rgba(30,58,138,0.04)",
              }
            : {}
        }
        aria-pressed={!paysActifId}
      >
        <span className="text-sm font-medium" style={{ color: "var(--ak-gris-fonce)" }}>
          🌍 Tous les pays
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(30,58,138,0.08)", color: "var(--ak-bleu)" }}
        >
          {pays.reduce((acc, p) => acc + p.nombreBourses, 0)}
        </span>
      </button>

      {/* Grille de pays */}
      <div
        className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto pr-1"
        role="list"
        aria-label="Liste des pays"
      >
        {paysFiltres.map((p) => {
          const estActif = paysActifId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPays(estActif ? null : p.id)}
              className="ak-carte-pays flex items-center justify-between text-left"
              style={
                estActif
                  ? {
                      borderColor: "var(--ak-bleu)",
                      background: "rgba(30,58,138,0.04)",
                    }
                  : {}
              }
              role="listitem"
              aria-pressed={estActif}
              aria-label={`${p.nom} — ${p.nombreBourses} bourses`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl leading-none">{p.drapeau}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: estActif ? "var(--ak-bleu)" : "var(--ak-gris-fonce)" }}
                >
                  {p.nom}
                </span>
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: estActif ? "var(--ak-bleu)" : "rgba(30,58,138,0.08)",
                  color: estActif ? "white" : "var(--ak-bleu)",
                }}
              >
                {p.nombreBourses}
              </span>
            </button>
          );
        })}
      </div>

      {/* Aucun résultat */}
      {paysFiltres.length === 0 && (
        <p className="text-sm text-center py-4" style={{ color: "var(--ak-gris)" }}>
          Aucun pays trouvé pour &quot;{recherche}&quot;
        </p>
      )}
    </div>
  );
}
