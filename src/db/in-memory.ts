// Stub de typage : l'implémentation réelle du dépôt en mémoire est le lot 02
// (docs/lots.md). Ne pas coder la logique ici avant ce lot — ce fichier existe
// uniquement pour que `tsc` et les tests des lots 3 à 5 se chargent proprement
// avant que le lot 02 n'existe (voir LESSONS.md, R-7).
import type { Seance } from './schema.js';

export class InMemoryRepository {
  ajouterSeance(_seance: Seance): void {
    throw new Error('InMemoryRepository.ajouterSeance : à implémenter au lot 02');
  }
  dernieresSeances(_personneId: string, _n: number): Seance[] {
    throw new Error('InMemoryRepository.dernieresSeances : à implémenter au lot 02');
  }
}
