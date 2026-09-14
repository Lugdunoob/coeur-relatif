---
carte: 12
nom: Correction Recette — format de déclaration en trois lignes
agent: fondateur
skills: []
parents: [08]
statut: approuvee
livrable: docs/spec.md (P2, CA-03), src/domain/parsing.ts, test/parsing.test.ts
porte: "les huit tests de parsing passent ; les 33 tests du dépôt passent ; docs/spec.md à jour"
risque: L1
approuvee_le: 2026-09-14T13:42:58+00:00
veto_jusqu_au: 2026-09-15T13:42:58+00:00
---

## Entrées reçues

Trouvé pendant la Recette (point 2, déclarer une séance) : le format en une phrase
(`course 30 min effort 7`) était rigide, une variation de frappe suffisait à faire
échouer la reconnaissance sans message d'erreur explicite. Décision du fondateur, en
direct, pendant la Recette : remplacer par une liste à trois points (activité, durée,
effort), dans n'importe quel ordre.

## Résumé de fin de carte

- **Action proposée** : approuver le nouveau format, déjà implémenté et vérifié.
- **Ce qui change** : `docs/spec.md` (P2, CA-03), `src/domain/parsing.ts` réécrit,
  `test/parsing.test.ts` réécrit avec huit cas (ordre libre, synonymes, lignes manquantes).
- **Message exact envoyé au bot, exemple** :
  ```
  Activité : course
  Durée : 30
  Effort : 7
  ```
  Mots-clés reconnus, insensibles à la casse et aux accents : activité/sport ;
  durée/minutes/temps ; effort/ressenti.
- **Sources** : décision directe du fondateur, aucune source externe nécessaire.
- **Ce qui manque** : le texte d'instruction envoyé par le bot au premier message
  (« comment déclarer ») n'est pas encore écrit ; à faire avec le vrai câblage Telegram
  (lot 6, Recette technique).
- **Risque** : L1, un fichier de `docs/` modifié en dehors du cycle normal de lot, fait
  directement pendant la Recette avec le fondateur présent — pas par un agent seul.
- **Conséquences** : réversible, un test de plus ou de moins ne casse rien d'autre.
- **À trancher** : rien de réservé restant sur ce point précis.
- **Coût du run** : correction ciblée, quelques minutes, zéro régression (33/33 tests verts).

## Journal de décision

- **Décision** : le format de déclaration devient une liste à trois lignes, ordre libre,
  synonymes tolérés.
- **Options considérées** : (a) garder le format en une phrase et améliorer seulement le
  message d'erreur (écartée par le fondateur, encore fragile à la frappe) ; (b) liste à
  trois lignes (retenue, décision directe du fondateur).
- **Qui a tranché** : le fondateur, en direct, pendant la Recette. Aucune remontée
  nécessaire : c'est la plus haute autorité du processus qui a tranché elle-même.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : si les tests du vrai pilote montrent que la liste à
  trois lignes est encore plus lourde à taper sur téléphone que l'ancienne phrase.
- **Veto possible jusqu'à** : 2026-09-15T13:42:58+00:00 (fenêtre symbolique : c'est déjà la décision du
  fondateur, pas celle d'un agent).

## metadata
```json
{
  "criteres_touches": ["CA-03"],
  "trouve_pendant": "Recette, point 2",
  "decideur": "fondateur"
}
```
