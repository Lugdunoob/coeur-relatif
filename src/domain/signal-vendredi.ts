// Lot 04 (docs/lots.md, carte 04) : signal collectif du vendredi, aucun prénom (R8).
import type { Seance, Coeur } from '../db/schema.js';

// CA-11, CA-11bis, CA-12 : total du groupe uniquement, y compris à zéro.
export function genererSignalVendredi(seances: Seance[], coeurs: Coeur[]): string {
  return `Cette semaine : ${seances.length} séance${seances.length === 1 ? '' : 's'}, ${coeurs.length} cœur${coeurs.length === 1 ? '' : 's'}.`;
}
