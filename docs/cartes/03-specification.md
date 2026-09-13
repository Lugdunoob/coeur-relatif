---
carte: 03
nom: Spécification
agent: produit
skills: [specification, criteres-acceptation]
parents: [02]
statut: approuvee
livrable: docs/spec.md
porte: "chaque exigence gardée a un CA-NN testable"
risque: L0
approuvee_le: 2026-09-13T21:02:12+00:00
veto_jusqu_au: 2026-09-14T21:02:12+00:00
---

## Entrées reçues

`docs/exigences.md` et ses metadata (carte 02, approuvée). Rien ne manquait.

## Résumé de fin de carte

- **Action proposée** : approuver la spécification ; l'architecture peut être décidée
  (programme B, après la fenêtre de veto de cette carte).
- **Pour qui** : les mêmes 12 collègues, même pilote.
- **Ce qui change** : les exigences gardées de la carte 02 sont maintenant huit parcours,
  dix règles et dix-sept critères numérotés.
- **Sources** : `docs/exigences.md`.
- **Ce qui manque** : le texte de consentement (carte Pilote), la confirmation Telegram
  vs Slack.
- **Risque** : L0.
- **À trancher** : aucune décision réservée sur cette carte.
- **Coût du run** : rédaction, premier document sans golden run de comparaison.

## Challenge

**1 · Sérieuse · La référence glissante sur six séances mélange calibration et régime de
croisière sans que ce soit testé.** Si quelqu'un accélère son rythme en semaine 3, la
référence inclut encore des séances de calibration de la semaine 1 : la spec ne dit pas
si c'est voulu.
Alternative : documenter explicitement (fait, dans CA-05 révisé) que la référence est
glissante sans distinction de semaine, ce qui est le choix déjà tranché en carte 02 — la
faiblesse est que ce n'était pas assez explicite dans les critères, pas dans la règle.
Ce qui tranche : rien à re-trancher, un critère à préciser.

**2 · Sérieuse · Le message du vendredi ne dit pas comment sont comptés les cœurs et
séances si personne n'a rien déclaré cette semaine-là.** Une semaine à zéro doit
produire un message ou être silencieuse ; la spec ne le dit pas, et un silence total
pourrait être lu comme un bug du bot plutôt qu'un vrai zéro.
Alternative : ajouter un critère explicite pour le cas zéro (le bot envoie quand même
le message, avec « 0 séance, 0 cœur »).
Ce qui tranche : rien à trancher au fondateur, c'est un trou de spécification.

**3 · Mineure · Le texte exact du consentement n'est pas dans cette carte.** C'est
correctement renvoyé à la carte Pilote, mais un lecteur de la spec seule pourrait croire
que P1 est complet.
Alternative : la section « Ce qui n'est pas ici » suffit ; aucune alternative nécessaire.
Ce qui tranche : rien, déjà couvert.

**Verdict : à revoir sur deux critères, mineurs à corriger.** Aucune contestation
bloquante ; les deux points sérieux sont des précisions de critères, pas des désaccords
sur les règles déjà approuvées en carte 02.

## Réponses de l'auteur

1. **Accepte.** CA-05 précisé : « recalculée à chaque nouvelle déclaration, sans
   distinction de semaine civile » (déjà dans R3, maintenant répété explicitement dans
   le tableau des critères pour qu'un test ne puisse pas l'ignorer).
2. **Accepte.** Ajout du critère CA-11 bis ci-dessous.
3. **Accepte, sans modification** : la section « Ce qui n'est pas ici » est jugée suffisante.

**Critère ajouté suite au challenge :**

| ID | Critère | Parcours | Règle |
|---|---|---|---|
| CA-11bis | Si aucune séance n'est déclarée dans la semaine, le message du vendredi est quand même envoyé, avec « 0 séance, 0 cœur ». | P6 | R8 |

## Journal de décision

- **Décision** : spécification approuvée avec un critère ajouté (CA-11bis) suite au
  challenge ; aucune règle de la carte 02 n'est remise en cause.
- **Options considérées** : (a) approuver telle quelle ; (b) approuver avec le critère
  du cas zéro ajouté (retenue) ; (c) renvoyer la carte pour réécriture complète, écartée
  car les deux points sérieux étaient des précisions, non des désaccords.
- **Qui a tranché** : Stratège — aucune contestation bloquante, aucune décision réservée.
- **Réversible** : oui, un critère de plus ne coûte rien à retirer.
- **Ce qui ferait revenir dessus** : si l'architecte (carte 05) trouve un critère
  impossible à tester tel quel.
- **Veto possible jusqu'à** : 2026-09-14T21:02:12+00:00.

## metadata
```json
{
  "parcours": ["P1 consentement", "P2 déclaration", "P3 note en étoiles", "P4 publication groupe", "P5 cœurs", "P6 signal du vendredi", "P7 rappel du lundi", "P8 mes données"],
  "criteres": [
    {"id": "CA-01", "texte": "aucune déclaration enregistrée avant consentement", "parcours": "P1", "regle": "R1"},
    {"id": "CA-02", "texte": "relance de consentement au plus une fois par 7 jours", "parcours": "P1", "regle": "R1"},
    {"id": "CA-03", "texte": "validation des champs de déclaration", "parcours": "P2", "regle": null},
    {"id": "CA-04", "texte": "silence des deux premières séances", "parcours": "P3", "regle": "R4"},
    {"id": "CA-05", "texte": "référence = médiane glissante des six dernières séances, sans distinction de semaine", "parcours": "P3", "regle": "R3"},
    {"id": "CA-06", "texte": "message public sans aucun chiffre de performance", "parcours": "P4", "regle": "R2"},
    {"id": "CA-07", "texte": "seuils d'étoiles exacts", "parcours": "P3", "regle": "R5"},
    {"id": "CA-08", "texte": "plafond à quatre étoiles après deux efforts 10 consécutifs", "parcours": "P3", "regle": "R6"},
    {"id": "CA-09", "texte": "cœur compté en privé, jamais public", "parcours": "P5", "regle": "R7"},
    {"id": "CA-10", "texte": "cœurs donnés communiqués en privé, jamais comparés", "parcours": "P5", "regle": "R7"},
    {"id": "CA-11", "texte": "message du vendredi sans prénom", "parcours": "P6", "regle": "R8"},
    {"id": "CA-11bis", "texte": "message du vendredi envoyé même à zéro séance", "parcours": "P6", "regle": "R8"},
    {"id": "CA-12", "texte": "aucun message ne signale une absence nominative", "parcours": "P6", "regle": "R8"},
    {"id": "CA-13", "texte": "message du lundi fixe, sans donnée personnelle", "parcours": "P7", "regle": null},
    {"id": "CA-14", "texte": "/mesdonnees limité à la personne qui invoque", "parcours": "P8", "regle": "R2"},
    {"id": "CA-15", "texte": "/supprimer efface et confirme", "parcours": "P8", "regle": "R9"},
    {"id": "CA-16", "texte": "suppression automatique fin de pilote + 30 jours", "parcours": "P8", "regle": "R9"},
    {"id": "CA-17", "texte": "aucun champ de santé au sens strict dans le modèle de données", "parcours": null, "regle": "R10"}
  ],
  "donnees_sensibles": ["effort ressenti", "minutes d'activité"],
  "hors_perimetre": ["application mobile", "connexion montre/Strava", "classement d'équipe", "défis hebdomadaires", "badges", "tableau de bord organisateur", "comptes au-delà de Telegram", "historique au-delà de la semaine en cours", "message nominatif d'absence"]
}
```
