# Bloqué : PR lot-01 vers main

## Symptôme
Le code du lot 01 est fini et vert (voir `.loop/lot-01-progress.md`), commité sur la
branche `lot-01` (commit `99d94b7`). Impossible d'ouvrir la PR demandée par la mission :
`git remote -v` ne renvoie rien, ce dépôt n'a aucun remote configuré. `gh repo view` et
`gh auth status` sont bloqués par l'environnement (nécessitent une approbation qui ne peut
pas être accordée depuis ce contexte). Sans remote, il n'y a nulle part où pousser la
branche ni de dépôt GitHub où ouvrir une PR ou faire tourner la CI.

## Essais
- `git remote -v` : vide, confirmé deux fois.
- `gh repo view`, `gh auth status` : requièrent une approbation non disponible ici.
- Lecture de `.loop/ralph.sh` : le script travaille uniquement en local
  (`git checkout -B lot-01` contre le `main` local), il ne pousse jamais vers un remote.
  Rien dans le dépôt n'indique un remote attendu (pas de `.git/config` avec `origin`, pas
  d'URL dans `docs/` ou `CLAUDE.md`).

## Options
1. Le fondateur ajoute un remote (`git remote add origin <url>`) vers un dépôt GitHub
   existant ou nouvellement créé, hébergeant `main` ; je pousse alors `lot-01` et ouvre la
   PR avec `gh pr create`.
2. Le lot est considéré terminé sans PR hébergée : la branche locale `lot-01` (commit
   `99d94b7`), vérifiée verte (typecheck/lint propres sur mon périmètre, les 4 tests
   CA-04/05/07/08 passent, `docs/` inchangé), est mergée manuellement dans `main` en local
   par le fondateur.

## État du code (non affecté par ce blocage)
- `src/domain/reference.ts`, `src/domain/etoiles.ts` + tests associés : verts.
- `npm run typecheck`, `npm run lint` : propres sur les fichiers du lot 1 (le reste du
  dépôt a des erreurs préexistantes sur des modules des lots 2-5, non concernés par ce lot,
  détail dans `.loop/lot-01-progress.md`).
- `docs/` : inchangé.
