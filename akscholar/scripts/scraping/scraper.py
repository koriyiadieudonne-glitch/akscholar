#!/usr/bin/env python3
"""
============================================================
AKSCHOLAR — Script de Web Scraping Automatisé
============================================================
OBJECTIF : Détecter automatiquement les nouvelles bourses sur
internet et les insérer dans Firestore.

SOURCES CIBLES (prioritaires) :
  - scholarshipdb.net
  - opportunitiesforafricans.com
  - scholars4dev.com
  - daad.de/en/
  - campusfrance.org (bourses Eiffel)
  - chevening.org
  - fulbright.state.gov

ARCHITECTURE :
  scraper.py (ce fichier) → orchestrateur
  └── scrapers/
      ├── base_scraper.py    → classe abstraite
      ├── scholarshipdb.py   → scraper spécifique
      ├── scholars4dev.py    → scraper spécifique
      └── ...
  └── utils/
      ├── firebase_client.py → push vers Firestore
      ├── deduplication.py   → éviter les doublons
      └── normalizer.py      → normalisation des données

PRÉREQUIS :
  pip install -r requirements.txt
  (ou: pip install requests beautifulsoup4 firebase-admin schedule)

VARIABLES D'ENVIRONNEMENT :
  FIREBASE_SERVICE_ACCOUNT_KEY=/path/to/serviceAccountKey.json
  FIREBASE_PROJECT_ID=akscholar-xxxx
============================================================
"""

import os
import re
import json
import time
import hashlib
import logging
import schedule
from datetime import datetime, timezone
from dataclasses import dataclass, asdict
from typing import Optional
from abc import ABC, abstractmethod

import requests
from bs4 import BeautifulSoup

# ─── Configuration du logger ────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("akscholar.scraper")

# ─── Headers HTTP pour éviter d'être bloqué ─────────────────
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# Délai poli entre les requêtes (secondes) — respect des serveurs
DELAI_ENTRE_REQUETES = 2.5


# ─── Modèle de données normalisé ────────────────────────────
@dataclass
class BourseScrapee:
    """Représente une bourse détectée par scraping, prête pour Firestore."""
    titre: str
    description: str
    pays_nom: str
    pays_id: str           # Code ISO 2 lettres en minuscules
    universite: str
    niveau_etude: list     # ["Master", "Doctorat", ...]
    type_bourse: str       # "Bourse complète", "Bourse partielle", etc.
    montant: str
    date_limite: str       # Format ISO: "2025-01-31"
    lien_officiel: str
    domaines: list         # ["Ingénierie", "Sciences", ...]
    langue_instruction: list
    source_url: str        # URL scrapée (traçabilité)
    est_verifiee: bool = False
    a_guide_disponible: bool = False
    vues: int = 0
    favoris: int = 0

    def generer_id(self) -> str:
        """
        Génère un ID déterministe basé sur le titre + pays + date limite.
        Garantit l'idempotence : scraper deux fois la même bourse = 1 seul doc.
        """
        cle = f"{self.titre}_{self.pays_id}_{self.date_limite}"
        return hashlib.md5(cle.lower().encode()).hexdigest()[:16]

    def vers_firestore(self) -> dict:
        """Convertit en dictionnaire compatible Firestore."""
        maintenant = datetime.now(timezone.utc).isoformat()
        data = asdict(self)
        # Renommer les clés snake_case en camelCase pour JS
        return {
            "id": self.generer_id(),
            "titre": data["titre"],
            "description": data["description"],
            "paysNom": data["pays_nom"],
            "paysId": data["pays_id"],
            "universite": data["universite"],
            "niveauEtude": data["niveau_etude"],
            "typeBourse": data["type_bourse"],
            "montant": data["montant"],
            "dateLimite": data["date_limite"],
            "lienOfficiel": data["lien_officiel"],
            "domaines": data["domaines"],
            "langueInstruction": data["langue_instruction"],
            "sourceUrl": data["source_url"],
            "estVerifiee": False,
            "aGuideDisponible": False,
            "vues": 0,
            "favoris": 0,
            "creeLe": maintenant,
            "misAJourLe": maintenant,
        }


