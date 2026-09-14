// Décision prise en Recette (2026-09-14) : la déclaration est une liste de trois
// lignes (activité, durée, effort), dans n'importe quel ordre, chacune reconnue par
// un mot-clé — plus lisible qu'une phrase à un format rigide pour douze collègues qui
// découvrent le bot. Remplace le format en une ligne du lot 02.
const LIGNE_RE = /^\s*([a-zàâäéèêëïîôöùûüç]+)\s*[:\s]\s*(.+?)\s*$/i;

const MOTS_CLES_ACTIVITE = ['activite', 'sport'];
const MOTS_CLES_DUREE = ['duree', 'minutes', 'temps'];
const MOTS_CLES_EFFORT = ['effort', 'ressenti'];

function sansAccent(mot: string): string {
  return mot.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function parserDeclaration(texte: string): { activite: string; minutes: number; effort: number } | null {
  const lignes = texte.trim().split('\n');
  if (lignes.length !== 3) return null;

  let activite: string | null = null;
  let minutes: number | null = null;
  let effort: number | null = null;

  for (const ligne of lignes) {
    const match = ligne.match(LIGNE_RE);
    if (!match) return null;

    const cle = sansAccent(match[1] as string);
    const valeur = (match[2] as string).trim();

    if (MOTS_CLES_ACTIVITE.includes(cle)) {
      activite = valeur;
    } else if (MOTS_CLES_DUREE.includes(cle)) {
      minutes = Number(valeur);
    } else if (MOTS_CLES_EFFORT.includes(cle)) {
      effort = Number(valeur);
    } else {
      return null;
    }
  }

  if (activite === null || activite === '') return null;
  if (minutes === null || Number.isNaN(minutes) || minutes <= 0) return null;
  if (effort === null || Number.isNaN(effort) || effort < 1 || effort > 10) return null;

  return { activite, minutes, effort };
}
