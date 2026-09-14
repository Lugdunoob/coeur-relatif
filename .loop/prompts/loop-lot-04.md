# Loop : lot 04 de « Cœur relatif », contexte frais

> Lancement : `bash .loop/ralph.sh lot-04 15`
> Chaque itération démarre sans mémoire. Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou `STATUS: LOT_04_DONE` ou `STATUS: LOT_04_BLOCKED`.

## MISSION
Faire passer au vert les tests d'acceptation du lot 04 (`docs/lots.md`, critères CA-11, CA-11bis, CA-12, CA-13), et rien d'autre. Livrable final : la branche `lot-04` poussée sur `origin`, prête pour une PR (que l'orchestrateur ouvre juste après, `gh` n'étant pas disponible dans cet environnement), avec un résumé dans la progression citant les critères couverts, le nombre d'itérations, ce qui a été laissé de côté et pourquoi.

## RÈGLES ABSOLUES
1. Première action : `git branch --show-current` → `lot-04`, sinon arrête-toi. `main` intouchable, zéro push forcé, zéro merge.
2. `echo lot > .loop/phase` avant toute écriture. Aucun fichier de `docs/` ne change (le hook `garde-docs` le bloque ; si tu es en désaccord avec la spec, note-le dans `docs/cartes/04-lot-04.md` sous « À trancher » via la carte, et arrête le lot).
3. Aucun test modifié pour le faire passer. Aucune fonctionnalité « tant qu'on y est ». Aucune nouvelle dépendance sans nécessité prouvée notée dans la progression.
4. Réutiliser l'existant : lis `CLAUDE.md`, `docs/adr/`, `docs/data-model.md`, le code déjà là, avant d'écrire.

## MÉMOIRE DE BOUCLE
`.loop/lot-04-progress.md` : sous-lots cochés, journal, idées rejetées. Lis-le en premier avec `git log --oneline -15`, mets-le à jour en dernier. Contrôleur : `.loop/lot-04-method-log.md`, périmètre borné.

## SOUS-LOTS (un par itération)
- [ ] Sous-lot 0 : lire la carte, le lot, les tests rouges ; écrire le plan de sous-lots dans la progression. Aucun code.
- [ ] Sous-lot 1 : `src/domain/signal-vendredi.ts` — implémenter `genererSignalVendredi(seances, coeurs)` : compte le nombre de séances et le nombre de cœurs sur l'ensemble passé, retourne un message collectif sans aucun prénom, y compris quand les deux tableaux sont vides (« 0 séance, 0 cœur »). Fait passer `test/signal-vendredi.test.ts` (CA-11, CA-11bis, CA-12).
- [ ] Sous-lot 2 : `src/domain/rappel-lundi.ts` — implémenter `genererRappelLundi(date)` : texte fixe, identique quelle que soit la date, aucune donnée personnelle. Fait passer `test/rappel-lundi.test.ts` (CA-13).
- [ ] Sous-lot 3 : squelette `src/cron.ts` — décrire (commentaire, pas d'appel réseau réel) le déclenchement du vendredi et du lundi ; aucun test ne l'exige directement, ne pas en inventer.
- [ ] Sous-lot final : revue par `regie:contradicteur` du diff (`git diff main...lot-04`), corrections, puis `git push -u origin lot-04`. Ne pas tenter `gh pr create` (absent de cet environnement) ; l'orchestrateur ouvre la PR juste après via l'API GitHub.

## VÉRIFICATION (chaque itération, avant commit)
1. `npm run typecheck` → 0 erreur
2. `npm run lint` → 0 erreur
3. `npm test` → les tests du lot passent ; aucun test précédemment vert ne casse
4. `git diff --stat main -- docs/` → vide
5. `git branch --show-current` → `lot-04`

## SI BLOQUÉ
Même obstacle après 3 itérations : `BLOCKED.md` (symptôme, essais, deux options), carte en `changements_demandes`, puis `STATUS: LOT_04_BLOCKED`. À l'itération N−3 : stabilise, documente.

## DEFINITION OF DONE
- Tous les sous-lots cochés ; tests CA-11, CA-11bis, CA-12, CA-13 verts ; typecheck et lint verts ; `docs/` inchangé ; branche `lot-04` poussée sur `origin` ; mémo du Contradicteur répondu dans la carte ; `main` intacte.
Alors, et seulement alors : `STATUS: LOT_04_DONE`.