# ─── Classe de base abstraite ────────────────────────────────
class BaseScraper(ABC):
    """Classe abstraite dont héritent tous les scrapers spécifiques."""

    def __init__(self, nom: str, url_base: str):
        self.nom = nom
        self.url_base = url_base
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.logger = logging.getLogger(f"akscholar.scraper.{nom}")

    def get_page(self, url: str) -> Optional[BeautifulSoup]:
        """
        Récupère une page et retourne son BeautifulSoup.
        Gère les erreurs HTTP et les timeouts.
        """
        try:
            self.logger.info(f"📡 GET {url}")
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            time.sleep(DELAI_ENTRE_REQUETES)  # Pause polie
            return BeautifulSoup(response.text, "html.parser")
        except requests.exceptions.HTTPError as e:
            self.logger.error(f"❌ Erreur HTTP {e.response.status_code} : {url}")
        except requests.exceptions.ConnectionError:
            self.logger.error(f"❌ Connexion impossible : {url}")
        except requests.exceptions.Timeout:
            self.logger.error(f"⏱️  Timeout : {url}")
        return None

    @abstractmethod
    def scraper(self) -> list[BourseScrapee]:
        """Méthode principale à implémenter dans chaque sous-classe."""
        pass

    def normaliser_date(self, texte: str) -> str:
        """
        Tente de convertir une date textuelle en format ISO YYYY-MM-DD.
        Exemples : "January 15, 2025" → "2025-01-15"
        """
        formats = [
            "%B %d, %Y",     # January 15, 2025
            "%d %B %Y",      # 15 January 2025
            "%d/%m/%Y",      # 15/01/2025
            "%Y-%m-%d",      # 2025-01-15 (déjà correct)
        ]
        for fmt in formats:
            try:
                return datetime.strptime(texte.strip(), fmt).strftime("%Y-%m-%d")
            except ValueError:
                continue
        self.logger.warning(f"⚠️  Date non parsée : '{texte}' — retour brut")
        return texte.strip()

    def mapper_pays(self, texte: str) -> tuple[str, str]:
        """
        Retourne (pays_id, pays_nom) depuis un texte libre.
        Ex: "France" → ("fr", "France")
        """
        TABLE_PAYS = {
            "france": ("fr", "France"),
            "germany": ("de", "Allemagne"),
            "allemagne": ("de", "Allemagne"),
            "canada": ("ca", "Canada"),
            "united kingdom": ("uk", "Royaume-Uni"),
            "uk": ("uk", "Royaume-Uni"),
            "united states": ("us", "États-Unis"),
            "usa": ("us", "États-Unis"),
            "japan": ("jp", "Japon"),
            "japon": ("jp", "Japon"),
            "china": ("cn", "Chine"),
            "chine": ("cn", "Chine"),
            "australia": ("au", "Australie"),
            "australie": ("au", "Australie"),
            "belgium": ("be", "Belgique"),
            "belgique": ("be", "Belgique"),
            "switzerland": ("ch", "Suisse"),
            "suisse": ("ch", "Suisse"),
            "netherlands": ("nl", "Pays-Bas"),
            "sweden": ("se", "Suède"),
            "suède": ("se", "Suède"),
        }
        cle = texte.lower().strip()
        return TABLE_PAYS.get(cle, ("autre", texte.strip()))


# ─── Scraper concret : ScholarshipDB ────────────────────────
class ScholarshipDBScraper(BaseScraper):
    """
    Scrape scholarshipdb.net — l'une des plus grandes BDD de bourses.
    Adapte selon la structure HTML du site cible.
    """

    def __init__(self):
        super().__init__("scholarshipdb", "https://scholarshipdb.net")

    def scraper(self) -> list[BourseScrapee]:
        bourses = []
        url = f"{self.url_base}/scholarships"
        soup = self.get_page(url)
        if not soup:
            return bourses

        # Sélectionner les cartes de bourses (adapter le sélecteur CSS)
        cartes = soup.select(".scholarship-item, .listing-item, article.scholarship")
        self.logger.info(f"📋 {len(cartes)} bourses détectées")

        for carte in cartes[:20]:  # Limiter à 20 par passage
            try:
                # Extraire titre
                titre_el = carte.select_one("h2, h3, .title, .scholarship-title")
                if not titre_el:
                    continue
                titre = titre_el.get_text(strip=True)

                # Extraire lien officiel
                lien_el = carte.select_one("a[href]")
                lien = lien_el["href"] if lien_el else url

                # Extraire pays
                pays_el = carte.select_one(".country, .location, [data-country]")
                pays_texte = pays_el.get_text(strip=True) if pays_el else "Inconnu"
                pays_id, pays_nom = self.mapper_pays(pays_texte)

                # Extraire date limite
                date_el = carte.select_one(".deadline, .date, time")
                date_brute = date_el.get_text(strip=True) if date_el else "2025-12-31"
                date_limite = self.normaliser_date(date_brute)

                # Extraire description (tronquée)
                desc_el = carte.select_one("p, .description, .excerpt")
                description = desc_el.get_text(strip=True)[:500] if desc_el else titre

                bourse = BourseScrapee(
                    titre=titre,
                    description=description,
                    pays_nom=pays_nom,
                    pays_id=pays_id,
                    universite="À préciser",
                    niveau_etude=["Master", "Doctorat"],  # À affiner
                    type_bourse="Bourse complète",
                    montant="À préciser",
                    date_limite=date_limite,
                    lien_officiel=lien if lien.startswith("http") else f"{self.url_base}{lien}",
                    domaines=["Tous domaines"],
                    langue_instruction=["Anglais"],
                    source_url=url,
                )
                bourses.append(bourse)

            except Exception as e:
                self.logger.error(f"⚠️  Erreur extraction : {e}")
                continue

        return bourses


