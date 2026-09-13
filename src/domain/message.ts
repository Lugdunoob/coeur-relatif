export function formaterMessagePublic({
  prenom,
  etoiles,
  activite,
}: {
  prenom: string;
  etoiles: number;
  activite: string;
}): string {
  return `${prenom} ${'★'.repeat(etoiles)} · ${activite}`;
}
