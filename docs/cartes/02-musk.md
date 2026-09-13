---
carte: 02
nom: Méthode Musk
agent: musk
skills: [methode-musk]
parents: [01]
statut: approuvee
livrable: docs/exigences.md
porte: "chaque suppression cite le besoin couvert ; un seul détail signature"
risque: L0
approuvee_le: 2026-09-13T21:00:50+00:00
veto_jusqu_au: 2026-09-14T21:00:50+00:00
---

## Entrées reçues

`docs/cadrage.md` et ses metadata (besoins protégés, hypothèses), et les deux points
transmis par la carte 01 (rappel léger, cœurs jamais en cumul public). Rien ne manquait.

## Résumé de fin de carte

- **Action proposée** : approuver ces exigences ; la carte Spécification devient prête.
- **Ce qui change** : le produit n'est plus une app mais un bot de groupe ; les montres
  sortent du périmètre du pilote.
- **Sources** : celles de la carte 01 ; la référence session-RPE reste à sourcer avant la spec.
- **Ce qui manque** : confirmation que le groupe Telegram du bureau existe, ou Slack ;
  sinon le bot le crée.
- **Risque** : L0.
- **À trancher** : Telegram ou Slack pour le groupe (version prudente : Telegram, déjà
  utilisé par le fondateur pour la Régie).
- **Coût du run** : reprise d'une décision déjà approuvée ; rédaction de cette carte, quelques k tokens.

## Challenge

*Reprend le challenge du Contradicteur du run de référence (`golden/carte-2-challenge.md`),
déjà résolu et approuvé par le fondateur le 2026-09-11.*

**1 · Sérieuse · La référence personnelle par médiane de la semaine 1 récompense celui qui
commence mollement.** Quelqu'un qui déclare deux séances faciles en semaine 1 aura cinq
étoiles sur une séance normale en semaine 2 ; le sportif qui commence fort n'en aura
jamais plus de trois. L'équité perçue, besoin protégé, est menacée dans l'autre sens.
Alternative : référence = médiane glissante sur les six dernières séances, sans
distinction de semaine, première étoile dès la troisième séance.
Ce qui tranche : rejouer les deux formules sur les données des deux premières semaines
du pilote ; regarder qui a cinq étoiles et si c'est mérité aux yeux du groupe.

**2 · Sérieuse · L'effort ressenti est déclaratif ; rien ne contient la triche (H3).**
Pré-mortem le plus probable : un collègue met « effort 10 » à tout, reçoit cinq étoiles
à chaque fois, les autres décrochent.
Alternative : plafonner à quatre étoiles toute séance dont l'effort déclaré est 10 deux
fois de suite ; le cœur du groupe reste le vrai jugement.
Ce qui tranche : la question anonyme de fin de pilote, plus une lecture des déclarations
à effort 9-10 par personne.

**3 · Mineure · Le bot de groupe expose les prénoms et le fait de bouger ou non ;
« zéro surveillance » vaut pour le manager, pas pour les collègues.** Celui qui ne
déclare rien pendant deux semaines est visible par son absence.
Alternative : le bot ne poste que les séances, jamais les absences, aucun récapitulatif
nominatif ; l'unique message hebdomadaire est collectif.
Ce qui tranche : critère d'acceptation négatif dans la spec.

**Verdict : à revoir sur la référence, puis approuvé.** La direction bot-sans-chiffres
tient ; la formule de calibration était l'hypothèse la plus faible.

## Réponses de l'auteur

