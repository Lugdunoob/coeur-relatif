import { describe, expect, it } from 'vitest';
import { fluxActivitesAnonymes, VERSION_CONSENTEMENT_ACTUELLE } from '../src/domain/flux-anonymise.js';
import type { Personne, Seance } from '../src/db/schema.js';

const seance = (id: string, personneId: string, etoiles: number): Seance => ({
  id,
  personneId,
  horodatage: new Date(),
  activite: 'course',
  minutes: 30,
  effort: 6,
  etoiles,
  messageIdTelegram: null,
});

// CA-23 : une carte d'activité de la zone d'envoi ne contient ni prénom ni nom
// d'activité : seul un indicateur d'intensité à deux paliers dérivé de l'étoile de la
// séance (R5) est présent.
describe('CA-23 : cartes d\'activité anonymisées', () => {
  it('ne renvoie ni prénom ni nom d\'activité, seulement un indicateur d\'intensité', () => {
    const personnes: Personne[] = [{ idTelegram: 'alex', prenom: 'Alex', consentementVersionAcceptee: VERSION_CONSENTEMENT_ACTUELLE }];
    const seances: Seance[] = [seance('s1', 'alex', 5)];

    const cartes = fluxActivitesAnonymes(personnes, seances);

    expect(cartes).toHaveLength(1);
    const carte = cartes[0] as { seanceId: string; intensite: string; prenom?: unknown; activite?: unknown };
    expect(carte.prenom).toBeUndefined();
    expect(carte.activite).toBeUndefined();
    expect(['petit_coeur', 'gros_coeur']).toContain(carte.intensite);
  });
});

// CA-24 : tant qu'une personne n'a pas accepté la version courante du consentement, ses
// séances sont absentes du flux d'activités anonymisées des autres et elle ne peut
// envoyer aucun cœur (cette carte ne teste que le premier volet : l'absence du flux).
describe('CA-24 : verrouillage par version de consentement', () => {
  it('exclut les séances d\'une personne n\'ayant pas accepté la version courante', () => {
    const personnes: Personne[] = [
      { idTelegram: 'alex', prenom: 'Alex', consentementVersionAcceptee: VERSION_CONSENTEMENT_ACTUELLE },
      { idTelegram: 'sam', prenom: 'Sam', consentementVersionAcceptee: VERSION_CONSENTEMENT_ACTUELLE - 1 },
      { idTelegram: 'jo', prenom: 'Jo' },
    ];
    const seances: Seance[] = [seance('s1', 'alex', 4), seance('s2', 'sam', 4), seance('s3', 'jo', 4)];

    const cartes = fluxActivitesAnonymes(personnes, seances);

    expect(cartes.map((carte) => carte.seanceId)).toEqual(['s1']);
  });
});
