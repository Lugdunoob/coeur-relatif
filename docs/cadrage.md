
## 1. Ce qui existe déjà de proche


**Strava.** Le « Relative Effort » (ex-Suffer Score, remplacé en 2018 en collaboration avec Marco Altini) pondère le temps passé dans chaque zone de fréquence cardiaque personnelle (calculée sur le FC max estimé ou déclaré de l'utilisateur) puis normalise sur le jeu de données global de Strava pour comparer entre sports (support.strava.com/en-us/articles/15401794-relative-effort ; medium.com/strava-engineering/quantifying-effort-through-heart-rate-data-e6a0e3dd6a52). La note est donc individualisée dans son calcul, mais **les chiffres absolus ne sont jamais masqués** : distance, allure et FC restent affichés à côté du score, sauf activation du réglage « Hide Stats » qui, lui, supprime aussi le Relative Effort (support.strava.com/en-us/articles/15401987-activity-privacy-controls). C'est une fonctionnalité **payante** (Summit, ~80 $/an aux US, ~55 £ au UK, 8-11 €/mois en zone euro) (gearjunkie.com/health-fitness/strava-relative-effort ; biketips.com/strava-free-vs-paid). Les classements sociaux de Strava (segments, clubs) portent sur des temps/distances bruts, pas sur le Relative Effort — il n'y a pas de mode « équipe entreprise » équitable.

**Garmin.** Training Effect et Body Battery sont des indices personnels (VO2max, HRV, sommeil, stress) non comparables entre utilisateurs (androidauthority.com/garmin-body-battery-1209128 ; the5krunner.com/garmin-features/sleep/body-battery). Les « Challenges » Garmin Connect (steps, distance) fonctionnent en revanche sur des totaux bruts, sans ajustement de capacité (support.garmin.com — Step Challenges ; bigteamchallenge.com/faqs/connect-garmin).

**Apple Fitness.** Les anneaux Bouger/Exercice/Debout sont individualisés (objectifs caloriques et de minutes propres à chaque profil), et les **Compétitions** entre amis convertissent le pourcentage d'anneaux complétés en « points de forme » : 1 point par % ajouté, jusqu'à 600 points/jour, 4200/semaine — c'est donc déjà un mécanisme relatif à soi, assez proche de l'idée (androidpolice.com/how-to-use-apple-watch-competitions ; appletoolbox.com/apple-watch-competitions-understand-your-activity-score). Limite : compétitions **uniquement en 1 contre 1**, pas de mode équipe/entreprise, et les chiffres bruts restent visibles ailleurs dans l'app Forme.

**Whoop.** Le Strain (échelle logarithmique 0-21, basée sur l'échelle de Borg) est individualisé par rapport à la FC max et au niveau de forme personnel : deux personnes faisant le même effort obtiennent des scores différents (whoop.com/us/en/thelocker/how-does-whoop-strain-work-101 ; steradianlabs.com/blog/whoop-strain-score-explained). Whoop propose désormais **Whoop Unite**, une offre entreprise qui agrège les métriques (sommeil, stress) au niveau du groupe sans exposer les données individuelles au management, avec défis d'équipe (insider.fitt.co/whoop-enters-corporate-wellness ; fittechglobal.com/…Whoop-Unite). C'est payant (abonnement ~30 $/mois + bracelet).

**Fitbit.** Les Active Zone Minutes utilisent des zones de FC personnalisées (réserve de FC = FC max − FC repos), mais l'objectif hebdomadaire (150 min modérées/75 min intenses) est une **norme de santé publique identique pour tous**, pas un objectif calibré sur la capacité individuelle (support.google.com/googlehealth/answer/14236509). La marque Fitbit est en cours d'absorption dans Google Health depuis 2023-2026, et les défis communautaires historiques ont été supprimés (tomsguide.com — Google is slowly killing Fitbit ; fitrockr.com/the-slow-dissolution-of-fitbit).

**Nike Run Club** fonctionne sur des paliers de distance cumulée absolus (Jaune 0-49 km, Orange 50-249 km, etc.) et des records personnels, orienté auto-compétition plutôt que classement social (trophy.so/blog/nike-run-club-gamification-case-study). Aucun mode entreprise.

**Oura** produit un score de Readiness composite (0-100) strictement individuel, sans dimension sociale ni offre entreprise identifiée (ouraring.com/blog/readiness-score).

**Polar** propose Training Load Pro/Perceived Load (échelle 1-10 personnalisée) et une offre B2B via le partenariat **Polar x HeiaHeia**, avec défis d'équipe du type « Perfect Day Challenge » à points (polar.com/blog/polar-heiaheia-corporate-wellness-program).

**Constat transversal** : la personnalisation du *calcul* (zones de FC propres à chacun) est déjà la norme chez tous ces acteurs premium — mais elle sert presque toujours à nourrir un score interne à l'utilisateur, jamais à remplacer entièrement l'affichage des chiffres bruts dans un cadre social/collectif. Apple est le cas le plus proche de l'idée, mais limité au duel.

## 2. Bien-être et défis sportifs en entreprise (France/Europe)

**Squadeasy** : points gagnés par activité physique (tracker interne ou connecté), missions d'équipe et quiz bien-être ; fonctionnalité notable de « pouvoirs magiques » permettant de booster les coéquipiers plus faibles — un embryon de mécanique d'équité (squadeasy.com/fr/offre). Tarifs non publics (devis). Plus de 850 000 collaborateurs accompagnés.

**Kiplin** : jeu où le mouvement réel fait progresser un avatar virtuel, discours explicite « viser l'exercice plutôt que la performance » ; cible les équipes jeunes/dynamiques, formule freemium limitée pour petites structures (kiplin.com/fr/defi-entreprise ; myhappyjob.fr). Tarifs non publics.

**United Heroes** : défis hebdomadaires individuels/équipe, classement d'équipe en temps réel basé sur les métriques d'activité (marche, course, vélo), volet solidaire (dons). Plans Standard/Pro/Enterprise/Premium sur devis (teamupp.fr/united-heroes-prix). Point notable et discutable : leur politique de confidentialité affirme qu'« aucune des données personnelles collectées… n'entre dans le cadre des données de santé tel que défini par le RGPD » (united-heroes.com/politique-de-confidentialite-sport-heroes) — une auto-qualification qui peut être contestée si des données de fréquence cardiaque sont traitées (voir section 5). Données hébergées sur serveur basé aux États-Unis.

**Gymlib**, devenu **EGYM Wellpass** en France, organise des challenges de pas intra-entreprise sur 4 semaines, plusieurs fois par an (rentrée, QVT, janvier), plus de 1000 entreprises clientes, plus de 4000 partenaires sport/bien-être (blog.gymlib.com ; fitness-challenges.com/gymlib-devient-egym-wellpass).

**Teamupp** : app QVT « 360° » combinant défis sportifs, ateliers, quiz et CSR ; ciblage 50-500 salariés, budget plus élevé, 4,6/5 sur l'App Store (teamupp.fr/application-challenge-sportif-entreprise).

**Virgin Pulse / Personify Health** (fusion en cours) : crédits bien-être jusqu'à 400 $/an + 50 $ pour bilan de santé, points quotidiens/mensuels/trimestriels, périodes « triple points » (employeebenefits.ri.gov ; today.marquette.edu). C'est l'héritier du **Global Corporate Challenge** (GCC, fondé 2004, racheté par Virgin Pulse en 2016) : équipes de 7, programme pédomètre de 100 jours ; une étude a montré une réduction de la détresse psychologique chez les participants (pmc.ncbi.nlm.nih.gov/articles/PMC10002186).

**Vitality** (programme lié à l'assurance santé/vie) : les « Vitality Points » issus d'activités trackées déterminent un statut qui conditionne remises de prime et récompenses partenaires — logique d'assurance comportementale plus que de challenge collègues pur (wecovr.com/guides/vitality-health-points-system-is-it-worth-the-hassle).

**Deux acteurs supplémentaires notables** : **YuLife** (assurtech UK) gamifie marche/vélo/méditation via une monnaie virtuelle (YuCoin), défis d'équipe, 80 % d'engagement quotidien revendiqué et +50 % d'activité physique auto-déclarée (yulife.com/blog/how-gamification-transforms-group-health-life-insurance ; un essai contrôlé randomisé est en cours de publication, medrxiv.org/content/10.64898/2026.05.31.26354543v1.full). Et **Motion for Teams** (motion-app.com/motion-for-teams), détaillé en section 6, qui est en réalité le concurrent le plus proche du concept étudié.

**Constat sur le prix/taille** : aucun acteur ne publie de grille tarifaire claire par salarié hors Motion (12-15 $/utilisateur actif/mois, minimum 300 $/mois, cible dès 10 salariés — motion-app.com/motion-for-teams). Les autres fonctionnent en devis, avec un seuil pragmatique observé « dès 10 collaborateurs » pour un impact perceptible (teamupp.fr/application-challenge-sportif-entreprise). Le traitement des données de santé est rarement documenté publiquement, à l'exception de Whoop Unite et Motion qui revendiquent explicitement une agrégation empêchant le management de voir les métriques individuelles.

## 3. Ce que dit la recherche

La théorie des buts d'accomplissement distingue les **buts de maîtrise** (progresser par rapport à soi) des **buts de performance** (se démarquer des autres) ; la littérature montre que les buts de maîtrise favorisent l'appréciation du défi, la persévérance et la motivation autonome au sens de la théorie de l'autodétermination, alors que l'orientation vers l'ego est associée à la motivation extrinsèque (pmc.ncbi.nlm.nih.gov/articles/PMC5854141 ; pmc.ncbi.nlm.nih.gov/articles/PMC5854211). La méta-analyse historique de Rawsthorne & Elliot relie les buts d'approche-maîtrise à la motivation intrinsèque (selfdeterminationtheory.org/SDT/documents/1999_RawsthorneElliot_PSPR.pdf).

Sur les classements : une étude publiée dans Frontiers in Public Health (2026, n=1019 étudiants) montre que l'usage des leaderboards stimule la comparaison sociale (β=0,298) et l'activité physique (β=0,322), avec un effet indirect net négatif sur le stress perçu (β=−0,120), mais souligne que « les effets des leaderboards sont probablement hautement hétérogènes selon les individus » (frontiersin.org/…/fpubh.2026.1794299/full). Une revue académique dédiée aux leaderboards dans les apps fitness conclut que « les développeurs doivent trouver des moyens de motiver chaque utilisateur, pas seulement les meilleurs », les classements purs risquant de démotiver ceux qui se sentent durablement distancés (researchgate.net/publication/309557443). Une étude UCL/Loughborough analysant près de 59 000 posts sur X a identifié un phénomène de honte et de culpabilité chez les utilisateurs n'atteignant pas leurs objectifs, conduisant parfois à l'abandon pur et simple des trackers (lbc.co.uk/article/f04b9a85ea294981b27307be6867ce19-5HjdFjq_2).

Sur l'efficacité des challenges d'entreprise : une revue parapluie 2025 du Lancet Public Health sur les interventions en milieu professionnel conclut que les interventions gamifiées réduisent la sédentarité et l'activité légère mais **qu'aucune n'améliore de façon cohérente l'activité physique modérée à intense** (thelancet.com/journals/lanpub/article/PIIS2468-2667(25)00038-6). L'essai randomisé de Song & Baicker (JAMA, ~32 000 salariés d'un grand distributeur américain, 160 sites) a montré qu'un programme de bien-être multicomposant augmentait l'exercice auto-déclaré mais n'avait aucun effet significatif sur les mesures cliniques, les dépenses de santé ou l'absentéisme à 18 mois (jamanetwork.com/journals/jama/fullarticle/2730614). Enfin, l'étude sur le Global Corporate Challenge a montré une réduction mesurable de la détresse psychologique sur un programme pédomètre de 4 mois (pmc.ncbi.nlm.nih.gov/articles/PMC10002186).


## Trois hypothèses à tuer

| Hypothèse | Le test le moins cher qui la tuerait |
|---|---|
| H1. Une note relative à soi fait revenir les non-sportifs là où un classement les fait fuir | Pilote de 4 semaines : participation des 4 moins sportifs en semaine 4 comparée à la semaine 1 |
| H2. Les sportifs acceptent d'être notés comme les autres | Participation et réponse finale des 3 plus sportifs du groupe |
| H3. L'auto-déclaration (durée, effort ressenti) suffit, sans montre, sans que la triche tue la confiance | Question anonyme en fin de pilote : « as-tu eu l'impression que quelqu'un trichait ? » |

## La question qui décide

**Après quatre semaines, au moins huit des douze participent encore et répondent oui à
« tu continuerais ? ».** Sinon, on arrête, et la rétro dit pourquoi.

## Décisions du fondateur (2026-09-11, confirmées)

- **Hiérarchie** : le fondateur n'est le supérieur d'aucun participant. Il peut lancer
  l'invitation lui-même.
- **Nom** : « Cœur relatif » reste le nom de travail du pilote.

## Sources

Recherche de marché complète, avec toutes les URL datées : `golden/etude-marche-coeur-relatif.md`
du plugin `regie-claude` (agent délégué, modèle léger, 2026-09-11).

```json
{
  "besoin_principal": "Être reconnu pour son effort réel, pas pour ses kilomètres, afin de ne pas abandonner par honte",
  "besoins_secondaires": ["revenir chaque semaine", "être vu sans être exposé et encouragé par ses pairs (donner et recevoir des cœurs)", "équité perçue par les sportifs", "zéro surveillance"],
  "hypotheses": ["H1 note relative > classement pour les non-sportifs", "H2 les sportifs acceptent la même note", "H3 l'auto-déclaration suffit"],
  "question_decisive": "≥ 8/12 participent encore en semaine 4 et veulent continuer",
  "contrainte": "données UE, aucune visibilité hiérarchique, aucune API de montre disponible pour un pilote"
}
```
