---
carte: 18
nom: Lot 7 — Cadrage des cœurs sociaux (envoi, flux d'activité, classement pays)
agent: fondateur
skills: [cadrage, methode-musk, challenge]
parents: [01, 02, 03, 14]
statut: approuvee
livrable: docs/cartes/18-lot7-cadrage-coeurs-sociaux.md (ce document), docs/programme.md mis à jour
porte: "toute levée de R7 ou du détail signature (carte 02) est nommée explicitement, pas glissée dans un écran"
risque: L0
approuvee_le: 2026-09-15T07:13:00+00:00
veto_jusqu_au: 2026-09-16T07:13:00+00:00
---

## Entrées reçues

Proposition du fondateur, verbatim (résumée par sections) :

- **Écran d'accueil** : message de bienvenue à l'ouverture ; les cœurs reçus par
  l'utilisateur apparaissent immédiatement ; les trois roues d'activité avec un bouton de
  validation à côté.
- **Zone d'interaction (bas de l'écran)**, deux parties : le haut pour déclarer une
  activité ; le bas dédié à l'envoi de cœurs — activités des autres membres affichées
  pour inciter à en envoyer, profils anonymisés avec un indicateur visuel d'intensité
  d'effort (« gros cœur rouge plein, petit cœur »), et trois options d'envoi : cœur
  simple, gros cœur de félicitations, cœur à tout le monde.
- **Navigation inférieure** : classement hiérarchique du cumul de cœurs par équipe,
  entreprise et pays.
- **Fond d'écran** : représentation de tous les cœurs reçus par l'utilisateur, qualitative
  et fondée sur l'intensité plutôt que quantitative, pour rester valorisante à 1 cœur
  comme à 1000.

Trois questions posées en retour, réponses du fondateur :

1. **Process** — « Écrire une carte d'abord » (plutôt que coder directement).
2. **Classement et R7** — la carte 01 (challenge #2) et la carte 03 (règle R7) ont
   explicitement décidé que le nombre de cœurs n'est jamais un cumul public ni classé.
   Réponse du fondateur : *« Pas de classement équipe, pas de classement au niveau
   entreprise. Uniquement un classement au troisième niveau, donc peut-être régional ou
   peut-être pays, mais pas avant. »* — R7 est donc partiellement levée, au niveau le
   plus agrégé seulement, pas aux niveaux équipe/entreprise.
3. **Échelle des données** — le pilote est 12 personnes, un bureau, sans notion
   d'équipe/entreprise/pays aujourd'hui. Réponse du fondateur : *« Pensé
   multi-entreprises »* — le modèle de données doit porter la hiérarchie
   équipe → entreprise → pays/région dès maintenant, même si le pilote n'en peuple qu'un
   niveau chacun.

## Résumé de fin de carte

- **Action proposée** : acter le cadrage du Lot 7 (cœurs sociaux) comme prochain
  chantier après le pilote actuel, en levant R7 de façon ciblée et documentée plutôt que
  silencieuse, et en cadrant le modèle de données multi-entreprises avant d'écrire une
  spécification détaillée (carte suivante).
- **Ce qui change** :
  - **R7 amendée** (proposition, à confirmer en décision) : *« Le nombre de cœurs n'est
    jamais affiché en cumul ni classé au niveau équipe ou entreprise. Un signal agrégé au
    niveau pays/région est autorisé, à condition de rester qualitatif (comparaison
    relative, pas un compteur exact affiché) — cohérent avec le fond d'écran individuel,
    lui aussi qualitatif par choix explicite du fondateur. »* Le détail signature de la
    carte 02 (« les chiffres n'existent pas ») s'applique donc encore au niveau
    pays/région : pas de nombre affiché, une intensité relative seulement (ex. classement
    par position ou par niveau visuel, jamais « 4 231 cœurs »).
  - **Modèle de données** (direction, pas encore une architecture détaillée) : `personne`
    gagne `equipe_id` ; nouvelle table `equipe` (`entreprise_id`) ; nouvelle table
    `entreprise` (`pays`). Le pilote peuple une seule ligne à chaque niveau. Aucune
    fonctionnalité multi-tenant (facturation, admin par entreprise) n'est demandée ici —
    seulement la forme des données, pour ne pas migrer un schéma plat plus tard.
  - **Nouveau parcours P9 — Envoyer un cœur** (à spécifier en détail dans la carte
    suivante) : voir les activités récentes d'autrui (dans son équipe, périmètre à
    trancher), envoyer un cœur simple, un « gros cœur », ou à tout le monde d'un coup.
  - **Écran d'accueil et navigation** : refonte en un seul écran scindé (déclarer /
    envoyer des cœurs) plus une navigation vers un classement pays/région — à spécifier
    en détail, pas dans cette carte.
