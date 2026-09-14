# Spécification · « Cœur relatif »

*Carte 03, agent `produit`, skill `specification`. Traduit `docs/exigences.md` (carte 02)
en parcours et critères testables. Premier document sans run de référence : c'est le
premier vrai test de la skill.*

## Parcours

### P1 — Premier contact et consentement
Le bot écrit en privé à chaque collègue invité : le texte de consentement (ce qui est
stocké, ce qui ne l'est jamais, la durée de conservation, comment supprimer), et attend
« J'accepte ». Sans réponse positive, rien n'est enregistré et le bot ne redemande pas
plus d'une fois par semaine.

### P2 — Déclarer une séance
Aucun texte libre. Trois choix par boutons, dans cet ordre :
1. **Activité** : Course, Vélo, Musculation, Natation, Marche, ou **Autre** (seul cas où
   un texte libre est demandé, une fois, pour nommer l'activité).
2. **Durée** : 15, 30, 45, 60 ou 90+ minutes (le dernier bouton se lit « 90+ » pour ne
   pas donner l'impression qu'une séance plus longue est refusée ; en interne, il reste
   compté comme 90 minutes, aucun palier de calcul supplémentaire).
3. **Effort ressenti** : Facile, Modéré, Soutenu, Dur, Maximal — converti en interne sur
   l'échelle 1-10 déjà utilisée par le calcul (2/4/6/8/10), sans jamais afficher de chiffre.

Le bot confirme en privé et, s'il y a assez d'historique, publie dans le groupe.

### P3 — Recevoir sa note
Calcul de la charge (minutes × effort), comparaison à la référence personnelle glissante,
conversion en étoiles. Les trois premières séances : calibration silencieuse, aucune
étoile envoyée dans le groupe.

### P4 — Être vu par le groupe, sans chiffres
Le groupe voit : prénom, étoiles, nom de l'activité. Jamais minutes, effort, charge ou
référence.

### P5 — Donner et recevoir un cœur
Un collègue répond ❤️ au message du groupe. Le bot compte, en privé seulement : à
l'auteur de la séance, le nombre de cœurs reçus sur cette séance ; à chacun, en fin de
semaine, le nombre de cœurs donnés. Aucun total n'est jamais public ni classé.

### P6 — Le signal du vendredi
Chaque vendredi, un message collectif dans le groupe, sans prénom : nombre de séances
déclarées et nombre de cœurs posés cette semaine, par l'ensemble du groupe.

### P7 — Le rappel du lundi
Chaque lundi matin, un message dans le groupe : « nouvelle semaine ».

### P8 — Mes données
`/mesdonnees` renvoie en privé les étoiles de la semaine en cours. `/supprimer` efface
tout ce qui concerne la personne et le confirme.

## Règles

- R1. Aucune donnée n'est enregistrée avant consentement explicite (P1).
- R2. Aucun chiffre de performance (minutes, effort, charge, référence) ne sort jamais
  de la conversation privée avec le bot.
- R3. La référence personnelle est la médiane glissante des six dernières séances de
  la même personne, recalculée à chaque nouvelle déclaration, sans distinction de
  semaine civile.
- R4. Aucune étoile n'est publiée avant la troisième séance déclarée par la personne ;
  le bot répond alors uniquement « enregistré ».
- R5. Seuils : charge / référence < 0,6 → ★ ; 0,6-0,9 → ★★ ; 0,9-1,1 → ★★★ ; 1,1-1,4 → ★★★★ ; > 1,4 → ★★★★★.
- R6. Si les deux dernières séances de la personne ont un effort déclaré de 10, la note
  de la séance suivante est plafonnée à ★★★★, quel que soit le calcul.
- R7. Le nombre de cœurs, reçus ou donnés, n'est jamais affiché en cumul public ni classé
  entre collègues.
- R8. Aucun message ne mentionne l'absence d'une personne, individuellement ou dans un
  récapitulatif nominatif.
- R9. Les données personnelles sont conservées jusqu'à la fin du pilote plus 30 jours,
  puis supprimées automatiquement.
- R10. Ne sont jamais stockés : fréquence cardiaque, distance, allure, position, âge, poids.

## Critères d'acceptation

| ID | Critère | Parcours | Règle |
|---|---|---|---|
| CA-01 | Tant que la personne n'a pas répondu « J'accepte », aucune déclaration n'est enregistrée. | P1 | R1 |
| CA-02 | Le bot ne relance pas le consentement plus d'une fois par période de 7 jours. | P1 | R1 |
| CA-03 | Une déclaration valide vient de trois choix par boutons : une activité de la liste fermée ou un texte non vide via « Autre », une durée de {15,30,45,60,90} minutes (le bouton du dernier palier affiche « 90+ »), un effort ressenti parmi {Facile,Modéré,Soutenu,Dur,Maximal} ; tout choix absent ou hors liste rejette la déclaration. | P2 | — |
| CA-04 | Pour les séances 1 et 2 d'une personne, le bot répond en privé « enregistré » et ne publie rien dans le groupe. | P3 | R4 |
| CA-05 | À partir de la 3e séance, la référence est la médiane des charges des six dernières séances disponibles (moins de six si l'historique est plus court). | P3 | R3 |
| CA-06 | Le message publié dans le groupe contient le prénom, le nombre d'étoiles, le nom de l'activité, et ne contient ni minutes, ni effort, ni aucun nombre autre que les étoiles. | P4 | R2 |
| CA-07 | Les seuils d'étoiles appliqués correspondent exactement à R5 sur un jeu de charges de test couvrant les cinq tranches. | P3 | R5 |
| CA-08 | Si les deux séances précédentes de la personne ont un effort de 10, la note de la séance courante ne dépasse jamais ★★★★, même si le calcul de R5 donnerait ★★★★★. | P3 | R6 |
| CA-09 | Un ❤️ posé sur un message de séance est compté en privé pour l'auteur de la séance ; ce total n'apparaît nulle part en public. | P5 | R7 |
| CA-10 | En fin de semaine, chaque personne reçoit en privé le nombre de cœurs qu'elle a donnés ; ce nombre n'est jamais comparé aux autres dans un message. | P5 | R7 |
| CA-11 | Le message du vendredi contient un total de séances et un total de cœurs pour le groupe entier, et ne contient aucun prénom. | P6 | R8 |
| CA-12 | Aucun message généré par le bot, à aucun moment, ne mentionne qu'une personne nommée n'a pas déclaré de séance. | P6 | R8 |
| CA-13 | Le message du lundi est identique chaque semaine et ne contient aucune donnée personnelle. | P7 | — |
| CA-14 | `/mesdonnees` renvoie uniquement les étoiles de la semaine en cours de la personne qui l'invoque, jamais celles d'un tiers. | P8 | R2 |
| CA-15 | `/supprimer` efface toutes les données de la personne et le bot confirme la suppression dans le même message. | P8 | R9 |
| CA-16 | Toute donnée d'une personne est effacée automatiquement à la date fin-du-pilote + 30 jours, sans action requise. | P8 | R9 |
| CA-17 | Aucun champ de fréquence cardiaque, distance, allure, position, âge ou poids n'existe dans le modèle de données. | — | R10 |

## Hors périmètre (confirmé, carte 02)

Application mobile, connexion montre ou Strava, classement d'équipe, défis hebdomadaires,
badges, tableau de bord organisateur, comptes utilisateurs au-delà de l'identité
Telegram, historique au-delà de la semaine en cours, tout message nominatif d'absence.

## Ce qui n'est pas ici

Le texte exact du consentement (P1) : rédigé par la carte Pilote (skill `consentement`),
programme D. Le canal exact (Telegram confirmé par la carte 02, à valider avec le
fondateur avant la carte Architecture).
