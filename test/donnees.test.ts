import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';
import { mesDonnees, supprimerMesDonnees } from '../src/domain/donnees.js';

describe('CA-14 : /mesdonnees est isolé par personne', () => {
  let repo: InMemoryRepository;
  beforeEach(async () => {
    repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 7, etoiles: 4 });
    await repo.ajouterSeance({ id: 's2', personneId: 'alex', horodatage: new Date(), activite: 'vélo', minutes: 40, effort: 6, etoiles: 3 });
  });
  it('ne renvoie que les étoiles de la personne qui demande', async () => {
    const donnees = await mesDonnees(repo, 'noe', new Date());
    expect(donnees.every((d) => d.etoiles !== 3)).toBe(true);
  });
});

describe('CA-15 : /supprimer efface et confirme', () => {
  it('rend le dépôt vide pour cette personne après suppression', async () => {
    const repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 7, etoiles: 4 });
    await supprimerMesDonnees(repo, 'noe');
    expect(await mesDonnees(repo, 'noe', new Date())).toEqual([]);
  });
});
