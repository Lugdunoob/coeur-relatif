---
carte: 01
nom: Cadrage
agent: stratege
skills: [cadrage, etude-marche]
parents: []
statut: approuvee
livrable: docs/cadrage.md
porte: "chaque produit cité a une URL et une date ; le besoin tient en une phrase sans nom de fonctionnalité ; la question décisive a une réponse oui/non"
risque: L0
approuvee_le: 2026-09-13T21:00:14+00:00
veto_jusqu_au: 2026-09-14T21:00:14+00:00
---

## Entrées reçues

Idée du fondateur (une phrase) et les cinq réponses fermées, déjà actées le 2026-09-11
dans le run de référence (`golden/carte-1-cadrage.md` du plugin). Rien ne manquait.

## Résumé de fin de carte

- **Action proposée** : approuver ce cadrage ; la carte Méthode Musk peut être exécutée.
- **Pour qui** : 12 collègues de bureau, pilote interne, aucun produit vendu.
- **Ce qui change** : rien encore, aucun code, aucun tiers contacté.
- **Sources** : 20+ URL datées du 2026-09-11 dans `golden/etude-marche-coeur-relatif.md`, revérifiées sans changement le 2026-09-13.
- **Ce qui manque** : rien de bloquant ; trois points transmis aux cartes suivantes (voir Challenge).
- **Risque** : L0, lecture et rédaction seulement.
- **Conséquences** : réversible.
- **À trancher** : aucune décision réservée au fondateur sur cette carte ; trois points transmis à la carte 02 et au programme D (voir Challenge).
- **Coût du run** : réutilisation de l'étude déléguée existante (~130 k tokens en 2026-09-11) ; rédaction de cette carte, quelques k tokens.

## Challenge

**1 · Sérieuse · L'auto-déclaration sans montre est d'abord un risque de friction, pas seulement de triche.** Le cadrage suppose que taper "course 30 min effort 7" à un bot suffit ; sans rappel ni geste rapide, le risque le plus probable en 6 mois est l'abandon par oubli, pas la triche (H3 teste la triche, pas l'oubli).
Alternative : un rappel bot quotidien optionnel et une déclaration en moins de 10 secondes, à spécifier dans les exigences (carte 02), pas ici.
Ce qui tranche : le taux de déclaration observé en semaine 1 du pilote.

**2 · Sérieuse · Les cœurs pourraient recréer un classement caché.** « Être vu sans être exposé » vise les chiffres de performance ; rien n'empêche que le nombre de cœurs reçus devienne le nouveau critère de statut du groupe.
Alternative : le nombre de cœurs reçus n'est jamais affiché en cumul public, seulement en privé à son destinataire ; exigence à porter dans la carte Méthode Musk.
Ce qui tranche : la question anonyme de fin de pilote, étendue à « as-tu regardé qui reçoit le plus de cœurs ? ».

**3 · Mineure · Aucune règle pour une absence légitime (maladie, déplacement).** Un participant qui décroche pour une bonne raison n'est pas distingué de celui qui décroche par désintérêt, ce qui fausserait la lecture de H1.
Alternative : le protocole de pilote (carte Pilote, programme D) demande à mi-parcours si une absence est due à un empêchement, sans le rendre visible aux autres.
Ce qui tranche : rien à trancher au cadrage ; c'est un item du protocole.

**Verdict : solide.** Rien ne remet en cause le besoin ni la question décisive ; les trois points sont des exigences ou des items de protocole, pas des défauts de cadrage.

## Réponses de l'auteur

1. **Accepte.** Transmis à la carte 02 : ajouter aux exigences un rappel léger et une déclaration très courte.
2. **Accepte.** Transmis à la carte 02 : le nombre de cœurs reçus reste privé, jamais un total public ou classé.
3. **Accepte.** Transmis au programme D (carte Pilote) : question de mi-parcours sur les empêchements.

## Journal de décision

- **Décision** : cadrage approuvé sans modification ; trois points du Contradicteur ne sont pas tranchés ici mais transmis en exigences à la carte 02 et en item de protocole à la carte Pilote.
- **Options considérées** : (a) approuver tel quel sans notes ; (b) approuver en transmettant les trois points aux cartes suivantes (retenue) ; (c) bloquer le cadrage tant que la friction de déclaration n'est pas résolue, écartée car c'est un sujet d'exigence, pas de besoin.
- **Qui a tranché** : Stratège — aucune des trois contestations n'était bloquante ni sur la liste réservée.
- **Réversible** : oui. Reviendrait dessus si la carte 02 ou le protocole du pilote montrent que la friction de déclaration tue H3 avant même le test.
- **Ce qui ferait revenir dessus** : un taux de déclaration observé très faible dès la semaine 1 du pilote.
- **Veto possible jusqu'à** : 2026-09-14T21:00:14+00:00 (24 h après commit).

## metadata
```json
{
  "besoin_principal": "Être reconnu pour son effort réel, pas pour ses kilomètres, afin de ne pas abandonner par honte",
  "besoins_secondaires": ["revenir chaque semaine", "être vu sans être exposé et encouragé par ses pairs (donner et recevoir des cœurs)", "équité perçue par les sportifs", "zéro surveillance"],
  "hypotheses": ["H1 note relative > classement pour les non-sportifs", "H2 les sportifs acceptent la même note", "H3 l'auto-déclaration suffit"],
  "question_decisive": "≥ 8/12 participent encore en semaine 4 et veulent continuer",
  "contrainte": "données UE, aucune visibilité hiérarchique, aucune API de montre disponible pour un pilote",
  "points_transmis": [
    {"vers": "carte 02", "point": "rappel léger + déclaration très courte"},
    {"vers": "carte 02", "point": "cœurs reçus jamais en cumul public ou classé"},
    {"vers": "programme D, carte Pilote", "point": "question de mi-parcours sur les absences légitimes"}
  ]
}
```
