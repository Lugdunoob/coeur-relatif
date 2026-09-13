# Exigences · « Cœur relatif »

*Carte 02, agent `musk`, skill `methode-musk`. Reprend telle quelle la décision déjà approuvée par le fondateur le 2026-09-11 (`golden/carte-2-musk.md`), formalisée ici dans le nouveau format de carte, avec les deux points transmis par la carte 01.*

## Garde-fous


- **Besoins protégés** : reconnaissance de l'effort réel ; revenir chaque semaine ; être vu sans être exposé ; équité perçue ; zéro surveillance.
- **Détail signature, unique** : **les chiffres n'existent pas.** Ni distance, ni allure, ni fréquence cardiaque, nulle part : ni pour le groupe, ni pour l'organisateur, ni pour soi. Seules existent une note en étoiles et un cœur. Justification : Motion neutralise la comparaison mais garde les chiffres ; Apple les garde ailleurs dans l'app ; personne ne les a supprimés. C'est le seul endroit où l'idée est seule.

## 0. Premiers principes

| Fait | Source |
|---|---|
| Tous les acteurs premium calculent déjà des zones d'effort propres à chacun ; la personnalisation du calcul n'est pas une différence | Étude carte 1 (Strava, Whoop, Apple, Fitbit) |
| Aucune API de montre n'est accessible à un pilote de 12 personnes : Strava l'interdit, Garmin coûte 5 000 $, COROS est fermé, Apple et Google exigent une app native | medianama.com 2024-11 ; developer.garmin.com ; support.coros.com ; sahha.ai |
| Une charge d'entraînement se mesure sans appareil par durée × effort ressenti (échelle 1-10), méthode dite session-RPE, utilisée en science du sport depuis Foster | À sourcer par le Stratège avant la spec (référence connue, URL non relevée dans ce run) |
| Ce qui motive durablement est le progrès par rapport à soi, pas le rang | PMC5854141 ; Rawsthorne et Elliot 1999 |
| Ce que le groupe a besoin de voir pour donner un cœur : que quelqu'un a fait un effort. Pas combien | Déduit du besoin « être vu sans être exposé » |
| Le pilote dure 4 semaines et compte 12 personnes : tout ce qui sert à 10 000 utilisateurs est inutile ici | Cadrage |

## 1. Rendre les exigences moins bêtes

Les exigences implicites du brief, avec qui les a posées et pourquoi.

