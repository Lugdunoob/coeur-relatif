# Loop : lot 05 de « Cœur relatif », contexte frais

> Lancement : `bash .loop/ralph.sh lot-05 15`
> Chaque itération démarre sans mémoire. Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou `STATUS: LOT_05_DONE` ou `STATUS: LOT_05_BLOCKED`.

## MISSION
Faire passer au vert les tests d'acceptation du lot 05 (`docs/lots.md`, critères CA-14, CA-15, CA-16, CA-17), et rien d'autre. Livrable final : la branche `lot-05` poussée sur `origin`, prête pour une PR (que l'orchestrateur ouvre juste après, `gh` n'étant pas disponible dans cet environnement), avec un résumé dans la progression citant les critères couverts, le nombre d'itérations, ce qui a été laissé de côté et pourquoi.

## RÈGLES ABSOLUES
1. Première action : `git branch --show-current` → `lot-05`, sinon arrête-toi. `main` intouchable, zéro push forcé, zéro merge.
2. `echo lot > .loop/phase` avant toute écriture. Aucun fichier de `docs/` ne change (le hook `garde-docs` le bloque ; si tu es en désaccord avec la spec, note-le dans `docs/cartes/05-lot-05.md` sous « À trancher » via la carte, et arrête le lot).
3. Aucun test modifié pour le faire passer. Aucune fonctionnalité « tant qu'on y est ». Aucune nouvelle dépendance sans nécessité prouvée notée dans la progression.
4. Réutiliser l'existant : lis `CLAUDE.md`, `docs/adr/`, `docs/data-model.md`, le code déjà là, avant d'écrire.

## MÉMOIRE DE BOUCLE
`.loop/lot-05-progress.md` : sous-lots cochés, journal, idées rejetées. Lis-le en premier avec `git log --oneline -15`, mets-le à jour en dernier. Contrôleur : `.loop/lot-05-method-log.md`, périmètre borné.

## SOUS-LOTS (un par itération)
- [ ] Sous-lot 0 : lire la carte, le lot, les tests rouges ; écrire le plan de sous-lots dans la progression. Aucun code.
- [ ] Sous-lot 1 : `src/domain/donnees.ts` — implémenter `mesDonnees(repo, personneId, semaineCourante)` (étoiles de la semaine en cours de cette personne seulement, jamais celles d'un tiers) et `supprimerMesDonnees(repo, personneId)` (efface tout ce qui concerne la personne). Étendre `InMemoryRepository` si besoin (méthode de suppression). Fait passer `test/donnees.test.ts` (CA-14, CA-15).
- [ ] Sous-lot 2 : `src/domain/purge.ts` — implémenter `purger(repo, maintenant, finPilote)` : supprime toute séance antérieure à `finPilote + 30 jours`, garde le reste. Fait passer `test/purge.test.ts` (CA-16).
- [ ] Sous-lot 3 : `src/db/schema.ts` — vérifier (sans forcer artificiellement) qu'aucun champ interdit n'existe dans `CHAMPS_SEANCE`/`CHAMPS_PERSONNE` ; ce test (CA-17) devrait déjà passer depuis le lot 0, le confirmer plutôt que le recoder.
- [ ] Sous-lot final : revue par `regie:contradicteur` du diff (`git diff main...lot-05`), corrections, puis `git push -u origin lot-05`. Ne pas tenter `gh pr create` (absent de cet environnement) ; l'orchestrateur ouvre la PR juste après via l'API GitHub.

## VÉRIFICATION (chaque itération, avant commit)
1. `npm run typecheck` → 0 erreur
2. `npm run lint` → 0 erreur
3. `npm test` → les tests du lot passent ; aucun test précédemment vert ne casse
4. `git diff --stat main -- docs/` → vide
5. `git branch --show-current` → `lot-05`

## SI BLOQUÉ
Même obstacle après 3 itérations : `BLOCKED.md` (symptôme, essais, deux options), carte en `changements_demandes`, puis `STATUS: LOT_05_BLOCKED`. À l'itération N−3 : stabilise, documente.

## DEFINITION OF DONE
- Tous les sous-lots cochés ; tests CA-14, CA-15, CA-16, CA-17 verts ; typecheck et lint verts ; `docs/` inchangé ; branche `lot-05` poussée sur `origin` ; mémo du Contradicteur répondu dans la carte ; `main` intacte.
Alors, et seulement alors : `STATUS: LOT_05_DONE`.
