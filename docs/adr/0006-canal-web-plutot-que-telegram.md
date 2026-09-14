# ADR-0006 · Canal web (PWA) plutôt que Telegram

Statut : accepté.

## Contexte
ADR-0002 avait choisi Telegram comme canal, avec une réversibilité jugée « élevée »
grâce à l'isolation de la logique métier (ADR-0004). Le fondateur a testé le bot réel
pendant la Recette (carte 17) et remonte des limites structurelles, pas des bugs :
aucune charte graphique possible, aucun branding par entreprise, un format chat mal
adapté à une éventuelle évolution (scores de groupe, classements — déjà notés comme
tension avec le détail signature dans `docs/programme.md`). Question posée dès le
21014-09-14 dans `docs/programme.md` (« quel canal pour la version vendue ») : tranchée
ici, pendant la Recette plutôt qu'après, à la demande du fondateur qui vient de vivre
l'expérience Telegram en direct.

## Options
1. **Rester sur Telegram.** Gratuit, zéro installation, mais aucun branding, aucune
   mise en page propre, mal adapté à toute évolution visuelle future.
2. **APK Android natif.** Écarté explicitement par le fondateur : c'est l'option la
   plus bloquée par les politiques d'entreprise (MDM, sources inconnues désactivées) —
   contraire à l'objectif « pas de barrière d'installation ».
3. **Application desktop dédiée.** Nécessite une installation par poste, mêmes
   barrières côté IT qu'un APK, développement multiplateforme (Electron ou natif) pour
   un pilote à douze personnes.
4. **PWA (Progressive Web App).** Un site web, installable depuis le navigateur sans
   App Store ni APK (« Ajouter à l'écran d'accueil »), utilisable aussi bien sur
   téléphone que sur ordinateur de bureau sans rien développer de plus. Branding total.

## Choix
Option 4. La PWA **remplace entièrement** Telegram (pas de coexistence) : un seul canal
à maintenir, une seule expérience pour les douze collègues. `src/domain/` (calcul,
règles) et `src/db/` (`Repository`, `SupabaseRepository`) restent identiques — c'est
exactement ce que l'isolation de l'ADR-0004 devait permettre. Seule la couche
`src/telegram/*` est remplacée par une interface web + des routes API sur la même
pile Vercel/Supabase (ADR-0001 tient toujours).

**Identification sans mot de passe** : un lien personnel unique par collègue
(`https://.../app?p=<jeton secret>`), envoyé par le fondateur lui-même (comme
l'invitation Telegram aujourd'hui), pas de compte Supabase Auth partagé avec le vrai
produit domelo. Le jeton devient directement l'identifiant de la personne (réutilise le
champ `personne.id_telegram` — voir « Dette de nommage » ci-dessous).

## Conséquences
- Le travail déjà fait sur `src/telegram/bot.ts`, `api/telegram.ts`, `api/cron/*.ts`
  (carte 17) n'est pas perdu comme code (le dépôt/domaine reste identique) mais n'est
  plus branché : le webhook Telegram doit être retiré (`deleteWebhook`) et ces fichiers
  peuvent être supprimés ou laissés inertes selon ce que veut le fondateur (décision
  distincte, pas prise ici).
- Le lien message ↔ séance (`Seance.messageIdTelegram`, carte 17) devient inutile : une
  séance a déjà son propre `id`, la page web peut le référencer directement pour un
  ❤️ sans passer par un `message_id` Telegram. Champ laissé en base (inoffensif,
  nullable) plutôt que migré à nouveau tout de suite.
- **Dette de nommage assumée** : `Personne.idTelegram` / `personne.id_telegram` et
  `Coeur.donneurId` / `coeur.donneur_id_telegram` gardent leur nom hérité de l'ère
  Telegram alors qu'ils portent maintenant un jeton web générique. Renommer proprement
  (14 fichiers touchés) coûterait plus cher que ce que ça rapporte tant que le champ
  reste un simple identifiant opaque de chaîne de caractères des deux côtés — repoussé
  à une carte dédiée si ça devient vraiment gênant.
- Portée de cette première version web : consentement (P1), déclaration par boutons
  (P2/P3, carte 13), `/mesdonnees`, `/supprimer` (P8). Le flux collectif (P4 : être vu
  du groupe ; P5 : cœurs ; P6/P7 : signaux vendredi/lundi) est explicitement hors
  périmètre de cette carte, à construire ensuite (nécessite une vraie vue de groupe,
  pas juste un menu personnel).

## Réversibilité
Élevée, comme pour ADR-0002 : la logique métier ne change pas, seul l'adaptateur
change. Revenir à Telegram (ou ajouter un deuxième canal) reprendrait
`src/telegram/bot.ts` tel quel.
