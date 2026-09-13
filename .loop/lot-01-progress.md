# Progression · lot 01

## Plan de sous-lots
- [x] Sous-lot 0 : lecture carte/lot/tests rouges, plan ci-dessous. Aucun code.
- [x] Sous-lot 1 : `src/domain/reference.ts` — `referenceGlissante`.
- [x] Sous-lot 2 : `src/domain/etoiles.ts` — `calculerEtoiles`.
- [x] Sous-lot final : revue contradictoire du diff, PR vers `main`.

## Lecture faite
- `docs/lots.md` : lot 1 = CA-04, CA-05, CA-07, CA-08, fichiers `src/domain/reference.ts`
  et `src/domain/etoiles.ts` + leurs tests. Pas de dépendance Telegram/Supabase.
- `docs/spec.md` (table des critères) : seuils R5, plafond R6, calibration R4, référence R3.
- `docs/data-model.md` : `charge` = minutes × effort, jamais stocké, recalculé à la demande
  à partir des six dernières séances.
- `test/reference.test.ts`, `test/etoiles.test.ts` : lus en détail, signatures et cas confirmés.
- Pas de carte `01-lot-01.md` existante ; rien à contester dans la spec pour ce lot.

## Journal
- It.1 : plan écrit. Implémentation de `src/domain/reference.ts` (médiane des six dernières
  charges) et `src/domain/etoiles.ts` (calibration CA-04, seuils CA-07, plafond CA-08).
  Aucun import Telegram/Supabase dans ces deux fichiers (vérifié par lecture).
- Vérification : `npm run typecheck` et `npm run lint` propres sur mes deux fichiers.
  `npm run typecheck` sur tout le dépôt affiche encore des erreurs `Cannot find module`
  pour les fichiers des lots 2 à 5 (`src/domain/consentement.ts`, `src/db/in-memory.ts`,
  etc.) : préexistant, confirmé en retirant temporairement mes deux fichiers et en
  comparant la liste d'erreurs (identique moins les deux miennes). Hors périmètre du
  lot 1 par `docs/lots.md` ; pas touché.
  `npm test` : 10/10 tests passent (health + les 4 CA du lot 1) ; les 9 autres suites
  échouent au chargement du module (`Cannot find module`), même situation préexistante,
  aucune régression sur un test qui passait avant.
- Revue contradictoire du diff (`git diff main...lot-01`) : l'agent `regie:contradicteur`
  n'est pas installé dans cette session (plugin `regie` absent du catalogue) ; revue
  adversariale faite moi-même à la place, notée ci-dessous.
  - Point relevé : R5/R6 (`docs/spec.md`) sont ambigus aux bornes exactes 0.6, 0.9, 1.1,
    1.4 (les tranches se chevauchent ou laissent un trou dans le texte). Les tests fournis
    ne couvrent aucune borne exacte. Choix retenu : borne basse incluse dans la tranche
    supérieure (`< seuil` sinon tranche suivante), y compris pour la borne 1.4 (rattachée
    à ★★★★★ plutôt qu'à ★★★★). N'affecte aucun test existant ; à confirmer si un futur CA
    teste une borne exacte. Pas une divergence avec la spec (aucun texte contredit), donc
    pas de carte « à trancher » nécessaire — juste noté ici pour traçabilité.
  - Aucun autre défaut trouvé : pas de dépendance ajoutée, pas de stockage de `charge`,
    signatures conformes à `docs/lots.md` et aux tests.

## Idées rejetées
- Stocker `charge` ou la référence en base : contredit `docs/data-model.md` (recalcul à la
  demande). Pas fait.
- Ajouter une dépendance (ex. lib de stats pour la médiane) : un tableau de 6 éléments ne
  justifie pas une dépendance. Médiane écrite à la main.
- Créer des fichiers stub pour les lots 2-5 afin de faire taire `tsc` sur tout le dépôt :
  hors périmètre du lot 1 (`docs/lots.md` les assigne à d'autres lots), aurait été une
  fonctionnalité « tant qu'on y est ». Le lot 1 ne touche que ses deux fichiers et leurs
  tests, comme demandé.

## Résultat des vérifications (avant commit)
1. `npm run typecheck` : 0 erreur imputable au lot 1 (erreurs restantes = fichiers hors
   périmètre, préexistantes, voir journal).
2. `npm run lint` : 0 erreur.
3. `npm test` : les 4 tests CA-04/05/07/08 (+ health) passent ; 0 régression.
4. `git diff --stat main -- docs/` : vide.
5. `git branch --show-current` : `lot-01`.
