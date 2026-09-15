# /loop : programme B — Lot 7 (cœurs sociaux) de « Cœur relatif »

> Lancement : `bash .loop/ralph-plan.sh plan-lot7 15`
> Préalable : carte 18 (cadrage Lot 7) approuvée. Ne pas attendre sa fenêtre de veto —
> le fondateur a explicitement demandé de lancer la méthode loop dès l'approbation.
> Chaque itération démarre sans mémoire (contexte frais, comme les loops de lot).
> Termine chaque réponse par exactement une ligne : `STATUS: CONTINUE` ou
> `STATUS: PLAN_LOT7_DONE` ou `STATUS: PLAN_LOT7_BLOCKED`.

## MISSION
Décider comment construire le Lot 7 (envoi de cœurs, flux d'activité, signal
qualitatif pays/région, fond d'écran des cœurs reçus) : parcours et critères
testables, modèle de données, ADR, découpage en lots, et un test d'acceptation
exécutable et **rouge** par nouveau critère `CA-NN`. Aucun code applicatif de
production dans ce loop — uniquement des tests rouges et un squelette minimal si
nécessaire pour qu'ils s'exécutent.

Lis d'abord `docs/cartes/18-lot7-cadrage-coeurs-sociaux.md` en entier : c'est le
cadrage déjà approuvé par le fondateur. Deux points y sont explicitement laissés
ouverts et **doivent** être tranchés dans ce loop, pas glissés :
1. La règle de conversion d'un agrégat de cœurs/étoiles en un signal qualitatif
   pays/région (jamais une somme ou un nombre affiché — voir le Challenge, point 1
   de la carte 18). Écris la règle en toutes lettres, avec un exemple chiffré vérifié
   à la main dans le corps de la carte de spécification.
2. La limite explicite du modèle de données multi-entreprises : les tables
   `equipe`/`entreprise`/`pays` posent une *forme*, pas un cloisonnement d'accès réel
   entre entreprises (voir Challenge, point 2). Écris cette limite noir sur blanc dans
   l'ADR d'architecture, pour qu'un futur lecteur ne croie pas l'isolement déjà fait.

Livrable final : `docs/spec.md` mis à jour (nouveau parcours P9, révision de P1 pour
le consentement, R7 amendée telle que déjà actée en carte 18, nouveaux `CA-NN`),
`docs/data-model.md` ou section dédiée (tables `equipe`, `entreprise`, `pays`,
`personne.equipe_id`), un nouvel `docs/adr/000X-*.md` si une décision technique le
justifie, `docs/lots.md` complété d'un « Lot 7 » avec son découpage, tests rouges
commités pour chaque nouveau `CA-NN`.

## RÈGLES ABSOLUES
1. `main` est intouchable. Première action de chaque itération : `git branch
   --show-current` ; si `main`, crée ou bascule sur `plan-lot7`.
2. Zéro push forcé, zéro merge dans `main`. Le push de la branche est autorisé.
3. Un commit par carte approuvée : `carte(NN): approuvée`, et un par renvoi :
   `carte(NN): renvoyée, <motif>`.
4. R7 et le détail signature (carte 02) restent la règle par défaut : toute levée
   au-delà de ce que la carte 18 a déjà acté (signal qualitatif au seul niveau
   pays/région) est bloquante — écris `BLOCKED.md` et sors par la promesse de blocage
   plutôt que de trancher seul une extension de périmètre.
5. Tu es le Stratège (`regie:stratege`). Tu délègues chaque carte à son agent
   (`regie:<agent>`), tu fais contester par `regie:contradicteur`, tu tranches, tu
   écris le journal. Auteur ≠ relecteur, toujours.

## MÉMOIRE DE BOUCLE
Fichier d'état : `.loop/coeur-relatif-progress.md` (même fichier que le programme
initial, nouvelle section à ajouter pour ce loop). Tu démarres sans souvenir des
itérations précédentes. Première action : le lire, puis `git log --oneline -15` sur
la branche `plan-lot7`. S'il montre des cartes cochées, fais-lui confiance :
reprends à la première non cochée. Dernière action de chaque itération : le mettre à
jour (checklist, journal, idées rejetées).

## CARTES DE CE LOOP
- [ ] **Carte 19 Design** (si écrans — c'est le cas, la PWA a des écrans réels) :
  agent `architecte` ou skill de design disponible. États de l'écran d'accueil
  (bienvenue + cœurs reçus + roues), de la zone d'envoi de cœurs (activités des
  autres, profils anonymisés, trois options d'envoi), du signal pays/région, du fond
  d'écran qualitatif. États vides et d'erreur. Challenge, décision.
- [ ] **Carte 20 Spécification** : agent `produit`, skill `specification`. Nouveau
  parcours P9 (envoyer un cœur), révision de P1 (consentement, nouveau flux social
  visible), R7 amendée (texte exact déjà proposé en carte 18, à affiner), règle de
  conversion qualitative pays/région (point 1 ci-dessus, obligatoire), nouveaux
  `CA-NN`. Challenge, décision.
- [ ] **Carte 21 Architecture et plan** : agent `architecte`, skills `architecture`,
  `adr`, `decoupage-lots`. Modèle de données (`equipe`, `entreprise`, `pays`), ADR
  documentant la limite du cloisonnement (point 2 ci-dessus, obligatoire), anti-abus
  de « cœur à tout le monde » (limite de fréquence), conséquence sur R9 (purge) du
  fond d'écran cumulatif. Découpage en lots dans `docs/lots.md` (Lot 7). Challenge,
  décision.
- [ ] **Carte 22 Tests d'acceptation** : agent `architecte`, skill `tests-dabord`. Un
  test par nouveau `CA-NN`, exécutable, rouge.

## VÉRIFICATION (binaire, avant approbation de la carte 22)
1. Chaque nouveau `CA-NN` de `docs/spec.md` apparaît dans un fichier de test : 0
   manquant.
2. La suite de tests s'exécute et contient au moins un test rouge par nouveau
   critère (code de sortie ≠ 0 acceptable pour les nouveaux, les 46 tests existants
   restent verts).
3. `git diff --stat main -- docs/spec.md` : seules les sections P9, P1 (révision) et
   les nouveaux `CA-NN`/R7 ont bougé ; rien d'autre du pilote existant n'est modifié
   sans justification.
4. `git branch --show-current` → `plan-lot7`.
5. La règle de conversion qualitative (point 1) et la limite de cloisonnement (point
   2) apparaissent toutes les deux, en toutes lettres, dans le diff.

## SI BLOQUÉ
Même obstacle après 3 itérations, ou extension de périmètre au-delà de ce que la
carte 18 a acté (ex. classement à un niveau équipe/entreprise, R7 levée plus loin
qu'un signal qualitatif pays/région) : `BLOCKED.md`, carte concernée en
`changements_demandes`, puis `STATUS: PLAN_LOT7_BLOCKED`. À l'itération 12
(3 avant la fin du budget) : stabilise, documente plutôt que d'ouvrir un nouveau
chantier.

## DEFINITION OF DONE
- Cartes 19 (si applicable), 20, 21, 22 approuvées avec challenge et journal.
- Chaque nouveau `CA-NN` a exactement un lot dans `docs/lots.md` (Lot 7) et un test
  rouge.
- La règle de conversion qualitative pays/région et la limite du cloisonnement
  multi-entreprises sont écrites noir sur blanc (pas seulement promises).
- `docs/programme.md` liste le loop `lot-07` avec son nombre d'itérations.
- `main` intacte.

Alors, et seulement alors : `STATUS: PLAN_LOT7_DONE`.
