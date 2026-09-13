import { describe, expect, it } from 'vitest';
import { genererRappelLundi } from '../src/domain/rappel-lundi.js';

// CA-13 : message fixe, identique chaque semaine, aucune donnée personnelle.
describe('CA-13 : rappel du lundi', () => {
  it('est identique quelle que soit la semaine', () => {
    expect(genererRappelLundi(new Date('2026-09-14'))).toBe(genererRappelLundi(new Date('2026-09-21')));
  });
  it('ne contient aucun prénom', () => {
    expect(genererRappelLundi(new Date())).not.toMatch(/Noé|Alex/);
  });
});
