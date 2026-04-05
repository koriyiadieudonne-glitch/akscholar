// ============================================================
// AKSCHOLAR — Données de démonstration (Mock Data)
// À remplacer progressivement par les données Firestore réelles
// ============================================================

import type { Bourse, Pays, Universite, Tuteur } from "@/lib/types";

// ----------------------------------------------------------
// PAYS — Navigation par drapeau
// ----------------------------------------------------------
export const PAYS_POPULAIRES: Pays[] = [
  { id: "fr", nom: "France", code: "FR", drapeau: "🇫🇷", continent: "Europe", nombreBourses: 47 },
  { id: "ca", nom: "Canada", code: "CA", drapeau: "🇨🇦", continent: "Amérique du Nord", nombreBourses: 38 },
  { id: "de", nom: "Allemagne", code: "DE", drapeau: "🇩🇪", continent: "Europe", nombreBourses: 52 },
  { id: "us", nom: "États-Unis", code: "US", drapeau: "🇺🇸", continent: "Amérique du Nord", nombreBourses: 89 },
  { id: "uk", nom: "Royaume-Uni", code: "GB", drapeau: "🇬🇧", continent: "Europe", nombreBourses: 61 },
  { id: "jp", nom: "Japon", code: "JP", drapeau: "🇯🇵", continent: "Asie", nombreBourses: 29 },
  { id: "cn", nom: "Chine", code: "CN", drapeau: "🇨🇳", continent: "Asie", nombreBourses: 44 },
  { id: "au", nom: "Australie", code: "AU", drapeau: "🇦🇺", continent: "Océanie", nombreBourses: 33 },
  { id: "be", nom: "Belgique", code: "BE", drapeau: "🇧🇪", continent: "Europe", nombreBourses: 21 },
  { id: "ch", nom: "Suisse", code: "CH", drapeau: "🇨🇭", continent: "Europe", nombreBourses: 18 },
  { id: "nl", nom: "Pays-Bas", code: "NL", drapeau: "🇳🇱", continent: "Europe", nombreBourses: 26 },
  { id: "se", nom: "Suède", code: "SE", drapeau: "🇸🇪", continent: "Europe", nombreBourses: 15 },
];

