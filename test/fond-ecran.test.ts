import { describe, expect, it } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { fondEcranCoeursRecus } from '../src/domain/fond-ecran.js';

// CA-25 : le fond d'écran qualitatif des cœurs reçus d'une personne suit la même purge
// que le reste de ses données : rien n'en subsiste après /supprimer ou après
// fin-du-pilote + 30 jours.
describe('CA-25 : le fond d\'écran suit la purge', () => {
  it('ne compte plus aucun cœur après /supprimer', async () => {
    const repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 6, etoiles: 4, messageIdTelegram: null });
    await repo.ajouterCoeur({ id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: new Date() });

    expect(await fondEcranCoeursRecus(repo, 'noe')).toBe(1);

    await repo.supprimerDonneesPersonne('noe');

    expect(await fondEcranCoeursRecus(repo, 'noe')).toBe(0);
  });

  it('ne compte plus aucun cœur après la purge de fin de pilote', async () => {
    const repo = new InMemoryRepository();
    const dateAncienne = new Date('2026-01-01T00:00:00Z');
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: dateAncienne, activite: 'course', minutes: 30, effort: 6, etoiles: 4, messageIdTelegram: null });
    await repo.ajouterCoeur({ id: 'c1', seanceId: 's1', donneurId: 'alex', horodatage: dateAncienne });

    await repo.purgerFinPilote(new Date('2026-09-01T00:00:00Z'));

    expect(await fondEcranCoeursRecus(repo, 'noe')).toBe(0);
  });
});
