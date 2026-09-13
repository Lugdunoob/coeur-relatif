import { describe, expect, it } from 'vitest';
import { CHAMPS_SEANCE, CHAMPS_PERSONNE } from '../src/db/schema.js';

// CA-17 : aucun champ de fréquence cardiaque, distance, allure, position, âge, poids.
const INTERDITS = ['frequenceCardiaque', 'distance', 'allure', 'position', 'age', 'poids'];

describe('CA-17 : aucun champ de santé au sens strict', () => {
  it('n\'a aucun champ interdit dans le modèle de données', () => {
    const tousLesChamps = [...CHAMPS_SEANCE, ...CHAMPS_PERSONNE];
    for (const interdit of INTERDITS) {
      expect(tousLesChamps).not.toContain(interdit);
    }
  });
});
