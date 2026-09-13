import { referenceGlissante } from './reference.js';

interface ParametresEtoiles {
  charge: number;
  historiqueCharges: number[];
  effortsRecents: number[];
}

// CA-04 : calibration silencieuse pendant les deux premières séances (pas encore de
// référence utilisable).
// CA-07 : seuils d'étoiles appliqués au rapport charge / référence.
// CA-08 : deux efforts consécutifs à 10 plafonnent la note à 4 étoiles.
export function calculerEtoiles({
  charge,
  historiqueCharges,
  effortsRecents,
}: ParametresEtoiles): number | null {
  if (historiqueCharges.length < 2) {
    return null;
  }

  const reference = referenceGlissante(historiqueCharges);
  const rapport = charge / reference;

  let etoiles: number;
  if (rapport < 0.6) {
    etoiles = 1;
  } else if (rapport < 0.9) {
    etoiles = 2;
  } else if (rapport < 1.1) {
    etoiles = 3;
  } else if (rapport < 1.4) {
    etoiles = 4;
  } else {
    etoiles = 5;
  }

  const deuxDerniers = effortsRecents.slice(-2);
  const plafondActif = deuxDerniers.length === 2 && deuxDerniers.every((effort) => effort === 10);

  return plafondActif ? Math.min(etoiles, 4) : etoiles;
}
