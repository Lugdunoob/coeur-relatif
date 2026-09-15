// Carte 20/21 (Lot 7) : fond d'écran qualitatif des cœurs reçus, lecture calculée (pas
// un stockage séparé) — conséquence sur R9, purge héritée de la table `coeur`.
// Squelette du loop de plan (carte 22) : lève une erreur explicite, l'implémentation
// réelle est le lot de code 7.4 (docs/lots.md), hors périmètre de ce loop.
//
// CA-25 : rien ne doit subsister après /supprimer ou fin-du-pilote + 30 jours.
import type { Repository } from '../db/repository.js';

export async function fondEcranCoeursRecus(_repo: Repository, _personneId: string): Promise<number> {
  throw new Error(
    'CA-25 : fondEcranCoeursRecus non implémenté (lot de code 7.4, hors périmètre de ce loop de plan).',
  );
}
