"use client";

// ============================================================
// AKSCHOLAR — Bouton Checkout Stripe
// Crée une session de paiement et redirige vers Stripe
// ============================================================

import { useState } from "react";

interface Props {
  type: "guide" | "coaching";
  id: string;
  nom: string;
  prix: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function BoutonCheckout({ type, id, nom, prix, className, style, children }: Props) {
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleClick() {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, nom, prix }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErreur(data.erreur ?? "Erreur inattendue.");
        setChargement(false);
      }
    } catch {
      setErreur("Impossible de contacter le serveur de paiement.");
      setChargement(false);
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={chargement}
        className={className}
        style={{ ...style, opacity: chargement ? 0.7 : 1, cursor: chargement ? "wait" : "pointer" }}
      >
        {chargement ? "Redirection..." : children}
      </button>
      {erreur && (
        <p className="text-xs mt-2 text-center" style={{ color: "var(--ak-rouge)" }}>
          {erreur}
        </p>
      )}
    </div>
  );
}
