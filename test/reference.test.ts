import { describe, expect, it } from 'vitest';
import { referenceGlissante } from '../src/domain/reference.js';

// CA-05 : référence = médiane glissante des six dernières séances, sans distinction
// de semaine civile ; moins de six si l'historique est plus court.
describe('CA-05 : référence personnelle', () => {
  it('est la médiane des charges quand il y a moins de six séances', () => {
    // charges (minutes*effort) : 100, 150, 120 -> médiane = 120
    expect(referenceGlissante([100, 150, 120])).toBe(120);
  });

  it('ne regarde que les six dernières séances, peu importe la semaine', () => {
    const dixCharges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    // les six dernières : 50,60,70,80,90,100 -> médiane = 75
    expect(referenceGlissante(dixCharges)).toBe(75);
  });
});
