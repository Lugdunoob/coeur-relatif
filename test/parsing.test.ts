import { describe, expect, it } from 'vitest';
import { parserDeclaration, ACTIVITES, DUREES_MINUTES, EFFORTS_MOTS, DUREE_LABELS } from '../src/domain/parsing.js';

// CA-03 : une déclaration valide vient de trois choix par boutons (activité, durée,
// effort), jamais d'une phrase tapée. Décision prise en Recette (2026-09-14, deuxième
// correction) : « Autre » pour l'activité reste la seule entrée en texte libre.
describe('CA-03 : validation de trois choix par boutons', () => {
  it('accepte un choix parmi les listes fermées', () => {
    expect(
      parserDeclaration({ activite: 'Course', minutes: 30, effortMot: 'Soutenu' }),
    ).toEqual({ activite: 'Course', minutes: 30, effort: 6 });
  });

  it('accepte "Autre" avec un texte libre pour l\'activité', () => {
    expect(
      parserDeclaration({ activite: 'Escalade', minutes: 60, effortMot: 'Dur' }),
    ).toEqual({ activite: 'Escalade', minutes: 60, effort: 8 });
  });

  it('rejette une activité vide (bouton "Autre" sans texte saisi)', () => {
    expect(parserDeclaration({ activite: '  ', minutes: 30, effortMot: 'Facile' })).toBeNull();
  });

  it('rejette une durée hors de la liste fermée', () => {
    expect(parserDeclaration({ activite: 'Course', minutes: 25, effortMot: 'Facile' })).toBeNull();
  });

  it('rejette un mot d\'effort inconnu', () => {
    expect(parserDeclaration({ activite: 'Course', minutes: 30, effortMot: 'Extrême' })).toBeNull();
  });

  it('couvre chaque durée et chaque mot d\'effort de la liste', () => {
    for (const minutes of DUREES_MINUTES) {
      for (const effortMot of EFFORTS_MOTS) {
        expect(parserDeclaration({ activite: 'Course', minutes, effortMot })).not.toBeNull();
      }
    }
  });

  it('la liste d\'activités par défaut contient les cinq attendues', () => {
    expect(ACTIVITES).toEqual(['Course', 'Vélo', 'Musculation', 'Natation', 'Marche']);
  });

  it('le dernier palier de durée se lit "90+ min" sur le bouton, sans changer la valeur de calcul', () => {
    expect(DUREE_LABELS[90]).toBe('90+ min');
    expect(parserDeclaration({ activite: 'Course', minutes: 90, effortMot: 'Facile' })).toEqual({
      activite: 'Course',
      minutes: 90,
      effort: 2,
    });
  });
});
