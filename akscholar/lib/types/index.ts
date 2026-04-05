// ============================================================
// AKSCHOLAR — Définitions des Types TypeScript
// Partagés entre le Web (Next.js) et le Mobile (Flutter via API)
// ============================================================

// ----------------------------------------------------------
// PAYS
// ----------------------------------------------------------
export interface Pays {
  id: string;
  nom: string;           // Ex: "France", "Canada"
  code: string;          // Code ISO 2 lettres: "FR", "CA"
  drapeau: string;       // Emoji drapeau ou URL image
  continent: string;     // "Europe", "Amérique du Nord", etc.
  nombreBourses: number; // Compteur mis à jour automatiquement
}

// ----------------------------------------------------------
// BOURSE D'ÉTUDES
// ----------------------------------------------------------
export type NiveauEtude =
  | "Licence"
  | "Master"
  | "Doctorat"
  | "Post-doctorat"
  | "Tous niveaux";

export type TypeBourse =
  | "Bourse complète"
  | "Bourse partielle"
  | "Stage"
  | "Programme d'échange"
  | "Résidence de recherche";

export interface Bourse {
  id: string;
  titre: string;
  description: string;
  paysId: string;           // Référence à Pays.id
  paysNom: string;          // Dénormalisé pour éviter les jointures
  universite: string;
  niveauEtude: NiveauEtude[];
  typeBourse: TypeBourse;
  montant: string;          // Ex: "Couverture totale", "€15,000/an"
  dateLimite: string;       // ISO 8601: "2025-03-31"
  dateOuverture?: string;
  lienOfficiel: string;
  domaines: string[];       // ["Informatique", "Médecine", ...]
  langueInstruction: string[];
  imageUrl?: string;
  estVerifiee: boolean;     // Vérifiée manuellement par l'équipe
  aGuideDisponible: boolean;// Badge "Guide Premium"
  guideId?: string;         // Référence vers le Guide vendu
  vues: number;
  favoris: number;
  creeLe: string;           // Timestamp ISO
  misAJourLe: string;
  sourceUrl?: string;       // URL d'où la bourse a été scrapée
}

// ----------------------------------------------------------
// UNIVERSITÉ
// ----------------------------------------------------------
export interface Universite {
  id: string;
  nom: string;
  paysId: string;
  paysNom: string;
  ville: string;
  lienOfficiel: string;
  logoUrl?: string;
  classementQS?: number;   // Classement QS World University Rankings
  domaines: string[];
  description?: string;
  boursesAssociees: string[]; // IDs des bourses liées
}

// ----------------------------------------------------------
// GUIDE PREMIUM (Produit numérique payant)
// ----------------------------------------------------------
export interface GuidePremium {
  id: string;
  titre: string;
  bourseId: string;        // La bourse pour laquelle le guide est fait
  bourseNom: string;
  prix: number;            // En EUR
  devise: string;          // "EUR", "USD", "XAF"
  description: string;
  chapitres: string[];     // Table des matières
  pdfUrl?: string;         // URL sécurisée (après achat)
  imageUrl?: string;
  nombreVentes: number;
  note: number;            // Moyenne des évaluations (0-5)
  creeLe: string;
}

// ----------------------------------------------------------
// TUTEUR (Module Tutor Match)
// ----------------------------------------------------------
export type StatutTuteur = "en_attente" | "valide" | "suspendu";

export interface Tuteur {
  id: string;
  userId: string;          // Référence à Utilisateur.id
  nom: string;
  prenom: string;
  photoUrl?: string;
  niveauEtude: string;     // "Master 2 Informatique"
  universite: string;
  matieres: string[];      // ["Mathématiques", "Physique", ...]
  langues: string[];
  tarif: number;           // EUR/heure
  modeCours: ("domicile" | "en_ligne" | "les_deux")[];
  ville?: string;
  note: number;            // Moyenne des avis
  nombreCours: number;
  statut: StatutTuteur;
  scoreTest: number;       // Score du test de validation (0-100)
  bio: string;
  disponibilites: string[];// ["Lundi matin", "Mercredi après-midi", ...]
  creeLe: string;
}

// ----------------------------------------------------------
// UTILISATEUR
// ----------------------------------------------------------
export type RoleUtilisateur = "etudiant" | "tuteur" | "parent" | "admin";

export interface Utilisateur {
  id: string;               // UID Firebase Auth
  email: string;
  nom: string;
  prenom: string;
  photoUrl?: string;
  role: RoleUtilisateur;
  boursesEnFavoris: string[];   // IDs des bourses sauvegardées
  guidesAchetes: string[];      // IDs des guides achetés
  coursReserves: string[];      // IDs des réservations de cours
  paysOrigine?: string;
  creeLe: string;
  dernierLogin: string;
}

// ----------------------------------------------------------
// VENTE / COMMANDE
// ----------------------------------------------------------
export type TypeProduit = "guide" | "coaching_vip" | "cours_particulier";
export type StatutVente = "en_attente" | "complete" | "rembourse" | "echec";

export interface Vente {
  id: string;
  userId: string;
  produitType: TypeProduit;
  produitId: string;         // ID du guide, session coaching, etc.
  montant: number;
  devise: string;
  statut: StatutVente;
  methodePaiement: string;   // "stripe", "paypal", "mobile_money"
  referencePaiement: string; // ID de transaction externe
  creeLe: string;
  completeLe?: string;
}

// ----------------------------------------------------------
// RÉSERVATION COACHING VIP
// ----------------------------------------------------------
export interface ReservationCoaching {
  id: string;
  userId: string;
  bourseId: string;
  bourseNom: string;
  dateSession?: string;
  duree: number;           // En minutes
  statut: "demande" | "confirmee" | "completee" | "annulee";
  notes?: string;
  venteId: string;
  creeLe: string;
}

// ----------------------------------------------------------
// TYPES UTILITAIRES pour l'UI
// ----------------------------------------------------------
export interface FiltresBourses {
  paysId?: string;
  niveauEtude?: NiveauEtude;
  typeBourse?: TypeBourse;
  domaine?: string;
  aGuideDisponible?: boolean;
  recherche?: string;
}

export interface ResultatRecherche {
  bourses: Bourse[];
  tuteurs: Tuteur[];
  total: number;
}
