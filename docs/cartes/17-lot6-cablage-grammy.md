---
carte: 17
nom: "Lot 6 : câblage grammY, Vercel, jobs planifiés"
agent: fondateur
skills: []
parents: [16]
statut: approuvee
livrable: src/telegram/bot.ts, src/telegram/webhook.ts, api/telegram.ts, api/cron/*.ts, vercel.json, src/db/schema.ts, src/db/repository.ts, src/db/in-memory.ts, src/db/supabase.ts, docs/contracts.md, docs/data-model.md, docs/deploiement.md
porte: "les 43 tests du dépôt passent ; typecheck et lint propres ; bot.ts vérifié contre le vrai token (getMe) ; SupabaseRepository déjà vérifié de bout en bout (carte 16)"
risque: L2
approuvee_le: 2026-09-14T16:15:00+00:00
veto_jusqu_au: 2026-09-15T16:15:00+00:00
---

## Entrées reçues

Le fondateur a demandé de continuer le Lot 6 jusqu'au bout : créer le projet Vercel
(token d'accès fourni), puis câbler le webhook réel. Deux comptes/accès ont été fournis
en cours de route (token Telegram, clé Supabase `service_role`, token Vercel), chacun
vérifié avant usage (voir carte 16 pour Supabase ; ce document pour Vercel et grammY).

## Résumé de fin de carte

- **Action proposée** : approuver le câblage réel du bot, déjà écrit et vérifié dans la
  mesure de ce qui est possible sans trafic Telegram réel (voir « Ce qui manque »).
- **Ce qui change** :
  - `src/telegram/bot.ts` (nouveau) : toute la logique `grammY` — `/start` (consentement,
    texte provisoire), `/declarer` (trois choix par boutons, carte 13), `/mesdonnees`,
    `/supprimer`, et `message_reaction` pour les cœurs (CA-09). Aucun calcul propre :
    délègue à `src/domain/*` à chaque étape (ADR-0004).
  - `src/telegram/webhook.ts` : remplace le squelette par l'adaptateur Vercel réel.
    N'utilise pas l'adaptateur générique `webhookCallback(bot, 'http')` de grammY : le
    runtime Node de Vercel consomme déjà le flux de la requête pour remplir `req.body`,
    donc relire le flux brut ne reçoit plus rien (piège connu de grammY + Vercel) —
    `req.body` déjà analysé est utilisé directement.
  - `api/telegram.ts`, `api/cron/{lundi,vendredi,purge,coeurs-digest}.ts` (nouveaux) :
    points d'entrée Vercel (dossier `/api` requis par leur convention zéro-config).
  - `vercel.json` (nouveau) : programmation des 4 jobs planifiés.
  - **Point laissé ouvert par `src/telegram/webhook.ts` depuis le lot 2/3, tranché ici** :
    ajout de `Seance.messageIdTelegram` (nullable), migration
    `coeur_relatif_message_id`, méthodes `Repository.enregistrerMessageSeance` /
    `seanceParMessage` — nécessaires pour retrouver la séance visée par un ❤️.
  - **Nouvelles requêtes globales** (`Repository.toutesLesPersonnes`,
    `seancesEntre`, `coeursEntre`) : le signal du vendredi et le résumé quotidien des
    cœurs portent sur l'ensemble du groupe, pas une personne à la fois — absentes de
    l'interface d'origine (carte 16), qui n'avait que des requêtes par personne.
  - `docs/contracts.md` : mis à jour pour décrire les commandes et boutons réels
    (l'ancien contrat décrivait encore `<activité> <minutes> <effort>` en texte libre,
    obsolète depuis les cartes 12/13), et les 4 jobs planifiés avec leurs horaires UTC.
  - `docs/deploiement.md` : projet Vercel créé et documenté (voir ci-dessous), nouvelles
    variables d'environnement listées (`TELEGRAM_GROUP_CHAT_ID`, `FIN_PILOTE`,
    `CRON_SECRET`, `TELEGRAM_WEBHOOK_SECRET`).
- **Projet Vercel créé via API** (token d'accès fourni par le fondateur, jamais commité) :
  projet `coeur-relatif` (id `prj_u3m1PiNA8hf6W7syQEdMcBGzHn1j`), équipe
  `lugdunoobs-projects`, lié à `Lugdunoob/coeur-relatif` branche `main` (déploiement
  automatique à chaque push). Les 3 variables déjà connues (token Telegram, clé
  service_role, URL Supabase) posées. **Protection Vercel Authentication désactivée** :
  active par défaut sur les URLs `*.vercel.app`, elle aurait renvoyé une page de
  connexion à Telegram au lieu d'un 200 — sans ça, le webhook n'aurait jamais fonctionné.
- **Vérifié réellement** :
  - `scripts/verif-bot.ts` (gitignoré) : `creerBot()` s'initialise avec le vrai token,
    `bot.api.getMe()` répond correctement (bot `@Coeursportbot`).
  - `npm run typecheck`, `npm run lint`, `npm test` (43/43) tous verts après l'ajout de
    `bot.ts`, `webhook.ts`, `api/*`, et les extensions de schéma/repository.
- **Ce qui manque (honnêtement)** :
  - **Aucun aller-retour Telegram réel n'a pu être testé** depuis cette session : aucun
    outil ne permet de recevoir une vraie mise à jour webhook sans déployer, et
    `bot.handleUpdate()` simulé nécessiterait un vrai `chat_id`, qu'on n'a pas tant que
    personne n'a écrit au bot. Demandé au fondateur d'envoyer `/start` pour vérifier via
    `getUpdates` (pas de réponse au moment de cette carte).
  - Le webhook Telegram (`setWebhook`) n'est pas encore configuré : ça suppose l'URL de
    déploiement définitive, à faire dans la foulée du premier vrai déploiement.
  - `TELEGRAM_GROUP_CHAT_ID` et `FIN_PILOTE` ne sont pas encore posées (le groupe
    Telegram du pilote n'existe pas encore, la date de fin du pilote n'est pas encore
    fixée par le fondateur) : la déclaration fonctionne quand même en attendant
    (publication P4 différée, cf. commentaire dans `bot.ts`), mais aucun message
    collectif (vendredi/lundi) ni purge automatique ne peut fonctionner sans elles.
  - Texte de consentement (P1) explicitement **provisoire** : la version définitive
    revient à la carte Pilote (skill `consentement`), comme documenté dans
    `docs/spec.md` (« Ce qui n'est pas ici »). Le texte écrit ici couvre les points
    exigés par P1 pour permettre la Recette réelle, pas la version vendue.
  - Rappel de consentement (CA-02, `doitRelancerConsentement`) : la fonction pure
    existe et est testée depuis le lot 1, mais aucun job planifié ne la déclenche —
    ça suppose un registre des personnes invitées mais pas encore consentantes, qui
    n'existe pas (le fondateur invite chaque collègue manuellement). Pas construit
    ici : aurait été une table de plus pour un besoin non exprimé.
  - Réaction ❤️ retirée : ne retire pas le cœur compté (limitation acceptée,
    documentée dans `docs/contracts.md`).
  - `CRON_SECRET` et `TELEGRAM_WEBHOOK_SECRET` : le code les vérifie s'ils sont
    définis, mais aucun des deux n'est encore posé dans Vercel.
- **Risque** : L2 — le code n'a jamais reçu de vraie mise à jour Telegram ; le risque
  principal est un bug qui ne se révèle qu'au premier vrai message (ex. format exact
  d'un champ `grammY`), pas détectable par les tests unitaires existants (aucun test
  ne couvre `bot.ts`, comme `webhook.ts` avant lui : « aucun test ne l'exige encore »
  restait vrai jusqu'à un vrai message).
- **Conséquences** : réversible (aucune donnée réelle de collègue n'existe encore).
- **À trancher** : founder doit décider/fournir `TELEGRAM_GROUP_CHAT_ID` (une fois le
  groupe créé) et `FIN_PILOTE` (date de fin du pilote) avant que les jobs planifiés
  soient pleinement fonctionnels ; et valider (ou réécrire) le texte de consentement
  provisoire avant tout vrai envoi à un collègue.
- **Coût du run** : substantiel — nouveau fichier de logique bot, adaptateur Vercel,
  4 routes de cron, extension de schéma (migration de plus), mise à jour de deux
  documents de contrat. Zéro régression (43/43 tests toujours verts).

## Journal de décision

- **Décision** : câbler le bot réellement (grammY, Vercel, cron), avec un texte de
  consentement provisoire et sans registre de relance automatique de consentement
  (fonctionnalité pure déjà prête, jamais déclenchée faute de registre d'invités).
- **Options considérées** (adaptateur Vercel) : utiliser `webhookCallback(bot, 'http')`
  de grammY tel quel (écartée : piège connu, le corps de requête est déjà consommé par
  Vercel) ; lire `req.body` directement et appeler `bot.handleUpdate()` (retenue).
  Options considérées (lien message↔séance) : ne rien faire et laisser CA-09 non
  câblable pour de vrai (écartée, contredit l'objectif du lot) ; ajouter le champ
  maintenant, comme prévu par le commentaire de `webhook.ts` depuis le lot 2/3
  (retenue).
- **Qui a tranché** : le fondateur pour le go du câblage complet et la fourniture des
  accès (Telegram, Supabase, Vercel), chacun vérifié avant usage. L'agent pour les
  choix techniques découlant directement des ADR déjà acceptés (isolation logique
  métier, dépôt async) : pas de nouvelle décision de fond.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : un vrai message Telegram qui révèle un bug de
  routage ou de format non couvert par les vérifications faites ici — à corriger dès
  la première Recette réelle (voir docs/deploiement.md, point 8).
- **Veto possible jusqu'à** : 2026-09-15T16:15:00+00:00.

## metadata
```json
{
  "criteres_touches": ["CA-09"],
  "trouve_pendant": "Lot 6, câblage réel",
  "decideur": "fondateur (accès, go) + agent (architecture découlant des ADR acceptés)"
}
```
