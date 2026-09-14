import { describe, expect, it } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { declarerSeance } from '../src/domain/declarer.js';

// Orchestration partagée entre canaux (ADR-0006) : mêmes garanties que CA-03/CA-04
// vérifiées via bot.ts, mais indépendamment de Telegram ou du web.
describe('declarerSeance : orchestration commune aux canaux', () => {
  it('rejette un choix invalide sans rien enregistrer', async () => {
    const repo = new InMemoryRepository();
    const resultat = await declarerSeance(repo, 'noe', { activite: 'Course', minutes: 999, effortMot: 'Facile' });
    expect(resultat).toBeNull();
    expect(await repo.seancesDe('noe')).toEqual([]);
  });

  it('enregistre la séance et renvoie null en étoiles pendant la calibration', async () => {
    const repo = new InMemoryRepository();
    const resultat = await declarerSeance(repo, 'noe', { activite: 'Course', minutes: 30, effortMot: 'Soutenu' });
    expect(resultat?.etoiles).toBeNull();
    expect(resultat?.activite).toBe('Course');
    expect(await repo.seancesDe('noe')).toHaveLength(1);
  });

  it('calcule des étoiles à partir de la 3e séance', async () => {
    const repo = new InMemoryRepository();
    await declarerSeance(repo, 'noe', { activite: 'Course', minutes: 30, effortMot: 'Soutenu' });
    await declarerSeance(repo, 'noe', { activite: 'Course', minutes: 30, effortMot: 'Soutenu' });
    const troisieme = await declarerSeance(repo, 'noe', { activite: 'Course', minutes: 30, effortMot: 'Soutenu' });
    expect(troisieme?.etoiles).not.toBeNull();
  });
});
