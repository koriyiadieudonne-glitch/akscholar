"use client";

// ============================================================
// AKSCHOLAR — Barre de Navigation (Client Component)
// usePathname nécessite 'use client' (cf. AGENTS.md)
// ============================================================

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

// Liens de navigation principaux
const LIENS_NAV = [
  { href: "/bourses", label: "Bourses" },
  { href: "/universites", label: "Universités" },
  { href: "/tuteurs", label: "Tutor Match" },
  { href: "/guides", label: "Guides Premium" },
  { href: "/coaching", label: "Coaching VIP" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { user, chargement, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm"
      style={{ boxShadow: "var(--ak-ombre-nav)" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo AKSCHOLAR */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="AKSCHOLAR - Accueil"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "var(--ak-gradient-hero)" }}
            >
              AK
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--ak-bleu)" }}
            >
              AK<span style={{ color: "var(--ak-or)" }}>SCHOLAR</span>
            </span>
          </Link>

          {/* Navigation — Desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {LIENS_NAV.map((lien) => {
              const estActif = pathname.startsWith(lien.href);
              return (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{
                      color: estActif ? "var(--ak-bleu)" : "var(--ak-gris)",
                      background: estActif ? "rgba(30,58,138,0.06)" : "transparent",
                      fontWeight: estActif ? "600" : "500",
                    }}
                  >
                    {lien.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {chargement ? null : user ? (
              <>
                <span className="text-sm max-w-[160px] truncate" style={{ color: "var(--ak-gris)" }}>
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)" }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--ak-gris)" }}
                >
                  Connexion
                </Link>
                <Link href="/inscription" className="ak-btn-primaire text-sm">
                  Commencer Gratuitement
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu — Mobile */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOuvert}
            style={{ color: "var(--ak-gris-fonce)" }}
          >
            {menuOuvert ? (
              // Icône X
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Icône hamburger
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile déroulant */}
        {menuOuvert && (
          <div className="md:hidden border-t py-3" style={{ borderColor: "rgba(30,58,138,0.08)" }}>
            <ul className="flex flex-col gap-1">
              {LIENS_NAV.map((lien) => {
                const estActif = pathname.startsWith(lien.href);
                return (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="block px-3 py-2 rounded-md text-sm font-medium"
                      style={{
                        color: estActif ? "var(--ak-bleu)" : "var(--ak-gris-fonce)",
                        background: estActif ? "rgba(30,58,138,0.06)" : "transparent",
                      }}
                      onClick={() => setMenuOuvert(false)}
                    >
                      {lien.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-2 mt-4 px-3">
              {user ? (
                <>
                  <p className="text-xs text-center truncate mb-1" style={{ color: "var(--ak-gris)" }}>{user.email}</p>
                  <button
                    onClick={handleSignOut}
                    className="ak-btn-primaire justify-center"
                    style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)", border: "1.5px solid rgba(239,68,68,0.2)" }}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/connexion" className="ak-btn-primaire justify-center" style={{ background: "transparent", color: "var(--ak-bleu)", border: "1.5px solid var(--ak-bleu)" }} onClick={() => setMenuOuvert(false)}>
                    Connexion
                  </Link>
                  <Link href="/inscription" className="ak-btn-primaire justify-center" onClick={() => setMenuOuvert(false)}>
                    Commencer Gratuitement
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
