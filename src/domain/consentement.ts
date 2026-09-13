const SEPT_JOURS_MS = 7 * 24 * 3600 * 1000;

export function peutEnregistrer(personne: { consentementHorodate?: Date }): boolean {
  return personne.consentementHorodate !== undefined;
}

export function doitRelancerConsentement(derniereRelance: Date, maintenant: Date): boolean {
  return maintenant.getTime() - derniereRelance.getTime() >= SEPT_JOURS_MS;
}
