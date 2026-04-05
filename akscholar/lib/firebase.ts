// ============================================================
// AKSCHOLAR — Configuration Firebase
// ============================================================
// INSTRUCTIONS DE MISE EN SERVICE :
// 1. Créez un projet sur https://console.firebase.google.com
// 2. Activez Firestore, Authentication et Storage
// 3. Copiez votre config dans le fichier .env.local :
//    NEXT_PUBLIC_FIREBASE_API_KEY=...
//    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
//    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
//    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
//    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
//    NEXT_PUBLIC_FIREBASE_APP_ID=...
// ============================================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton : évite de réinitialiser l'app si elle existe déjà (Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Services Firebase exportés
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

// ============================================================
// SCHÉMA FIRESTORE — Collections principales
// ============================================================
//
// /pays/{paysId}
//   - nom: string
//   - code: string (ISO)
//   - drapeau: string
//   - continent: string
//   - nombreBourses: number (compteur auto)
//
// /bourses/{bourseId}
//   - titre, description, paysId, paysNom
//   - universite, niveauEtude[], typeBourse
//   - montant, dateLimite, lienOfficiel
//   - domaines[], langueInstruction[]
//   - estVerifiee: boolean
//   - aGuideDisponible: boolean, guideId?
//   - vues: number, favoris: number
//   - creeLe, misAJourLe (Timestamps)
//   - sourceUrl? (pour le scraping)
//
// /universites/{universiteId}
//   - nom, paysId, paysNom, ville
//   - lienOfficiel, logoUrl?
//   - classementQS?, domaines[]
//   - boursesAssociees[] (array d'IDs)
//
// /guidesPremium/{guideId}
//   - titre, bourseId, bourseNom
//   - prix: number, devise: string
//   - description, chapitres[]
//   - pdfUrl? (URL sécurisée Firebase Storage)
//   - nombreVentes, note
//
// /tuteurs/{tuteurId}
//   - userId, nom, prenom, photoUrl?
//   - niveauEtude, universite
//   - matieres[], langues[], tarif
//   - modeCours[], ville?, note
//   - nombreCours, statut, scoreTest
//   - bio, disponibilites[]
//
// /utilisateurs/{userId}
//   - email, nom, prenom, photoUrl?
//   - role: "etudiant"|"tuteur"|"parent"|"admin"
//   - boursesEnFavoris[], guidesAchetes[]
//   - coursReserves[], paysOrigine?
//   - creeLe, dernierLogin
//
// /ventes/{venteId}
//   - userId, produitType, produitId
//   - montant, devise, statut
//   - methodePaiement, referencePaiement
//   - creeLe, completeLe?
//
// /reservationsCoaching/{reservationId}
//   - userId, bourseId, bourseNom
//   - dateSession?, duree, statut
//   - notes?, venteId
// ============================================================
