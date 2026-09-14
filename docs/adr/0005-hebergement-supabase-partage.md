# ADR-0005 · Hébergement Supabase : schéma dédié dans un projet partagé

Statut : accepté.

## Contexte
Lot 6 (Recette technique, docs/lots.md) : brancher `SupabaseRepository` sur un vrai
projet Supabase en région UE (ADR-0003). Le fondateur a demandé de tout créer pour lui.
Un nouveau projet dans son organisation Supabase ("Lodge") coûte 10 $/mois, car les deux
emplacements gratuits de l'organisation sont déjà pris par deux projets existants
(`noe.piantoni@yahoo.fr's Project`, `eu-west-1`, et `domelo-dev`, `eu-central-1`).

## Options
1. **Nouveau projet dédié, payant** (10 $/mois) : isolation complète, mais une dépense
   récurrente pour un pilote à douze personnes.
2. **Mettre en pause un projet existant** pour libérer un emplacement gratuit, puis créer
   un projet dédié gratuit : isolation complète, gratuit, mais touche un projet
   personnel dont l'usage actuel n'est pas connu de cette carte.
3. **Schéma dédié `coeur_relatif` dans le projet `domelo-dev` existant** (déjà en
   `eu-central-1`, conforme à l'ADR-0003) : gratuit, isolation par schéma Postgres +
   RLS activé sans policy (deny-by-default), aucune donnée mélangée avec les tables
   `public.*` de domelo. C'est le patron déjà utilisé par plusieurs tables de
   `domelo-dev` elles-mêmes (`jobs`, `monitoring_alerts`, etc. : « RLS activé sans
   policy = deny-by-default, écrite/lue uniquement par crons & Edge Functions via
   service_role »).

Choisi par le fondateur : option 3.

## Choix
Schéma Postgres `coeur_relatif` (tables `personne`, `seance`, `coeur`, voir
`docs/data-model.md`) créé dans le projet Supabase `domelo-dev`
(id `feikqaysteuwkipzvggn`, région `eu-central-1`). RLS activé sur les trois tables,
aucune policy : seul le service_role (utilisé par le bot côté serveur) peut lire ou
écrire, jamais `anon` ni `authenticated`. Migration appliquée le 2026-09-14
(`coeur_relatif_schema_initial`).

## Conséquences
- Gratuit : aucun coût supplémentaire pour le pilote.
- Conforme à l'ADR-0003 (région UE, `eu-central-1`).
- **Risque accepté** : les données du pilote partagent l'infrastructure physique d'un
  projet de développement pour un produit différent (domelo). Si `domelo-dev` est un
  jour réinitialisé ou supprimé pour les besoins de ce produit, les données de Cœur
  relatif partiraient avec, sans lien avec le cycle de vie du pilote. Acceptable pour un
  pilote à douze personnes dont les données sont de toute façon purgées à fin-pilote +
  30 jours (R9), mais **à ne pas reconduire tel quel pour une version vendue** avec de
  vrais clients payants.
- Le service_role de `domelo-dev` a désormais accès aux tables `coeur_relatif.*` : c'est
  la clé déjà utilisée par ce projet, pas une clé nouvelle à distribuer.

## Réversibilité
Sortir de ce schéma partagé vers un projet dédié : `pg_dump --schema=coeur_relatif`,
recréer le schéma dans un nouveau projet, mettre à jour la chaîne de connexion du bot.
Quelques heures, aucune perte de données si fait avant une éventuelle réinitialisation
de `domelo-dev`.
