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
