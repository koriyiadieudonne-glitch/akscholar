// ============================================================
// AKSCHOLAR — Page 404 personnalisée
// ============================================================

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{ background: "var(--ak-gris-leger)" }}
    >
      <div className="text-center max-w-md">
        <span className="text-7xl block mb-6">🔍</span>
        <h1 className="text-5xl font-extrabold mb-3" style={{ color: "var(--ak-bleu)" }}>
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--ak-gris-fonce)" }}>
          Page introuvable
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--ak-gris)" }}>
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Revenez à l&apos;accueil pour découvrir nos bourses.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="ak-btn-primaire">
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/bourses"
            className="ak-btn-primaire"
            style={{ background: "rgba(30,58,138,0.08)", color: "var(--ak-bleu)" }}
          >
            Explorer les bourses
          </Link>
        </div>
      </div>
    </div>
  );
}
