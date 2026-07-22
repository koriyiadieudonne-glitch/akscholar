"use client";

// ============================================================
// AKSCHOLAR — Panneau d'Administration
// Liste des bourses, ajout, suppression
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface BourseAdmin {
  id: string;
  titre: string;
  pays: string;
  niveau: string | null;
  montant: string | null;
  deadline: string | null;
  description: string | null;
  created_at: string;
}

const CHAMP_VIDE = { titre: "", pays: "", niveau: "", montant: "", deadline: "", description: "" };

export default function PageAdmin() {
  const router = useRouter();
  const [bourses, setBourses] = useState<BourseAdmin[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [form, setForm] = useState(CHAMP_VIDE);
  const [ajoutEnCours, setAjoutEnCours] = useState(false);
  const [ajoutErreur, setAjoutErreur] = useState<string | null>(null);
  const [suppressionId, setSuppressionId] = useState<string | null>(null);

  const chargerBourses = useCallback(async () => {
    setChargement(true);
    const res = await fetch("/api/admin/bourses");
    if (res.status === 401) { router.replace("/admin/login"); return; }
    const data = await res.json();
    if (data.erreur) setErreur(data.erreur);
    else setBourses(data.bourses ?? []);
    setChargement(false);
  }, [router]);

  useEffect(() => { chargerBourses(); }, [chargerBourses]);

  async function handleAjouter(e: React.FormEvent) {
    e.preventDefault();
    setAjoutErreur(null);
    setAjoutEnCours(true);
    const res = await fetch("/api/admin/bourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setAjoutEnCours(false);
    if (res.ok) {
      setForm(CHAMP_VIDE);
      chargerBourses();
    } else {
      setAjoutErreur(data.erreur ?? "Erreur lors de l'ajout.");
    }
  }

  async function handleSupprimer(id: string) {
    if (!confirm("Supprimer cette bourse définitivement ?")) return;
    setSuppressionId(id);
    await fetch(`/api/admin/bourses/${id}`, { method: "DELETE" });
    setSuppressionId(null);
    chargerBourses();
  }

  async function handleDeconnexion() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--ak-gris-leger)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b" style={{ borderColor: "rgba(30,58,138,0.1)", boxShadow: "var(--ak-ombre-nav)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "var(--ak-gradient-hero)" }}
            >
              AK
            </span>
            <h1 className="font-bold text-base" style={{ color: "var(--ak-gris-fonce)" }}>
              Admin AKSCHOLAR
            </h1>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "rgba(239,68,68,0.1)", color: "var(--ak-rouge)" }}
            >
              Panneau privé
            </span>
          </div>
          <button
            onClick={handleDeconnexion}
            className="text-sm font-medium"
            style={{ color: "var(--ak-gris)" }}
          >
            Déconnexion →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ---- Formulaire ajout ---- */}
        <section className="ak-carte">
          <h2 className="font-bold text-lg mb-5" style={{ color: "var(--ak-gris-fonce)" }}>
            Ajouter une bourse
          </h2>
          <form onSubmit={handleAjouter} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "titre", label: "Titre *", placeholder: "Ex : Bourse Eiffel Excellence", required: true },
                { key: "pays", label: "Pays *", placeholder: "Ex : France", required: true },
                { key: "niveau", label: "Niveau", placeholder: "Ex : Master, Doctorat", required: false },
                { key: "montant", label: "Montant", placeholder: "Ex : 1 200€/mois", required: false },
                { key: "deadline", label: "Date limite (YYYY-MM-DD)", placeholder: "2026-03-31", required: false },
              ].map(({ key, label, placeholder, required }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--ak-gris)" }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--ak-gris)" }}>
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description de la bourse..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                style={{ borderColor: "rgba(30,58,138,0.2)", color: "var(--ak-gris-fonce)" }}
              />
            </div>

            {ajoutErreur && (
              <p className="text-sm" style={{ color: "var(--ak-rouge)" }}>{ajoutErreur}</p>
            )}

            <button
              type="submit"
              disabled={ajoutEnCours}
              className="ak-btn-primaire"
              style={{ opacity: ajoutEnCours ? 0.7 : 1 }}
            >
              {ajoutEnCours ? "Ajout en cours..." : "+ Ajouter la bourse"}
            </button>
          </form>
        </section>

        {/* ---- Liste des bourses ---- */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ color: "var(--ak-gris-fonce)" }}>
              {chargement ? "Chargement..." : `${bourses.length} bourse${bourses.length > 1 ? "s" : ""}`}
            </h2>
            <button
              onClick={chargerBourses}
              className="text-sm font-medium"
              style={{ color: "var(--ak-bleu)" }}
            >
              ↻ Actualiser
            </button>
          </div>

          {erreur && (
            <div className="rounded-xl p-4 mb-4 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "var(--ak-rouge)" }}>
              {erreur}
            </div>
          )}

          {chargement ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--ak-bleu)", borderTopColor: "transparent" }} />
            </div>
          ) : bourses.length === 0 ? (
            <div className="ak-carte text-center py-12" style={{ color: "var(--ak-gris)" }}>
              Aucune bourse dans la base de données.
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: "var(--ak-ombre-carte)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(30,58,138,0.04)", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
                    {["Titre", "Pays", "Niveau", "Montant", "Deadline", "Ajoutée le", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ak-gris)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bourses.map((b, i) => (
                    <tr
                      key={b.id}
                      style={{
                        background: i % 2 === 0 ? "white" : "rgba(30,58,138,0.01)",
                        borderBottom: "1px solid rgba(30,58,138,0.06)",
                      }}
                    >
                      <td className="px-4 py-3 font-medium max-w-[220px]" style={{ color: "var(--ak-gris-fonce)" }}>
                        <span className="line-clamp-2">{b.titre}</span>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--ak-gris)" }}>{b.pays ?? "—"}</td>
                      <td className="px-4 py-3" style={{ color: "var(--ak-gris)" }}>{b.niveau ?? "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--ak-gris)" }}>{b.montant ?? "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--ak-gris)" }}>
                        {b.deadline ? new Date(b.deadline).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--ak-gris)" }}>
                        {new Date(b.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleSupprimer(b.id)}
                          disabled={suppressionId === b.id}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            color: "var(--ak-rouge)",
                            opacity: suppressionId === b.id ? 0.5 : 1,
                          }}
                        >
                          {suppressionId === b.id ? "..." : "Supprimer"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
