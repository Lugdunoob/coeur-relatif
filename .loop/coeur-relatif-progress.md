# Progression : Cœur relatif

## Programme A, cadrage
- [x] Carte 01 Cadrage — approuvée 2026-09-13T21:02:46+00:00
- [x] Carte 02 Méthode Musk — approuvée 2026-09-13T21:02:46+00:00 (formalise la décision déjà actée le 2026-09-11)
- [x] Carte 03 Spécification — approuvée 2026-09-13T21:02:46+00:00 (premier document sans golden run, un critère ajouté suite au challenge)

## Journal

- 2026-09-13T21:02:46+00:00 : Programme A exécuté en une session, hors loop (à la main, comme le prescrit
  la règle d'or de `boucle-regie` avant tout loop automatisé sur une carte neuve — ici
  carte 03 seulement, cartes 01-02 formalisant des décisions déjà prises). Comparé
  cartes 01 et 02 au golden run ; carte 03 est le premier test réel de la skill
  `specification` sans référence.
- Aucun run non supervisé lancé : programme A fait « à la main », en session interactive,
  conformément à la règle d'or « ne jamais automatiser ce qui n'a pas marché à la main ».

## Idées essayées / rejetées

- Redemander les cinq questions fermées du cadrage au fondateur : rejeté, elles étaient
  déjà répondues et approuvées le 2026-09-11 (golden run) ; les redemander aurait produit
  un cadrage fictif divergent sans raison.
- Faire tourner directement le loop automatisé (`/ralph-loop`) sur programme A sans passage
  manuel préalable : rejeté pour la carte 03, seule carte réellement neuve — la règle d'or
  du plugin l'interdit tant qu'un run manuel n'a pas validé la skill.

## Prochaine étape

Fenêtre de veto de 24 h sur les trois cartes (jusqu'à la date `veto_jusqu_au` de la
carte 03, la plus tardive). Ensuite, programme B (Architecture et tests) peut être lancé,
à la main pour la carte Architecture (première du genre, pas de golden), puis en loop
pour les tests d'acceptation si la carte Architecture est jugée bonne.

## Programme B, plan
- [x] Carte 05 Architecture — approuvée 2026-09-13T21:13:40.423832+00:00
- [x] Carte 06 Tests d'acceptation — approuvée, 11 suites rouges sur 12, preuve dans la carte

## Programme C, lots
- [x] Lot 01 (CA-04, CA-05, CA-07, CA-08) — loop terminé en 1 itération sur 8, fusionné
  dans main en local le 2026-09-13T21:24:20+00:00 (pas de PR : aucun dépôt distant pour ce
  projet à ce stade, voir carte 07 et son journal).
- [ ] Lot 02 (CA-01, CA-02, CA-03, CA-06) — à lancer.
- [ ] Lot 03 (CA-09, CA-10, avec spike de vérification Telegram avant le code métier)
- [ ] Lot 04 (CA-11, CA-11bis, CA-12, CA-13)
- [ ] Lot 05 (CA-14, CA-15, CA-16, CA-17)
