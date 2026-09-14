// Décision prise en Recette (2026-09-14, deuxième correction) : aucun texte libre pour
// déclarer une séance. Trois choix par boutons : activité (liste fermée + « Autre » en
// texte libre, seule exception), durée (liste fermée de minutes), effort ressenti (mots,
// pas des chiffres). Remplace le format en trois lignes tapées de la première correction.
export const ACTIVITES = ['Course', 'Vélo', 'Musculation', 'Natation', 'Marche'] as const;
export const DUREES_MINUTES = [15, 30, 45, 60, 90] as const;
export const EFFORTS_MOTS = ['Facile', 'Modéré', 'Soutenu', 'Dur', 'Maximal'] as const;

export type EffortMot = (typeof EFFORTS_MOTS)[number];

// Mots choisis pour être lus d'un coup d'œil sur un bouton de téléphone. La valeur
// numérique interne alimente le même calcul (charge = minutes × effort) que le lot 1 ;
// rien ne change dans reference.ts ni etoiles.ts.
export const EFFORT_VALEUR: Record<EffortMot, number> = {
  Facile: 2,
  Modéré: 4,
  Soutenu: 6,
  Dur: 8,
  Maximal: 10,
};

export interface ChoixDeclaration {
  // Un élément de ACTIVITES, ou le texte libre saisi après avoir choisi « Autre ».
  activite: string;
  // Doit être un élément de DUREES_MINUTES.
  minutes: number;
  // Doit être un élément de EFFORTS_MOTS.
  effortMot: string;
}

// CA-03 : une déclaration valide vient de trois choix par boutons, jamais d'une phrase
// tapée. « Autre » pour l'activité est la seule entrée en texte libre tolérée.
export function parserDeclaration(choix: ChoixDeclaration): { activite: string; minutes: number; effort: number } | null {
  const activite = choix.activite.trim();
  if (activite === '') return null;

  if (!(DUREES_MINUTES as readonly number[]).includes(choix.minutes)) return null;

  const effort = EFFORT_VALEUR[choix.effortMot as EffortMot];
  if (effort === undefined) return null;

  return { activite, minutes: choix.minutes, effort };
}
