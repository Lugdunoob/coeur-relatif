// Décision prise en Recette (2026-09-14, point 4) : chaque message du bot a une clé
// stable et neutre. Un « style » est une table qui associe à chaque clé une fonction de
// mise en forme du texte final. Changer le ton du bot = écrire une nouvelle table
// (ex. `STYLE_CHALEUREUX`) avec les mêmes clés, sans toucher au code qui déclenche les
// messages (`coeurs.ts`, `signal-vendredi.ts`, etc. restent inchangés — ADR-0004).
//
// On démarre avec une seule clé (le résumé quotidien de cœurs) et une seule table
// (`STYLE_NEUTRE`) : le reste des messages du bot migrera dans ce mécanisme au fur et à
// mesure, pas en un seul chantier.

export interface Style {
  coeursDigestJour(donnees: { nombre: number }): string;
}

export const STYLE_NEUTRE: Style = {
  coeursDigestJour: ({ nombre }) => {
    if (nombre === 0) return 'Aucun cœur reçu aujourd\'hui.';
    const pluriel = nombre > 1 ? 's' : '';
    return `${nombre} cœur${pluriel} reçu${pluriel} aujourd'hui.`;
  },
};
