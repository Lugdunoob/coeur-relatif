# ADR-0001 · Pile et hébergement

Statut : accepté.

## Contexte
La spec (P1-P8) exige un bot de messagerie qui reçoit des messages privés, publie dans
un groupe, réagit aux cœurs, et envoie deux messages planifiés par semaine (CA-01 à
CA-17). Douze utilisateurs, quatre semaines, aucune donnée de santé au sens de la montre
(CA-17), données en Europe (contrainte de la carte 01).

## Options

| | Node.js/TypeScript + grammY, webhook Vercel, Postgres Supabase | Python + long polling, VM toujours active, SQLite | n8n + nœud Telegram, Postgres |
|---|---|---|---|
| Coût mise en place | Faible : stack déjà en place pour domelo | Moyen : nouvelle pile | Faible au départ |
| Coût fonctionnement | Quasi nul (usage largement sous les paliers gratuits pour 12 personnes) | Un serveur à maintenir en permanence | Un service de plus à héberger |
| Ce que le fondateur sait déjà faire tourner | Vercel, Supabase : oui | Non | Non |
| Risque principal | Limite de temps d'exécution des fonctions serverless (sans objet ici, appels courts) | Service à surveiller, redémarrer | Logique métier non testable en code : contredit « tests d'abord » |
| Sortie | Redéployer sur tout hébergeur Node, quelques heures | Correcte | Migration hors n8n coûteuse |

## Choix
Node.js/TypeScript, framework `grammY` pour Telegram, webhook servi par une fonction
Vercel, stockage Postgres via Supabase. C'est la pile la plus ennuyeuse qui satisfait la
spec, et celle que le fondateur exploite déjà.

## Conséquences
- Le projet Supabase est créé en région UE (Frankfurt ou Irlande), jamais US : c'est la
  contrainte « données UE » de la carte 01, non négociable, à vérifier à la création du
  projet (hors du périmètre de cet agent).
- TypeScript strict, `vitest` pour les tests, ESLint pour le style.
- Les lots suivants séparent logique métier et adaptateurs (voir ADR-0004).

## Réversibilité
Sortir de Vercel : quelques heures, tout hébergeur Node convient. Sortir de Supabase :
export Postgres standard, quelques heures.
