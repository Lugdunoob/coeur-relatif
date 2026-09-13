# ADR-0003 · Région des données

Statut : accepté.

## Contexte
Contrainte non négociable de la carte 01 : données en Europe. Minutes et effort ressenti
sont traités comme des données de santé par prudence (carte 02).

## Options
1. Projet Supabase créé explicitement en région UE (Frankfurt `eu-central-1` ou Irlande
   `eu-west-1`).
2. Région par défaut du compte (souvent US) : violerait la contrainte, écartée sans
   discussion possible.

## Choix
Région UE explicite, vérifiée à la création du projet, avant tout stockage de donnée
personnelle.

## Conséquences
Aucune donnée de test avec de vraies minutes/effort ne doit transiter par un
environnement de développement hébergé hors UE. Les tests unitaires et d'intégration de
ce dépôt utilisent un dépôt en mémoire (ADR-0004), donc aucune vraie base de données
n'est nécessaire pour les faire passer.

## Réversibilité
Aucune : un changement de région Supabase impose une migration de données, à éviter.
