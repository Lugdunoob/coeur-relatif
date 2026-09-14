// Lot 04 (docs/lots.md, carte 04) : rappel fixe du lundi, aucune donnée personnelle.
// CA-13 : texte identique chaque semaine ; le paramètre `date` n'influence pas le contenu.
export function genererRappelLundi(_date: Date): string {
  return "Nouvelle semaine, nouvelles séances. Déclarez-les en privé au bot.";
}
