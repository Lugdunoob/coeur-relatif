import { describe, expect, it } from 'vitest';
import { InMemoryRepository } from '../src/db/in-memory.js';

// Lien message public ↔ séance (lot 6, carte 17) : nécessaire pour retrouver la séance
// visée par une réaction ❤️ (CA-09), sans dépendre de Telegram ni de Supabase ici.
describe('Repository : lien message ↔ séance', () => {
  it('retrouve une séance par le message publié après coup', async () => {
    const repo = new InMemoryRepository();
    await repo.ajouterSeance({ id: 's1', personneId: 'noe', horodatage: new Date(), activite: 'course', minutes: 30, effort: 7, etoiles: 4, messageIdTelegram: null });
    expect(await repo.seanceParMessage(4242)).toBeUndefined();

    await repo.enregistrerMessageSeance('s1', 4242);
    const trouvee = await repo.seanceParMessage(4242);
    expect(trouvee?.id).toBe('s1');
  });

  it('ne trouve rien pour un message jamais enregistré', async () => {
    const repo = new InMemoryRepository();
    expect(await repo.seanceParMessage(9999)).toBeUndefined();
  });
});