| # | Exigence | Posée par | Raison donnée | Besoin servi |
|---|---|---|---|---|
| E1 | Une application mobile | Le brief (« une application ») | Aucune : c'est la forme attendue | Aucun directement |
| E2 | Connexion à la montre, à Strava | Le marché | « Tout le monde le fait » | Mesure de l'effort |
| E3 | Capacité calculée par fréquence cardiaque | Le marché | Précision | Reconnaissance de l'effort réel |
| E4 | Note en étoiles relative à soi | Le fondateur | C'est l'idée | Reconnaissance de l'effort réel |
| E5 | Cœurs entre collègues, donnés et reçus, comme des kudos | Le fondateur | C'est ce qui fait avancer à plusieurs | Encouragement par les pairs |
| E6 | Chiffres absolus cachés | Le fondateur | Dignité | Signature |
| E7 | Classement d'équipe | Le marché | Émulation | Contredit le besoin |
| E8 | Défis hebdomadaires | Le marché | Rythme | Revenir chaque semaine |
| E9 | Badges, séries | Le marché | Rétention | Revenir chaque semaine |
| E10 | Tableau de bord organisateur ou manager | « L'entreprise » | Suivi | Contredit « zéro surveillance » |
| E11 | Comptes, inscription | Le marché | Identité | Aucun pour 12 collègues qui se connaissent |
| E12 | Historique personnel | Le marché | Suivi de progrès | Reconnaissance, mais réintroduit des chiffres |
| E13 | Notifications, rappels | Le marché | Rétention | Revenir chaque semaine |
| E14 | Export et suppression de ses données | Le droit | RGPD | Obligation |
| E15 | Multi-sport | Le marché | Couverture | Équité perçue |
| E16 | Un signal collectif hebdomadaire (l'équipe, pas les individus) | Le fondateur (« on avance plus loin à plusieurs ») | Appartenance | Encouragement par les pairs |

Réécrites : E3 devient « mesurer l'effort tel que la personne l'a vécu » ; E11 devient « savoir qui parle » ; E15 devient « toute activité compte, la personne la nomme ».

## 2. Supprimer

| Exigence | Sort | Raison | Besoin couvert par |
|---|---|---|---|
| E1 app mobile | **Supprimée** | Aucun besoin ne l'exige ; un bot dans le groupe Telegram existant fait tout ; une app native est la seule voie vers les montres, or les montres sont supprimées | E5, E13 par le bot |
| E2 montre, Strava | **Supprimée** | Fermé contractuellement ou financièrement ; réintroduit des données de santé de catégorie spéciale | E3 réécrite : déclaration privée durée + effort ressenti |
| E3 fréquence cardiaque | **Supprimée** | Même raison ; l'effort ressenti est une mesure validée | Session-RPE |
| E7 classement | **Supprimée** | Contredit le besoin principal | Rien à couvrir |
| E8 défis hebdo | **Supprimée** | Le pilote est le défi ; 4 semaines | E13, un rappel |
| E9 badges, séries | **Supprimée** | Rétention artificielle ; le cœur est la seule récompense | E5 |
| E10 tableau de bord | **Supprimée et interdite** | Zéro surveillance : l'organisateur voit ce que le groupe voit, rien de plus | Rien à couvrir |
| E11 comptes | **Supprimée** | Telegram identifie déjà ; le consentement se donne en message privé au bot | Bot |
| E12 historique | **Supprimée** | Réintroduit des chiffres ; la personne peut demander ses étoiles de la semaine, sans plus | E4 |
| E14 export, suppression | **Gardée, minimale** | Obligation | Une commande `/mesdonnees`, une commande `/supprimer` |
| E15 multi-sport | **Simplifiée** | Toute activité compte, la personne la nomme | E4 |

Test des dix pour cent : on a supprimé neuf exigences sur quinze. Le pilote dira ce qu'il faut remettre.

## 3. Simplifier ce qui reste

- **Une seule entrée** : la personne écrit au bot, en privé, « course 30 min effort 7 ». Trois champs : activité libre, minutes, effort ressenti de 1 à 10.
- **Une seule formule** : charge = minutes × effort. Référence personnelle = médiane des charges de la personne sur ses séances de la semaine 1 (calibration silencieuse, pas d'étoiles la première semaine). Note = charge / référence, en étoiles : moins de 0,6 ★ ; 0,6 à 0,9 ★★ ; 0,9 à 1,1 ★★★ ; 1,1 à 1,4 ★★★★ ; au-delà ★★★★★. La référence se met à jour chaque semaine sur les quatre dernières séances.
- **Une seule sortie** : dans le groupe, « Noé ★★★★ · course ». Rien d'autre. Les collègues répondent par ❤️ sur le message.
- **Le cœur, dans les deux sens** : recevoir un cœur est la récompense ; en donner en fait partie. Le bot dit en privé à celui qui a déclaré « 3 cœurs sur ta séance », et à la fin de la semaine, à chacun, « tu as donné 5 cœurs cette semaine ». Les cœurs sont le seul nombre qui existe, parce qu'ils ne mesurent pas une performance mais une attention. Aucun classement de cœurs, ni reçus ni donnés.
- **Un seul signal collectif**, le vendredi, dans le groupe, sans prénom : « cette semaine, l'équipe : 14 séances, 31 cœurs ». C'est le « à plusieurs ». Jamais de récapitulatif nominatif, jamais d'absence signalée.
- **Un seul rappel** : lundi matin, « nouvelle semaine ».
- **Une seule règle de consentement** : la première fois, le bot envoie en privé le texte d'information (ce qui est stocké, ce qui ne l'est jamais, durée, comment supprimer) et attend « J'accepte ». Sans ça, rien n'est enregistré.

## 4. Accélérer le cycle

Boucle : déclaration → étoiles dans la minute → cœur des collègues dans l'heure. Cycle du pilote : quatre semaines, une question par semaine au groupe (« ça te motive ? », réponse par bouton), la question décisive en semaine 4.

## 5. Automatiser, après le pilote

Lecture automatique depuis Apple Santé ou Health Connect (donc app native), import de séances, rappels personnalisés, plusieurs groupes. Rien de ça avant que huit personnes sur douze aient dit oui.

## Données

- **Stocké** : identifiant Telegram, prénom, date, nom d'activité, minutes, effort ressenti, référence, étoiles, consentement horodaté.
- **Jamais stocké** : fréquence cardiaque, distance, allure, position, âge, poids.
- **Conservation** : durée du pilote plus 30 jours, puis suppression ; `/supprimer` à tout moment.
- **Visibilité** : le groupe voit prénom, étoiles, activité. L'organisateur ne voit rien de plus. Minutes et effort ne sortent jamais de la conversation privée.
- **Statut** : effort ressenti et minutes restent des données relatives à l'activité physique : on les traite comme des données de santé par prudence, consentement exprès, serveur en Europe.


## Points transmis par la carte 01

- **Rappel léger + déclaration très courte** : déjà couvert (« un seul rappel : lundi
  matin » ; déclaration en trois champs libres, activité + minutes + effort). Rien à
  ajouter.
- **Cœurs reçus jamais en cumul public ou classé** : déjà couvert (« Aucun classement de
  cœurs, ni reçus ni donnés »). Rien à ajouter.
