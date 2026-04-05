"use client";

// ============================================================
// AKSCHOLAR — Page Inscription
// Client Component (formulaire interactif)
// ============================================================

import { useState } from "react";
import Link from "next/link";

export default function PageInscription() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    if (!prenom || !nom || !email || !motDePasse) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }
    if (motDePasse.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setChargement(true);
    // TODO: intégrer Firebase Auth createUserWithEmailAndPassword
    await new Promise((r) => setTimeout(r, 800));
    setChargement(false);
    setErreur("L'inscription Firebase n'est pas encore configurée.");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: "var(--ak-gris-leger)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: "var(--ak-gradient-hero)" }}
            >
              AK
            </div>
            <span className="text-xl font-bold" style={{ color: "var(--ak-bleu)" }}>
              AK<span style={{ color: "var(--ak-or)" }}>SCHOLAR</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-extrabold" style={{ color: "var(--ak-gris-fonce)" }}>
            Créer votre compte gratuit
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ak-gris)" }}>
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="font-semibold" style={{ color: "var(--ak-bleu)" }}>
              Se connecter
            </Link>
          </p>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { emoji: "🎓", label: "Accès aux 1 240+ bourses" },
            { emoji: "🔔", label: "Alertes personnalisées" },
            { emoji: "❤️", label: "Sauvegardez vos favoris" },
          ].map(({ emoji, label }) => (
            <div key={label} className="rounded-xl p-3 text-center" style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}>
              <div className="text-2xl mb-1">{emoji}</div>
              <p className="text-xs" style={{ color: "var(--ak-gris)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div className="ak-carte">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>
                  Prénom
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Aminata"
                  autoComplete="given-name"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>
                  Nom
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Diallo"
                  autoComplete="family-name"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="8 caractères minimum"
                autoComplete="new-password"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                required
                minLength={8}
              />
            </div>

            {/* Erreur */}
            {erreur && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {erreur}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={chargement}
              className="ak-btn-primaire w-full justify-center"
              style={{ opacity: chargement ? 0.7 : 1 }}
            >
              {chargement ? "Création en cours..." : "Créer mon compte gratuitement"}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(30,58,138,0.1)" }} />
            <span className="text-xs" style={{ color: "var(--ak-gris)" }}>ou</span>
            <div className="flex-1 h-px" style={{ background: "rgba(30,58,138,0.1)" }} />
          </div>

          {/* Inscription Google */}
          <button
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm font-medium transition-all"
            style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            S&apos;inscrire avec Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--ak-gris)" }}>
          En créant un compte, vous acceptez nos{" "}
          <Link href="/mentions-legales" className="underline">conditions d&apos;utilisation</Link>{" "}
          et notre{" "}
          <Link href="/mentions-legales" className="underline">politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  );
}