# ─── Client Firestore (abstraction) ─────────────────────────
class FirestoreClient:
    """
    Gère la connexion et les écritures Firestore.
    Nécessite un fichier de service account Firebase.
    """

    def __init__(self):
        try:
            import firebase_admin
            from firebase_admin import credentials, firestore

            key_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT_KEY", "serviceAccountKey.json")
            if not firebase_admin._apps:
                cred = credentials.Certificate(key_path)
                firebase_admin.initialize_app(cred)

            self.db = firestore.client()
            self.logger = logging.getLogger("akscholar.firestore")
            self.logger.info("✅ Connexion Firestore établie")
        except ImportError:
            raise RuntimeError(
                "firebase-admin non installé. "
                "Exécutez : pip install firebase-admin"
            )

    def inserer_bourse(self, bourse: BourseScrapee) -> bool:
        """
        Insère une bourse avec idempotence :
        si le document existe déjà (même ID), il est mis à jour (merge).
        """
        try:
            doc_id = bourse.generer_id()
            data = bourse.vers_firestore()
            ref = self.db.collection("bourses").document(doc_id)

            # Merge = ne pas écraser les champs manuellement modifiés
            ref.set(data, merge=True)
            self.logger.info(f"✅ Bourse insérée/mise à jour : {bourse.titre[:50]}")
            return True
        except Exception as e:
            self.logger.error(f"❌ Erreur Firestore : {e}")
            return False

    def bourse_existe(self, bourse_id: str) -> bool:
        """Vérifie si une bourse existe déjà pour éviter les doublons."""
        ref = self.db.collection("bourses").document(bourse_id)
        return ref.get().exists


# ─── Orchestrateur principal ─────────────────────────────────
class ScraperOrchestrator:
    """
    Lance tous les scrapers, déduplique, et insère dans Firestore.
    """

    def __init__(self, mode_sec: bool = False):
        """
        mode_sec : si True, affiche les résultats sans écrire en DB.
        Utile pour tester sans modifier Firestore.
        """
        self.mode_sec = mode_sec
        self.scrapers = [
            ScholarshipDBScraper(),
            # Ajouter ici d'autres scrapers :
            # Scholars4DevScraper(),
            # DAADScraper(),
            # EiffelScraper(),
        ]
        if not mode_sec:
            self.firestore = FirestoreClient()
        self.logger = logging.getLogger("akscholar.orchestrateur")

    def executer(self):
        """Lance un cycle complet de scraping."""
        debut = datetime.now()
        self.logger.info(f"🚀 Démarrage du scraping — {debut.strftime('%Y-%m-%d %H:%M')}")

        total_trouvees = 0
        total_inserees = 0

        for scraper in self.scrapers:
            self.logger.info(f"🔍 Scraper : {scraper.nom}")
            try:
                bourses = scraper.scraper()
                total_trouvees += len(bourses)

                for bourse in bourses:
                    if self.mode_sec:
                        # Affichage uniquement
                        print(json.dumps(bourse.vers_firestore(), ensure_ascii=False, indent=2))
                        total_inserees += 1
                    else:
                        # Vérification doublon avant insertion
                        bourse_id = bourse.generer_id()
                        if not self.firestore.bourse_existe(bourse_id):
                            if self.firestore.inserer_bourse(bourse):
                                total_inserees += 1
                        else:
                            self.logger.debug(f"⏭️  Doublon ignoré : {bourse.titre[:40]}")

            except Exception as e:
                self.logger.error(f"❌ Scraper {scraper.nom} a planté : {e}")

        duree = (datetime.now() - debut).seconds
        self.logger.info(
            f"✅ Scraping terminé en {duree}s — "
            f"{total_trouvees} trouvées, {total_inserees} insérées"
        )


# ─── Point d'entrée ─────────────────────────────────────────
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="AKSCHOLAR — Scraper de bourses d'études"
    )
    parser.add_argument(
        "--sec",
        action="store_true",
        help="Mode sec : affiche sans écrire en base",
    )
    parser.add_argument(
        "--planifier",
        action="store_true",
        help="Active la planification automatique (toutes les 6h)",
    )
    args = parser.parse_args()

    orchestrateur = ScraperOrchestrator(mode_sec=args.sec)

    if args.planifier:
        # Planification : scraping toutes les 6 heures
        logger.info("⏰ Planification activée — scraping toutes les 6 heures")
        schedule.every(6).hours.do(orchestrateur.executer)

        # Lancer une première fois immédiatement
        orchestrateur.executer()

        while True:
            schedule.run_pending()
            time.sleep(60)
    else:
        # Exécution unique
        orchestrateur.executer()