// ----------------------------------------------------------
// BOURSES — Données de démonstration
// ----------------------------------------------------------
export const BOURSES_RECENTES: Bourse[] = [
  {
    id: "bourse-eiffel-2025",
    titre: "Bourse d'Excellence Eiffel",
    description:
      "Programme phare du gouvernement français pour attirer des étudiants étrangers d'excellence en Master et Doctorat. Couvre les frais de vie, transport et logement.",
    paysId: "fr",
    paysNom: "France",
    universite: "Plusieurs universités françaises",
    niveauEtude: ["Master", "Doctorat"],
    typeBourse: "Bourse complète",
    montant: "1 181€ - 1 400€ / mois",
    dateLimite: "2025-01-12",
    dateOuverture: "2024-11-01",
    lienOfficiel: "#",
    domaines: ["Ingénierie", "Sciences", "Économie", "Droit", "Architecture"],
    langueInstruction: ["Français", "Anglais"],
    imageUrl: "/images/bourses/eiffel.jpg",
    estVerifiee: true,
    aGuideDisponible: true,
    guideId: "guide-eiffel-2025",
    vues: 12450,
    favoris: 834,
    creeLe: "2024-10-15T10:00:00Z",
    misAJourLe: "2024-11-20T14:30:00Z",
  },
  {
    id: "bourse-daad-2025",
    titre: "Bourse DAAD — Allemagne",
    description:
      "L'Office Allemand d'Échanges Universitaires propose des bourses pour études de Master et Doctorat en Allemagne. Programme très compétitif avec une excellente réputation internationale.",
    paysId: "de",
    paysNom: "Allemagne",
    universite: "Toutes universités allemandes",
    niveauEtude: ["Master", "Doctorat", "Post-doctorat"],
    typeBourse: "Bourse complète",
    montant: "850€ - 1 200€ / mois",
    dateLimite: "2025-10-31",
    lienOfficiel: "#",
    domaines: ["Tous domaines"],
    langueInstruction: ["Allemand", "Anglais"],
    estVerifiee: true,
    aGuideDisponible: true,
    guideId: "guide-daad-2025",
    vues: 9870,
    favoris: 651,
    creeLe: "2024-09-01T08:00:00Z",
    misAJourLe: "2024-10-05T11:00:00Z",
  },
  {
    id: "bourse-chevening-2025",
    titre: "Chevening Scholarship UK",
    description:
      "La bourse du gouvernement britannique pour futurs leaders mondiaux. Finance un Master d'un an dans n'importe quelle université britannique.",
    paysId: "uk",
    paysNom: "Royaume-Uni",
    universite: "Toutes universités britanniques",
    niveauEtude: ["Master"],
    typeBourse: "Bourse complète",
    montant: "Couverture totale + £1,093/mois",
    dateLimite: "2024-11-05",
    lienOfficiel: "#",
    domaines: ["Sciences Politiques", "Économie", "Journalisme", "Droit"],
    langueInstruction: ["Anglais"],
    estVerifiee: true,
    aGuideDisponible: true,
    guideId: "guide-chevening-2025",
    vues: 18320,
    favoris: 1204,
    creeLe: "2024-08-15T07:00:00Z",
    misAJourLe: "2024-09-30T16:00:00Z",
  },
  {
    id: "bourse-fulbright-2025",
    titre: "Fulbright Foreign Student Program",
    description:
      "Le programme d'échange académique le plus prestigieux des États-Unis. Finance des études de Master et Doctorat dans les meilleures universités américaines.",
    paysId: "us",
    paysNom: "États-Unis",
    universite: "Universités américaines partenaires",
    niveauEtude: ["Master", "Doctorat"],
    typeBourse: "Bourse complète",
    montant: "Couverture totale + stipende mensuel",
    dateLimite: "2025-02-15",
    lienOfficiel: "#",
    domaines: ["Arts", "Sciences", "Technologie", "Ingénierie", "Mathématiques"],
    langueInstruction: ["Anglais"],
    estVerifiee: true,
    aGuideDisponible: false,
    vues: 22100,
    favoris: 1876,
    creeLe: "2024-07-01T09:00:00Z",
    misAJourLe: "2024-09-15T12:00:00Z",
  },
  {
    id: "bourse-canada-vanier-2025",
    titre: "Vanier Canada Graduate Scholarships",
    description:
      "Bourse de doctorat d'excellence du gouvernement canadien. Destinée aux étudiants qui démontre un leadership exceptionnel et un fort potentiel académique.",
    paysId: "ca",
    paysNom: "Canada",
    universite: "Universités canadiennes partenaires",
    niveauEtude: ["Doctorat"],
    typeBourse: "Bourse complète",
    montant: "$50,000 CAD / an (3 ans)",
    dateLimite: "2025-11-01",
    lienOfficiel: "#",
    domaines: ["Sciences de la santé", "Sciences naturelles", "Sciences sociales"],
    langueInstruction: ["Anglais", "Français"],
    estVerifiee: true,
    aGuideDisponible: true,
    guideId: "guide-vanier-2025",
    vues: 7650,
    favoris: 489,
    creeLe: "2024-08-20T10:00:00Z",
    misAJourLe: "2024-10-01T09:00:00Z",
  },
  {
    id: "bourse-mext-japon-2025",
    titre: "Bourse MEXT — Gouvernement Japonais",
    description:
      "Le Ministère de l'Éducation japonais offre des bourses complètes pour étudier dans les meilleures universités du Japon. Inclut cours de japonais intensif.",
    paysId: "jp",
    paysNom: "Japon",
    universite: "Universités nationales japonaises",
    niveauEtude: ["Licence", "Master", "Doctorat"],
    typeBourse: "Bourse complète",
    montant: "¥117,000 - ¥145,000 / mois",
    dateLimite: "2025-05-30",
    lienOfficiel: "#",
    domaines: ["Tous domaines"],
    langueInstruction: ["Japonais", "Anglais"],
    estVerifiee: true,
    aGuideDisponible: true,
    guideId: "guide-mext-2025",
    vues: 8900,
    favoris: 723,
    creeLe: "2024-09-10T08:00:00Z",
    misAJourLe: "2024-10-15T10:00:00Z",
  },
];

