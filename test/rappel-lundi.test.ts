import { describe, expect, it } from 'vitest';
import { genererRappelLundi, PHRASES_MOTIVATION } from '../src/domain/rappel-lundi.js';

// CA-13 : rotation déterministe parmi une liste fixe de phrases motivantes, jamais de
// donnée personnelle. Corrigé en Recette (2026-09-14, carte 15) : n'exige plus un texte
// unique pour toutes les semaines.
describe('CA-13 : rappel du lundi', () => {
  it('renvoie la même phrase pour deux dates de la même semaine', () => {
    expect(genererRappelLundi(new Date('2026-09-14'))).toBe(genererRappelLundi(new Date('2026-09-18')));
  });

  it('change de phrase la semaine suivante', () => {
    expect(genererRappelLundi(new Date('2026-09-14'))).not.toBe(genererRappelLundi(new Date('2026-09-21')));
  });

  it('reboucle sur la liste après un tour complet', () => {
    const uneSemaine = 7 * 24 * 3600 * 1000;
    const debut = new Date('2026-09-14').getTime();
    const apresUnTour = new Date(debut + PHRASES_MOTIVATION.length * uneSemaine);
    expect(genererRappelLundi(new Date(debut))).toBe(genererRappelLundi(apresUnTour));
  });

  it('ne renvoie que des phrases de la liste fixe', () => {
    expect(PHRASES_MOTIVATION).toContain(genererRappelLundi(new Date()));
  });

  it('aucune phrase de la liste ne contient de prénom ni de chiffre', () => {
    for (const phrase of PHRASES_MOTIVATION) {
      expect(phrase).not.toMatch(/Noé|Alex/);
      expect(phrase).not.toMatch(/\d/);
    }
  });
});
