// Stub de typage : implémentation réelle au lot 05 (docs/lots.md). Voir LESSONS.md, R-7.
import type { InMemoryRepository } from '../db/in-memory.js';

export function purger(_repo: InMemoryRepository, _maintenant: Date, _finPilote: Date): void {
  throw new Error('purger : à implémenter au lot 05');
}
