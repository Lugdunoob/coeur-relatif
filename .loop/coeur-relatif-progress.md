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

## Loop lot-07 (plan Lot 7 — cœurs sociaux), branche `plan-lot7`

Lancé par `bash .loop/ralph-plan.sh plan-lot7 15`, préalable carte 18 (cadrage,
approuvée 2026-09-15T07:13:00+00:00, fenêtre de veto jusqu'au 2026-09-16T07:13:00+00:00,
loop autorisé à démarrer sans attendre la fin du veto sur demande explicite du
fondateur). Itération 1 (contexte frais) : lecture de la carte 18, `git log` sur
`plan-lot7`, rien à reprendre — première itération de ce loop.

- [x] Carte 19 Design — approuvée 2026-09-15T08:00:00+00:00 (états des quatre
  écrans/zones, confirmation à deux temps pour « cœur à tout le monde »)
- [x] Carte 20 Spécification — approuvée 2026-09-15T08:30:00+00:00 (P9, révision P1,
  R7 amendée, R11-R13, CA-18 à CA-26 ; règle de conversion qualitative pays/région —
  médiane des médianes d'étoiles — écrite avec un exemple chiffré vérifié à la main :
  pays A [4,5,2]→médiane 4→très actif, pays B [3,3,3,2,3]→médiane 3→actif, pays C
  [5]→médiane 5→très actif, plus le contre-exemple par somme qui justifie de la rejeter)
- [x] Carte 21 Architecture et plan — approuvée 2026-09-15T09:00:00+00:00 (tables
  `pays`/`entreprise`/`equipe`, `personne.equipe_id`, `coeur.type`,
  `personne.consentement_version_acceptee` ; ADR-0007 documentant noir sur blanc que ces
  tables ne créent aucun cloisonnement d'accès réel entre entreprises ; anti-abus sans
  nouvelle table ; fond d'écran = lecture calculée, suit R9 sans mécanisme neuf ; Lot 7
  découpé en quatre sous-lots dans `docs/lots.md`)
- [x] Carte 22 Tests d'acceptation — approuvée 2026-09-15T09:30:00+00:00 (9 tests
  rouges, un par CA-18 à CA-26, dans `test/signal-pays.test.ts`,
  `test/anti-abus.test.ts`, `test/flux-anonymise.test.ts`, `test/fond-ecran.test.ts`,
  `test/schema-lot7.test.ts` ; squelettes minimaux dans `src/domain/*.ts` qui lèvent une
  erreur explicite « non implémenté » ; `src/db/schema.ts` étendu ; 46 tests existants
  toujours verts, 47 verts + 12 rouges après ajout, `npm run typecheck` et `npm run
  lint` propres)

**Vérification binaire faite** (avant approbation de la carte 22) :
1. `grep -rEo "CA-(1[89]|2[0-6])" test/*.test.ts` : les neuf critères apparaissent tous,
   0 manquant.
2. `npm test` : 12 tests rouges (un par nouveau CA au moins), 46 tests préexistants
   verts (47 verts au total, le surplus est une assertion de forme non-CA dans le même
   fichier que CA-26).
3. `git diff --stat main -- docs/spec.md` : seules les sections P1, P9, R7/R11-R13 et le
   tableau des critères (CA-18 à CA-26) ont bougé — vérifié ligne à ligne.
4. `git branch --show-current` → `plan-lot7`.
5. R13 (conversion qualitative) et le renvoi à l'ADR-0007 (limite de cloisonnement)
   apparaissent tous deux en toutes lettres dans le diff de `docs/spec.md` ; le détail
   complet de la limite de cloisonnement est dans
   `docs/adr/0007-limite-cloisonnement-multi-entreprises.md`.

## Journal (loop lot-07)

- 2026-09-15 : les deux points explicitement laissés ouverts par la carte 18 ont été
  tranchés dans ce loop, pas glissés : (1) règle de conversion qualitative pays/région
  = médiane des médianes d'étoiles hebdomadaires, jamais une somme, avec un exemple
  chiffré vérifié à la main dans le corps de la carte 20 ; (2) limite du cloisonnement
  multi-entreprises écrite noir sur blanc dans l'ADR-0007 (forme sans cloisonnement
  d'accès réel, chantier distinct).
- Aucune extension de périmètre au-delà de ce que la carte 18 avait acté : pas de
  classement équipe/entreprise, signal pays/région strictement qualitatif (bande, pas
  de position individuelle — CA-19), pas de code applicatif de production écrit dans ce
  loop (seulement des squelettes qui lèvent une erreur explicite).
- Aucun `BLOCKED.md` nécessaire : les trois points mineurs du challenge (anonymisation
  du flux, cas d'un pays sans donnée, forme exacte du re-consentement) ont été tranchés
  par le Stratège avec challenge et journal, comme le veut la méthode, sans toucher à la
  liste réservée (R7/détail signature) au-delà de ce que le fondateur avait déjà décidé
  en carte 18.

## Idées essayées / rejetées (loop lot-07)

- Sommer les cœurs ou les étoiles par pays pour produire le signal pays/région : rejeté
  (challenge 1 de la carte 18 et carte 20) — un tri par somme avantage mécaniquement les
  pays peuplés et reproduit une comparaison chiffrée déguisée derrière un simple tri,
  contre-exemple chiffré à l'appui dans la carte 20.
- Classer les pays par position individuelle (1er, 2e, 3e...) plutôt que par bande :
  rejeté — un ordre stable sur un niveau caché équivaut en pratique à un classement
  chiffré, exactement ce que R7 amendée exclut (CA-19).
- Construire dès ce Lot 7 le cloisonnement d'accès réel entre entreprises (RLS par
  tenant) : rejeté pour ce lot — hors mandat de la carte 18, aucune deuxième entreprise
  réelle pour valider le design ; documenté comme chantier distinct (ADR-0007).
- Simuler un comportement plausible mais incorrect dans les squelettes (ex. `signalPays`
  qui somme au lieu de prendre la médiane) plutôt que lever une erreur explicite :
  écarté (carte 22, challenge) — l'erreur explicite est aussi rouge, plus sûre à relire.

## Prochaine étape

Fenêtre de veto de 24h sur les cartes 19-22 (jusqu'au 2026-09-16T09:30:00+00:00, la plus
tardive). Ensuite, les quatre sous-lots de code du Lot 7 (`docs/lots.md`) peuvent être
lancés un par un avec `.loop/ralph.sh`, dans l'ordre de leurs dépendances : 7.1 → 7.2 et
7.4 → 7.3.
