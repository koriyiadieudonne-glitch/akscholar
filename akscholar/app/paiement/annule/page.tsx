// ============================================================
// AKSCHOLAR — Page Paiement Annulé
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paiement annulé" };

export default function PageAnnule() {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: "var(--ak-gris-leger)" }}
    >
      <div className="w-full max-w-md text-center">
        <div className="ak-carte">
          <div className="text-6xl mb-4">↩️</div>
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>
            Paiement annulé
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--ak-gris)" }}>
            Vous avez annulé le paiement. Aucun montant n&apos;a été débité.
            Vous pouvez revenir à votre achat à tout moment.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/guides" className="ak-btn-primaire justify-center">
              Voir les guides premium
            </Link>
            <Link href="/coaching" className="text-sm font-medium" style={{ color: "var(--ak-gris)" }}>
              Voir les formules coaching
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