- **Sources** : message direct du fondateur (cette conversation) + réponses aux trois
  questions de clarification.
- **Ce qui manque** (transmis à la carte de spécification suivante, pas tranché ici) :
  1. **Mécanique exacte du signal pays/région** : position dans un classement sans
     nombre, bande d'intensité (« très actif / actif / calme »), ou autre forme
     qualitative — à choisir avant d'écrire un critère testable.
  2. **Anonymisation du flux d'activité** : aujourd'hui P4 montre déjà le prénom au
     groupe entier (douze personnes). Le flux « activités des autres » reste-t-il au
     même prénom + périmètre (l'équipe), ou devient-il réellement anonyme (aucun nom) au
     sens où le fondateur l'a écrit ? Les deux répondent à des besoins différents
     (reconnaissance nominative vs. incitation sans exposition).
  3. **Anti-abus de « cœur à tout le monde »** : sans limite, un envoi de masse peut
     vider le geste de son sens (spam plutôt que reconnaissance). Une limite (ex. une
     fois par jour) est probable mais pas décidée.
  4. **Rétention du fond d'écran** : « tous les cœurs reçus, sans limite de temps »
     entre en tension avec R9 (purge à la fin du pilote + 30 jours) — à documenter,
     pas un obstacle, juste une conséquence à écrire dans la spec (le fond se vide à la
     purge, comme le reste).
- **Risque** : L0, cette carte ne touche aucun code ; c'est un cadrage.
- **Conséquences** : réversible tant qu'aucune ligne de code n'est écrite. Le coût réel
  arrive à la carte de spécification puis d'architecture (Lot 7), pas ici.
- **À trancher** : les quatre points « ce qui manque » ci-dessus, dans la carte de
  spécification à venir (carte 19, proposée).
- **Coût du run** : lecture des cartes 01/02/03/14, `docs/spec.md`, `docs/programme.md`,
  échange de cadrage ; aucun code produit.

## Challenge

**1 · Sérieuse · Le signal pays/région, même qualitatif, réintroduit une comparaison
entre groupes que rien dans le produit actuel ne sait présenter sans chiffre.** Toute
l'app existante encode l'intensité par des étoiles individuelles (R5, seuils fixes par
personne) ; il n'existe aucune règle de conversion d'un agrégat de plusieurs personnes en
une seule intensité qualitative. Sans cette règle, l'implémentation la plus rapide est un
tri par somme ou moyenne des cœurs — un chiffre caché dans le tri, donc une violation de
R7 en pratique même si rien n'est affiché.
Alternative : définir la règle de conversion dans la carte de spécification (ex. médiane
des étoiles individuelles du pays cette semaine, jamais une somme de cœurs) avant
d'écrire le moindre critère d'acceptation, pour que le calcul respecte l'esprit de la
carte 02 et pas seulement son affichage.
Ce qui tranche : la carte 19 doit contenir cette règle explicitement, avec un exemple
chiffré vérifié à la main, avant tout code.

**2 · Sérieuse · « Multi-entreprises dès maintenant » est une échelle de produit, pas
seulement un schéma de données.** Trois tables (`equipe`, `entreprise`, `pays`) sans
authentification, sans notion d'administrateur par entreprise, et sans cloisonnement
d'accès (aujourd'hui : un jeton = une personne = un accès total à son propre lien) ne
suffisent pas à isoler réellement deux entreprises l'une de l'autre si le pilote reste sur
la même base Supabase partagée (ADR-0005). Construire les tables sans ce cloisonnement
donne une fausse impression d'être prêt pour plusieurs entreprises.
Alternative : documenter explicitement, dans la carte d'architecture qui suivra, que le
Lot 7 pose la *forme* des données (trois niveaux) pour un pilote élargi à une seule
entreprise, et que l'isolement réel entre plusieurs entreprises (accès, RLS Supabase) est
un chantier distinct, pas livré ici.
Ce qui tranche : rien à trancher dans cette carte ; à écrire noir sur blanc dans la carte
d'architecture pour qu'un futur lecteur ne croie pas le cloisonnement déjà fait.

