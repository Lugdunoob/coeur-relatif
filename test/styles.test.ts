import { describe, expect, it } from 'vitest';
import { STYLE_NEUTRE } from '../src/domain/styles.js';

describe('Style neutre : résumé quotidien des cœurs', () => {
  it('annonce le nombre de cœurs au singulier', () => {
    expect(STYLE_NEUTRE.coeursDigestJour({ nombre: 1 })).toBe('1 cœur reçu aujourd\'hui.');
  });

  it('annonce le nombre de cœurs au pluriel', () => {
    expect(STYLE_NEUTRE.coeursDigestJour({ nombre: 3 })).toBe('3 cœurs reçus aujourd\'hui.');
  });

  it('gère le cas zéro sans afficher "0 cœur"', () => {
    expect(STYLE_NEUTRE.coeursDigestJour({ nombre: 0 })).toBe('Aucun cœur reçu aujourd\'hui.');
  });
});
