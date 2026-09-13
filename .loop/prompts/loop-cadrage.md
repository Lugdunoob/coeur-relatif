# /loop : programme A, cadrage de « Cœur relatif »

> Lancement : `/ralph-loop "$(cat .loop/prompts/loop-cadrage.md)" --max-iterations 15 --completion-promise "REGIE_CADRAGE_DONE"`
> Hypothèses : les cinq réponses du fondateur sont dans `docs/cartes/01-cadrage.md` ; `societes/coeur-relatif/` existe ou est noté absent.

## MISSION
Mener les cartes 01 Cadrage, 02 Méthode Musk et 03 Spécification de « Cœur relatif » jusqu'au statut `approuvee`, chacune contestée par le Contradicteur et tranchée par le Stratège, sans écrire une ligne de code.
Livrable final : `docs/cadrage.md`, `docs/exigences.md`, `docs/spec.md`, et les trois cartes approuvées avec journal de décision.

## RÈGLES ABSOLUES
1. `main` est intouchable. Première action de chaque itération : `git branch --show-current` ; si `main`, crée ou bascule sur `regie/cadrage`.
2. Zéro push forcé, zéro merge dans `main`. Le push de la branche est autorisé.
3. Un commit par carte approuvée : `carte(NN): approuvée`, et un par renvoi : `carte(NN): renvoyée, <motif>`.
4. Liste réservée de `PROCESS.md` : si une carte la touche, écris `BLOCKED.md` et sors par la promesse de blocage. Ce n'est pas un échec.
5. Tu es le Stratège (`regie:stratege`). Tu délègues chaque carte à son agent (`regie:<agent>`), tu fais contester par `regie:contradicteur`, tu tranches, tu écris le journal. Auteur ≠ relecteur, toujours.

## MÉMOIRE DE BOUCLE
Fichier d'état : `.loop/coeur-relatif-progress.md`. Tu démarres sans souvenir des itérations précédentes. Première action : le lire, puis `git log --oneline -15`. S'il montre des cartes cochées, fais-lui confiance : reprends à la première non cochée. Dernière action de chaque itération : le mettre à jour (checklist, journal, idées rejetées). Contrôleur : journalise tout ajustement de méthode dans `.loop/coeur-relatif-method-log.md` ; périmètre borné (découpage, ordre, briefs, seuils, vérifications) ; le reste en PROPOSITION ; marque `GENERIQUE` ce qui vaut au-delà de cette idée.

## LOTS (une carte par itération, ordre imposé)
- [ ] **Carte 01 Cadrage** : agent `stratege`, skills `cadrage`, `etude-marche` (étude déléguée à un sous-agent `haiku`, retour en résumé sourcé). Puis challenge, réponses, décision.
- [ ] **Carte 02 Méthode Musk** : agent `musk`, skill `methode-musk`. Metadata exactement au format de la skill. Challenge, réponses, décision.
- [ ] **Carte 03 Spécification** : agent `produit`, skills `specification`, `criteres-acceptation`. Challenge, réponses, décision. Puis `touch .loop/spec-approuvee`.

## VÉRIFICATION PAR NOTE (chaque carte, avant approbation)
Note honnêtement de 1 à 10, et n'approuve que si TOUT est ≥ 8 ; sinon corrige d'abord le plus faible :
- Chaque fait de marché, prix ou droit porte une URL et une date : /10
- Le besoin principal tient en une phrase sans nom de fonctionnalité : /10
- La porte de qualité de la skill est satisfaite point par point : /10
- Le mémo du Contradicteur a une réponse sous chaque contestation : /10
- Le résumé de fin de carte est complet, « À trancher » inclus : /10
Puis les commandes : `test -f docs/cartes/0N-*.md`, `grep -q "statut: approuvee"`, `git branch --show-current` → `regie/cadrage`.

## SI BLOQUÉ
Même obstacle après 3 itérations, ou décision réservée : documente dans la progression et dans `BLOCKED.md` (symptôme, essais, deux options), puis termine par `<promise>REGIE_CADRAGE_BLOCKED</promise>`. À l'itération 12 sans complétion : stabilise et documente, n'ouvre rien.

## DEFINITION OF DONE
- Les trois cartes sont cochées et en `statut: approuvee`, chacune avec Challenge, Réponses, Journal de décision, `veto_jusqu_au` rempli.
- `docs/cadrage.md`, `docs/exigences.md`, `docs/spec.md` existent ; `docs/spec.md` a des critères `CA-01`… numérotés.
- Aucun fichier hors `docs/`, `.loop/` et `BLOCKED.md` n'a été créé. `main` intacte.
- `.loop/coeur-relatif-method-log.md` existe, même vide d'ajustements.

Alors, et seulement alors, termine par :

<promise>REGIE_CADRAGE_DONE</promise>
