# Programme de loops : Cœur relatif

Un loop = une mission. Entre deux programmes : fenêtre de veto de 24 h du fondateur.
Branche par programme : `regie/<programme>`. Mémoire : `.loop/coeur-relatif-progress.md`.

| # | Programme | Cartes | Lancement | Itérations | État |
|---|---|---|---|---|---|
| A | cadrage | 01 Cadrage · 02 Musk · 03 Spécification | `/ralph-loop "$(cat .loop/prompts/loop-cadrage.md)" --max-iterations 15 --completion-promise "REGIE_CADRAGE_DONE"` | 15 | à lancer |
| B | plan | 04 Design (si écrans) · 05 Architecture · 06 Tests rouges | `/ralph-loop "$(cat .loop/prompts/loop-plan.md)" --max-iterations 15 --completion-promise "REGIE_PLAN_DONE"` | 15 | après veto A |
| C1…Cn | lot-NN | un loop par lot de `docs/lots.md` | `bash .loop/ralph.sh lot-01 25` (contexte frais) | 2,5 × sous-lots | après veto B |
| D | pilote | Marketing · Pilote | `/ralph-loop "$(cat .loop/prompts/loop-pilote.md)" --max-iterations 10 --completion-promise "REGIE_PILOTE_DONE"` | 10 | après recette |
| R | rétro | après chaque programme | `/regie:retro <programme>` | 5 | |

Arrêt d'un loop : `/ralph-loop:cancel-ralph` ou Échap. Reprise : relancer la même commande,
la progression fait foi. Sortie bloquée : lire `BLOCKED.md`, trancher, relancer.

## Après la Recette, si le pilote est concluant

Une carte de cadrage à part entière, pas un lot de code : **quel canal pour la version
vendue** (bot dans l'outil déjà utilisé par l'équipe, app dédiée, web) — avec les
retours réels des douze collègues du pilote comme preuve, pas une intuition. Le moteur
de calcul (`src/domain/`) est déjà isolé de l'affichage (ADR-0004) : quel que soit le
choix, rien du pilote n'est perdu.

Question posée par le fondateur le 2026-09-14, à trancher à ce moment-là, pas avant.

## Idée transmise par le fondateur (2026-09-14) : scores de groupe et score total

**L'idée** : des scores de groupe et un score total, avec cloisonnement strict — un
groupe ne voit jamais le score d'un autre groupe.

**Pourquoi ce n'est pas un lot maintenant.** La carte 02 (Méthode Musk) a fixé comme
détail signature : « les chiffres n'existent pas, ni pour le groupe, ni pour
l'organisateur, ni pour soi ». Un score de groupe ou un score total réintroduit
exactement le nombre agrégé que cette décision a supprimé. Ce n'est pas un ajout
technique, c'est une tension directe avec le principe qui fait tenir le produit : avant
de coder quoi que ce soit, il faut redécider si le score reste absent pour de bon ou
si l'idée change le détail signature lui-même.

**Où ça va.** Traité comme la question du canal de vente ci-dessus : une carte de
cadrage à part, après la Recette, pas un lot du pilote actuel. Le pilote reste à douze
personnes, un seul groupe ; le cloisonnement entre groupes n'a de sens qu'à partir de
plusieurs groupes, donc plusieurs sociétés ou équipes — la version vendue, pas le
pilote.

Idée à retester à ce moment-là avec la méthode Musk complète (premiers principes,
suppression, simplification) plutôt que codée directement : « des scores » est une
solution, pas un besoin. Le besoin derrière est probablement l'émulation entre équipes
sans exposer les individus — à confirmer avec le fondateur avant d'écrire une exigence.