**3 · Mineure · Le flux « activités des autres pour inciter à envoyer des cœurs »
élargit qui voit quoi, sans que le texte de consentement (P1) en parle.** Le consentement
actuel décrit ce qui est stocké, pas un nouveau flux social visible par les collègues.
Alternative : une nouvelle version du texte de consentement, avec un nouveau
`consentement_version` si le produit doit re-demander l'accord aux personnes déjà
inscrites au moment du Lot 7.
Ce qui tranche : rien à trancher ici ; item de spécification pour la carte 19 (P1 révisé).

**Verdict : à revoir sur un point technique (1), le reste transmis à la carte suivante
sans blocage.**

## Réponses de l'auteur

1. **Accepte.** La règle de conversion agrégat → signal qualitatif pays/région (ex.
   médiane des étoiles du pays sur la semaine, jamais une somme de cœurs) sera écrite et
   vérifiée à la main dans la carte 19, avant tout critère d'acceptation touchant ce
   signal.
2. **Accepte.** La carte d'architecture qui suivra le Lot 7 documentera explicitement que
   la forme des données (équipe/entreprise/pays) n'implique pas un cloisonnement d'accès
   réel entre entreprises ; ce cloisonnement reste un chantier séparé, non couvert ici.
3. **Accepte.** P1 (consentement) sera révisé dans la carte 19 pour couvrir le nouveau
   flux social, avec la question ouverte de re-consentement pour les personnes déjà
   inscrites transmise au fondateur à ce moment-là.

## Journal de décision

- **Décision** : le Lot 7 (cœurs sociaux — envoi, flux d'activité, classement pays/région
  qualitatif, fond d'écran valorisant) est cadré et devient le prochain chantier après le
  pilote actuel. R7 est amendée pour autoriser un signal agrégé qualitatif au niveau
  pays/région uniquement (jamais équipe ni entreprise, jamais un nombre affiché). Le
  modèle de données porte la hiérarchie équipe → entreprise → pays dès la prochaine
  carte d'architecture, sans que cela implique un cloisonnement d'accès multi-entreprises
  réel (chantier distinct).
- **Options considérées** :
  (a) garder R7 intacte, aucun classement, seulement le fond d'écran individuel qualitatif
  (écartée : ne répond pas à la demande explicite du fondateur d'un signal au niveau
  pays) ;
  (b) classement à trois niveaux (équipe/entreprise/pays), tel que proposé initialement
  (écartée par le fondateur lui-même : « pas de classement équipe, pas de classement au
  niveau entreprise ») ;
  (c) signal qualitatif au seul niveau pays/région, calculé sans jamais exposer ni trier
  sur un nombre agrégé de cœurs (retenue).
  Pour l'échelle des données : (a) schéma plat, un seul niveau, ajusté plus tard
  (écartée par le fondateur : « pensé multi-entreprises ») ; (b) trois niveaux dès
  maintenant, sans cloisonnement d'accès réel, documenté comme tel (retenue).
- **Qui a tranché** : le fondateur, en direct dans cette conversation, sur les trois
  questions de cadrage ; la règle de conversion qualitative (réponse au challenge 1) et
  la limite du cloisonnement (réponse au challenge 2) restent à valider par le fondateur
  à la carte 19, ce ne sont pas encore des décisions actées.
- **Réversible** : oui, aucune ligne de code n'est encore écrite.
- **Ce qui ferait revenir dessus** : si la règle de conversion qualitative écrite en
  carte 19 s'avère, à l'usage, indiscernable d'un classement chiffré (ex. l'ordre est
  toujours le même que celui d'un tri par somme de cœurs) — auquel cas R7 resterait
  violée en pratique malgré l'intention.
- **Veto possible jusqu'à** : 2026-09-16T07:13:00+00:00. Le fondateur a demandé de
  passer directement à la méthode loop validée pour ce projet plutôt que de rester en
  échange manuel ; les deux points du Challenge encore ouverts (règle de conversion
  qualitative, limite du cloisonnement) ne bloquent pas cette approbation — ils sont
  des livrables obligatoires de la carte 19, pas des conditions de la carte 18 elle-même
  (même schéma que le spike Telegram de la carte 05, déjà accepté sans bloquer).

## metadata
```json
{
  "type": "cadrage",
  "lot_propose": "Lot 7 — Cœurs sociaux",
  "r7_amendee": true,
  "niveaux_classement_autorises": ["pays_region"],
  "niveaux_classement_exclus": ["equipe", "entreprise"],
  "carte_suivante_proposee": "19 (spécification Lot 7)",
  "decideur": "fondateur"
}
```
