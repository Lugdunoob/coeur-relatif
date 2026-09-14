import { describe, expect, it } from 'vitest';
import { genererSignalVendredi } from '../src/domain/signal-vendredi.js';

const seance = (personneId: string) => ({
  id: `s-${personneId}`, personneId, horodatage: new Date(), activite: 'course', minutes: 30, effort: 5, etoiles: 3, messageIdTelegram: null,
});
const coeur = (id: string, seanceId: string) => ({ id, seanceId, donneurId: 'x', horodatage: new Date() });

describe('CA-11 : signal du vendredi sans prénom', () => {
  it('ne contient aucun prénom de la semaine', () => {
    const message = genererSignalVendredi([seance('Noé'), seance('Alex')], [coeur('c1', 's-Noé')]);
    expect(message).not.toMatch(/Noé|Alex/);
    expect(message).toContain('2');
    expect(message).toContain('1');
  });
});

describe('CA-11bis : signal du vendredi même à zéro séance', () => {
  it('envoie quand même un message avec 0 séance, 0 cœur', () => {
    const message = genererSignalVendredi([], []);
    expect(message).toContain('0');
  });
});

describe('CA-12 : aucun message ne signale une absence nominative', () => {
  it('ne mentionne jamais le prénom d\'une personne absente', () => {
    // Alex n'a rien déclaré ; le message ne doit jamais nommer Alex par absence.
    const message = genererSignalVendredi([seance('Noé')], []);
    expect(message).not.toMatch(/Alex/);
  });
});
