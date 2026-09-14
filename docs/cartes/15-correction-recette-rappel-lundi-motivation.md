---
carte: 15
nom: Correction Recette — rotation de phrases motivantes le lundi
agent: fondateur
skills: []
parents: [10]
statut: approuvee
livrable: docs/spec.md (P7, CA-13), src/domain/rappel-lundi.ts, test/rappel-lundi.test.ts, scripts/demo-recette.ts
porte: "les cinq tests de rappel-lundi.ts passent ; les 41 tests du dépôt passent ; docs/spec.md à jour"
risque: L1
approuvee_le: 2026-09-14T15:30:00+00:00
veto_jusqu_au: 2026-09-15T15:30:00+00:00
---

## Entrées reçues

Trouvé pendant la Recette (point 5, signal du vendredi et rappel du lundi) : le
fondateur a validé le principe du message du lundi, en suggérant d'y ajouter une note
motivante pour la semaine. Deux options proposées :
(A) une phrase fixe, plus motivante, mais toujours la même (ne change rien à CA-13
« identique chaque semaine ») ;
(B) une rotation parmi un petit set de phrases motivantes, une différente chaque
semaine (nécessite de réécrire CA-13, qui exigeait explicitement un texte unique).
Le fondateur a choisi (B).

## Résumé de fin de carte

- **Action proposée** : approuver la rotation de phrases motivantes, déjà implémentée
  et vérifiée.
- **Ce qui change** :
  - `src/domain/rappel-lundi.ts` : réécrit. `genererRappelLundi(date)` choisit
    désormais une phrase dans `PHRASES_MOTIVATION` (liste fixe de 4 phrases) via un
    indice calculé de façon déterministe à partir de la date (nombre de semaines
    écoulées depuis une origine fixe, modulo la taille de la liste). Le paramètre
    `date` influence donc maintenant le résultat — l'inverse du commentaire d'origine,
    volontairement corrigé.
  - `docs/spec.md` (P7, CA-13) : le critère n'exige plus un texte unique, mais une
    rotation déterministe (même semaine → même phrase, semaine suivante → phrase
    différente), toujours sans donnée personnelle ni chiffre.
  - `test/rappel-lundi.test.ts` : réécrit avec cinq cas (stabilité intra-semaine,
    changement d'une semaine à l'autre, bouclage après un tour complet de la liste,
    appartenance à la liste fixe, absence de prénom/chiffre dans chaque phrase).
  - `scripts/demo-recette.ts` (hors produit, démo locale) : point 5 montre la rotation
    sur cinq lundis consécutifs, y compris le bouclage.
- **Phrases retenues, dans l'ordre de rotation** :
  1. "Nouvelle semaine, nouvelles séances. Déclarez-les en privé au bot." (texte
     d'origine, conservé comme première phrase de la liste)
  2. "Nouvelle semaine, nouveau départ. Un pas suffit."
  3. "Cette semaine, l'important c'est de se lancer, pas de performer."
  4. "Chaque séance compte, même la plus courte."
- **Choix technique** : rotation déterministe (fonction de la date), pas aléatoire —
  reste testable (même entrée → même sortie) et reproductible en cas de rejeu du bot.
- **Sources** : décision directe du fondateur, entre deux options proposées par l'agent.
- **Ce qui manque** : seulement 4 phrases pour l'instant ; en ajouter d'autres est une
  simple extension du tableau `PHRASES_MOTIVATION`, aucun changement de logique. Pas de
  lien pour l'instant avec le mécanisme de style introduit à la carte 14 — les deux
  répondent à des besoins différents (rotation de contenu vs conversion de ton), à
  reconsidérer ensemble seulement si un besoin concret l'exige.
- **Risque** : L1, fichiers de `docs/` et `src/domain/` modifiés en dehors du cycle
  normal de lot, fait directement pendant la Recette avec le fondateur présent.
- **Conséquences** : réversible ; la première phrase de la rotation est l'ancien texte
  unique, donc la première semaine de rotation est identique à l'ancien comportement.
- **À trancher** : rien de réservé restant sur ce point précis.
- **Coût du run** : correction ciblée, quelques minutes, zéro régression (41/41 tests
  verts, typecheck et lint propres).

## Journal de décision

- **Décision** : le message du lundi tourne parmi une liste fixe de 4 phrases
  motivantes, choisie de façon déterministe selon la semaine, plutôt qu'un texte unique
  fixe pour toujours.
- **Options considérées** :
  (a) une phrase fixe plus motivante, toujours la même (écartée par le fondateur, moins
  vivant sur la durée) ;
  (b) rotation déterministe parmi un petit set de phrases (retenue) ;
  (c) message aléatoire à chaque lundi (jamais proposée à l'agent lui-même : écartée en
  amont par l'agent pour rester testable et reproductible, cohérent avec le style de
  code du dépôt qui évite le hasard non maîtrisé).
- **Qui a tranché** : le fondateur, en direct pendant la Recette, entre les deux options
  soumises par l'agent (A/B). Aucune remontée nécessaire : plus haute autorité du
  processus.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : si les collègues du pilote trouvent la variation
  déroutante ou préfèrent un texte stable et reconnaissable ; revenir à une seule phrase
  serait un simple raccourcissement de la liste à un élément.
- **Veto possible jusqu'à** : 2026-09-15T15:30:00+00:00 (fenêtre symbolique : c'est déjà
  la décision du fondateur, pas celle d'un agent).

## metadata
```json
{
  "criteres_touches": ["CA-13"],
  "trouve_pendant": "Recette, point 5",
  "decideur": "fondateur"
}
```
