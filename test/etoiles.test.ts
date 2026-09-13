import { describe, expect, it } from 'vitest';
import { calculerEtoiles } from '../src/domain/etoiles.js';

// CA-04 : silence des deux premières séances (retourne null, pas un nombre).
// CA-07 : seuils exacts. CA-08 : plafond après deux efforts 10 consécutifs.
describe('CA-04 : calibration silencieuse', () => {
  it('ne renvoie aucune étoile pour la 1re et la 2e séance', () => {
    expect(calculerEtoiles({ charge: 100, historiqueCharges: [], effortsRecents: [] })).toBeNull();
    expect(calculerEtoiles({ charge: 100, historiqueCharges: [100], effortsRecents: [5] })).toBeNull();
  });
});

describe('CA-07 : seuils d\'étoiles', () => {
  const historique = [100, 100, 100]; // référence = 100, dès la 3e séance
  const cas: Array<[number, number]> = [
    [50, 1],   // < 0.6 -> 1 étoile
    [80, 2],   // 0.6-0.9 -> 2
    [100, 3],  // 0.9-1.1 -> 3
    [130, 4],  // 1.1-1.4 -> 4
    [200, 5],  // > 1.4 -> 5
  ];
  it.each(cas)('charge %i avec référence 100 donne %i étoile(s)', (charge, attendu) => {
    expect(calculerEtoiles({ charge, historiqueCharges: historique, effortsRecents: [5, 5] })).toBe(attendu);
  });
});

describe('CA-08 : plafond après deux efforts 10 consécutifs', () => {
  it('plafonne à 4 étoiles même si le calcul donnerait 5', () => {
    const historique = [100, 100, 100];
    expect(
      calculerEtoiles({ charge: 200, historiqueCharges: historique, effortsRecents: [10, 10] }),
    ).toBe(4);
  });
});
