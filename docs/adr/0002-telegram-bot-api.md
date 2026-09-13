# ADR-0002 · Telegram comme canal, dépendance externe

Statut : accepté.

## Contexte
La carte 02 (Méthode Musk) a fixé Telegram comme canal. Cette décision documente la
dépendance externe qu'elle crée : conditions d'accès, prix, ce qui arrive si elle change.

## Options
1. **Telegram Bot API**, officielle, gratuite, via `grammY` (librairie TypeScript
   moderne, webhook natif, types à jour). Les réactions à un message (❤️) sont exposées
   depuis la version 7.0 de l'API Bot (fin 2023) via les mises à jour `message_reaction`,
   à activer explicitement dans `allowed_updates` — **à vérifier à l'implémentation**
   contre la documentation officielle Telegram, non revérifié dans cette carte.
2. WhatsApp Business API : écartée dans une carte antérieure de la Régie (HTTPS public,
   fenêtre de 24 h, conversation individuelle uniquement, inadapté à un groupe).
3. Slack : viable techniquement, mais les collègues du fondateur ne l'utilisent pas ;
   Telegram est déjà le canal confirmé de la Régie elle-même.

## Choix
Telegram Bot API via `grammY`. Confirmé par la carte 02.

## Conséquences
- Le webhook doit être une URL HTTPS publique : Vercel la fournit nativement (ADR-0001).
- Aucun SLA contractuel sur l'API Telegram : c'est un risque accepté, gratuit, pour un
  pilote de quatre semaines.
- La réception des réactions ❤️ (CA-09) dépend d'`allowed_updates` correctement configuré ;
  un test d'intégration doit le vérifier dès le lot 3.

## Réversibilité
Faible dépendance grâce à l'isolation de la logique métier (ADR-0004) : changer de
plateforme de messagerie remplace l'adaptateur, pas le calcul.
