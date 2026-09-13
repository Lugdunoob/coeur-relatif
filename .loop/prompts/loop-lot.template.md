# Loop : lot {{NN}} de « {{idee}} », contexte frais

> Lancement : `bash .loop/ralph.sh lot-{{NN}} {{iterations}}`
> Chaque itération démarre sans mémoire. Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou `STATUS: LOT_{{NN}}_DONE` ou `STATUS: LOT_{{NN}}_BLOCKED`.

## MISSION
Faire passer au vert les tests d'acceptation du lot {{NN}} (`docs/lots.md`, critères {{criteres}}), et rien d'autre. Livrable final : une PR `lot-{{NN}}` vers `main`, CI verte, description citant les critères couverts, le nombre d'itérations, ce qui a été laissé de côté et pourquoi.

## RÈGLES ABSOLUES
1. Première action : `git branch --show-current` → `lot-{{NN}}`, sinon arrête-toi. `main` intouchable, zéro push forcé, zéro merge.
2. `echo lot > .loop/phase` avant toute écriture. Aucun fichier de `docs/` ne change (le hook `garde-docs` le bloque ; si tu es en désaccord avec la spec, note-le dans `docs/cartes/{{carte}}-lot-{{NN}}.md` sous « À trancher » via la carte, et arrête le lot).
3. Aucun test modifié pour le faire passer. Aucune fonctionnalité « tant qu'on y est ». Aucune nouvelle dépendance sans nécessité prouvée notée dans la progression.
4. Réutiliser l'existant : lis `CLAUDE.md`, `docs/adr/`, `docs/data-model.md`, le code déjà là, avant d'écrire.

## MÉMOIRE DE BOUCLE
`.loop/lot-{{NN}}-progress.md` : sous-lots cochés, journal, idées rejetées. Lis-le en premier avec `git log --oneline -15`, mets-le à jour en dernier. Contrôleur : `.loop/lot-{{NN}}-method-log.md`, périmètre borné.

## SOUS-LOTS (un par itération)
- [ ] Sous-lot 0 : lire la carte, le lot, les tests rouges ; écrire le plan de sous-lots dans la progression. Aucun code.
{{sous_lots}}
- [ ] Sous-lot final : revue par `regie:contradicteur` du diff (`git diff main...lot-{{NN}}`), corrections, PR ouverte avec description complète.

## VÉRIFICATION (chaque itération, avant commit)
1. `{{cmd_typecheck}}` → 0 erreur
2. `{{cmd_lint}}` → 0 erreur
3. `{{cmd_test}}` → les tests du lot passent ; aucun test précédemment vert ne casse
4. `git diff --stat main -- docs/` → vide
5. `git branch --show-current` → `lot-{{NN}}`

## SI BLOQUÉ
Même obstacle après 3 itérations : `BLOCKED.md` (symptôme, essais, deux options), carte en `changements_demandes`, puis `STATUS: LOT_{{NN}}_BLOCKED`. À l'itération N−3 : stabilise, documente.

## DEFINITION OF DONE
- Tous les sous-lots cochés ; tests {{criteres}} verts ; typecheck et lint verts ; `docs/` inchangé ; PR ouverte ; mémo du Contradicteur répondu dans la carte ; `main` intacte.
Alors, et seulement alors : `STATUS: LOT_{{NN}}_DONE`.
