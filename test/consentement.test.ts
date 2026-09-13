import { describe, expect, it } from 'vitest';
import { peutEnregistrer, doitRelancerConsentement } from '../src/domain/consentement.js';

// CA-01 : rien n'est enregistré avant consentement explicite.
describe('CA-01 : consentement requis', () => {
  it('refuse tant que la personne n\'a pas accepté', () => {
    expect(peutEnregistrer({ consentementHorodate: undefined })).toBe(false);
    expect(peutEnregistrer({ consentementHorodate: new Date('2026-09-13') })).toBe(true);
  });
});

// CA-02 : au plus une relance par période de 7 jours.
describe('CA-02 : relance de consentement', () => {
  it('ne relance pas avant 7 jours', () => {
    const derniereRelance = new Date('2026-09-10T00:00:00Z');
    const maintenant = new Date('2026-09-13T00:00:00Z'); // 3 jours après
    expect(doitRelancerConsentement(derniereRelance, maintenant)).toBe(false);
  });
  it('relance après 7 jours', () => {
    const derniereRelance = new Date('2026-09-01T00:00:00Z');
    const maintenant = new Date('2026-09-13T00:00:00Z'); // 12 jours après
    expect(doitRelancerConsentement(derniereRelance, maintenant)).toBe(true);
  });
});
