import { describe, expect, it } from 'vitest';
import { CHAMPS_PERSONNE, CHAMPS_EQUIPE, CHAMPS_ENTREPRISE, CHAMPS_PAYS } from '../src/db/schema.js';
import type { Pays, Entreprise, Equipe, Personne } from '../src/db/schema.js';

// CA-26 : le modèle de données porte trois niveaux (equipe -> entreprise -> pays) et
// personne.equipe_id ; le pilote n'en peuple qu'une ligne par niveau ; aucun de ces
// niveaux n'implique un cloisonnement d'accès entre entreprises (voir ADR-0007).
describe('CA-26 : forme du modèle multi-entreprises', () => {
  it('porte les trois niveaux avec les champs attendus', () => {
    expect(CHAMPS_PAYS).toEqual(['id', 'nom', 'region']);
    expect(CHAMPS_ENTREPRISE).toEqual(['id', 'nom', 'paysId']);
    expect(CHAMPS_EQUIPE).toEqual(['id', 'nom', 'entrepriseId']);

    const pays: Pays = { id: 'p1', nom: 'France' };
    const entreprise: Entreprise = { id: 'e1', nom: 'domelo', paysId: pays.id };
    const equipe: Equipe = { id: 'eq1', nom: 'Bureau', entrepriseId: entreprise.id };
    const personne: Personne = { idTelegram: 'noe', prenom: 'Noé', equipeId: equipe.id };

    expect(personne.equipeId).toBe(equipe.id);
  });

  it('inclut equipeId dans les champs déclarés de personne (encore faux ici, lot 7.1 à faire)', () => {
    expect(CHAMPS_PERSONNE).toContain('equipeId');
  });
});
