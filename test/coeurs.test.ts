import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { enregistrerCoeur, coeursRecus, coeursDonnesSemaine } from '../src/domain/coeurs.js';

// CA-09 : un cœur est compté en privé pour l'auteur de la séance, jamais public.
// CA-10 : les cœurs donnés sont communiqués en privé par personne, jamais comparés.
describe('CA-09 et CA-10 : les cœurs', () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
    repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 7, etoiles: 4 });
  });

  it('compte un cœur reçu sur une séance', () => {
    enregistrerCoeur(repo, { id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date() });
    expect(coeursRecus(repo, 's1')).toBe(1);
  });

  it('compte les cœurs donnés par une personne sur une semaine', () => {
    enregistrerCoeur(repo, { id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date('2026-09-14') });
    const debutSemaine = new Date('2026-09-14T00:00:00Z');
    expect(coeursDonnesSemaine(repo, 'alex', debutSemaine)).toBe(1);
  });
});
