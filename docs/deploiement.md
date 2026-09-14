# Déploiement · « Cœur relatif »

*Lot 6 (docs/lots.md), hors loop, fondateur + développeur. Rassemble ce qu'il faut pour
faire tourner le bot pour de vrai — rien de ceci n'est nécessaire pour `npm test`.*

## Variables d'environnement

| Variable | Où la trouver | Note |
|---|---|---|
| `SUPABASE_URL` | `https://feikqaysteuwkipzvggn.supabase.co` (projet `domelo-dev`) | Fixe, pas un secret. |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard Supabase → projet `domelo-dev` → Project Settings → API → clé `service_role` | **Secret.** Fournie par le fondateur le 2026-09-14 (aucun outil de cette session ne peut la lire lui-même, par conception — voir ADR-0005). Stockée dans `.env` (gitignoré), vérifiée par `scripts/verif-supabase.ts` (gitignoré, hors produit) contre le vrai projet : lecture/écriture/suppression fonctionnent, aucune donnée de test restante. À reporter dans les variables d'environnement Vercel au déploiement. |
| `TELEGRAM_BOT_TOKEN` | `@BotFather` sur Telegram → `/newbot` | **Secret.** Créé par le fondateur (compte Telegram personnel), jamais par un agent. Obtenu le 2026-09-14, bot `@Coeursportbot` ("Coeur sport"), vérifié via `getMe`. Stocké dans `.env` (gitignoré), à reporter dans les variables d'environnement Vercel au déploiement. |
| `TELEGRAM_GROUP_CHAT_ID` | Ajouter le bot au vrai groupe Telegram du pilote, puis lire l'id du chat (ex. via `getUpdates` après un premier message dans le groupe) | Pas encore posée : le groupe des douze collègues n'existe pas encore. Le bot fonctionne sans (déclarations enregistrées en privé), seule la publication P4 est différée tant que cette variable est absente (voir `src/telegram/bot.ts`). |
| `FIN_PILOTE` | Date de fin du pilote (ISO, ex. `2026-10-15`), décision du fondateur | Nécessaire pour le cron de purge (R9, CA-16). Pas encore posée : la date de fin du pilote n'est pas encore fixée. |
| `CRON_SECRET` | Vercel la fournit automatiquement à ses propres invocations planifiées quand cette variable est définie | Optionnelle mais recommandée : évite qu'un tiers déclenche les routes `/api/cron/*` en devinant leur URL (l'URL de déploiement est publique, protection Vercel Authentication désactivée, voir plus bas). |
| `TELEGRAM_WEBHOOK_SECRET` | Choisi par le fondateur, transmis à Telegram via le paramètre `secret_token` de `setWebhook` | Optionnelle : si posée, `src/telegram/webhook.ts` vérifie l'en-tête `X-Telegram-Bot-Api-Secret-Token` avant de traiter la mise à jour. |

`SupabaseRepository` (`src/db/supabase.ts`) cible le schéma `coeur_relatif` du projet
`domelo-dev`, pas le schéma `public` (voir ADR-0005) — aucune table du reste de domelo
n'est touchée.

## Ce qui reste à faire pour aller en production
1. ~~Créer le bot via `@BotFather`, récupérer `TELEGRAM_BOT_TOKEN`.~~ Fait le 2026-09-14.
2. ~~Récupérer `SUPABASE_SERVICE_ROLE_KEY` depuis le dashboard Supabase.~~ Fait et
   vérifié le 2026-09-14.
3. ~~Créer le projet Vercel, le lier au dépôt GitHub, poser les variables
   d'environnement.~~ Fait le 2026-09-14 via un token d'accès Vercel fourni par le
   fondateur (voir « Projet Vercel » ci-dessous) — pas besoin de repasser par le
   dashboard.
