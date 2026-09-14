const DECLARATION_RE = /^(.+?)\s+(-?\d+)\s*min\s+effort\s+(-?\d+)\s*$/i;

export function parserDeclaration(texte: string): { activite: string; minutes: number; effort: number } | null {
  const match = texte.trim().match(DECLARATION_RE);
  if (!match) return null;

  const activite = (match[1] as string).trim();
  const minutes = Number(match[2] as string);
  const effort = Number(match[3] as string);

  if (activite === '') return null;
  if (minutes <= 0) return null;
  if (effort < 1 || effort > 10) return null;

  return { activite, minutes, effort };
}
