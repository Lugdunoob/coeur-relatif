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
};

export type Coeur = {
  id: string;
  seanceId: string;
  donneurId: string;
  horodatage: Date;
};

export const CHAMPS_SEANCE = ['id', 'personneId', 'horodatage', 'activite', 'minutes', 'effort', 'etoiles', 'messageIdTelegram'];
export const CHAMPS_PERSONNE = ['idTelegram', 'prenom', 'consentementHorodate', 'demandeSuppressionLe'];
