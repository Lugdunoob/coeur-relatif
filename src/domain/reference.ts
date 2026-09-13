// CA-05 : référence personnelle = médiane des charges des six dernières séances
// (moins de six si l'historique est plus court), sans distinction de semaine civile.
export function referenceGlissante(charges: number[]): number {
  const dernieres = charges.slice(-6);
  const triees = [...dernieres].sort((a, b) => a - b);
  const milieu = Math.floor(triees.length / 2);

  if (triees.length % 2 === 1) {
    return triees[milieu] as number;
  }

  return ((triees[milieu - 1] as number) + (triees[milieu] as number)) / 2;
}
