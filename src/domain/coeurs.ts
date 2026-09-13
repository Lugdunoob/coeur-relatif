// Stub de typage : implémentation réelle au lot 03, après le spike de vérification
// Telegram (docs/lots.md, carte 05). Voir LESSONS.md, R-7.
import type { InMemoryRepository } from '../db/in-memory.js';
import type { Coeur } from '../db/schema.js';

export function enregistrerCoeur(_repo: InMemoryRepository, _coeur: Coeur): void {
  throw new Error('enregistrerCoeur : à implémenter au lot 03');
}

export function coeursRecus(_repo: InMemoryRepository, _seanceId: string): number {
  throw new Error('coeursRecus : à implémenter au lot 03');
}

export function coeursDonnesSemaine(_repo: InMemoryRepository, _personneId: string, _debutSemaine: Date): number {
  throw new Error('coeursDonnesSemaine : à implémenter au lot 03');
}
