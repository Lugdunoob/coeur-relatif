// Carte 20/21 (Lot 7) : flux anonymisé de la zone d'envoi de cœurs (R12) et son
// verrouillage par version de consentement (CA-24). Squelette du loop de plan (carte
// 22) : lève une erreur explicite, l'implémentation réelle est le lot de code 7.3
// (docs/lots.md), hors périmètre de ce loop.
//
// CA-23 : ni prénom ni nom d'activité, seul un indicateur d'intensité à deux paliers
// dérivé de l'étoile de la séance (R5).
// CA-24 : exclut les personnes n'ayant pas accepté VERSION_CONSENTEMENT_ACTUELLE.
import type { Personne, Seance } from '../db/schema.js';

export const VERSION_CONSENTEMENT_ACTUELLE = 2;

export type IntensiteCarte = 'petit_coeur' | 'gros_coeur';

export interface CarteActiviteAnonyme {
  seanceId: string;
  intensite: IntensiteCarte;
}

export function fluxActivitesAnonymes(_personnes: Personne[], _seances: Seance[]): CarteActiviteAnonyme[] {
  throw new Error(
    'CA-23/CA-24 : fluxActivitesAnonymes non implémenté (lot de code 7.3, hors périmètre de ce loop de plan).',
  );
}
