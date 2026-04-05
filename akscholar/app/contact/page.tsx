"use client";

// ============================================================
// AKSCHOLAR — Page Contact
// ============================================================

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata ne peut pas être exportée depuis un Client Component.
// Déplacez si besoin dans un layout ou un wrapper Server Component.

export default function PageContact() {
  const [envoye, setEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    await new Promise((r) => setTimeout(r, 800));
    setChargement(false);
    setEnvoye(true);
  }

  return (
    <>
      <section className="py-12" style={{ background: "var(--ak-gradient-hero)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Contactez AKSCHOLAR
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }} className="text-base">
            Une question, une suggestion, un partenariat ? Nous répondons sous 24h.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Infos contact */}
            <div className="w-full md:w-72 shrink-0">
              <h2 className="font-bold text-lg mb-5" style={{ color: "var(--ak-gris-fonce)" }}>
                Nos coordonnées
              </h2>
              {[
                { icon: "📧", titre: "Email", valeur: "contact@akscholar.com" },
                { icon: "💬", titre: "WhatsApp", valeur: "+33 7 00 00 00 00" },
                { icon: "📍", titre: "Basé à", valeur: "Paris, France" },
                { icon: "⏰", titre: "Réponse", valeur: "Sous 24h (jours ouvrables)" },
              ].map(({ icon, titre, valeur }) => (
                <div key={titre} className="flex items-start gap-3 mb-4">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--ak-gris)" }}>{titre}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--ak-gris-fonce)" }}>{valeur}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulaire */}
            <div className="flex-1">
              {envoye ? (
                <div
                  className="rounded-2xl p-10 text-center"
                  style={{ background: "white", boxShadow: "var(--ak-ombre-carte)" }}
                >
                  <span className="text-5xl block mb-4">✅</span>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ak-gris-fonce)" }}>
                    Message envoyé !
                  </h3>
                  <p className="text-sm" style={{ color: "var(--ak-gris)" }}>
                    Nous vous répondrons dans les 24 heures. Merci de votre confiance.
                  </p>
                </div>
              ) : (
                <div className="ak-carte">
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>Prénom</label>
                        <input type="text" required placeholder="Aminata"
                          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "rgba(30,58,138,0.2)" }} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>Email</label>
                        <input type="email" required placeholder="votre@email.com"
                          className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                          style={{ borderColor: "rgba(30,58,138,0.2)" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>Sujet</label>
                      <input type="text" required placeholder="Ex : Question sur la bourse Eiffel"
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: "rgba(30,58,138,0.2)" }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ak-gris-fonce)" }}>Message</label>
                      <textarea required rows={5} placeholder="Votre message..."
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none"
                        style={{ borderColor: "rgba(30,58,138,0.2)" }} />
                    </div>
                    <button type="submit" disabled={chargement} className="ak-btn-primaire w-full justify-center">
                      {chargement ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
