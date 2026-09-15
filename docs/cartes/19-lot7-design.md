---
carte: 19
nom: Lot 7 — Design des écrans (cœurs sociaux)
agent: architecte
skills: [design, challenge]
parents: [18]
statut: approuvee
livrable: docs/cartes/19-lot7-design.md (ce document)
porte: "aucun écran ne montre un chiffre de cœurs, d'étoiles cumulées ou de position numérique (R7, détail signature carte 02)"
risque: L0
approuvee_le: 2026-09-15T08:00:00+00:00
veto_jusqu_au: 2026-09-16T08:00:00+00:00
---

## Entrées reçues

Carte 18 (approuvée) : quatre écrans/zones décrits par le fondateur — accueil (bienvenue
+ cœurs reçus + roues), zone d'interaction (déclarer / envoyer des cœurs), navigation
vers un signal pays/région, fond d'écran qualitatif. Pas de maquette fournie : cette
carte décrit les états, pas le rendu visuel (identité graphique déjà actée en
ADR-0006/carte 17, hors périmètre ici).

## Résumé de fin de carte

**Action proposée** : décrire les états de chaque écran, y compris les états vides et
d'erreur, sans coder d'interface — le Lot 7 de code (docs/lots.md) suivra ces états.

### Écran d'accueil
- **État peuplé** : message de bienvenue court (une phrase fixe, pas personnalisée par
  chiffre), fond d'écran qualitatif dérivé des cœurs reçus (voir carte 21 pour le calcul,
  jamais un nombre affiché), trois roues de déclaration (carte 14, inchangées) avec leur
  bouton de validation.
- **État vide** (aucun cœur reçu, aucune séance) : fond d'écran neutre défini (une
  teinte de base, pas un écran blanc ou cassé), message de bienvenue plus visible que
  d'habitude pour compenser l'absence de contenu.
- **État d'erreur** (échec de chargement) : message d'erreur textuel et un bouton
  « réessayer » ; pas de mise en cache locale de secours (source de vérité serveur
  uniquement, cohérent avec « zéro surveillance » — pas de nouvelle donnée stockée côté
  client au-delà de ce qui existe déjà).

### Zone d'interaction (bas de l'écran), deux parties
- **Haut — déclarer une activité** : inchangé (P2/P3, carte 13/14).
- **Bas — envoyer des cœurs (P9)** : une liste de cartes d'activités anonymisées
  d'autres membres (ni prénom ni nom d'activité — R12, carte 20), chacune avec un
  indicateur d'intensité à deux paliers (petit cœur / gros cœur, dérivé de l'étoile déjà
  calculée). Deux boutons par carte : **cœur simple**, **gros cœur**. Un bouton distinct,
  hors des cartes individuelles : **cœur à tout le monde**.
  - **État vide** (personne d'autre n'a d'activité active dans la période) : message
    « personne n'a encore bougé aujourd'hui », aucun bouton d'envoi actif.
  - **État consentement non à jour (CA-24)** : remplace la liste par « en attente de ton
    accord pour voir les activités du groupe » ; aucun bouton d'envoi actif, y compris
    « cœur à tout le monde », tant que la personne n'a pas redonné son accord (P1 révisé).
  - **État post-envoi** : confirmation brève et privée, pas de changement visible sur la
    carte de la personne visée (pas de compteur affiché sur sa carte).

### Navigation vers le signal pays/région
- **État peuplé** (au moins une personne du pays avec une étoile cette semaine) :
  affichage de la bande du pays/région de l'utilisateur (calme / actif / très actif,
  R13) — jamais un nombre, jamais la liste des autres pays triée par niveau cité. Les
  pays de même bande ne sont pas départagés (CA-19) : ils sont listés ensemble, sans
  ordre interne signifiant.
- **État un seul pays existant** (le pilote actuel) : la bande s'affiche normalement ;
  aucun texte de « classement » n'est utilisé puisqu'il n'y a rien à comparer — état
  documenté explicitement pour ne pas laisser croire à un bug d'affichage plus tard.
