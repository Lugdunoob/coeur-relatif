import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { peutEnvoyerCoeurATousLeMonde, envoyerCoeurATousLeMonde } from '../src/domain/anti-abus.js';

// CA-21 : un « cœur à tout le monde » envoyé il y a moins de 24h par la même personne
// fait refuser toute nouvelle tentative, sans qu'aucun cœur supplémentaire ne soit
// enregistré.
describe('CA-21 : anti-abus, une fois par 24h', () => {
  let repo: InMemoryRepository;
  beforeEach(async () => {
    repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'alex', horodatage: new Date(), activite: 'course', minutes: 30, effort: 6, etoiles: 3, messageIdTelegram: null });
    await repo.ajouterCoeur({ id: 'c0', seanceId: 's1', donneurId: 'noe', horodatage: new Date('2026-09-14T08:00:00Z'), type: 'tous' });
  });

  it('refuse un deuxième envoi « tous » moins de 24h après le premier', async () => {
    const maintenant = new Date('2026-09-14T20:00:00Z');
    expect(await peutEnvoyerCoeurATousLeMonde(repo, 'noe', maintenant)).toBe(false);
  });

  it('autorise un envoi « tous » 24h après le précédent', async () => {
    const maintenant = new Date('2026-09-15T08:00:01Z');
    expect(await peutEnvoyerCoeurATousLeMonde(repo, 'noe', maintenant)).toBe(true);
  });
});

// CA-22 : un « cœur à tout le monde » accepté crédite un cœur, individuellement, à
// chaque personne ayant une activité active de la période visée — jamais un total
// groupé ni un cœur unique partagé.
describe('CA-22 : crédit individuel du cœur à tout le monde', () => {
  it('crédite exactement un coeur de type "tous" par destinataire', async () => {
    const repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'alex', horodatage: new Date(), activite: 'course', minutes: 30, effort: 6, etoiles: 3, messageIdTelegram: null });
    await repo.ajouterSeance({ id: 's2', personneId: 'sam', horodatage: new Date(), activite: 'vélo', minutes: 45, effort: 5, etoiles: 3, messageIdTelegram: null });

    const coeurs = await envoyerCoeurATousLeMonde(repo, 'noe', ['s1', 's2'], new Date('2026-09-14T08:00:00Z'));

    expect(coeurs).toHaveLength(2);
    expect(coeurs.every((coeur) => coeur.type === 'tous')).toBe(true);
    expect(new Set(coeurs.map((coeur) => coeur.seanceId))).toEqual(new Set(['s1', 's2']));
  });
});
