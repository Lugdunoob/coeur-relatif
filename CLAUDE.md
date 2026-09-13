# Cœur relatif : dépôt piloté par la Régie

Ce dépôt suit `PROCESS.md` du plugin `regie` : tout cadrer, coder à la fin.
Les agents décident ; le fondateur a un veto de 24 h ; la liste réservée ne se délègue pas.

## Où est la vérité
- `docs/cadrage.md`, `docs/exigences.md`, `docs/spec.md` : le produit. `docs/spec.md` approuvée ne change que par PR.
- `docs/adr/`, `docs/data-model.md`, `docs/test-plan.md`, `docs/lots.md` : comment on le construit.
- `docs/cartes/NN-*.md` : chaque décision, son challenge, son journal.
- `.loop/coeur-relatif-progress.md` : mémoire de boucle, seule liste de ce qui reste à faire.
- `.loop/coeur-relatif-method-log.md` : ajustements de méthode du Contrôleur.
- `docs/programme.md` : les loops, leur ordre, leur état.

## Commandes de vérification (à compléter en carte 5, Architecture)
- typecheck : `à compléter en carte 05`
- lint : `à compléter en carte 05`
- tests : `à compléter en carte 05`

## Règles absolues
- `main` intouchable ; une branche par programme (`regie/<programme>`), une par lot (`lot-NN`).
- Aucune écriture dans `docs/` pendant un lot (`.loop/phase` = `lot`, hook `garde-docs`).
- Pas de lot sans critères `CA-NN` numérotés et tests rouges.
- Rien n'est envoyé à un tiers, publié, payé ou signé par un agent.
- Données personnelles : UE uniquement, pseudonymisées dans tout fichier commité.

## Société
`societes/coeur-relatif/` (voix, audience, preuves, règles) est la mémoire commune. Lecture seule depuis un run.
