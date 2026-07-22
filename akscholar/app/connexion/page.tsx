"use client";

// ============================================================
// AKSCHOLAR — Page Connexion
// ============================================================

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

function FormConnexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/bourses";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    if (!email || !motDePasse) { setErreur("Veuillez remplir tous les champs."); return; }
    setChargement(true);
    const { erreur: err } = await signIn(email, motDePasse);
    setChargement(false);
    if (err) setErreur(err);
    else router.push(redirect);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: "var(--ak-gris-leger)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: "var(--ak-gradient-hero)" }}>
              AK
            </div>
            <span className="text-xl font-bold" style={{ color: "var(--ak-bleu)" }}>
              AK<span style={{ color: "var(--ak-or)" }}>SCHOLAR</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-extrabold" style={{ color: "var(--ak-gris-fonce)" }}>
            Connexion à votre compte
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ak-gris)" }}>
            Pas encore inscrit ?{" "}
            <Link href="/inscription" className="font-semibold" style={{ color: "var(--ak-bleu)" }}>
              Créer un compte gratuit
            </Link>
          </p>
        </div>

        {/* Formulaire */}
        <div className="ak-carte">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>Adresse email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com"
                autoComplete="email" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }} required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold" style={{ color: "var(--ak-gris-fonce)" }}>Mot de passe</label>
                <Link href="/mot-de-passe-oublie" className="text-xs" style={{ color: "var(--ak-bleu)" }}>Mot de passe oublié ?</Link>
              </div>
              <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="••••••••"
                autoComplete="current-password" className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }} required />
            </div>
            {erreur && (
              <div className="rounded-lg px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {erreur}
              </div>
            )}
            <button type="submit" disabled={chargement} className="ak-btn-primaire w-full justify-center" style={{ opacity: chargement ? 0.7 : 1 }}>
              {chargement ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(30,58,138,0.1)" }} />
            <span className="text-xs" style={{ color: "var(--ak-gris)" }}>ou</span>
            <div className="flex-1 h-px" style={{ background: "rgba(30,58,138,0.1)" }} />
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm font-medium transition-all"
            style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
            onClick={() => setErreur("La connexion Google sera disponible prochainement.")}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuer avec Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--ak-gris)" }}>
          En vous connectant, vous acceptez nos{" "}
          <Link href="/mentions-legales" className="underline">conditions d&apos;utilisation</Link>.
        </p>
      </div>
    </div>
  );
}

export default function PageConnexion() {
  return (
    <Suspense>
      <FormConnexion />
    </Suspense>
  );
}
