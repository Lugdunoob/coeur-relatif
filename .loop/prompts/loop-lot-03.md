# Loop : lot 03 de « Cœur relatif », contexte frais

> Lancement : `bash .loop/ralph.sh lot-03 15`
> Chaque itération démarre sans mémoire. Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou `STATUS: LOT_03_DONE` ou `STATUS: LOT_03_BLOCKED`.

## MISSION
Faire passer au vert les tests d'acceptation du lot 03 (`docs/lots.md`, critères CA-09, CA-10), et rien d'autre. Livrable final : la branche `lot-03` poussée sur `origin`, prête pour une PR (que l'orchestrateur ouvre juste après, `gh` n'étant pas disponible dans cet environnement), avec un résumé dans la progression citant les critères couverts, le nombre d'itérations, ce qui a été laissé de côté et pourquoi.

## RÈGLES ABSOLUES
1. Première action : `git branch --show-current` → `lot-03`, sinon arrête-toi. `main` intouchable, zéro push forcé, zéro merge.
2. `echo lot > .loop/phase` avant toute écriture. Aucun fichier de `docs/` ne change (le hook `garde-docs` le bloque ; si tu es en désaccord avec la spec, note-le dans `docs/cartes/03-lot-03.md` sous « À trancher » via la carte, et arrête le lot).
3. Aucun test modifié pour le faire passer. Aucune fonctionnalité « tant qu'on y est ». Aucune nouvelle dépendance sans nécessité prouvée notée dans la progression.
4. Réutiliser l'existant : lis `CLAUDE.md`, `docs/adr/`, `docs/data-model.md`, le code déjà là, avant d'écrire.

## MÉMOIRE DE BOUCLE
`.loop/lot-03-progress.md` : sous-lots cochés, journal, idées rejetées. Lis-le en premier avec `git log --oneline -15`, mets-le à jour en dernier. Contrôleur : `.loop/lot-03-method-log.md`, périmètre borné.

## SOUS-LOTS (un par itération)
- [ ] Sous-lot 0 : lire la carte, le lot, les tests rouges ; écrire le plan de sous-lots dans la progression. Aucun code.
- [ ] Sous-lot 1, spike de vérification (obligatoire avant tout code, carte 05) : lire la documentation officielle Telegram Bot API sur les mises à jour `message_reaction` (recherche web autorisée). Écrire la conclusion dans `.loop/lot-03-progress.md` sous un titre « Spike Telegram ». Si les bots peuvent recevoir ces mises à jour dans les conditions du pilote (un groupe, `allowed_updates` incluant `message_reaction`), continuer normalement. Si ce n'est pas confirmable avec certitude ou si la documentation dit clairement que ce n'est pas possible pour un bot, **arrêter le lot ici**, écrire `BLOCKED.md` avec la conclusion du spike et les deux options (repli en texte, ou revoir CA-09/CA-10), et sortir par `STATUS: LOT_03_BLOCKED` sans écrire le reste du code.
- [ ] Sous-lot 2 (seulement si le spike est positif) : `src/domain/coeurs.ts` — implémenter réellement `enregistrerCoeur`, `coeursRecus`, `coeursDonnesSemaine` en s'appuyant sur `InMemoryRepository` (l'étendre avec les méthodes nécessaires : ajouterCoeur, coeursParSeance, coeursDonnesParPersonneEtSemaine, ou équivalent). Fait passer `test/coeurs.test.ts`.
- [ ] Sous-lot 3 : mise à jour de `src/telegram/webhook.ts` (squelette du lot 2) pour documenter en commentaire comment une mise à jour `message_reaction` serait routée vers `enregistrerCoeur` — pas d'appel réseau réel, pas de dépendance `grammY` ajoutée à ce stade (aucun test ne l'exige).
- [ ] Sous-lot final : revue par `regie:contradicteur` du diff (`git diff main...lot-03`), corrections, puis `git push -u origin lot-03`. Ne pas tenter `gh pr create` (absent de cet environnement) ; l'orchestrateur ouvre la PR juste après via l'API GitHub.

## VÉRIFICATION (chaque itération, avant commit)
1. `npm run typecheck` → 0 erreur
2. `npm run lint` → 0 erreur
3. `npm test` → les tests du lot passent ; aucun test précédemment vert ne casse
4. `git diff --stat main -- docs/` → vide
5. `git branch --show-current` → `lot-03`

## SI BLOQUÉ
Même obstacle après 3 itérations : `BLOCKED.md` (symptôme, essais, deux options), carte en `changements_demandes`, puis `STATUS: LOT_03_BLOCKED`. À l'itération N−3 : stabilise, documente.

## DEFINITION OF DONE
- Tous les sous-lots cochés ; tests CA-09, CA-10 verts ; typecheck et lint verts ; `docs/` inchangé ; branche `lot-03` poussée sur `origin` ; mémo du Contradicteur répondu dans la carte ; `main` intacte.
Alors, et seulement alors : `STATUS: LOT_03_DONE`.
