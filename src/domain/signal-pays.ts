// Carte 20/21 (Lot 7) : signal qualitatif pays/région, jamais un nombre affiché (R7
// amendée, R13). Squelette du loop de plan (carte 22) : lève une erreur explicite, le
// calcul réel est un lot de code (7.1, docs/lots.md), hors périmètre de ce loop.
//
// CA-18 : bande calculée par médiane des niveaux hebdomadaires (médiane des étoiles par
// personne), jamais une somme ni une moyenne pondérée par le nombre de personnes.
// CA-19 : deux pays de même bande ne sont jamais départagés par un ordre caché.
// CA-20 : équipe et entreprise ne sont pas des granularités d'agrégation autorisées.

export type BandeIntensite = 'calme' | 'actif' | 'tres_actif';

export interface ActivitePersonne {
  paysId: string;
  etoilesSemaine: number[];
}

// CA-20 : liste blanche des niveaux d'agrégation autorisés par R7 amendée. Valeur
// volontairement incorrecte ici (inclut 'equipe' à tort) — le lot de code (7.1) doit la
// corriger à ['pays'] uniquement.
export const NIVEAUX_AGREGATION_AUTORISES: readonly string[] = ['pays', 'equipe'];

export function signalPays(_activites: ActivitePersonne[]): Map<string, BandeIntensite> {
  throw new Error(
    'CA-18/CA-19 : signalPays non implémenté (lot de code 7.1, hors périmètre de ce loop de plan).',
  );
}
