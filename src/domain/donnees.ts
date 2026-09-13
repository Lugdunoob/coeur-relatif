// Stub de typage : implémentation réelle au lot 05 (docs/lots.md). Voir LESSONS.md, R-7.
import type { InMemoryRepository } from '../db/in-memory.js';

export function mesDonnees(_repo: InMemoryRepository, _personneId: string, _semaineCourante: Date): { etoiles: number }[] {
  throw new Error('mesDonnees : à implémenter au lot 05');
}

export function supprimerMesDonnees(_repo: InMemoryRepository, _personneId: string): void {
  throw new Error('supprimerMesDonnees : à implémenter au lot 05');
}
