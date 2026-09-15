---
carte: 20
nom: Lot 7 — Spécification (cœurs sociaux)
agent: produit
skills: [specification, challenge]
parents: [18, 19]
statut: approuvee
livrable: docs/cartes/20-lot7-specification.md (ce document), docs/spec.md mis à jour (P9, révision P1, R7 amendée, R11-R13, CA-18 à CA-26)
porte: "toute levée de R7 au-delà du signal qualitatif pays/région, tout classement équipe ou entreprise, est bloquant"
risque: L1
approuvee_le: 2026-09-15T08:30:00+00:00
veto_jusqu_au: 2026-09-16T08:30:00+00:00
---

## Entrées reçues

Cartes 18 (cadrage, approuvée) et 19 (design des écrans, approuvée). Deux points
explicitement laissés ouverts par la carte 18, à trancher ici, obligatoires :
1. La règle de conversion d'un agrégat de plusieurs personnes en un signal qualitatif
   pays/région (jamais une somme ni un nombre affiché).
2. Le texte de révision de P1 (consentement) pour le nouveau flux social.
Ainsi que les points « ce qui manque » : anonymisation du flux (tranchée en carte 19,
zone d'envoi), anti-abus de « cœur à tout le monde », conséquence R9 sur le fond d'écran.

## Règle de conversion qualitative pays/région (obligatoire, challenge 1 de la carte 18)

**Énoncé.** Pour chaque personne ayant au moins une étoile cette semaine (R4/R5 : la
calibration ne produit pas d'étoile, ces séances sont ignorées ici), on calcule son
**niveau hebdomadaire** = la médiane de ses scores en étoiles de la semaine en cours
(entre 1 et 5). Le **niveau du pays** = la médiane des niveaux hebdomadaires de toutes
les personnes du pays ayant au moins une étoile cette semaine — **jamais une somme,
jamais une moyenne pondérée par le nombre de personnes**. Ce niveau (un nombre réel
intermédiaire, jamais exposé) est converti en une **bande qualitative à trois paliers**,
seule valeur montrée :
- niveau < 2,5 → **calme**
- 2,5 ⩽ niveau < 3,5 → **actif**
- niveau ⩾ 3,5 → **très actif**

(Bornes centrées sur ★★★ = 3, le palier neutre déjà défini par R5 pour une personne :
même esprit de seuils, pas de nouvelle échelle inventée.)

Le classement autorisé par le fondateur (carte 18, réponse 2) se fait **par bande**, pas
par position individuelle : les pays d'une même bande sont interchangeables à
l'affichage, sans ordre interne dérivé du niveau caché (sinon un tri stable reproduirait
en pratique un classement chiffré déguisé — exactement le risque identifié par le
challenge de la carte 18).

**Exemple chiffré, vérifié à la main.**

| Pays | Personnes actives cette semaine (niveau hebdo = médiane de leurs étoiles) | Médiane du pays | Bande |
|---|---|---|---|
| A | 4, 5, 2 | trié [2,4,5], milieu = **4** | très actif (4 ≥ 3,5) |
| B | 3, 3, 3, 2, 3 | trié [2,3,3,3,3], milieu = **3** | actif (2,5 ⩽ 3 < 3,5) |
| C | 5 (une seule personne) | **5** | très actif (5 ≥ 3,5) |

Vérification à la main : Pays A, trois valeurs, la médiane est la valeur centrale d'une
liste triée de longueur impaire → 4. Pays B, cinq valeurs, médiane = valeur centrale
(3ᵉ position) → 3. Pays C, une seule valeur, la médiane est cette valeur → 5.

**Ce que l'exemple prouve** : les pays A (3 personnes) et C (1 personne) obtiennent la
même bande « très actif », alors que leurs effectifs sont très différents — cohérent
avec l'exigence du fondateur (carte 18) qu'un signal reste « valorisant à 1 cœur comme à
1000 », ici appliqué au niveau pays et pas seulement au fond d'écran individuel.

**Contre-exemple qui justifie de rejeter une somme (ou une moyenne pondérée par
effectif)** : la somme des niveaux donnerait Pays A = 11, Pays B = 14, Pays C = 5 — un
tri par somme classerait B avant A avant C, un ordre **différent** de celui produit par
la médiane par bande (A et C ex æquo devant B). Un tel tri par somme avantage
mécaniquement les pays les plus peuplés, réintroduit une comparaison quantitative
déguisée derrière un simple tri, et viole R7 en pratique même si aucun nombre n'est
affiché à l'écran — exactement le risque décrit par le challenge de la carte 18. La
médiane, elle, ne dépend pas de l'effectif : c'est pourquoi elle est retenue (R13).

## Résumé de fin de carte

**Nouveau parcours P9 — Envoyer un cœur.**
Dans la zone d'envoi de cœurs (carte 19), la personne voit des cartes d'activités
anonymisées d'autres membres de son équipe : aucun prénom, aucun nom d'activité, un
indicateur d'intensité à deux paliers (petit cœur / gros cœur) dérivé de l'étoile déjà
calculée (R12). Trois options :
1. **Cœur simple**, sur une carte précise.
2. **Gros cœur** (félicitations), sur une carte précise — poids visuel plus fort côté
   destinataire uniquement, aucun changement de comptage (R7 s'applique identiquement).
3. **Cœur à tout le monde** : crédite un cœur, individuellement, à chaque personne ayant
   une activité active dans le flux du moment ; au plus une fois par 24h par expéditeur
   (R11), avec confirmation à deux temps côté interface (carte 19).
Le destinataire reçoit la notification privée existante (P5), inchangée.

**Révision de P1 — Premier contact et consentement.**
`consentement_version` passe à 2. Le texte ajoute une clause : les séances de la
personne peuvent apparaître, anonymisées (R12), dans la zone d'envoi de cœurs vue par
les collègues. Les personnes déjà inscrites doivent redonner « J'accepte » au texte
version 2 avant que leurs séances n'apparaissent dans ce flux et avant de pouvoir
envoyer un cœur elles-mêmes (CA-24) ; tant qu'elles n'ont pas réaccepté, P2-P4 et P5-P8
restent inchangés pour elles (aucune régression sur l'existant).

**R7 amendée** (texte final, remplace le texte proposé en carte 18) :
« Le nombre de cœurs ou d'étoiles, reçus ou donnés, n'est jamais affiché en cumul ni
classé au niveau équipe ou entreprise. Un signal agrégé est autorisé au seul niveau
pays/région : une bande qualitative à trois paliers (R13), jamais un nombre, une somme,
une moyenne ou une position individuelle de pays. Le détail signature de la carte 02
(« les chiffres n'existent pas ») s'applique encore à ce niveau : seule la bande existe,
jamais le niveau qui la produit. »

**Nouvelles règles** :
- **R11** (anti-abus) : une personne ne peut envoyer un « cœur à tout le monde » plus
  d'une fois par période de 24 heures ; toute tentative supplémentaire est refusée sans
  qu'aucun cœur ne soit enregistré.
- **R12** (anonymisation du flux) : une carte d'activité de la zone d'envoi ne montre ni
  prénom ni nom d'activité, seulement un indicateur d'intensité à deux paliers dérivé de
  l'étoile de la séance (R5), jamais le chiffre d'étoiles ni aucune autre donnée.
- **R13** (conversion qualitative pays/région) : règle de conversion ci-dessus.

**Conséquence R9 sur le fond d'écran** (carte 18, point « ce qui manque » #4) : le fond
d'écran qualitatif n'est pas un stockage séparé, c'est une lecture des cœurs déjà reçus
par la personne (table `coeur`, `docs/data-model.md`) ; il suit donc exactement la même
purge que le reste (`/supprimer`, fin-pilote + 30 jours, R9) sans mécanisme
supplémentaire — rien à construire de neuf pour cette conséquence, seulement à vérifier
qu'aucune nouvelle table ne contourne la purge existante (CA-25).

**Nouveaux critères d'acceptation** : CA-18 à CA-26, ajoutés au tableau de
`docs/spec.md` (voir ce fichier pour le tableau final, colonnes Parcours/Règle
identiques au format existant).

**Sources** : cartes 18, 19 ; `docs/spec.md` existant (R2, R4, R5, R7 originales) ;
`docs/exigences.md` (détail signature, carte 02).

**Ce qui manque** : rien de plus n'est transmis à la carte suivante sur le fond produit ;
la carte 21 (architecture) doit encore documenter la limite du cloisonnement
multi-entreprises (challenge 2 de la carte 18), hors périmètre produit de cette carte.

**Risque** : L1 — modifie une règle existante (R7) et le texte de consentement déjà en
production pour douze personnes réelles ; réversible (aucune donnée supprimée), mais
demande une action des utilisateurs déjà inscrits (redonner leur accord).

**Coût du run** : lecture cartes 18/19, `docs/spec.md`, `docs/exigences.md` ; rédaction
de la règle R13 et vérification manuelle de l'exemple chiffré ; aucun code de production.

## Challenge

**1 · Sérieuse · La règle R13 (médiane des médianes) suppose qu'« au moins une étoile
cette semaine » est un ensemble non vide par pays — que se passe-t-il pour un pays sans
aucune étoile cette semaine ?** Sans réponse, l'implémentation la plus rapide renverrait
soit une erreur, soit une bande par défaut arbitraire (ex. « calme » par défaut), ce qui
fausserait discrètement le signal (un pays sans activité déclarée n'est pas forcément
« calme », il est simplement sans donnée).
Alternative : un pays sans aucune étoile cette semaine n'a **pas de bande du tout**
(état « pas encore de signal cette semaine », déjà décrit en carte 19), plutôt qu'une
bande par défaut.
Ce qui tranche : retenu tel quel, ajouté à R13 ci-dessus implicitement (la fonction ne
produit une bande que pour les pays ayant au moins une personne avec une étoile cette
semaine) et rendu explicite dans le critère CA-18.

**2 · Sérieuse · Faut-il un « cœur à tout le monde » compté comme plusieurs `coeur`
individuels (un par destinataire) ou un enregistrement unique ?** Un enregistrement
unique casserait CA-09/CA-10 existants (comptage par séance, par personne) qui supposent
un cœur = un donneur = un receveur = une séance.
Alternative : un `coeur` individuel par destinataire, avec un champ `type` marquant
« tous » plutôt qu'un nouveau mécanisme de comptage.
Ce qui tranche : retenu — un cœur à tout le monde crédite N cœurs individuels (un par
destinataire actif), réutilisant `enregistrerCoeur` existant sans le modifier ; seule
l'action d'envoi est groupée, jamais le comptage (CA-22).

**3 · Mineure · Le re-consentement (CA-24) bloque-t-il aussi la réception de cœurs pour
une personne qui n'a pas encore réaccepté ?** Le texte proposé ne bloque que
l'apparition dans le flux des autres et l'envoi, pas la réception : une personne pourrait
recevoir un cœur sans avoir réaccepté, si un collègue la voyait encore via un autre
canal — mais comme elle est absente du flux tant qu'elle n'a pas réaccepté (côté
émission), ce cas ne peut pas se produire dans P9 tel que spécifié.
Ce qui tranche : rien à changer, la cohérence est déjà assurée par construction (une
personne absente du flux ne peut pas être ciblée).

**Verdict : accepté avec la précision « pas de bande sans donnée » ajoutée à R13/CA-18.**

## Réponses de l'auteur

1. **Accepte.** Précision ajoutée : aucune bande n'est produite pour un pays sans aucune
   étoile cette semaine (CA-18 le rend explicite).
2. **Accepte.** Un cœur à tout le monde = N cœurs individuels avec `type: 'tous'`.
3. **Accepte.** Rien à changer, déjà cohérent par construction.

## Journal de décision

- **Décision** : P9 spécifié, P1 révisé (consentement v2 avec re-consentement requis
  pour le flux social), R7 amendée au texte final ci-dessus, R11-R13 ajoutées, CA-18 à
  CA-26 ajoutés à `docs/spec.md`. La règle de conversion pays/région (R13) est la
  médiane des médianes d'étoiles hebdomadaires, jamais une somme, vérifiée à la main
  ci-dessus sur trois pays.
- **Options considérées pour le signal pays** : (a) somme des cœurs ou étoiles du pays
  (écartée : chiffre caché, avantage les pays peuplés, contre-exemple ci-dessus) ;
  (b) moyenne simple des étoiles individuelles, pas par personne mais par séance
  (écartée : une personne qui déclare plus de séances pèserait plus lourd qu'une autre,
  contraire à « valorisant à 1 comme à 1000 ») ; (c) médiane des niveaux hebdomadaires
  par personne, puis médiane par pays (retenue, exemple vérifié ci-dessus).
- **Qui a tranché** : le Stratège, après challenge du Contradicteur, sur le mandat de la
  carte 18 (les deux points ouverts devaient être tranchés ici, pas glissés).
- **Réversible** : oui pour le calcul (fonction pure, changeable sans migration) ; non
  trivialement réversible pour le re-consentement demandé aux douze personnes déjà
  inscrites (une fois redemandé, on ne « dé-redemande » pas), d'où le risque L1.
- **Ce qui ferait revenir dessus** : si le fondateur juge que redemander le consentement
  aux douze personnes déjà engagées dans le pilote actuel casse la dynamique en cours —
  auquel cas une variante « opt-in au fil de l'eau, pas de blocage immédiat » serait à
  redécider avant le lot de code correspondant (Lot 7.3, `docs/lots.md`).
- **Veto possible jusqu'à** : 2026-09-16T08:30:00+00:00.

## metadata
```json
{
  "type": "specification",
  "nouveaux_parcours": ["P9"],
  "parcours_revises": ["P1"],
  "regle_amendee": "R7",
  "regles_ajoutees": ["R11", "R12", "R13"],
  "nouveaux_criteres": ["CA-18","CA-19","CA-20","CA-21","CA-22","CA-23","CA-24","CA-25","CA-26"],
  "consentement_version": 2,
  "carte_suivante_proposee": "21 (architecture Lot 7)"
}
```
