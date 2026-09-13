# ADR-0004 · Isolation de la logique métier

Statut : accepté.

## Contexte
CA-04, CA-05, CA-07, CA-08 (référence, seuils, plafond) sont le détail signature du
produit (carte 02) : « les chiffres n'existent pas ». Ils doivent être vérifiables dès
le lot 1, entièrement par des tests, sans dépendre de Telegram ni d'une vraie base de
données (règle de découpage en lots).

## Options
1. **Modules purs** (`src/domain/*.ts`, fonctions sans effet de bord) pour tout calcul,
   séparés des adaptateurs (`src/telegram/*.ts`, `src/db/*.ts`), reliés par une interface
   de dépôt (`Repository`) injectée : implémentation Supabase en production,
   implémentation en mémoire pour les tests.
2. Tout dans le gestionnaire du webhook, logique et entrées/sorties mélangées : plus
   rapide à écrire, mais chaque test doit alors simuler Telegram et Supabase, fragile et
   lent, contredit « tests d'abord ».

## Choix
Option 1. Le lot 1 ne dépend d'aucun service externe et peut être testé et validé sans
qu'aucun compte Supabase ou Telegram n'existe encore.

## Conséquences
- `src/domain/` : calcul pur, testé unitairement, zéro import de `grammY` ou de Supabase.
- `src/repository.ts` : interface `Repository` (ajouter une séance, lister les six
  dernières, ajouter un cœur, etc.), avec une implémentation `InMemoryRepository` pour
  les tests et une implémentation `SupabaseRepository` pour la production.
- `src/telegram/` : adaptateur `grammY`, ne contient aucun calcul.
- La CI n'a besoin d'aucun secret pour faire passer les tests d'acceptation.

## Réversibilité
Élevée : chaque couche se remplace sans toucher aux autres.
