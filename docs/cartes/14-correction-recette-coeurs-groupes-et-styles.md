---
carte: 14
nom: Correction Recette — cœurs groupés par jour et mécanisme de style de message
agent: fondateur
skills: []
parents: [09]
statut: approuvee
livrable: docs/spec.md (P5, CA-09bis), src/domain/coeurs.ts, src/domain/styles.ts, src/db/in-memory.ts, test/coeurs.test.ts, test/styles.test.ts, src/telegram/webhook.ts, scripts/demo-recette.ts
porte: "les tests de coeurs.ts et styles.ts passent ; les 38 tests du dépôt passent ; docs/spec.md à jour"
risque: L1
approuvee_le: 2026-09-14T15:00:00+00:00
veto_jusqu_au: 2026-09-15T15:00:00+00:00
---

## Entrées reçues

Trouvé pendant la Recette (point 4, les cœurs) : le fondateur a validé le principe des
cœurs comptés en privé, mais a demandé de regrouper les notifications en un seul message
par jour plutôt qu'un message à chaque ❤️. Il a ensuite demandé de travailler le « ton,
l'esprit » des messages du bot séparément du contenu : partir d'un style neutre, puis
préparer des tables de conversion pour changer facilement de ton plus tard (chaleureux,
laconique, etc.) sans toucher à la logique métier.

En parallèle, le fondateur a proposé une extension hors périmètre du pilote actuel : voir
ses propres cœurs plus des totaux agrégés par niveau hiérarchique (équipe/société/région/
pays), avec un possible classement par pays. Traité séparément (voir
`docs/programme.md`, note du 2026-09-14) : ce n'est pas un lot du pilote à douze
personnes, et un classement entre groupes est une tension directe avec R7/R8, à trancher
consciemment plus tard, pas maintenant.

## Résumé de fin de carte

- **Action proposée** : approuver le résumé quotidien des cœurs et le mécanisme de style,
  déjà implémentés et vérifiés.
- **Ce qui change** :
  - `src/db/in-memory.ts` : nouvelle méthode `coeursRecusParPersonne` (tous les cœurs
    reçus par une personne, toutes séances confondues).
  - `src/domain/coeurs.ts` : nouvelle fonction `coeursRecusJour(repo, personneId,
    debutJour)`, qui compte les cœurs reçus sur une fenêtre de 24h, indépendamment de la
    séance concernée.
  - `src/domain/styles.ts` (nouveau fichier) : introduit le mécanisme de style. Chaque
    message du bot aura une clé stable (ex. `coeursDigestJour`) ; une table de style
    (`STYLE_NEUTRE` pour commencer) associe à chaque clé une fonction de mise en forme.
    Changer de ton plus tard = écrire une nouvelle table avec les mêmes clés, sans
    toucher `coeurs.ts` ni les autres modules déclencheurs (ADR-0004 respecté : la
    logique reste indépendante de la présentation).
  - `docs/spec.md` (P5) : le résumé de cœurs est désormais explicitement décrit comme
    groupé par jour, pas instantané ; nouveau critère **CA-09bis**.
  - `src/telegram/webhook.ts` : commentaire de branchement futur ajouté pour le job
    quotidien (distinct du flux `message_reaction` existant).
  - `test/coeurs.test.ts`, `test/styles.test.ts` : nouveaux cas (regroupement
    multi-séances, fenêtre de 24h stricte, cas zéro cœur, accord singulier/pluriel du
    texte neutre).
  - `scripts/demo-recette.ts` (hors produit, démo locale) : point 4 montre maintenant le
    résumé quotidien via `STYLE_NEUTRE`, plus le cas zéro cœur.
- **Texte neutre retenu, exact** : `"2 cœurs reçus aujourd'hui."` (pluriel géré),
  `"1 cœur reçu aujourd'hui."` (singulier), `"Aucun cœur reçu aujourd'hui."` (zéro,
  jamais "0 cœur").
- **Sources** : décision directe du fondateur, pendant la Recette.
- **Ce qui manque** :
  - D'autres tables de style (chaleureux, laconique, etc.) ne sont pas écrites — seule la
    structure (`Style`, `STYLE_NEUTRE`) existe, prête à en recevoir d'autres sans
    changer le code appelant. À faire quand le fondateur voudra comparer des tons
    concrets, pas avant.
  - Les autres messages du bot (`message.ts` pour le message public, signal du vendredi,
    rappel du lundi) ne sont pas encore migrés dans ce mécanisme de style : ils restent
    tels quels pour l'instant, migration au fil de l'eau plutôt qu'un chantier unique.
  - Le déclenchement réel du job quotidien (heure d'envoi, ne pas notifier si zéro
    séance ce jour-là) reste à préciser au câblage réel (lot 6).
- **Risque** : L1, fichiers de `docs/` et `src/domain/` modifiés en dehors du cycle
  normal de lot, fait directement pendant la Recette avec le fondateur présent.
- **Conséquences** : réversible ; `coeursRecus` (par séance) reste disponible et testé,
  rien n'est supprimé, seul un nouveau chemin est ajouté.
- **À trancher** : rien de réservé restant sur ce point précis. L'extension « totaux par
  niveau hiérarchique + classement pays » reste à trancher séparément (voir
  `docs/programme.md`), hors périmètre du pilote.
- **Coût du run** : correction ciblée, quelques minutes, zéro régression (38/38 tests
  verts, typecheck et lint propres).

## Journal de décision

- **Décision** : les cœurs reçus sont annoncés en un seul message par jour (toutes
  séances confondues), pas un message par cœur ; le texte de ce message vient d'une
  table de style interchangeable, en commençant par un style neutre.
- **Options considérées** :
  (a) garder un message instantané par cœur, comme démontré au point 4 initial (écartée,
  jugée trop intrusive par le fondateur) ;
  (b) résumé groupé par séance plutôt que par jour (écartée : recevoir un message par
  séance ayant reçu un cœur revient presque au même qu'un message par cœur si la
  personne fait plusieurs séances dans la journée) ;
  (c) résumé groupé par jour, toutes séances confondues (retenue).
  Pour le ton : (a) écrire le ton définitif tout de suite (écartée, prématuré sans
  retour du pilote) ; (b) neutre d'abord + mécanisme de tables interchangeables pour
  itérer facilement plus tard (retenue, demande explicite du fondateur).
- **Qui a tranché** : le fondateur, en direct pendant la Recette. Aucune remontée
  nécessaire : plus haute autorité du processus.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : si le pilote réel montre qu'un résumé quotidien
  arrive trop tard pour créer un sentiment de reconnaissance (ex. cœur posé le matin,
  résumé reçu seulement le soir) — auquel cas un résumé plus fréquent (ex. deux fois par
  jour) resterait un réglage de fréquence, pas une remise en cause du principe groupé.
- **Veto possible jusqu'à** : 2026-09-15T15:00:00+00:00 (fenêtre symbolique : c'est déjà
  la décision du fondateur, pas celle d'un agent).

## metadata
```json
{
  "criteres_touches": ["CA-09bis"],
  "trouve_pendant": "Recette, point 4",
  "decideur": "fondateur"
}
```
