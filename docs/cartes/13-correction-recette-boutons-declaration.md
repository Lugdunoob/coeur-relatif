---
carte: 13
nom: Correction Recette — déclaration par boutons, sans texte libre
agent: fondateur
skills: []
parents: [12]
statut: approuvee
livrable: docs/spec.md (P2, CA-03), src/domain/parsing.ts, test/parsing.test.ts, src/telegram/webhook.ts, scripts/demo-recette.ts
porte: "les six tests de parsing passent ; les 32 tests du dépôt passent ; docs/spec.md à jour"
risque: L1
approuvee_le: 2026-09-14T14:30:00+00:00
veto_jusqu_au: 2026-09-15T14:30:00+00:00
---

## Entrées reçues

Trouvé pendant la Recette (point 2, déclarer une séance), juste après la carte 12 : le
fondateur a jugé que même une liste à trois lignes tapées restait trop de friction et
trop de risque d'erreur de frappe sur téléphone. Décision du fondateur, en direct,
pendant la Recette : remplacer par trois choix par boutons (activité, durée, effort
ressenti), sans aucun texte libre — sauf une exception explicitement demandée pour
l'activité, via un bouton « Autre ».

Clarifié ensuite par question directe au fondateur (trois points) :
- Liste d'activités : fermée + « Autre » en texte libre (recommandé, retenu).
- Contenu de la liste : Course, Vélo, Musculation, Natation, Marche (retenu).
- Échelle d'effort ressenti : mots (pas de chiffres), avec smiley/image envisageables
  plus tard — on commence simple avec des mots.

## Résumé de fin de carte

- **Action proposée** : approuver le nouveau format par boutons, déjà implémenté et
  vérifié, qui remplace celui de la carte 12 avant même sa mise en service réelle.
- **Ce qui change** :
  - `docs/spec.md` (P2, CA-03) : parcours et critère réécrits pour décrire trois choix
    par boutons au lieu d'une liste tapée.
  - `src/domain/parsing.ts` : réécrit. `parserDeclaration` prend désormais un objet
    `ChoixDeclaration { activite, minutes, effortMot }` (plus une chaîne de texte).
    Nouvelles constantes exportées : `ACTIVITES`, `DUREES_MINUTES`, `EFFORTS_MOTS`,
    `EFFORT_VALEUR` (conversion mot → valeur interne 2/4/6/8/10, jamais affichée).
  - `test/parsing.test.ts` : réécrit avec six cas (choix valide, « Autre » avec texte,
    « Autre » sans texte rejeté, durée hors liste rejetée, mot d'effort inconnu rejeté,
    couverture croisée durée × effort).
  - `src/telegram/webhook.ts` : commentaire de branchement futur mis à jour (ne décrit
    plus un texte libre reçu, mais les trois choix de boutons).
  - `scripts/demo-recette.ts` (hors produit, démo locale) : point 2 mis à jour pour
    illustrer les nouveaux choix par boutons, avec un cas « Autre » et deux cas de rejet.
- **Choix par boutons, exact tel que spécifié** :
  1. Activité : Course, Vélo, Musculation, Natation, Marche, ou Autre (texte libre une
     fois, uniquement pour nommer l'activité).
  2. Durée : 15, 30, 45, 60 ou 90 minutes.
  3. Effort ressenti : Facile, Modéré, Soutenu, Dur, Maximal → converti en interne sur
     2/4/6/8/10, jamais affiché comme chiffre à la personne.
- **Sources** : décision directe du fondateur, précisée par une question fermée à trois
  points (liste d'activités, contenu de la liste, nature de l'échelle d'effort).
- **Tension avec une décision antérieure (carte 02)** : la carte 02 (`docs/cartes/02-musk.md`,
  ligne 126) avait tranché « multi-sport avec catalogue » → « activité nommée
  librement », précisément pour éviter une liste fermée perçue comme excluante. Le
  bouton « Autre » avec texte libre est le compromis retenu ici pour ne pas revenir
  entièrement sur cette décision : la liste fermée n'est qu'un raccourci pour les
  activités les plus fréquentes, l'activité nommée librement reste possible via
  « Autre ». Signalé explicitement au fondateur avant que la question fermée ne soit
  posée ; le fondateur a tranché en faveur de ce compromis en connaissance de cause.
- **Ce qui manque** : plus rien sur les presets eux-mêmes — le fondateur a confirmé les
  durées (15/30/45/60/90+) et les mots d'effort proposés (« ok pour le reste »), avec un
  seul ajustement (voir ci-dessous). L'échelle d'effort pourrait évoluer vers des
  smileys ou des images plus tard (mentionné par le fondateur, non décidé, pas urgent).
- **Ajustement confirmé le 2026-09-14 (même jour)** : le dernier bouton de durée se lit
  « 90+ min » plutôt que « 90 min », pour ne pas donner l'impression qu'une séance plus
  longue est refusée. Purement cosmétique : `DUREE_LABELS` (nouveau, dans
  `src/domain/parsing.ts`) ne change que le texte du bouton ; la valeur utilisée dans le
  calcul de charge reste 90, aucun palier numérique supplémentaire n'est créé. `docs/spec.md`
  (P2, CA-03) mis à jour en conséquence.
- **Risque** : L1, fichiers de `docs/` et `src/domain/` modifiés en dehors du cycle
  normal de lot, fait directement pendant la Recette avec le fondateur présent.
- **Conséquences** : réversible ; remplace un format (carte 12) qui n'a jamais été mis
  en service réel, donc aucune migration de données à faire.
- **À trancher** : rien de réservé restant sur ce point précis.
- **Coût du run** : correction ciblée, quelques minutes, zéro régression (32/32 tests
  verts, typecheck et lint propres).

## Journal de décision

- **Décision** : la déclaration d'une séance se fait par trois choix de boutons
  (activité, durée, effort ressenti), sans texte libre sauf le nom saisi après le
  bouton « Autre » pour l'activité.
- **Options considérées** :
  (a) garder le format en trois lignes tapées de la carte 12 (écartée, encore trop de
  friction/risque de frappe pour le fondateur) ;
  (b) trois choix par boutons avec liste d'activités totalement fermée, sans échappatoire
  texte libre (écartée par le fondateur au profit de (c), pour ne pas revenir
  entièrement sur la carte 02) ;
  (c) trois choix par boutons, liste fermée + « Autre » en texte libre pour l'activité,
  durée en liste fermée de minutes, effort ressenti en mots (retenue).
- **Qui a tranché** : le fondateur, en direct pendant la Recette, avec une question
  fermée à trois points pour préciser le détail (liste d'activités, son contenu,
  nature de l'échelle d'effort). Aucune remontée nécessaire : plus haute autorité du
  processus.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : si le pilote réel montre que le bouton « Autre »
  est utilisé si souvent que la liste fermée n'apporte rien, ou à l'inverse que même
  les cinq boutons restent trop nombreux sur petit écran.
- **Veto possible jusqu'à** : 2026-09-15T14:30:00+00:00 (fenêtre symbolique : c'est déjà
  la décision du fondateur, pas celle d'un agent).

## metadata
```json
{
  "criteres_touches": ["CA-03"],
  "trouve_pendant": "Recette, point 2",
  "decideur": "fondateur",
  "tension_avec": "02"
}
```
