# Comparaison au run de référence (golden)

*Écrite après exécution du programme A par l'agent Stratège, pour vérifier que le
processus tient avant de l'automatiser en loop, comme l'exige la règle d'or de
`boucle-regie`.*

## Carte 01 Cadrage

Identique sur le fond : mêmes cinq réponses, même besoin, même étude de marché (reprise
telle quelle, sourcée le 2026-09-11, revérifiée sans changement). Différence : le golden
run n'avait pas de Challenge formalisé (le Contradicteur n'existait pas encore comme
agent au moment du golden run à la main). Le run d'aujourd'hui en ajoute un, réel, à
trois contestations sérieuses/mineures, toutes transmises en exigences aux cartes
suivantes plutôt que tranchées au cadrage. **Verdict : le format de carte capture mieux
la décision que le golden run lui-même** — à proposer en amélioration du golden run par
rétro plutôt que l'inverse.

## Carte 02 Méthode Musk

Formalise fidèlement la décision déjà approuvée le 2026-09-11, challenge compris (repris
du golden `carte-2-challenge.md`). Aucun écart : c'est un test de fidélité du format de
carte, pas de la skill elle-même, puisque le contenu métier était déjà tranché.

## Carte 03 Spécification

**Premier test réel, sans filet.** Aucun golden n'existait. Le Contradicteur a trouvé
deux points sérieux (ambiguïté de la référence glissante en fin de pilote, absence de
règle pour une semaine à zéro déclaration) et un mineur (frontière avec la carte
Consentement, jugée correcte). Les deux points sérieux étaient des trous de spécification
réels, pas des désaccords sur le fond : la skill `specification` traduit correctement les
exigences en critères testables, mais ne pousse pas assez loin sur les cas limites
(zéro, changement de rythme) sans le Contradicteur pour les débusquer.

## Leçon à proposer en rétro

**R-5 — La skill `specification` ne couvre pas nativement le cas zéro et les
transitions de fenêtre glissante.** Symptôme : deux trous trouvés par challenge sur le
premier run sans golden. Cause : le squelette de la skill ne rappelle pas de vérifier
« que se passe-t-il à zéro, et à la limite d'une fenêtre glissante ? ». Règle proposée :
ajouter ces deux questions à la porte de qualité de `specification`, pour que le
Développeur les trouve à la revue plutôt qu'au challenge. Statut : à proposer par PR
lors de la première `/regie:retro`, une fois le programme B passé.

## Verdict global

Programme A tient. Passer à voix haute au fondateur les trois cartes (veto 24 h), puis
lancer le programme B — à la main pour la carte Architecture (aucune référence non plus),
comme le veut la règle d'or, avant d'envisager un loop automatisé sur les lots de code.
