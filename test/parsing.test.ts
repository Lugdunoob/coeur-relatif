import { describe, expect, it } from 'vitest';
import { parserDeclaration } from '../src/domain/parsing.js';

// CA-03 : activité non vide, minutes > 0, effort entre 1 et 10 ; sinon rejet.
describe('CA-03 : validation d\'une déclaration', () => {
  it('accepte une déclaration valide', () => {
    expect(parserDeclaration('course 30 min effort 7')).toEqual({
      activite: 'course',
      minutes: 30,
      effort: 7,
    });
  });
  it('rejette un effort hors de 1 à 10', () => {
    expect(parserDeclaration('course 30 min effort 15')).toBeNull();
  });
  it('rejette des minutes nulles ou négatives', () => {
    expect(parserDeclaration('course 0 min effort 5')).toBeNull();
  });
  it('rejette une activité vide', () => {
    expect(parserDeclaration('30 min effort 5')).toBeNull();
  });
});
