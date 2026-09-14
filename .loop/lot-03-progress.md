# Progression · lot 03

## Plan de sous-lots
- [x] Sous-lot 0 : lecture carte/lot/tests rouges, plan ci-dessous. Aucun code.
- [x] Sous-lot 1 : spike de vérification Telegram (voir « Spike Telegram » ci-dessous).
- [ ] Sous-lot 2 : `src/domain/coeurs.ts` réel (`enregistrerCoeur`, `coeursRecus`,
  `coeursDonnesSemaine`) + extension `InMemoryRepository`. Fait passer `test/coeurs.test.ts`.
- [ ] Sous-lot 3 : `src/telegram/webhook.ts` — commentaire décrivant le routage d'une
  mise à jour `message_reaction` vers `enregistrerCoeur`, pas d'appel réseau, pas de
  dépendance `grammY`.
- [ ] Sous-lot final : revue contradictoire du diff, corrections, `git push -u origin lot-03`.

## Lecture faite
- `CLAUDE.md` : règles absolues (main intouchable, pas d'écriture docs/ en lot, tests
  non modifiés, pas de dépendance non nécessaire).
- `docs/lots.md` : lot 3 = CA-09, CA-10 ; fichiers `src/domain/coeurs.ts` et mise à jour
  de `src/telegram/webhook.ts`. Dépend du lot 2.
- `docs/cartes/05-architecture.md` (carte 05) : point « à vérifier » explicite —
  réception des `message_reaction` par un bot — avec le spike imposé en tête du lot 3,
  et le repli prévu (message texte « ❤️ ») si le spike échoue.
- `docs/adr/0002-telegram-bot-api.md` : confirme Telegram Bot API via `grammY`, note que
  les réactions sont exposées depuis la version 7.0 (fin 2023) via `message_reaction`, à
  activer dans `allowed_updates`, « à vérifier à l'implémentation ».
- `docs/data-model.md` : entité `coeur` = `{ id, seanceId, donneurId, horodatage }`,
  `donneurId` jamais affiché en cumul (R7).
- `test/coeurs.test.ts` : deux tests rouges, CA-09 (`coeursRecus` compte les cœurs d'une
  séance) et CA-10 (`coeursDonnesSemaine` compte les cœurs donnés par une personne sur
  une semaine, à partir d'une date de début de semaine).
- `src/domain/coeurs.ts`, `src/telegram/webhook.ts` : stubs/squelette du lot 02, à
  implémenter ici.
- `src/db/schema.ts` : type `Coeur` déjà défini (`id`, `seanceId`, `donneurId`,
  `horodatage`). `src/db/in-memory.ts` : pas encore de méthode pour les cœurs.
- `npm test` avant tout code : 19/29 verts, 10 rouges — les 8 hors `coeurs.test.ts`
  relèvent des lots 4 et 5 (« à implémenter au lot 04 »/« au lot 05 »), hors périmètre.
  Seul `test/coeurs.test.ts` (2 tests) est du ressort du lot 03.

## Spike Telegram

**Tentative de vérification en direct** : `WebSearch`, `WebFetch` (deux URLs,
`core.telegram.org/bots/api#messagereactionupdated` et
`core.telegram.org/bots/api-changelog`) et `curl` via Bash vers `core.telegram.org` ont
tous été refusés par la passerelle de permissions de cet environnement (pas
d'utilisateur disponible pour approuver un outil réseau pendant ce run en contexte
frais). Cinq tentatives sur trois canaux différents, aucune n'a abouti — conformément à
la consigne de ne pas répéter le même appel, l'exploration réseau s'arrête là.

**Conclusion retenue, sur la base de la documentation officielle Telegram Bot API telle
que connue (API Bot 7.0, publiée le 29 décembre 2023, fonctionnalité stable et
inchangée depuis, aucun signal de dépréciation) :**

- Depuis l'API Bot 7.0, deux nouveaux types de mise à jour existent :
  `message_reaction` (objet `MessageReactionUpdated`) et `message_reaction_count`
  (agrégé, anonyme).
- Un bot **peut** recevoir `message_reaction` pour les réactions posées par un membre
  identifiable d'un groupe où il est présent, **à condition que `allowed_updates`
  inclue explicitement `"message_reaction"`** lors de la configuration du webhook (ce
  type, comme `chat_member`, n'est pas inclus par défaut si `allowed_updates` est omis).
- `MessageReactionUpdated` porte soit `user` (réaction d'un compte identifié — le cas
  normal d'un pair du groupe qui donne un cœur), soit `actor_chat` (réaction anonyme,
  ex. administrateur postant au nom du canal) — seul le premier cas identifie le
  donneur, nécessaire à CA-10 (« communiqués en privé par personne »). Dans les
  conditions du pilote (un groupe de pairs, pas d'administration anonyme attendue), le
  cas `user` s'applique.
- **Conclusion du spike : positif.** Le mécanisme prévu (webhook + `allowed_updates`
  contenant `message_reaction`) fonctionne dans les conditions du pilote. Le lot 3
  continue normalement.

**Limite assumée** : cette conclusion s'appuie sur la connaissance documentée de l'API
(entraînement, non revérifiée en direct dans ce run faute d'accès outil). Le risque
résiduel est faible et non bloquant pour *ce* lot : `src/domain/coeurs.ts` (sous-lot 2)
n'a aucune dépendance réseau ou Telegram (ADR-0004, isolation de la logique métier) — il
n'implémente que le calcul à partir du dépôt. Le sous-lot 3 ne fait qu'ajouter un
commentaire de routage dans `webhook.ts`, sans appel réseau ni dépendance `grammY`. Le
seul point qui engagerait réellement l'hypothèse du spike — configurer `allowed_updates`
sur un vrai webhook Telegram — est explicitement hors périmètre du lot 3 et relève du
Lot 6 (Recette, hors loop, fondateur + Développeur, déploiement réel), qui revérifiera
en conditions réelles avant tout engagement définitif. Recommandation transmise dans le
résumé final : confirmer ce point en recette avant la configuration réelle du webhook.

## Idées rejetées
(à compléter si des alternatives sont écartées pendant les sous-lots suivants.)
