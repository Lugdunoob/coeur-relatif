# Progression · lot 03

## Plan de sous-lots
- [x] Sous-lot 0 : lecture carte/lot/tests rouges, plan ci-dessous. Aucun code.
- [x] Sous-lot 1 : spike de vérification Telegram (voir « Spike Telegram » ci-dessous).
- [x] Sous-lot 2 : `src/domain/coeurs.ts` réel (`enregistrerCoeur`, `coeursRecus`,
  `coeursDonnesSemaine`) + extension `InMemoryRepository`. Fait passer `test/coeurs.test.ts`.
- [x] Sous-lot 3 : `src/telegram/webhook.ts` — commentaire décrivant le routage d'une
  mise à jour `message_reaction` vers `enregistrerCoeur`, pas d'appel réseau, pas de
  dépendance `grammY`.
- [x] Sous-lot final : revue contradictoire du diff, corrections, `git push -u origin lot-03`.

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
- Filtrer par semaine directement dans `InMemoryRepository` (ex. une méthode
  `coeursDonnesParPersonneEtSemaine`) plutôt que dans `coeurs.ts` : écarté pour rester
  cohérent avec le lot 02, où le calcul de dates (seuil de 7 jours, CA-02) vit dans
  `domain/consentement.ts` et non dans le dépôt ; le dépôt ne fait que stocker/filtrer
  par identifiant, jamais de logique de dates ou de métier (ADR-0004).

## Mémo du Contradicteur (sous-lot final) et réponses

Revue du diff `git diff main...lot-03 -- src/ test/` (le seul diff hors `.loop/`,
`docs/` intact). Même agent, relecture volontairement critique avant push, comme au
lot 02 (pas de skill `regie:contradicteur` disponible dans cet environnement).

État confirmé : `npm run typecheck` et `npm run lint` à 0 erreur ; `npm test` passe de
19/29 à 21/29 (les deux tests de `test/coeurs.test.ts` sont désormais verts, aucune
régression sur les 19 tests déjà verts) ; les 8 échecs restants sont tous « à
implémenter au lot 04/05 », hors périmètre ; `git diff --stat main -- docs/` vide ;
aucun test modifié ; aucune dépendance ajoutée ; `src/domain/coeurs.ts` n'importe rien
de `src/telegram/` (conforme ADR-0004, isolation de la logique métier).

1. **Spike Telegram non revérifié en direct** (tentatives `WebSearch`/`WebFetch`/`curl`
   toutes refusées par la passerelle de permissions de ce run). Signalé, retenu comme
   limite assumée et documentée en toutes lettres dans « Spike Telegram » ci-dessus,
   avec une conclusion positive s'appuyant sur la connaissance documentée, stable
   depuis 2023, de l'API Bot Telegram — non une supposition non sourcée. Non bloquant
   pour ce lot précisément parce que ni `coeurs.ts` ni la mise à jour de `webhook.ts`
   ne dépendent réellement du réseau (comme prévu par la carte 05, réponse à la
   question 1 : seule l'implémentation réelle de l'adaptateur, hors périmètre du lot 3,
   attendait le spike). Recommandation transmise au résumé final : reconfirmer en
   recette (lot 6) avant de configurer un vrai webhook avec `allowed_updates`.
2. **Le commentaire de `webhook.ts` supposait initialement pouvoir « retrouver la
   séance correspondant à `message_id` »**, alors qu'aucun champ ne relie aujourd'hui
   un `message_id` Telegram à une `Seance` (`docs/data-model.md`, `src/db/schema.ts`).
   Corrigé : le commentaire signale maintenant explicitement ce trou de conception,
   sans le combler (ce serait modifier `docs/data-model.md`, interdit en lot, et aucun
   CA ni test actuel ne l'exige — c'est un point pour une carte de changement ou un
   ADR futur, pas pour ce lot).
3. **Nom des méthodes du dépôt** (`ajouterCoeur`, `coeursParSeance`,
   `coeursDonnesParPersonne`) : cohérent avec le style existant
   (`ajouterSeance`/`dernieresSeances`), logique de dates laissée dans `coeurs.ts`
   plutôt que dans le dépôt (voir « Idées rejetées »). Aucune correction.

Une correction de fond apportée suite à cette revue (point 2, avant le premier commit
de push) ; les points 1 et 3 sont des limites/choix assumés et journalisés, pas des
défauts à corriger dans ce lot.

## Résumé final

- **Critères couverts (verts)** : CA-09 et CA-10 (`test/coeurs.test.ts`, 2/2 tests).
  21 tests verts sur 29 au total (19 déjà verts au lot 02 + les 2 de ce lot) ; `npm run
  typecheck` et `npm run lint` à 0 erreur.
- **Itérations** : 1 (session continue, contexte non réinitialisé entre les sous-lots
  faute de relance effective de `ralph.sh` dans cette exécution — le plan de sous-lots
  ci-dessus reste néanmoins suivi dans l'ordre, un commit par sous-lot logique).
- **Laissé de côté, et pourquoi** :
  - Câblage réel Telegram (`grammY`, `allowed_updates`, appel réseau) : hors périmètre
    du sous-lot 3, qui ne demande qu'un commentaire de routage ; relève du lot 6
    (Recette, hors loop, fondateur + Développeur).
  - Lien `message_id` ↔ `Seance` nécessaire pour retrouver la séance visée par une
    réaction en conditions réelles : trou de conception réel signalé (mémo du
    Contradicteur, point 2), non comblé — aucun CA ni test actuel ne l'exige, et le
    combler demanderait de modifier `docs/data-model.md` (interdit en lot). À trancher
    par une carte de changement ou un ADR avant le câblage réel du lot 6.
  - Lots 4, 5 (CA-11, CA-11bis, CA-12, CA-13, CA-14, CA-15, CA-16, CA-17) : hors
    périmètre du lot 03 par construction (`docs/lots.md`) ; leurs stubs restent
    non implémentés, leurs tests restent rouges (8/29).
  - Reconfirmation en direct du spike Telegram (accès web indisponible dans ce run) :
    conclusion retenue sur la base de la documentation connue, à reconfirmer en
    recette (lot 6) avant la configuration réelle du webhook — non bloquant ici car
    aucun code de ce lot n'a de dépendance réseau réelle.
- **Branche** : `lot-03`, poussée sur `origin` juste après ce résumé. `main` non
  touchée, aucun merge, aucun push forcé. Aucun `gh pr create` tenté (absent de
  l'environnement) ; la PR est à ouvrir par l'orchestrateur.
