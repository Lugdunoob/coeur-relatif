// Types communs. L'implémentation du dépôt réel est le lot 02 (docs/lots.md).
export type Seance = {
  id: string;
  personneId: string;
  horodatage: Date;
  activite: string;
  minutes: number;
  effort: number;
  etoiles: number | null;
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

export const CHAMPS_SEANCE = ['id', 'personneId', 'horodatage', 'activite', 'minutes', 'effort', 'etoiles'];
export const CHAMPS_PERSONNE = ['idTelegram', 'prenom', 'consentementHorodate', 'demandeSuppressionLe'];