1. **Accepte.** Formule changée : médiane glissante des six dernières séances, première
   étoile à la troisième séance, calibration silencieuse abandonnée sur ce point précis
   (mais gardée pour les trois toutes premières séances, faute d'historique).
2. **Remonte au fondateur**, avec les deux options (rien / plafond). Décidé ci-dessous.
3. **Accepte.** Ajouté au hors périmètre : aucun message nominatif d'absence, aucun
   récapitulatif nominatif.

## Journal de décision

- **Décision 1** : référence personnelle = médiane glissante des six dernières séances,
  première étoile à la troisième séance.
  **Options** : médiane de la semaine 1 (carte initiale) ; médiane glissante sur six
  (Contradicteur, retenue).
  **Qui a tranché** : Stratège — sert l'équité perçue (besoin protégé) et supprime la
  semaine muette. **Réversible** en une ligne de configuration. Reviendrait dessus si le
  pilote montre des étoiles jugées imméritées par le groupe.
- **Décision 2** : plafond à quatre étoiles après deux déclarations consécutives à effort
  10 ; règle invisible, le cœur du groupe reste le vrai jugement.
  **Options** : rien, confiance seule ; plafond (Contradicteur, retenue) ; validation par
  un pair, écartée car elle réintroduit du jugement sur la performance.
  **Qui a tranché** : réservé, remonté par l'auteur — le fondateur a tranché le plafond
  le 2026-09-11 (`golden/carte-2-musk.md`), parce qu'il est réversible et invisible.
  Reviendrait dessus si la question anonyme de fin de pilote ne montre aucune triche perçue.
- **Décision 3** : aucun message nominatif d'absence, aucun récapitulatif nominatif,
  ajouté au hors périmètre. **Qui a tranché** : auteur, accepté sans remontée.
- **Réservé au fondateur sur cette exécution** : rien de nouveau ; la décision 2 reprend
  un arbitrage déjà rendu.
- **Veto possible jusqu'à** : 2026-09-14T21:00:50+00:00.

## metadata
```json

{
  "besoins_proteges": ["reconnaissance de l'effort réel", "revenir chaque semaine", "être vu sans être exposé", "équité perçue", "zéro surveillance"],
  "detail_signature": { "quoi": "Les chiffres n'existent pas : ni distance, ni allure, ni FC, pour personne, même pas pour soi. Étoiles et cœur seulement.", "pourquoi": "Motion neutralise la comparaison mais garde les chiffres ; Apple les garde ailleurs ; personne ne les a supprimés." },
  "faits_premiers_principes": [
    { "fait": "les API de montre sont fermées à un pilote", "source": "medianama.com 2024-11 ; developer.garmin.com ; support.coros.com ; sahha.ai" },
    { "fait": "charge = minutes × effort ressenti est une mesure validée (session-RPE)", "source": "à sourcer" },
    { "fait": "le progrès par rapport à soi motive plus que le rang", "source": "PMC5854141 ; Rawsthorne & Elliot 1999" }
  ],
  "exigences_gardees": [
    { "exigence": "note en étoiles relative à sa propre référence", "besoin": "reconnaissance de l'effort réel" },
    { "exigence": "cœur des collègues sur la note, donné et reçu, compté en privé, jamais classé", "besoin": "encouragement par les pairs" },
    { "exigence": "signal collectif hebdomadaire sans prénom (séances, cœurs de l'équipe)", "besoin": "appartenance, avancer à plusieurs" },
    { "exigence": "déclaration privée activité + minutes + effort", "besoin": "reconnaissance de l'effort réel" },
    { "exigence": "un rappel le lundi", "besoin": "revenir chaque semaine" },
    { "exigence": "consentement, export, suppression", "besoin": "obligation" },
    { "exigence": "toute activité compte", "besoin": "équité perçue" }
  ],
  "exigences_supprimees": [
    { "exigence": "app mobile", "raison": "aucun besoin ne l'exige", "besoin_couvert_par": "bot de groupe" },
    { "exigence": "montre / Strava / FC", "raison": "accès fermé, données art. 9", "besoin_couvert_par": "déclaration privée" },
    { "exigence": "classement", "raison": "contredit le besoin", "besoin_couvert_par": "—" },
    { "exigence": "défis, badges, séries", "raison": "rétention artificielle", "besoin_couvert_par": "cœur + rappel" },
    { "exigence": "tableau de bord organisateur", "raison": "surveillance", "besoin_couvert_par": "—" },
    { "exigence": "comptes, historique", "raison": "Telegram identifie ; l'historique réintroduit des chiffres", "besoin_couvert_par": "bot, étoiles de la semaine sur demande" }
  ],
  "exigences_simplifiees": [
    { "avant": "capacité mesurée par la montre", "apres": "référence = médiane des charges de la semaine 1, mise à jour sur 4 séances" },
    { "avant": "multi-sport avec catalogue", "apres": "activité nommée librement" }
  ],
  "cycle": { "boucle": "déclaration → étoiles → cœur", "duree": "une heure ; pilote 4 semaines" },
  "automatiser_apres_pilote": ["lecture Apple Santé / Health Connect", "import de séances", "rappels personnalisés", "plusieurs groupes"],
  "perimetre_mvp": "Un bot de groupe qui transforme une déclaration privée « 30 min, effort 7 » en une note en étoiles relative à ta propre semaine type, visible du groupe sans aucun chiffre, sur laquelle les collègues posent un cœur, et qui rend chaque vendredi ce que l'équipe a fait ensemble."
}

```
