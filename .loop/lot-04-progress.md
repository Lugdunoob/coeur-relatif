# Lot 04 — progression

## Sous-lots
- [x] Sous-lot 0 : lecture carte/lot/tests rouges, plan écrit ci-dessous.
- [x] Sous-lot 1 : `src/domain/signal-vendredi.ts` (CA-11, CA-11bis, CA-12)
- [x] Sous-lot 2 : `src/domain/rappel-lundi.ts` (CA-13)
- [x] Sous-lot 3 : squelette `src/cron.ts` (aucun test ne l'exige)
- [ ] Sous-lot final : revue contradictoire du diff, push `lot-04`

## Constat de départ (itération 1)
- Branche `lot-04` confirmée, `.loop/phase` déjà à `lot`.
- Pas de carte `docs/cartes/04-lot-04.md` : aucun désaccord avec la spec constaté,
  donc pas besoin d'en créer une (la règle ne l'exige que pour noter un désaccord).
- `docs/lots.md:34` : Lot 4 = CA-11, CA-11bis, CA-12, CA-13, fichiers
  `src/domain/signal-vendredi.ts`, `src/domain/rappel-lundi.ts`, `src/cron.ts`.
- `docs/spec.md:79-81` et `docs/contracts.md:35-36` : contenu exact attendu des deux
  messages (vendredi = total séances + total cœurs, aucun prénom, envoyé même à
  zéro ; lundi = texte fixe, identique chaque semaine, aucune donnée personnelle).
- `docs/data-model.md` : types `Seance`/`Coeur` déjà définis dans `src/db/schema.ts`
  (utilisés tels quels par les stubs).
- Stubs déjà en place (créés au lot 03, cf. commentaire « Stub de typage : implémentation
  réelle au lot 04 ») : `src/domain/signal-vendredi.ts` et `src/domain/rappel-lundi.ts`,
  chacun `throw`. Tests déjà écrits et rouges : `test/signal-vendredi.test.ts`,
  `test/rappel-lundi.test.ts`.
- `npm test` avant tout code : 4 fichiers de test en échec, 8 tests rouges. Deux de ces
  fichiers (`test/donnees.test.ts` CA-14/CA-15, `test/purge.test.ts` CA-16) sont **hors
  périmètre lot 04** (lot 5 « Les droits ») — ne pas y toucher, ne pas les faire passer,
  juste vérifier qu'ils restent dans le même état (rouges avant/après, non aggravés).
- Style de code de référence : `src/domain/coeurs.ts` (fonctions pures, pas de classes,
  commentaire d'en-tête citant le CA couvert).
- Aucune nouvelle dépendance nécessaire : Date native suffit pour `rappel-lundi.ts`
  (le texte est fixe, l'argument `date` n'est là que pour la signature — cf. test CA-13
  qui compare deux dates différentes et attend un texte identique).

## Idées rejetées
- Créer une carte `04-lot-04.md` sans désaccord réel avec la spec : inutile, la
  consigne ne l'exige qu'en cas de désaccord à trancher.
- Toucher à `test/donnees.test.ts` / `test/purge.test.ts` pour les faire passer :
  hors périmètre (lot 5), interdit par la mission ("et rien d'autre").

## Journal
- Itération 1 : sous-lot 0 terminé, plan écrit, aucun code modifié.
- Itération 2 : sous-lots 1, 2, 3 réalisés.
  - `signal-vendredi.ts` : message unique construit à partir de `seances.length` et
    `coeurs.length`, pluriel géré, aucun accès aux champs `personneId`/`donneurId`
    (donc aucun prénom possible par construction, pas seulement par accident).
  - `rappel-lundi.ts` : texte fixe, paramètre `date` ignoré (signature imposée par
    `docs/data-model.md`/le contrat, mais le contenu ne doit pas varier — CA-13).
  - `src/cron.ts` : squelette commentaire seul (`export {}`), même style que
    `src/telegram/webhook.ts` (lot 02/03) : décrit les deux déclenchements
    (lundi 8h, vendredi 17h, cf. `docs/contracts.md`) et renvoie explicitement la
    configuration du déclenchement réel (Vercel Cron) au lot 6 (Recette), hors
    périmètre lot 04.
  - Vérifications : `npm test` → 26/29 verts, les 3 rouges restants (`donnees.test.ts`
    CA-14/CA-15, `purge.test.ts` CA-16) sont lot 05, non touchés, dans le même état
    qu'à l'itération 1. `npm run typecheck` et `npm run lint` : 0 erreur.
    `git diff --stat main -- docs/` : vide.
  - Aucune nouvelle dépendance ajoutée.
