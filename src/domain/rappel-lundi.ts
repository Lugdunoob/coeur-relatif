// Lot 04 (docs/lots.md, carte 04), corrigé en Recette (2026-09-14, carte 15) : CA-13
// n'exige plus un texte unique, mais une rotation déterministe parmi une liste fixe de
// phrases motivantes — aucune ne mentionne de personne ni aucun chiffre de performance.
// Déterministe (pas aléatoire) pour rester testable : deux appels avec des dates de la
// même semaine renvoient toujours la même phrase.
export const PHRASES_MOTIVATION = [
  'Nouvelle semaine, nouvelles séances. Déclarez-les en privé au bot.',
  'Nouvelle semaine, nouveau départ. Un pas suffit.',
  "Cette semaine, l'important c'est de se lancer, pas de performer.",
  'Chaque séance compte, même la plus courte.',
] as const;

const UN_JOUR_MS = 24 * 3600 * 1000;
// Origine arbitraire mais fixe (un lundi), sert uniquement à indexer les semaines de
// façon reproductible : ce n'est pas un calcul de semaine ISO.
const ORIGINE_LUNDI = Date.UTC(2026, 0, 5);

function indiceSemaine(date: Date): number {
  const jours = Math.floor((date.getTime() - ORIGINE_LUNDI) / UN_JOUR_MS);
  const semaines = Math.floor(jours / 7);
  return ((semaines % PHRASES_MOTIVATION.length) + PHRASES_MOTIVATION.length) % PHRASES_MOTIVATION.length;
}

export function genererRappelLundi(date: Date): string {
  // indiceSemaine() est toujours dans [0, PHRASES_MOTIVATION.length) par construction.
  return PHRASES_MOTIVATION[indiceSemaine(date)] as string;
}
