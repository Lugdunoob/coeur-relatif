import { describe, expect, it } from 'vitest';
import { parserDeclaration } from '../src/domain/parsing.js';

// CA-03 : une déclaration valide est une liste de trois lignes (activité, durée,
// effort), dans n'importe quel ordre, reconnues par mot-clé. Décision prise en
// Recette (2026-09-14) : remplace le format en une phrase par une liste à trois
// points, plus lisible pour douze collègues qui découvrent le bot.
describe('CA-03 : validation d\'une déclaration en trois lignes', () => {
  it('accepte le format standard, activité puis durée puis effort', () => {
    expect(
      parserDeclaration('Activité : course\nDurée : 30\nEffort : 7'),
    ).toEqual({ activite: 'course', minutes: 30, effort: 7 });
  });

  it('accepte les lignes dans n\'importe quel ordre', () => {
    expect(
      parserDeclaration('Effort : 7\nActivité : course\nDurée : 30'),
    ).toEqual({ activite: 'course', minutes: 30, effort: 7 });
  });

  it('accepte les mots-clés synonymes, sans accent et sans majuscule', () => {
    expect(
      parserDeclaration('sport: vélo\ntemps: 45\nressenti: 4'),
    ).toEqual({ activite: 'vélo', minutes: 45, effort: 4 });
  });

  it('rejette si une ligne manque', () => {
    expect(parserDeclaration('Activité : course\nDurée : 30')).toBeNull();
  });

  it('rejette un effort hors de 1 à 10', () => {
    expect(parserDeclaration('Activité : course\nDurée : 30\nEffort : 15')).toBeNull();
  });

  it('rejette une durée nulle ou négative', () => {
    expect(parserDeclaration('Activité : course\nDurée : 0\nEffort : 5')).toBeNull();
  });

  it('rejette une activité vide', () => {
    expect(parserDeclaration('Activité : \nDurée : 30\nEffort : 5')).toBeNull();
  });

  it('rejette un texte qui ne ressemble pas à une liste de trois lignes', () => {
    expect(parserDeclaration('course 30 min effort 7')).toBeNull();
    expect(parserDeclaration('zzz')).toBeNull();
  });
});
