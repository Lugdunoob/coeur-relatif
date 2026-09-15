// Types communs. L'implémentation du dépôt réel est le lot 02 (docs/lots.md).
export type Seance = {
  id: string;
  personneId: string;
  horodatage: Date;
  activite: string;
  minutes: number;
  effort: number;
  etoiles: number | null;
  // Identifiant du message publié dans le groupe (P4), pour retrouver la séance visée
  // par une réaction ❤️ (CA-09). `null` tant qu'aucun message n'a été publié (P3 :
  // calibration, ou etoiles encore vide). Point laissé ouvert au lot 2/3, tranché ici
  // au lot 6 (voir carte 17) : ni docs/data-model.md ni ce type ne le portaient avant.
  messageIdTelegram: number | null;
};

export type Personne = {
  idTelegram: string;
  prenom: string;
  consentementHorodate?: Date;
  demandeSuppressionLe?: Date;
  // Carte 21 (Lot 7) : optionnel, les personnes inscrites avant le Lot 7 n'en ont pas
  // tant que le lot de code ne les a pas migrées (ADR-0007 : forme, pas cloisonnement).
  equipeId?: string;
  // Carte 21 (Lot 7) : absent = traité comme version 1 (CA-24), donc inférieur à
  // VERSION_CONSENTEMENT_ACTUELLE (src/domain/flux-anonymise.ts).
  consentementVersionAcceptee?: number;
};

export type Coeur = {
  id: string;
  seanceId: string;
  donneurId: string;
  horodatage: Date;
  // Carte 21 (Lot 7, P9) : optionnel, absent = équivalent 'simple' pour les cœurs
  // antérieurs au Lot 7. Un « cœur à tout le monde » produit plusieurs lignes (une par
  // destinataire), jamais une ligne groupée (CA-22).
  type?: 'simple' | 'grand' | 'tous';
};

// Carte 21 (Lot 7) : forme de la hiérarchie multi-entreprises, pas un cloisonnement
// d'accès réel entre entreprises — voir docs/adr/0007-limite-cloisonnement-multi-entreprises.md.
export type Pays = {
  id: string;
  nom: string;
  region?: string;
};

export type Entreprise = {
  id: string;
  nom: string;
  paysId: string;
};

export type Equipe = {
  id: string;
  nom: string;
  entrepriseId: string;
};

export const CHAMPS_SEANCE = ['id', 'personneId', 'horodatage', 'activite', 'minutes', 'effort', 'etoiles', 'messageIdTelegram'];
// CA-26 (carte 22, intentionnel) : 'equipeId' n'est pas encore ajouté ici alors qu'il
// existe déjà sur le type Personne ci-dessus — c'est le lot de code (7.1, docs/lots.md)
// qui doit mettre cette constante à jour, pas ce loop de plan.
export const CHAMPS_PERSONNE = ['idTelegram', 'prenom', 'consentementHorodate', 'demandeSuppressionLe'];
export const CHAMPS_EQUIPE = ['id', 'nom', 'entrepriseId'];
export const CHAMPS_ENTREPRISE = ['id', 'nom', 'paysId'];
export const CHAMPS_PAYS = ['id', 'nom', 'region'];
