// Lot 05 (docs/lots.md, carte 05) : purge automatique fin de pilote (CA-16).
import type { InMemoryRepository } from '../db/in-memory.js';

const UN_JOUR_MS = 24 * 3600 * 1000;
const GRACE_JOURS = 30;

// CA-16 : toute donnée d'une personne est effacée automatiquement à la date
// fin-du-pilote + 30 jours, sans action requise. `maintenant` sert de garde : tant que
// la date butoir n'est pas atteinte, rien n'est supprimé. Une fois la date butoir
// atteinte, tout le pilote se termine à la fois : séances (et cœurs qui leur étaient
// rattachés), fiches personne et rappels de consentement sont effacés.
export function purger(repo: InMemoryRepository, maintenant: Date, finPilote: Date): void {
  const dateButoir = new Date(finPilote.getTime() + GRACE_JOURS * UN_JOUR_MS);
  if (maintenant < dateButoir) {
    return;
  }

  repo.purgerFinPilote(dateButoir);
}
