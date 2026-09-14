// Lot 05 (docs/lots.md, carte 05) : les droits — accès et suppression, aucune fuite
// vers un tiers (CA-14, CA-15). Async depuis le lot 6 (src/db/repository.ts).
import type { Repository } from '../db/repository.js';

const UN_JOUR_MS = 24 * 3600 * 1000;
const UNE_SEMAINE_MS = 7 * UN_JOUR_MS;

// Semaine civile lundi 00:00 → lundi suivant (heure locale) : convention retenue faute
// d'un calcul de bornes de semaine ailleurs dans le code (`coeurs.ts` reçoit un
// `debutSemaine` déjà calculé par l'appelant ; `rappel-lundi.ts`/`signal-vendredi.ts` ne
// calculent pas de semaine, ils reçoivent des dates déjà découpées).
function debutSemaine(reference: Date): Date {
  const jour = reference.getDay(); // 0 (dimanche) .. 6 (samedi)
  const decalage = (jour + 6) % 7; // nombre de jours depuis le lundi
  return new Date(reference.getFullYear(), reference.getMonth(), reference.getDate() - decalage);
}

// CA-14 : uniquement les étoiles de la semaine en cours de la personne qui invoque
// `/mesdonnees`, jamais celles d'un tiers.
export async function mesDonnees(
  repo: Repository,
  personneId: string,
  semaineCourante: Date,
): Promise<{ etoiles: number }[]> {
  const debut = debutSemaine(semaineCourante);
  const fin = new Date(debut.getTime() + UNE_SEMAINE_MS);

  return (await repo.seancesDe(personneId))
    .filter((seance) => seance.horodatage >= debut && seance.horodatage < fin && seance.etoiles !== null)
    .map((seance) => ({ etoiles: seance.etoiles as number }));
}

// CA-15 : `/supprimer` efface toutes les données de la personne (séances, cœurs donnés
// ou reçus, fiche personne, rappel de consentement).
export async function supprimerMesDonnees(repo: Repository, personneId: string): Promise<void> {
  await repo.supprimerDonneesPersonne(personneId);
}
