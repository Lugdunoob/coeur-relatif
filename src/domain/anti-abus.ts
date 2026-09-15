// Carte 20/21 (Lot 7) : anti-abus de « cœur à tout le monde » (R11). Squelette du loop
// de plan (carte 22) : lève une erreur explicite, l'implémentation réelle est le lot de
// code 7.2 (docs/lots.md), hors périmètre de ce loop.
//
// CA-21 : refus si un envoi « tous » du même donneur existe déjà dans les 24h.
// CA-22 : un envoi accepté crédite chaque destinataire actif individuellement.
import type { Repository } from '../db/repository.js';
import type { Coeur } from '../db/schema.js';

export async function peutEnvoyerCoeurATousLeMonde(
  _repo: Repository,
  _donneurId: string,
  _maintenant: Date,
): Promise<boolean> {
  throw new Error(
    'CA-21 : peutEnvoyerCoeurATousLeMonde non implémenté (lot de code 7.2, hors périmètre de ce loop de plan).',
  );
}

export async function envoyerCoeurATousLeMonde(
  _repo: Repository,
  _donneurId: string,
  _seancesDestinataires: string[],
  _maintenant: Date,
): Promise<Coeur[]> {
  throw new Error(
    'CA-22 : envoyerCoeurATousLeMonde non implémenté (lot de code 7.2, hors périmètre de ce loop de plan).',
  );
}
