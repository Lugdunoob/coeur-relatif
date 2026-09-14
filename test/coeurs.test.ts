import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { enregistrerCoeur, coeursRecus, coeursDonnesSemaine, coeursRecusJour } from '../src/domain/coeurs.js';

// CA-09 : un cœur est compté en privé pour l'auteur de la séance, jamais public.
// CA-10 : les cœurs donnés sont communiqués en privé par personne, jamais comparés.
describe('CA-09 et CA-10 : les cœurs', () => {
  let repo: InMemoryRepository;
  beforeEach(async () => {
    repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 7, etoiles: 4 });
  });

  it('compte un cœur reçu sur une séance', async () => {
    await enregistrerCoeur(repo, { id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date() });
    expect(await coeursRecus(repo, 's1')).toBe(1);
  });

  it('compte les cœurs donnés par une personne sur une semaine', async () => {
    await enregistrerCoeur(repo, { id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date('2026-09-14') });
    const debutSemaine = new Date('2026-09-14T00:00:00Z');
    expect(await coeursDonnesSemaine(repo, 'alex', debutSemaine)).toBe(1);
  });

  it('regroupe par jour tous les cœurs reçus par une personne, toutes séances confondues', async () => {
    await repo.ajouterSeance({ id: 's2', personneId: 'noe', horodatage: new Date(), activite: 'vélo', minutes: 45, effort: 4, etoiles: 3 });
    await enregistrerCoeur(repo, { id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date('2026-09-14T09:00:00Z') });
    await enregistrerCoeur(repo, { id: 'c2', seanceId: 's2', donneurId: 'sam', horodatage: new Date('2026-09-14T18:00:00Z') });
    // Un cœur la veille ne doit pas être compté dans le résumé du 14.
    await enregistrerCoeur(repo, { id: 'c3', seanceId: 's1', donneurId: 'sam', horodatage: new Date('2026-09-13T09:00:00Z') });
    const debutJour = new Date('2026-09-14T00:00:00Z');
    expect(await coeursRecusJour(repo, 'noe', debutJour)).toBe(2);
  });

  it('renvoie zéro sans lever d\'erreur quand aucun cœur n\'a été reçu ce jour-là', async () => {
    const debutJour = new Date('2026-09-14T00:00:00Z');
    expect(await coeursRecusJour(repo, 'noe', debutJour)).toBe(0);
  });
});
