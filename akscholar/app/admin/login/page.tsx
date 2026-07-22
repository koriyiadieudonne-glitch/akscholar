"use client";

// ============================================================
// AKSCHOLAR — Page Login Admin
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PageAdminLogin() {
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motDePasse }),
    });
    const data = await res.json();
    setChargement(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      setErreur(data.erreur ?? "Erreur.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--ak-gris-leger)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
            style={{ background: "var(--ak-gradient-hero)" }}
          >
            🔒
          </div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--ak-gris-fonce)" }}>
            Administration
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--ak-gris)" }}>
            Accès réservé à l&apos;équipe AKSCHOLAR
          </p>
        </div>

        <div className="ak-carte">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••••••"
                autoFocus
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                required
              />
            </div>

            {erreur && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {erreur}
              </div>
            )}

            <button
              type="submit"
              disabled={chargement}
              className="ak-btn-primaire w-full justify-center"
              style={{ opacity: chargement ? 0.7 : 1 }}
            >
              {chargement ? "Vérification..." : "Accéder au panneau admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
