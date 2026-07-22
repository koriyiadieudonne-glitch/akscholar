"use client";

// ============================================================
// AKSCHOLAR — Auth Context (Supabase)
// Fournit : user, session, signIn, signUp, signOut
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  chargement: boolean;
  signIn: (email: string, motDePasse: string) => Promise<{ erreur: string | null }>;
  signUp: (email: string, motDePasse: string, prenom: string, nom: string) => Promise<{ erreur: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    // Récupérer la session existante au montage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setCookieSession(!!session);
      setChargement(false);
    });

    // Écouter les changements de session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setCookieSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, motDePasse: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });
    if (!error) setCookieSession(true);
    return { erreur: error ? traduireErreur(error.message) : null };
  }

  async function signUp(email: string, motDePasse: string, prenom: string, nom: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
      options: { data: { prenom, nom } },
    });
    return { erreur: error ? traduireErreur(error.message) : null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setCookieSession(false);
  }

  return (
    <AuthContext.Provider value={{ user, session, chargement, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}

// Hook de protection côté client : redirige si non connecté
export function useRequireAuth(redirectTo = "/connexion") {
  const { user, chargement } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!chargement && !user) {
      router.replace(redirectTo);
    }
  }, [user, chargement, router, redirectTo]);

  return { user, chargement };
}

// ---- Helpers ------------------------------------------------

// Cookie léger pour que le middleware puisse détecter la session
function setCookieSession(connecte: boolean) {
  if (typeof document === "undefined") return;
  if (connecte) {
    document.cookie = "ak-session=1; path=/; max-age=2592000; SameSite=Lax";
  } else {
    document.cookie = "ak-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function traduireErreur(message: string): string {
  if (message.includes("Invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (message.includes("Email not confirmed")) return "Veuillez confirmer votre email avant de vous connecter.";
  if (message.includes("User already registered")) return "Un compte existe déjà avec cet email.";
  if (message.includes("Password should be at least")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (message.includes("rate limit")) return "Trop de tentatives. Attendez quelques minutes.";
  return message;
}
