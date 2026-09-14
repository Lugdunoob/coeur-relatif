# Déploiement · « Cœur relatif »

*Lot 6 (docs/lots.md), hors loop, fondateur + développeur. Rassemble ce qu'il faut pour
faire tourner le bot pour de vrai — rien de ceci n'est nécessaire pour `npm test`.*

## Variables d'environnement

| Variable | Où la trouver | Note |
|---|---|---|
| `SUPABASE_URL` | `https://feikqaysteuwkipzvggn.supabase.co` (projet `domelo-dev`) | Fixe, pas un secret. |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard Supabase → projet `domelo-dev` → Project Settings → API → clé `service_role` | **Secret.** Jamais commité, jamais donné à un agent : aucun outil ne l'expose (voir ADR-0005). À définir uniquement dans les variables d'environnement Vercel. |
| `TELEGRAM_BOT_TOKEN` | `@BotFather` sur Telegram → `/newbot` | **Secret.** Créé par le fondateur (compte Telegram personnel), jamais par un agent. Obtenu le 2026-09-14, bot `@Coeursportbot` ("Coeur sport"), vérifié via `getMe`. Stocké dans `.env` (gitignoré), à reporter dans les variables d'environnement Vercel au déploiement. |

`SupabaseRepository` (`src/db/supabase.ts`) cible le schéma `coeur_relatif` du projet
`domelo-dev`, pas le schéma `public` (voir ADR-0005) — aucune table du reste de domelo
n'est touchée.

## Ce qui reste à faire pour aller en production
1. ~~Créer le bot via `@BotFather`, récupérer `TELEGRAM_BOT_TOKEN`.~~ Fait le 2026-09-14.
2. Récupérer `SUPABASE_SERVICE_ROLE_KEY` depuis le dashboard Supabase.
3. Câbler `src/telegram/webhook.ts` avec `grammY` (import du token, des gestionnaires
   `message`/`message_reaction`/commandes `/mesdonnees` et `/supprimer`) — pas encore
   fait, voir le commentaire de branchement futur dans ce fichier.
4. Déployer sur Vercel (`vercel deploy`, variables d'environnement ci-dessus dans les
   Project Settings Vercel) — aucun outil Vercel disponible depuis une session Claude
   Code, à faire par le fondateur ou un accès Vercel à donner explicitement.
5. Configurer le webhook Telegram (`setWebhook` vers l'URL Vercel), avec
   `allowed_updates` incluant `message_reaction` (ADR-0002, à vérifier contre la doc
   Telegram au câblage réel).
6. Rejouer à la main les huit points du parcours de Recette (`docs/spec.md`, P1-P8)
   avec de vrais messages Telegram, pas la démo en mémoire (`scripts/demo-recette.ts`).

## Vérification du schéma réel
La migration `coeur_relatif_schema_initial` (+ `coeur_relatif_rappel_consentement`) a
été appliquée le 2026-09-14. Vérifiée directement en SQL au moment de la carte 16 :
contrainte `effort between 1 and 10` rejette bien une valeur hors plage, et supprimer une
`seance` supprime en cascade ses `coeur` (`on delete cascade`). Aucune donnée de test
laissée dans les tables après vérification.
