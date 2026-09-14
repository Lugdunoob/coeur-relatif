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
