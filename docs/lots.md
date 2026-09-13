# Lots · « Cœur relatif »

*Carte 05/06. Ordre imposé par `decoupage-lots` : squelette, détail signature, chemin
critique, cas limites, parcours secondaires, confort. Un critère appartient à un seul lot.*

## Lot 0 — Squelette
**Critères** : aucun. **Fichiers** : `package.json`, `tsconfig.json`, config `vitest`,
config ESLint, `src/domain/`, `src/db/`, `src/telegram/` (dossiers vides), CI GitHub
Actions qui lance typecheck + lint + test, `src/health.ts` (un « hello » testé).
**Vérif** : `npm run typecheck && npm run lint && npm test` (tests vides, verts).
**Budget** : 15 itérations.

## Lot 1 — Le détail signature : la note, sans aucun chiffre
**Critères** : CA-04, CA-05, CA-07, CA-08.
**Fichiers** : `src/domain/reference.ts`, `src/domain/etoiles.ts`, leurs tests.
**Dépendances** : lot 0. **Vérif** : les quatre tests passent, aucune dépendance à
Telegram ou Supabase dans ces fichiers (vérifié par lecture du diff).
**Budget** : 15 itérations.

## Lot 2 — Chemin critique : déclarer, être vu du groupe
**Critères** : CA-01, CA-02, CA-03, CA-06.
**Fichiers** : `src/repository.ts` (interface + `InMemoryRepository`), `src/domain/consentement.ts`,
`src/domain/parsing.ts`, `src/domain/message.ts`, `src/telegram/webhook.ts` (squelette),
leurs tests.
**Dépendances** : lot 1. **Budget** : 20 itérations.

## Lot 3 — Les cœurs
**Critères** : CA-09, CA-10.
**Fichiers** : `src/domain/coeurs.ts`, mise à jour de `src/telegram/webhook.ts` pour
`message_reaction`, leurs tests.
**Dépendances** : lot 2. **Budget** : 15 itérations.

## Lot 4 — Les signaux collectifs
**Critères** : CA-11, CA-11bis, CA-12, CA-13.
**Fichiers** : `src/domain/signal-vendredi.ts`, `src/domain/rappel-lundi.ts`, leurs tests,
`src/cron.ts` (déclencheurs).
**Dépendances** : lot 2. **Budget** : 15 itérations.

## Lot 5 — Les droits
**Critères** : CA-14, CA-15, CA-16, CA-17.
**Fichiers** : `src/domain/donnees.ts`, `src/domain/purge.ts`, leurs tests.
**Dépendances** : lot 2. **Budget** : 15 itérations.

## Lot 6 — Recette (hors loop, fondateur + Développeur)
Déploiement Vercel réel, webhook Telegram configuré, `SupabaseRepository` branché sur un
projet UE réel, parcours de la spec rejoués à la main. Pas de nouveau critère : c'est la
carte Recette de `PROCESS.md`.

Tous les dix-huit critères (CA-01 à CA-17 + CA-11bis) sont couverts, une fois chacun.