4. ~~Câbler `src/telegram/webhook.ts` avec `grammY`.~~ Fait le 2026-09-14 (carte 17) :
   `src/telegram/bot.ts` (logique), `src/telegram/webhook.ts` (adaptateur Vercel),
   `api/telegram.ts` (point d'entrée), `api/cron/*.ts` (jobs planifiés).
5. Configurer le webhook Telegram (`setWebhook` vers l'URL Vercel), avec
   `allowed_updates` incluant `message_reaction` (ADR-0002) — pas encore fait, attend
   l'URL de déploiement définitive.
6. Créer le vrai groupe Telegram du pilote, y ajouter le bot, poser
   `TELEGRAM_GROUP_CHAT_ID`.
7. Fixer la date de fin du pilote (décision du fondateur), poser `FIN_PILOTE`.
8. Rejouer à la main les huit points du parcours de Recette (`docs/spec.md`, P1-P8)
   avec de vrais messages Telegram, pas la démo en mémoire (`scripts/demo-recette.ts`).

## Projet Vercel
Créé le 2026-09-14 via l'API Vercel (token d'accès fourni par le fondateur, jamais
donné au dépôt ni committé — stocké dans `.env`, gitignoré) :
- Projet `coeur-relatif` (id `prj_u3m1PiNA8hf6W7syQEdMcBGzHn1j`), équipe
  `lugdunoobs-projects` (id `team_S4bSZfJHniW7IANhiVMfs7YX`).
- Lié au dépôt GitHub `Lugdunoob/coeur-relatif`, branche de production `main` : chaque
  push déclenche un déploiement automatique, aucune commande manuelle nécessaire.
- Les 3 variables d'environnement posées (chiffrées côté Vercel, valeurs jamais
  relues depuis cette session après écriture) : `TELEGRAM_BOT_TOKEN` (production
  seulement), `SUPABASE_SERVICE_ROLE_KEY` (production seulement), `SUPABASE_URL`
  (production, preview, development).
- **Protection Vercel Authentication désactivée** (`ssoProtection` était à
  `all_except_custom_domains` par défaut, donc active sur l'URL `*.vercel.app` qu'on
  utilise faute de domaine personnalisé) : sans ça, Telegram recevrait une page de
  connexion Vercel au lieu d'une réponse 200 à son webhook, et le webhook ne
  fonctionnerait jamais. Mis à `null` (désactivé) le 2026-09-14. Conséquence acceptée :
  l'URL de déploiement est publiquement joignable — sans risque ici, le webhook ne fait
  rien sans une mise à jour Telegram valide, et les futures routes de cron seront
  protégées par un secret partagé (`CRON_SECRET`, à ajouter au câblage `grammY`).

## Vérification du schéma réel
La migration `coeur_relatif_schema_initial` (+ `coeur_relatif_rappel_consentement`) a
été appliquée le 2026-09-14. Vérifiée directement en SQL au moment de la carte 16 :
contrainte `effort between 1 and 10` rejette bien une valeur hors plage, et supprimer une
`seance` supprime en cascade ses `coeur` (`on delete cascade`). Aucune donnée de test
laissée dans les tables après vérification.

Vérifiée une deuxième fois de bout en bout le 2026-09-14 avec la vraie clé
`service_role` et le vrai code TypeScript (`scripts/verif-supabase.ts`, pas seulement du
SQL manuel) : créer une personne, une séance, un cœur, un rappel de consentement, puis
tout supprimer — chaque étape lue et confirmée contre le projet réel.

### Exposition du schéma `coeur_relatif` (à refaire si le schéma est recréé)
Un schéma Postgres créé dans Supabase n'est pas automatiquement accessible via l'API
REST (PostgREST) : deux réglages en plus de la migration elle-même, sans lesquels
`SupabaseRepository` échoue avec `PGRST106`/`PGRST205`/`42501`.
1. **Exposer le schéma** (en plus de `public, graphql_public`, sans les retirer) :
   ```sql
   alter role authenticator set pgrst.db_schemas = 'public, graphql_public, coeur_relatif';
   notify pgrst, 'reload config';
   notify pgrst, 'reload schema';
   ```
2. **Donner les droits Postgres à `service_role`** (RLS deny-by-default n'empêche pas
   ces droits d'être nécessaires en plus, pour toute nouvelle table de ce schéma) :
   ```sql
   grant usage on schema coeur_relatif to service_role;
   grant all on all tables in schema coeur_relatif to service_role;
   grant all on all sequences in schema coeur_relatif to service_role;
   alter default privileges in schema coeur_relatif grant all on tables to service_role;
   alter default privileges in schema coeur_relatif grant all on sequences to service_role;
   ```
Fait une fois pour toutes le 2026-09-14 sur le projet `domelo-dev` ; les futures tables
créées dans `coeur_relatif` héritent des droits par défaut (`alter default privileges`
ci-dessus), pas besoin de refaire le `grant` à chaque nouvelle table.
