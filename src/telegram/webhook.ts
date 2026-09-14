// Squelette (lot 02, docs/lots.md). Adaptateur Telegram : aucun calcul ici (ADR-0004),
// aucune dépendance `grammY` ajoutée à ce stade, aucun appel réseau.
//
// Branchement futur, dans l'ordre où un message texte du groupe/de la conversation
// privée sera traité :
//   1. `consentement.ts` (`peutEnregistrer`, `doitRelancerConsentement`) : refuser tout
//      enregistrement tant que la personne n'a pas dit « J'accepte », relancer le rappel
//      de consentement au plus une fois tous les 7 jours (CA-01, CA-02).
//   2. `parsing.ts` (`parserDeclaration`) : transformer le texte libre reçu en
//      `{ activite, minutes, effort }`, ou rejeter silencieusement si invalide (CA-03).
//   3. `reference.ts` + `etoiles.ts` (lot 1) : calculer la charge, la référence glissante
//      et le nombre d'étoiles à partir de l'historique du dépôt.
//   4. `message.ts` (`formaterMessagePublic`) : composer le message envoyé au groupe,
//      sans jamais y faire figurer minutes, effort, ni aucun autre chiffre (CA-06).
//   5. Le dépôt (`InMemoryRepository` en test, `SupabaseRepository` en production,
//      ADR-0004) : persister la séance une fois tout ce qui précède validé.
export {};
