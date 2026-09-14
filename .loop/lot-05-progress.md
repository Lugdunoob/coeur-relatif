# Lot 05 — Les droits — progression

## Sous-lot 0 : lecture et plan (fait)
Lu : `CLAUDE.md`, `docs/lots.md` (Lot 5), `docs/spec.md` (CA-14 à CA-17),
`docs/data-model.md` (entités + conservation R9), `src/db/schema.ts`, `src/db/in-memory.ts`,
`src/domain/coeurs.ts` (convention semaine), `test/donnees.test.ts`, `test/purge.test.ts`,
`test/schema.test.ts`. Aucun `src/repository.ts` séparé n'existe (le lot 2 réel utilise
`src/db/schema.ts` + `src/db/in-memory.ts`) : on continue avec ces fichiers, pas de nouvelle
interface.

Tests rouges au départ : `test/donnees.test.ts` (CA-14, CA-15), `test/purge.test.ts` (CA-16).
`test/schema.test.ts` (CA-17) déjà vert depuis le lot 0 (confirmé par `npm test`).

Plan de sous-lots :
- [x] Sous-lot 0 : ce plan.
- [x] Sous-lot 1 : `src/domain/donnees.ts` + méthodes `InMemoryRepository` (`seancesDe`,
  `supprimerDonneesPersonne`). Fait passer `test/donnees.test.ts`.
- [x] Sous-lot 2 : `src/domain/purge.ts` + méthode `InMemoryRepository`
  (`supprimerSeancesAnterieuresA`). Fait passer `test/purge.test.ts`.
- [x] Sous-lot 3 : confirmer CA-17 (`test/schema.test.ts`) déjà vert, aucun changement.
- [x] Sous-lot final : revue contradictoire du diff, corrections, push.

## Décisions de conception (pas dans les tests, tranchées ici)

**Semaine courante (CA-14)** : aucune fonction « début de semaine » n'existait encore
(`coeurs.ts` reçoit `debutSemaine` déjà calculé par l'appelant). Convention retenue,
cohérente avec `rappel-lundi.ts` (lundi) / `signal-vendredi.ts` (vendredi) : semaine
civile lundi 00:00 → lundi suivant 00:00 (heure locale), calculée à partir de
`semaineCourante`. `mesDonnees` ne renvoie que les étoiles non nulles (une séance encore
en calibration n'a pas d'étoile à afficher).

**Purge (CA-16)** : `docs/spec.md` (CA-16) dit « toute donnée … effacée automatiquement à
la date fin-du-pilote + 30 jours ». La consigne du lot précise : « supprime toute séance
antérieure à finPilote + 30 jours, garde le reste ». Implémentation retenue : la date
butoir est `finPilote + 30 jours` ; `purger` ne supprime que si `maintenant` a atteint
cette date butoir (sinon rien ne se passe — la purge n'est pas prématurée), puis supprime
les séances dont l'horodatage est antérieur à la date butoir (et les cœurs qui leur
étaient rattachés, pour éviter des cœurs orphelins pointant vers une séance effacée).
`maintenant` sert donc de garde, la date butoir vient de `finPilote`. Cohérent avec le
test (`maintenant` = fin pilote + 35 j, largement après la date butoir).

**Suppression personne (CA-15)** : « efface tout ce qui concerne la personne » →
séances de la personne, cœurs qu'elle a donnés, cœurs reçus sur ses séances (sinon
orphelins), sa fiche `personne`, son dernier rappel de consentement. Pas de message de
confirmation ici : le texte de confirmation Telegram relève de `src/telegram/webhook.ts`
(hors périmètre du lot 05, qui ne livre que `src/domain/`).

## Idées rejetées
- Ajouter un `src/repository.ts` séparé comme le décrit `docs/lots.md` (lot 2) : le code
  réel du dépôt a déjà divergé vers `src/db/`, pas de raison de le réintroduire pour ce
  lot.
- Câbler `purger` dans `src/cron.ts` : hors périmètre (fichiers du lot 5 =
  `src/domain/purge.ts`, `src/domain/donnees.ts`, leurs tests, selon `docs/lots.md`).

## Revue `regie:contradicteur` (sous-lot final)
Agent lancé sur le diff `main...lot-05`. Verdict :
- Mécanique : `docs/` intact, typecheck/lint/test verts, CA-17 intact.
- CA-14 (isolation par personne) et CA-15 (suppression complète) : conformes.
- **Défaut réel relevé (sévérité moyenne-haute)** : `purger()` ne supprimait que les
  séances et les cœurs rattachés, jamais les fiches `personne` ni les rappels de
  consentement. CA-16 dit « toute donnée d'une personne » — trop étroit tel quel.
  **Corrigé** : `InMemoryRepository.supprimerSeancesAnterieuresA` renommée
  `purgerFinPilote` et étendue pour vider aussi `personnes` et `rappelsConsentement`
  une fois la date butoir atteinte (le pilote se termine pour tout le monde à la même
  date, cohérent avec CA-16 et avec le fait qu'aucune séance réelle ne peut exister après
  `finPilote`).
- **Défaut mineur relevé** : commentaire de `debutSemaine` citant `rappel-lundi.ts` comme
  « cohérent » alors que ce fichier ne calcule aucune borne de semaine. **Corrigé** :
  commentaire reformulé pour ne plus induire en erreur.
- **Point signalé, non corrigé (hors périmètre de ce lot)** : `test/purge.test.ts` ne
  vérifie pas explicitement qu'une séance postérieure à la date butoir survivrait (aucune
  séance de test n'est placée après le seuil), et son intitulé « garde le reste » n'est
  pas vérifié par une assertion. Le lot interdit de modifier ou d'étoffer les tests
  existants pour rester strictement dans « faire passer au vert les tests d'acceptation
  du lot 05, et rien d'autre » ; je documente le manque ici pour que le Contrôleur ou une
  future carte en décide (ajouter un cas dans `test/purge.test.ts` reviendrait à modifier
  un test du lot, explicitement hors périmètre de ce run).
- Fuseau horaire de `debutSemaine` (accesseurs `Date` locaux, pas de fuseau fixé) : risque
  réel si le serveur tourne en UTC, mais aucun code existant du dépôt ne fixe de fuseau
  (`rappel-lundi.ts` ignore la date reçue) ; pas de régression introduite, non traité ici.

## Vérifications (après corrections post-revue)
- `npm run typecheck` : 0 erreur.
- `npm run lint` : 0 erreur.
- `npm test` : 29/29 verts (12 fichiers), CA-14/CA-15/CA-16/CA-17 tous verts.
- `git diff --stat main -- docs/` : vide.
- `git branch --show-current` : `lot-05`.

## Itérations
1. Lecture, plan, implémentation `donnees.ts` + `purge.ts` + méthodes du dépôt, vérifs,
   revue contradictoire, correction du défaut relevé (purge des fiches personne), push.

## Résumé pour la PR
Critères couverts : CA-14, CA-15, CA-16, CA-17 (CA-17 déjà vert depuis le lot 0, confirmé
sans modification). 1 itération. Laissé de côté, avec raison : renforcement de
`test/purge.test.ts` (cas « séance postérieure à la date butoir survit ») — non fait car
modifier/étoffer un test du lot est hors périmètre de ce run ; câblage de `purger` dans
`src/cron.ts` — hors périmètre du lot 5 (`docs/lots.md` ne liste que `src/domain/purge.ts`
et ses tests) ; fuseau horaire explicite pour `debutSemaine` — aucune infra de fuseau
n'existe ailleurs dans le dépôt, pas introduite ici pour ne pas ajouter de dépendance/
complexité non prouvée nécessaire.
