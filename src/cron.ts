// Squelette (lot 04, docs/lots.md). Déclencheurs du job planifié (ADR-0004 : aucun
// calcul ici, aucune dépendance réseau ajoutée à ce stade, aucun test ne l'exige).
//
// Deux déclenchements décrits par docs/contracts.md (« Job planifié (cron Vercel) ») :
//   1. Lundi 8 h locale : appeler `rappel-lundi.ts` (`genererRappelLundi`) avec la date
//      du jour, puis envoyer le texte obtenu tel quel dans le groupe via l'adaptateur
//      `src/telegram/` (CA-13). Aucune donnée de séance ou de cœur à lire pour ce message.
//   2. Vendredi 17 h locale : lire l'ensemble des séances et des cœurs de la semaine via
//      le dépôt (`Repository`, ADR-0004), appeler `signal-vendredi.ts`
//      (`genererSignalVendredi`) avec ces deux listes, envoyer le message obtenu dans le
//      groupe, y compris quand les deux listes sont vides (CA-11, CA-11bis, CA-12).
//
// Le déclenchement lui-même (configuration Vercel Cron, fuseau horaire, route HTTP
// appelée) est un point de déploiement (lot 6, Recette), pas de logique métier : hors
// périmètre du lot 04, qui ne porte que sur `genererSignalVendredi` et
// `genererRappelLundi`.
export {};
