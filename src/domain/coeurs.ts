// Lot 03 (docs/lots.md, carte 05) : mécanisme des cœurs, aucune dépendance Telegram
// (ADR-0004). Spike de vérification positif, voir .loop/lot-03-progress.md.
// Async depuis le lot 6 (src/db/repository.ts) : le dépôt réel fait un vrai I/O réseau.
import type { Repository } from '../db/repository.js';
import type { Coeur } from '../db/schema.js';

const UNE_SEMAINE_MS = 7 * 24 * 3600 * 1000;

// CA-09 : un cœur est compté en privé pour l'auteur de la séance, jamais public.
export async function enregistrerCoeur(repo: Repository, coeur: Coeur): Promise<void> {
  await repo.ajouterCoeur(coeur);
}

export async function coeursRecus(repo: Repository, seanceId: string): Promise<number> {
  return (await repo.coeursParSeance(seanceId)).length;
}

// CA-10 : les cœurs donnés sont communiqués en privé par personne, jamais comparés.
export async function coeursDonnesSemaine(repo: Repository, personneId: string, debutSemaine: Date): Promise<number> {
  const finSemaine = new Date(debutSemaine.getTime() + UNE_SEMAINE_MS);
  return (await repo.coeursDonnesParPersonne(personneId)).filter(
    (coeur) => coeur.horodatage >= debutSemaine && coeur.horodatage < finSemaine,
  ).length;
}

const UN_JOUR_MS = 24 * 3600 * 1000;

// Décision prise en Recette (2026-09-14, point 4) : pas de message instantané à chaque
// cœur, un seul résumé groupé par jour, toutes séances de la personne confondues.
// Compte tous les cœurs reçus par la personne, quelle que soit la séance, sur les
// 24h qui suivent `debutJour`.
export async function coeursRecusJour(repo: Repository, personneId: string, debutJour: Date): Promise<number> {
  const finJour = new Date(debutJour.getTime() + UN_JOUR_MS);
  return (await repo.coeursRecusParPersonne(personneId)).filter(
    (coeur) => coeur.horodatage >= debutJour && coeur.horodatage < finJour,
  ).length;
}
