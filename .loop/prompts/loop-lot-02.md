# Loop : lot 02 de « Cœur relatif », contexte frais

> Lancement : `bash .loop/ralph.sh lot-02 20`
> Chaque itération démarre sans mémoire. Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou `STATUS: LOT_02_DONE` ou `STATUS: LOT_02_BLOCKED`.

## MISSION
Faire passer au vert les tests d'acceptation du lot 02 (`docs/lots.md`, critères CA-01, CA-02, CA-03, CA-06), et rien d'autre. Livrable final : la branche `lot-02` poussée sur `origin`, prête pour une PR (que l'orchestrateur ouvre juste après, `gh` n'étant pas disponible dans cet environnement), avec un résumé dans la progression citant les critères couverts, le nombre d'itérations, ce qui a été laissé de côté et pourquoi.

## RÈGLES ABSOLUES
1. Première action : `git branch --show-current` → `lot-02`, sinon arrête-toi. `main` intouchable, zéro push forcé, zéro merge.
2. `echo lot > .loop/phase` avant toute écriture. Aucun fichier de `docs/` ne change (le hook `garde-docs` le bloque ; si tu es en désaccord avec la spec, note-le dans `docs/cartes/02-lot-02.md` sous « À trancher » via la carte, et arrête le lot).
3. Aucun test modifié pour le faire passer. Aucune fonctionnalité « tant qu'on y est ». Aucune nouvelle dépendance sans nécessité prouvée notée dans la progression.
4. Réutiliser l'existant : lis `CLAUDE.md`, `docs/adr/`, `docs/data-model.md`, le code déjà là, avant d'écrire.

## MÉMOIRE DE BOUCLE
`.loop/lot-02-progress.md` : sous-lots cochés, journal, idées rejetées. Lis-le en premier avec `git log --oneline -15`, mets-le à jour en dernier. Contrôleur : `.loop/lot-02-method-log.md`, périmètre borné.

## SOUS-LOTS (un par itération)
- [ ] Sous-lot 0 : lire la carte, le lot, les tests rouges ; écrire le plan de sous-lots dans la progression. Aucun code.
- [ ] Sous-lot 1 : `src/db/schema.ts` (déjà là, stub) et `src/db/in-memory.ts` — implémenter réellement `InMemoryRepository` : `ajouterSeance(seance: Seance): void` (stocke), `dernieresSeances(personneId, n): Seance[]` (les n dernières, triées de la plus ancienne à la plus récente, filtrées par `personneId`). Retirer les `throw` du stub. Ajouter aussi les méthodes de consentement dont a besoin le sous-lot 2 : `upsertPersonne`, `getPersonne(idTelegram): Personne | undefined`, `enregistrerRappelConsentement(id, date)`, `dernierRappelConsentement(id): Date | undefined` (les ajouter à la classe, aucun test ne les couvre directement mais `consentement.ts` en aura besoin).
- [ ] Sous-lot 2 : `src/domain/consentement.ts` — implémenter réellement `peutEnregistrer` et `doitRelancerConsentement` (>= 7 jours = 7*24*3600*1000 ms). Fait passer `test/consentement.test.ts`.
- [ ] Sous-lot 3 : `src/domain/parsing.ts` — implémenter `parserDeclaration(texte)` : regex tolérante du type `<activité libre> <minutes> min effort <1-10>`, retourne `null` si minutes <= 0 ou effort hors [1,10] ou activité vide. Fait passer `test/parsing.test.ts`.
- [ ] Sous-lot 4 : `src/domain/message.ts` — implémenter `formaterMessagePublic({prenom, etoiles, activite})` : rendre les étoiles en répétant le caractère ★ (jamais un chiffre), format `"<prenom> <★×N> · <activite>"`. Fait passer `test/message.test.ts` (aucun chiffre dans le résultat).
- [ ] Sous-lot 5 : squelette `src/telegram/webhook.ts` — juste la structure (pas de vrai appel réseau, pas de dépendance `grammY` ajoutée à ce stade), un commentaire décrivant le branchement futur avec `consentement.ts`, `parsing.ts`, `message.ts`, `reference.ts`, `etoiles.ts`. Aucun test ne le couvre directement ; ne pas en inventer.
- [ ] Sous-lot final : revue par `regie:contradicteur` du diff (`git diff main...lot-02`), corrections, puis `git push -u origin lot-02`. Ne pas tenter `gh pr create` (absent de cet environnement) ; l'orchestrateur ouvre la PR juste après via l'API GitHub.

## VÉRIFICATION (chaque itération, avant commit)
1. `npm run typecheck` → 0 erreur
2. `npm run lint` → 0 erreur
3. `npm test` → les tests du lot passent ; aucun test précédemment vert ne casse
4. `git diff --stat main -- docs/` → vide
5. `git branch --show-current` → `lot-02`

## SI BLOQUÉ
Même obstacle après 3 itérations : `BLOCKED.md` (symptôme, essais, deux options), carte en `changements_demandes`, puis `STATUS: LOT_02_BLOCKED`. À l'itération N−3 : stabilise, documente.

## DEFINITION OF DONE
- Tous les sous-lots cochés ; tests CA-01, CA-02, CA-03, CA-06 verts ; typecheck et lint verts ; `docs/` inchangé ; branche `lot-02` poussée sur `origin` ; mémo du Contradicteur répondu dans la carte ; `main` intacte.
Alors, et seulement alors : `STATUS: LOT_02_DONE`.