// ----------------------------------------------------------
// UNIVERSITÉS — Annuaire
// ----------------------------------------------------------
export const UNIVERSITES_POPULAIRES: Universite[] = [
  {
    id: "paris-saclay",
    nom: "Université Paris-Saclay",
    paysId: "fr",
    paysNom: "France",
    ville: "Paris",
    lienOfficiel: "#",
    classementQS: 15,
    domaines: ["Sciences", "Ingénierie", "Médecine"],
    boursesAssociees: ["bourse-eiffel-2025"],
  },
  {
    id: "universite-munich",
    nom: "Ludwig-Maximilians-Universität München",
    paysId: "de",
    paysNom: "Allemagne",
    ville: "Munich",
    lienOfficiel: "#",
    classementQS: 54,
    domaines: ["Médecine", "Droit", "Philosophie", "Sciences"],
    boursesAssociees: ["bourse-daad-2025"],
  },
  {
    id: "oxford",
    nom: "University of Oxford",
    paysId: "uk",
    paysNom: "Royaume-Uni",
    ville: "Oxford",
    lienOfficiel: "#",
    classementQS: 3,
    domaines: ["Tous domaines"],
    boursesAssociees: ["bourse-chevening-2025"],
  },
];

// ----------------------------------------------------------
// TUTEURS — Module Tutor Match
// ----------------------------------------------------------
export const TUTEURS_DISPONIBLES: Tuteur[] = [
  {
    id: "tuteur-001",
    userId: "uid-001",
    nom: "Diallo",
    prenom: "Aminata",
    niveauEtude: "Master 2 Mathématiques Appliquées",
    universite: "Sorbonne Université",
    matieres: ["Mathématiques", "Physique", "Statistiques"],
    langues: ["Français", "Anglais"],
    tarif: 25,
    modeCours: ["domicile", "en_ligne"],
    ville: "Paris",
    note: 4.9,
    nombreCours: 127,
    statut: "valide",
    scoreTest: 92,
    bio: "Diplômée de Sorbonne, passionnée par les mathématiques. J'aide les élèves du lycée au supérieur.",
    disponibilites: ["Lundi soir", "Mercredi", "Samedi matin"],
    creeLe: "2024-01-15T10:00:00Z",
  },
  {
    id: "tuteur-002",
    userId: "uid-002",
    nom: "Kouassi",
    prenom: "Jean-Pierre",
    niveauEtude: "Doctorat Informatique",
    universite: "Université de Montréal",
    matieres: ["Informatique", "Programmation", "Intelligence Artificielle"],
    langues: ["Français", "Anglais"],
    tarif: 35,
    modeCours: ["en_ligne"],
    note: 4.8,
    nombreCours: 89,
    statut: "valide",
    scoreTest: 97,
    bio: "Doctorant en IA avec 5 ans d'expérience en tutorat. Spécialiste Python, Java et Machine Learning.",
    disponibilites: ["Mardi", "Jeudi soir", "Dimanche"],
    creeLe: "2024-02-10T09:00:00Z",
  },
];

// ----------------------------------------------------------
// STATISTIQUES — Pour la section Hero
// ----------------------------------------------------------
export const STATS_PLATEFORME = {
  totalBourses: 1240,
  totalPays: 68,
  totalUniversites: 850,
  totalTuteurs: 320,
  guidesVendus: 4800,
  etudiants: 28000,
};