- **État calibration** (aucune étoile encore cette semaine dans le pays) : message
  neutre « pas encore de signal cette semaine », pas de bande par défaut inventée.

### Fond d'écran (accueil)
Représentation qualitative de tous les cœurs reçus par la personne, par intensité
croissante de densité visuelle, jamais un compteur. État « aucun cœur reçu » = fond
neutre déjà décrit ci-dessus (état vide de l'accueil), pas un état distinct.

**Sources** : carte 18, échange initial du fondateur (« Entrées reçues » de la carte 18).

**Risque** : L0, aucun code d'interface produit ici, seulement des états à respecter au
lot de code.

**Ce qui manque** : rendu graphique exact (couleurs, animation) — hors périmètre de
cette carte, à traiter avec la charte déjà actée (ADR-0006, panneau d'aéroport / roues).

**Coût du run** : lecture de la carte 18, description des états ; aucun code produit.

## Challenge

**1 · Sérieuse · Le bouton global « cœur à tout le monde », posé sur le même écran que
les boutons individuels « cœur simple »/« gros cœur », risque un envoi de masse
accidentel** (un tap de trop, sans distinction visuelle suffisante entre cibler une
personne et cibler tout le monde). C'est exactement le risque que R11 (anti-abus) doit
couvrir côté données, mais le design peut réduire le risque avant même la limite de
fréquence.
Alternative : exiger une confirmation à deux temps (un deuxième tap explicite) pour
« cœur à tout le monde » seulement, pas pour les deux options individuelles.
Ce qui tranche : confirmation à deux temps retenue pour « cœur à tout le monde »,
documentée ici comme consigne au lot de code (pas un critère testable en soi, c'est un
détail d'interaction, mais R11 reste le filet de sécurité testable si elle est
contournée ou absente).

**2 · Mineure · L'écran de signal pays/région est peu utile tant que le pilote ne compte
qu'un seul pays.** Ce n'est pas un défaut de design à corriger, c'est une conséquence
connue de l'échelle actuelle (12 personnes, un bureau) documentée dans la carte 18.
Ce qui tranche : rien à changer, état « un seul pays existant » documenté ci-dessus pour
qu'un futur lecteur ne le prenne pas pour un bug.

**Verdict : accepté avec la confirmation à deux temps pour l'envoi de masse.**

## Réponses de l'auteur

1. **Accepte.** Confirmation à deux temps pour « cœur à tout le monde » uniquement,
   ajoutée à la description de l'état ci-dessus.
2. **Accepte.** État « un seul pays » documenté tel quel, aucune action requise.

## Journal de décision

- **Décision** : les quatre écrans/zones et leurs états (peuplé, vide, erreur,
  consentement non à jour, calibration) sont actés tels que décrits ci-dessus. Aucun
  écran n'affiche de chiffre de cœurs, d'étoiles cumulées ou de position de pays.
- **Options considérées** : confirmation à deux temps généralisée à toutes les options
  d'envoi (écartée : alourdit l'usage courant du cœur simple, qui doit rester un geste
  léger, sans bénéfice de sécurité supplémentaire puisque seule la portée « tout le
  monde » est risquée) ; confirmation seulement pour « cœur à tout le monde » (retenue).
- **Qui a tranché** : le Stratège, après challenge, sur la base des trois options déjà
  fixées par le fondateur en carte 18 (rien de nouveau tranché ici sur le fond produit).
- **Réversible** : oui, aucun code d'interface écrit dans cette carte.
- **Ce qui ferait revenir dessus** : si l'usage réel du pilote montre que la confirmation
  à deux temps est ignorée ou contournée par les utilisateurs (mesurable seulement après
  recette du Lot 7, pas avant).
- **Veto possible jusqu'à** : 2026-09-16T08:00:00+00:00.

## metadata
```json
{
  "type": "design",
  "ecrans": ["accueil", "zone-envoi-coeurs", "signal-pays", "fond-ecran"],
  "confirmation_deux_temps": "coeur_a_tout_le_monde uniquement",
  "carte_suivante_proposee": "20 (spécification Lot 7)"
}
```
