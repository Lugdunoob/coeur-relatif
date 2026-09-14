import { describe, expect, it } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { purger } from '../src/domain/purge.js';

// CA-16 : suppression automatique à fin-du-pilote + 30 jours.
describe('CA-16 : purge automatique', () => {
  it('supprime les données au-delà de fin de pilote + 30 jours, garde le reste', async () => {
    const repo = new InMemoryRepository();
    const finPilote = new Date('2026-10-01T00:00:00Z');
    await repo.ajouterSeance({ id: 'vieille', personneId: 'noe', horodatage: new Date('2026-09-01'), activite: 'course', minutes: 30, effort: 7, etoiles: 4 });
    await repo.ajouterSeance({ id: 'recente', personneId: 'noe', horodatage: new Date('2026-09-25'), activite: 'vélo', minutes: 20, effort: 5, etoiles: 2 });
    const maintenant = new Date('2026-11-05T00:00:00Z'); // fin pilote + 35 jours
    await purger(repo, maintenant, finPilote);
    const restantes = await repo.dernieresSeances('noe', 10);
    expect(restantes.find((s) => s.id === 'vieille')).toBeUndefined();
  });
});
