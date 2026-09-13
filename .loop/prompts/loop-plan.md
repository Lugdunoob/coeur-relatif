# /loop : programme B, plan de « Cœur relatif »

> Lancement : `/ralph-loop "$(cat .loop/prompts/loop-plan.md)" --max-iterations 15 --completion-promise "REGIE_PLAN_DONE"`
> Préalable : programme A terminé et fenêtre de veto de 24 h écoulée (`veto_jusqu_au` de la carte 03 dépassé).

## MISSION
Décider comment construire `docs/spec.md` : design des parcours si écrans, ADR, modèle de données, contrats, plan de tests, découpage en lots, et un test d'acceptation exécutable et **rouge** par critère `CA-NN`. Aucun code applicatif.
Livrable final : `docs/adr/`, `docs/data-model.md`, `docs/contracts.md`, `docs/test-plan.md`, `docs/lots.md`, `CLAUDE.md` complété (commandes de vérification), tests rouges commités.

## RÈGLES ABSOLUES
1. `main` est intouchable. Première action de chaque itération : `git branch --show-current` ; si `main`, crée ou bascule sur `regie/plan`.
2. Zéro push forcé, zéro merge dans `main`. Le push de la branche est autorisé.
3. Un commit par carte approuvée : `carte(NN): approuvée`, et un par renvoi : `carte(NN): renvoyée, <motif>`.
4. Liste réservée de `PROCESS.md` : si une carte la touche, écris `BLOCKED.md` et sors par la promesse de blocage. Ce n'est pas un échec.
5. Tu es le Stratège (`regie:stratege`). Tu délègues chaque carte à son agent (`regie:<agent>`), tu fais contester par `regie:contradicteur`, tu tranches, tu écris le journal. Auteur ≠ relecteur, toujours.

## MÉMOIRE DE BOUCLE
Fichier d'état : `.loop/coeur-relatif-progress.md`. Tu démarres sans souvenir des itérations précédentes. Première action : le lire, puis `git log --oneline -15`. S'il montre des cartes cochées, fais-lui confiance : reprends à la première non cochée. Dernière action de chaque itération : le mettre à jour (checklist, journal, idées rejetées). Contrôleur : journalise tout ajustement de méthode dans `.loop/coeur-relatif-method-log.md` ; périmètre borné (découpage, ordre, briefs, seuils, vérifications) ; le reste en PROPOSITION ; marque `GENERIQUE` ce qui vaut au-delà de cette idée.

## LOTS
- [ ] **Carte 04 Design** (seulement si la spec a des écrans) : agent `architecte` ou skill de design installée. Maquettes des parcours, états vides et d'erreur. Challenge, décision.
- [ ] **Carte 05 Architecture et plan** : agent `architecte`, skills `architecture`, `adr`, `decoupage-lots`. Pile la plus ennuyeuse qui satisfait la spec. Remplir les commandes de `CLAUDE.md`. Challenge, décision. Dépense hors budget = réservé.
- [ ] **Carte 06 Tests d'acceptation** : agent `architecte`, skill `tests-dabord`. Un test par `CA-NN`, exécutable, rouge. Squelette de projet minimal pour que la suite tourne.

## VÉRIFICATION (binaire, avant approbation de la carte 06)
1. Chaque `CA-NN` de `docs/spec.md` apparaît dans un fichier de test : script `grep` sur la liste des critères → 0 manquant.
2. La suite de tests s'exécute et **échoue** : code de sortie ≠ 0, et 0 test vert (`à compléter en carte 05`).
3. `à compléter en carte 05` et `à compléter en carte 05` passent sur le squelette.
4. `git diff --stat main -- docs/spec.md` vide : la spec n'a pas bougé.
5. `git branch --show-current` → `regie/plan`.
Cartes 04 et 05 : grille de notation ≥ 8/10 sur la porte de qualité de leur skill et sur la réponse au Contradicteur.

## SI BLOQUÉ
Même obstacle après 3 itérations, ou dépense hors budget nécessaire : `BLOCKED.md`, puis `<promise>REGIE_PLAN_BLOCKED</promise>`.

## DEFINITION OF DONE
- Cartes 04 (si applicable), 05, 06 approuvées avec challenge et journal.
- Chaque `CA-NN` a exactement un lot dans `docs/lots.md` et un test rouge.
- `CLAUDE.md` contient les trois commandes réelles de vérification.
- `docs/programme.md` liste un loop `lot-NN` par lot avec son nombre d'itérations (2,5 × sous-lots, palier 15/25/40).
- `main` intacte.

<promise>REGIE_PLAN_DONE</promise>
