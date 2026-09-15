import { describe, expect, it } from 'vitest';
import { signalPays, NIVEAUX_AGREGATION_AUTORISES, type ActivitePersonne } from '../src/domain/signal-pays.js';

// CA-18 : bande calculée par médiane des niveaux hebdomadaires (médiane d'étoiles par
// personne), jamais une somme ni une moyenne pondérée par le nombre de personnes.
// Exemple vérifié à la main en carte 20 : Pays A [4,5,2] -> médiane 4 -> très actif ;
// Pays B [3,3,3,2,3] -> médiane 3 -> actif ; Pays C [5] -> médiane 5 -> très actif.
describe('CA-18 : bande qualitative pays/région', () => {
  it('calcule les bandes de l\'exemple de la carte 20', () => {
    const activites: ActivitePersonne[] = [
      { paysId: 'A', etoilesSemaine: [4] },
      { paysId: 'A', etoilesSemaine: [5] },
      { paysId: 'A', etoilesSemaine: [2] },
      { paysId: 'B', etoilesSemaine: [3] },
      { paysId: 'B', etoilesSemaine: [3] },
      { paysId: 'B', etoilesSemaine: [3] },
      { paysId: 'B', etoilesSemaine: [2] },
      { paysId: 'B', etoilesSemaine: [3] },
      { paysId: 'C', etoilesSemaine: [5] },
    ];

    const bandes = signalPays(activites);

    expect(bandes.get('A')).toBe('tres_actif');
    expect(bandes.get('B')).toBe('actif');
    expect(bandes.get('C')).toBe('tres_actif');
  });

  it('ne produit aucune bande pour un pays sans aucune étoile cette semaine', () => {
    const bandes = signalPays([{ paysId: 'A', etoilesSemaine: [4] }]);
    expect(bandes.has('D')).toBe(false);
  });
});

// CA-19 : deux pays de même bande ne sont jamais départagés par un ordre individuel.
describe('CA-19 : pas de classement individuel entre pays de même bande', () => {
  it('renvoie exactement la bande, jamais un nombre ou une position, pour deux pays ex æquo', () => {
    const activites: ActivitePersonne[] = [
      { paysId: 'A', etoilesSemaine: [3] },
      { paysId: 'A', etoilesSemaine: [5] },
      { paysId: 'C', etoilesSemaine: [5] },
    ];

    const bandes = signalPays(activites);

    expect(bandes.get('A')).toBe(bandes.get('C'));
    for (const valeur of bandes.values()) {
      expect(['calme', 'actif', 'tres_actif']).toContain(valeur);
      expect(typeof valeur).toBe('string');
    }
  });
});

// CA-20 : équipe et entreprise ne sont pas des granularités d'agrégation autorisées ;
// seul le niveau pays est autorisé par R7 amendée.
describe('CA-20 : seul le pays est une granularité d\'agrégation autorisée', () => {
  it('n\'autorise que le niveau pays', () => {
    expect(NIVEAUX_AGREGATION_AUTORISES).toEqual(['pays']);
    expect(NIVEAUX_AGREGATION_AUTORISES).not.toContain('equipe');
    expect(NIVEAUX_AGREGATION_AUTORISES).not.toContain('entreprise');
  });
});
