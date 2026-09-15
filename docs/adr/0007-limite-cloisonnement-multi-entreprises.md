# ADR-0007 · Limite du cloisonnement multi-entreprises (équipe/entreprise/pays)

Statut : accepté.

## Contexte
Carte 18 (cadrage Lot 7), réponse du fondateur à la question d'échelle des données :
« Pensé multi-entreprises » — le modèle de données doit porter la hiérarchie
équipe → entreprise → pays dès maintenant, même si le pilote (12 personnes, un bureau)
n'en peuple qu'une ligne par niveau. Le challenge de la carte 18 (point 2) relève que
trois tables sans authentification, sans notion d'administrateur par entreprise et sans
cloisonnement d'accès ne suffisent pas à isoler réellement deux entreprises si le pilote
reste sur la même base Supabase partagée (ADR-0005 : schéma `coeur_relatif` dans le
projet `domelo-dev`, RLS activé sans policy, un seul `service_role` avec accès complet).
Construire les tables sans le dire donnerait une fausse impression d'être prêt pour
plusieurs entreprises. Cette carte tranche l'écriture de cette limite, comme demandé
explicitement par le fondateur (carte 18, réponse au challenge 2).

## Ce que ce Lot 7 construit
`pays`, `entreprise`, `equipe`, `personne.equipe_id` (voir `docs/data-model.md`) :
une **forme** de hiérarchie à trois niveaux, pour que le signal qualitatif pays/région
(R13, `docs/spec.md`) et une éventuelle vente à plusieurs entreprises plus tard n'exigent
pas de migrer un schéma plat. Le pilote actuel peuple exactement une ligne à chaque
niveau.

## Ce que ce Lot 7 ne construit pas (limite explicite)

**Les tables `equipe`/`entreprise`/`pays` ne créent aucun cloisonnement d'accès réel
entre entreprises.** Concrètement, à la fin de ce lot :
- Le schéma Postgres reste partagé (ADR-0005) : un seul `service_role` a accès à
  l'intégralité du schéma `coeur_relatif`, RLS activé sans policy différenciée par
  entreprise (deny-by-default global — bloque `anon`/`authenticated`, pas un
  deny-by-tenant qui distinguerait une entreprise d'une autre).
- Un jeton personnel (ADR-0006) identifie une personne, pas une entreprise. Rien dans
  l'API ou la base ne vérifie qu'une requête portant sur une `equipe_id` ou une
  `entreprise_id` donnée appartient bien à la personne qui la fait : cette vérification,
  si elle existe, seulement parce que le code applicatif l'aura écrite explicitement à
  chaque requête, pas parce que la base l'impose.
- Il n'existe aucune policy Postgres RLS par tenant, aucun rôle Supabase par entreprise,
  aucun compte administrateur d'entreprise, aucune interface de gestion multi-tenant.

**Tant qu'une seule entreprise existe réellement (le pilote), ce risque est théorique.**
Il devient réel dès qu'une deuxième entreprise est ajoutée sur ce même schéma : rien
n'empêcherait alors, techniquement, une requête mal écrite ou un bug de renvoyer des
données d'une entreprise à une personne d'une autre entreprise.

**Ne pas ajouter de deuxième entreprise réelle sur ce schéma avant d'avoir livré le
cloisonnement** (RLS par `entreprise_id`, ou projets/schémas Supabase séparés par
entreprise) — c'est un chantier distinct, non planifié par ce Lot 7 ni par aucun lot
existant de `docs/lots.md`.

## Options considérées
1. Construire les tables sans documenter la limite : écartée, laisse croire à un
   cloisonnement déjà fait, risque direct pour un futur lecteur (ou un futur argument
   commercial promettant une isolation qui n'existe pas).
2. Construire le cloisonnement réel dès ce lot (policies RLS par entreprise, jetons
   scopés par tenant) : écartée pour ce Lot 7 — hors mandat de la carte 18 (« pas encore
   une architecture détaillée »), coût disproportionné tant qu'aucune deuxième
   entreprise réelle n'existe pour valider le design, et retarderait le signal
   pays/région et P9 qui n'en ont pas besoin pour le pilote actuel.
3. Construire la forme sans cloisonnement réel, et l'écrire noir sur blanc comme limite
   explicite, chantier distinct — retenue (acceptée par le fondateur, carte 18, réponse
   au challenge 2).

## Choix
Option 3, avec une mitigation partielle documentée comme **convention de code, pas comme
cloisonnement** : toute requête d'agrégation par équipe, entreprise ou pays (notamment le
calcul du signal R13) doit filtrer explicitement par l'identifiant du niveau concerné
(`pays_id`, `entreprise_id`, `equipe_id`) plutôt que de scanner toutes les lignes sans
filtre. Cette convention réduit le risque d'un bug qui mélangerait deux groupes par
simple oubli, mais elle **ne remplace pas** une policy RLS : un code applicatif qui
oublierait ce filtre continuerait de fonctionner (accès complet du `service_role`) sans
qu'aucune erreur ne le signale.

## Conséquences
- `docs/data-model.md` documente les trois tables comme une forme, avec un renvoi
  explicite à cet ADR pour la limite de cloisonnement.
- Le Lot 7.1 (`docs/lots.md`) doit appliquer la convention de filtrage explicite dans
  toute fonction d'agrégation qu'il écrit (`src/domain/signal-pays.ts` notamment).
- Aucune donnée du pilote actuel n'est concernée : une seule entreprise, un seul pays,
  une seule équipe peuplés — le risque documenté ici ne s'active qu'avec une deuxième
  entreprise réelle.
- Une future carte de cadrage (pas ce Lot 7) devra spécifier le cloisonnement réel avant
  toute vente à une deuxième entreprise sur ce schéma : policies RLS par `entreprise_id`,
  ou séparation physique par projet/schéma Supabase par entreprise (extension du choix de
  l'ADR-0005, à rouvrir à ce moment-là).

## Réversibilité
Élevée pour la forme (colonnes et tables ajoutables/migrables sans perte tant qu'une
seule entreprise existe). Le cloisonnement réel, lui, n'est pas une simple extension :
c'est un chantier à part entière (policies RLS, tests d'isolation, éventuellement
séparation physique), non estimé ici.
