# Progression · lot 02

## Plan de sous-lots
- [x] Sous-lot 0 : lecture carte/lot/tests rouges, plan ci-dessous. Aucun code.
- [x] Sous-lot 1 : `src/db/schema.ts` (déjà bon, stub de types, pas de retrait de `throw`
  ici) et `src/db/in-memory.ts` — `InMemoryRepository` réel : `ajouterSeance`,
  `dernieresSeances(personneId, n)` (n dernières, triées ancienne→récente, filtrées par
  personne), `upsertPersonne`, `getPersonne(idTelegram)`, `enregistrerRappelConsentement`,
  `dernierRappelConsentement`.
- [ ] Sous-lot 2 : `src/domain/consentement.ts` — `peutEnregistrer` (CA-01),
  `doitRelancerConsentement` (CA-02, seuil 7×24×3600×1000 ms). Fait passer
  `test/consentement.test.ts`.
- [ ] Sous-lot 3 : `src/domain/parsing.ts` — `parserDeclaration` (CA-03) : regex tolérante
  `<activité libre> <minutes> min effort <1-10>`, `null` si minutes ≤ 0, effort hors
  [1,10], ou activité vide. Fait passer `test/parsing.test.ts`.
- [ ] Sous-lot 4 : `src/domain/message.ts` — `formaterMessagePublic` (CA-06) : étoiles en
  répétant `★`, jamais un chiffre ; format `"<prenom> <★×N> · <activite>"`. Fait passer
  `test/message.test.ts`.
- [ ] Sous-lot 5 : squelette `src/telegram/webhook.ts` — structure seule, pas de `grammY`,
  pas d'appel réseau ; commentaire décrivant le branchement futur avec `consentement.ts`,
  `parsing.ts`, `message.ts`, `reference.ts`, `etoiles.ts`. Aucun test à faire passer.
- [ ] Sous-lot final : revue contradictoire du diff `git diff main...lot-02`, corrections,
  `git push -u origin lot-02` (pas de `gh pr create`, absent de cet environnement).

## Lecture faite
- `CLAUDE.md` : règles absolues (main intouchable, pas d'écriture docs/ en lot, tests non
  modifiés, pas de dépendance non nécessaire).
- `docs/lots.md` : lot 2 = CA-01, CA-02, CA-03, CA-06 ; fichiers `src/repository.ts`
  (interface + `InMemoryRepository`), `src/domain/consentement.ts`, `parsing.ts`,
  `message.ts`, `src/telegram/webhook.ts` (squelette). Le prompt de loop précise que
  l'implémentation va dans `src/db/in-memory.ts` (déjà présent comme stub, cf.
  `366f508`) plutôt qu'un nouveau `src/repository.ts` — pas de fichier
  `src/repository.ts` existant dans le dépôt, aucune interface `Repository` distincte
  n'est testée par les 4 CA du lot 2 ; je m'en tiens au stub déjà en place
  (`src/db/in-memory.ts`, `src/db/schema.ts`) comme l'exige le prompt de loop, sans créer
  `src/repository.ts` qu'aucun test ne réclame (pas de fonctionnalité « tant qu'on y est »).
- `docs/adr/0004-isolation-logique-metier.md` : modules `src/domain/*` purs, zéro import
  `grammY`/Supabase ; `Repository` injecté, implémentation mémoire pour les tests.
- `docs/data-model.md` : entités `personne`, `seance`, `coeur` ; `charge` et référence non
  stockées, recalculées à la demande à partir des 6 dernières séances.
- `docs/spec.md` (table des critères) : CA-01 (rien enregistré avant « J'accepte »),
  CA-02 (relance ≤ 1×/7 jours), CA-03 (activité non vide, minutes > 0, effort 1-10, sinon
  rejet), CA-06 (message public : prénom, étoiles en symboles, activité, aucun autre
  chiffre).
- Tests lus en détail : `test/consentement.test.ts`, `test/parsing.test.ts`,
  `test/message.test.ts`, `test/schema.test.ts` (déjà vert, CA-17, ne touche pas
  `CHAMPS_SEANCE`/`CHAMPS_PERSONNE`).
- Code existant lu : `src/db/schema.ts`, `src/db/in-memory.ts` (stub avec `throw`),
  `src/domain/consentement.ts`, `parsing.ts`, `message.ts` (stubs avec `throw`),
  `src/domain/reference.ts`, `etoiles.ts` (lot 1, implémentés, style de référence).
- Pas de carte `02-lot-02.md` existante ; aucun désaccord avec la spec identifié pour
  l'instant → pas de carte à créer, le lot continue.

## Journal
- It.1 : plan écrit ci-dessus. Aucun code touché (sous-lot 0 uniquement, conforme à la
  règle « aucun code » de ce sous-lot).
- It.2 : `src/db/in-memory.ts` implémenté (`ajouterSeance`, `dernieresSeances`,
  `upsertPersonne`, `getPersonne`, `enregistrerRappelConsentement`,
  `dernierRappelConsentement`), stockage privé par tableau/`Map`. `src/db/schema.ts`
  inchangé (aucun test ne le réclame, CA-17 déjà vert). Aucun test du lot 2 ne couvre
  directement `InMemoryRepository` ; les 18 échecs pré-existants (lots 3-5, non dans le
  périmètre) restent identiques avant/après, aucune régression.

## Idées rejetées
- Créer `src/repository.ts` avec une interface `Repository` distincte : aucun test du lot
  2 ne l'exige (`test/consentement.test.ts`, `parsing.test.ts`, `message.test.ts` importent
  directement les modules `domain/*` ; `InMemoryRepository` est déjà le nom de classe en
  place dans `src/db/in-memory.ts` depuis le commit `366f508`). Ajouter un fichier en plus
  aurait été une fonctionnalité « tant qu'on y est » non couverte par un test rouge.

## Résultat des vérifications (avant commit)
- It.2 (sous-lot 1) : `npm run typecheck` 0 erreur ; `npm run lint` 0 erreur ; `npm test`
  8 fichiers en échec / 4 verts, 18 tests en échec / 11 verts — identique à l'état avant
  cette itération (aucune régression, aucun CA du lot 2 encore couvert par du code) ;
  `git diff --stat main -- docs/` vide ; branche `lot-02`.
