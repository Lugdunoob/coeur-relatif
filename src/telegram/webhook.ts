// Squelette (lot 02, docs/lots.md). Adaptateur Telegram : aucun calcul ici (ADR-0004),
// aucune dépendance `grammY` ajoutée à ce stade, aucun appel réseau.
//
// Branchement futur, dans l'ordre où un message texte du groupe/de la conversation
// privée sera traité :
//   1. `consentement.ts` (`peutEnregistrer`, `doitRelancerConsentement`) : refuser tout
//      enregistrement tant que la personne n'a pas dit « J'accepte », relancer le rappel
//      de consentement au plus une fois tous les 7 jours (CA-01, CA-02).
//   2. `parsing.ts` (`parserDeclaration`) : transformer les trois choix reçus par boutons
//      (activité, durée, effort ressenti — voir `ChoixDeclaration`) en
//      `{ activite, minutes, effort }`, ou rejeter silencieusement si un choix manque ou
//      sort des listes fermées (CA-03). Aucun texte libre à parser, sauf le nom saisi
//      après le bouton « Autre ».
//   3. `reference.ts` + `etoiles.ts` (lot 1) : calculer la charge, la référence glissante
//      et le nombre d'étoiles à partir de l'historique du dépôt.
//   4. `message.ts` (`formaterMessagePublic`) : composer le message envoyé au groupe,
//      sans jamais y faire figurer minutes, effort, ni aucun autre chiffre (CA-06).
//   5. Le dépôt (`InMemoryRepository` en test, `SupabaseRepository` en production,
//      ADR-0004) : persister la séance une fois tout ce qui précède validé.
//
// Branchement futur (lot 03) pour une mise à jour `message_reaction` (réaction ❤️ sur
// un message du groupe, spike de vérification positif — voir
// .loop/lot-03-progress.md) : distinct du flux ci-dessus, aucun texte à parser.
//   1. Le webhook doit être configuré avec `allowed_updates` incluant
//      `"message_reaction"` (absent par défaut, comme `chat_member`) : hors périmètre
//      de ce squelette, à faire au déploiement réel (lot 6, Recette).
//   2. À réception d'une `MessageReactionUpdated` dont `new_reaction` contient ❤️ et
//      `user` est renseigné (réaction d'un membre identifié, pas d'admin anonyme) :
//      retrouver la séance visée par `message_id`, puis appeler `coeurs.ts`
//      (`enregistrerCoeur`) avec `{ id, seanceId, donneurId: user.id, horodatage: date }`.
//      Retrouver la séance à partir de `message_id` suppose de mémoriser ce lien au
//      moment de l'envoi du message public (étape 4 ci-dessus) ; ni `docs/data-model.md`
//      ni `Seance` (src/db/schema.ts) ne portent aujourd'hui ce champ — un point à
//      trancher (ADR ou carte de changement) avant le câblage réel, pas avant.
//   3. Aucun appel réseau, aucune dépendance `grammY` ajoutée à ce stade : aucun test
//      ne l'exige encore (`test/coeurs.test.ts` teste `coeurs.ts` directement, sans
//      passer par ce fichier).
//
// Branchement futur pour le résumé quotidien des cœurs (CA-09bis, décision Recette
// 2026-09-14, point 4) : pas de message à chaque ❤️, un seul job planifié une fois par
// jour et par personne.
//   1. `coeurs.ts` (`coeursRecusJour`) : compter les cœurs reçus par la personne sur les
//      dernières 24h, toutes séances confondues.
//   2. `styles.ts` (`STYLE_NEUTRE.coeursDigestJour`) : composer le texte envoyé en privé.
//      Le style utilisé est une table interchangeable (voir l'en-tête de `styles.ts`) :
//      changer de ton ne touche ni ce fichier ni `coeurs.ts`.
//   3. N'envoyer le message que si la personne a au moins une séance ce jour-là ou a
//      reçu au moins un cœur ; jamais de message vide à tout le monde chaque jour.
export {};
