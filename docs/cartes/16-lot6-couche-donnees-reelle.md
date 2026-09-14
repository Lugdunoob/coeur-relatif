---
carte: 16
nom: "Lot 6 : couche de données réelle (Repository, SupabaseRepository, schéma EU)"
agent: fondateur
skills: []
parents: [11, 05]
statut: approuvee
livrable: src/db/repository.ts, src/db/in-memory.ts, src/db/supabase.ts, src/domain/coeurs.ts, src/domain/donnees.ts, src/domain/purge.ts, test/coeurs.test.ts, test/donnees.test.ts, test/purge.test.ts, scripts/demo-recette.ts, docs/data-model.md, docs/deploiement.md, docs/adr/0005-hebergement-supabase-partage.md
porte: "les 41 tests du dépôt passent ; typecheck et lint propres ; migration Supabase appliquée et vérifiée en SQL"
risque: L2
approuvee_le: 2026-09-14T15:45:00+00:00
veto_jusqu_au: 2026-09-15T15:45:00+00:00
---

## Entrées reçues

Le fondateur a dit « go » pour lancer le Lot 6 (câblage réel), avec autorisation
explicite de créer les comptes/projets nécessaires. `docs/lots.md` classe le Lot 6
« hors loop, fondateur + développeur » : pas une boucle autonome, du travail direct avec
le fondateur présent. Décisions prises en cours de route :
- **Hébergement Supabase** : schéma dédié dans le projet `domelo-dev` existant plutôt
  qu'un nouveau projet payant (10 $/mois) — voir ADR-0005 pour le détail et le risque
  accepté.
- **Repository interface** : ADR-0004 prévoyait `src/repository.ts` (interface
  `Repository` + `InMemoryRepository`/`SupabaseRepository`), jamais extraite aux lots
  1-5 (les fonctions du domaine typaient directement contre `InMemoryRepository`).
  Corrigé ici, à l'emplacement `src/db/repository.ts` (cohérent avec `src/db/schema.ts`
  et `src/db/in-memory.ts` déjà en place, plutôt que la racine `src/` prévue par l'ADR).
- **Repository async** : l'ADR ne précisait pas synchrone ou asynchrone. Un vrai accès
  réseau (Supabase) ne peut pas être synchrone ; choix fait ici, sans reformuler
  explicitement l'ADR (déduction directe, pas une décision nouvelle) : toutes les
  méthodes de `Repository` renvoient une `Promise`.

## Résumé de fin de carte

- **Action proposée** : approuver la couche de données réelle, déjà implémentée et
  vérifiée (tests + vérification SQL directe sur le vrai schéma).
- **Ce qui change** :
  - `src/db/repository.ts` (nouveau) : interface `Repository`, méthodes async.
  - `src/db/in-memory.ts` : `InMemoryRepository implements Repository`, toutes les
    méthodes deviennent `async` (résolvent immédiatement, aucun I/O réel).
  - `src/db/supabase.ts` (nouveau) : `SupabaseRepository implements Repository`, via
    `@supabase/supabase-js`, ciblant le schéma `coeur_relatif` du projet `domelo-dev`
    (`.schema('coeur_relatif').from(...)` à chaque requête plutôt qu'un client
    paramétré par type généré — pas de dépendance à des types Supabase générés pour
    trois tables simples).
  - `src/domain/coeurs.ts`, `donnees.ts`, `purge.ts` : fonctions passées en `async`,
    typées contre `Repository` au lieu de `InMemoryRepository`.
  - `test/coeurs.test.ts`, `donnees.test.ts`, `purge.test.ts` : adaptés à l'async
    (`await` partout), comportement testé inchangé.
  - `scripts/demo-recette.ts` (hors produit) : points 4 et 6 adaptés à l'async, sortie
    identique à avant (revérifié en le relançant).
  - `docs/data-model.md` : ajoute le champ `dernier_rappel_consentement` sur `personne`,
    manquant depuis la carte 05 alors qu'`InMemoryRepository` l'avait déjà — écart
    découvert en écrivant `SupabaseRepository` (aucune table pour le stocker) et corrigé
    par une deuxième migration.
  - `docs/adr/0005-hebergement-supabase-partage.md` (nouveau) : documente le choix
    d'hébergement (schéma partagé, gratuit, risque accepté explicité).
  - `docs/deploiement.md` (nouveau) : variables d'environnement, étapes restantes pour
    aller en production (token Telegram, clé service_role, câblage `grammY`, Vercel).
- **Migration Supabase appliquée** (projet `domelo-dev`, id `feikqaysteuwkipzvggn`) :
  `coeur_relatif_schema_initial` (schéma + 3 tables + RLS sans policy) puis
  `coeur_relatif_rappel_consentement` (colonne manquante ajoutée). Vérifié directement
  en SQL après application : la contrainte `effort between 1 and 10` rejette une valeur
  hors plage, supprimer une `seance` supprime en cascade son `coeur` associé ; toutes
  les données de test insérées pour la vérification ont été supprimées, tables vides à
  la fin.
- **Sources** : ADR-0004 (interface prévue, jamais extraite), ADR-0005 (nouvelle,
  hébergement), décision directe du fondateur pour le go du Lot 6 et le choix
  d'hébergement (voir question posée, réponse « solution 1 »).
- **Ce qui manque** : `src/telegram/webhook.ts` n'est toujours pas câblé avec `grammY`
  (aucune dépendance ajoutée, comme documenté dans son commentaire) — prochaine étape du
  Lot 6, pas faite dans cette carte. Aucun test d'intégration réel contre
  `SupabaseRepository` (nécessiterait la clé service_role, qu'aucun outil ne peut
  exposer à cette session par conception) : seule une vérification SQL directe du
  schéma a été possible depuis ici, pas un test du code TypeScript lui-même contre la
  vraie base. À faire manuellement par le fondateur/développeur une fois
  `SUPABASE_SERVICE_ROLE_KEY` disponible en environnement de développement.
- **Risque** : L2 — touche une infrastructure partagée avec un autre produit
  (`domelo-dev`), une dépense évitée par un choix d'architecture (schéma dédié) plutôt
  qu'une simple correction de fichier. Le risque de fond (données du pilote liées au
  cycle de vie d'un projet de dev pour un autre produit) est documenté et accepté dans
  l'ADR-0005, pas dans cette carte seule.
- **Conséquences** : réversible pour le code (interface + implémentations peuvent
  changer sans impact mutuel, ADR-0004). Moins réversible pour l'hébergement : voir
  ADR-0005 (migration de schéma possible en quelques heures si besoin de sortir du
  projet partagé).
- **À trancher** : rien de réservé restant sur la couche de données elle-même. Reste
  ouvert pour la suite du Lot 6 : câblage `grammY`, obtention du token Telegram et de la
  clé service_role, déploiement Vercel (voir `docs/deploiement.md`).
- **Coût du run** : substantiel comparé aux corrections précédentes (nouvelle interface,
  refactor async de trois modules de domaine et leurs tests, nouvelle implémentation
  complète, deux migrations SQL, quatre documents). Zéro régression (41/41 tests
  toujours verts après le refactor async).

## Journal de décision

- **Décision** : extraire `Repository` (interface async) comme prévu par l'ADR-0004,
  implémenter `SupabaseRepository` dessus, héberger le schéma dans le projet
  `domelo-dev` existant plutôt qu'un nouveau projet payant.
- **Options considérées** (hébergement, détaillées dans ADR-0005) : nouveau projet
  payant (10 $/mois) ; mettre en pause un projet personnel existant pour libérer un
  emplacement gratuit ; schéma dédié dans `domelo-dev` (retenue par le fondateur).
  Options considérées (architecture) : garder `InMemoryRepository` comme type direct et
  faire de `SupabaseRepository` un pseudo-clone structurellement compatible (écartée :
  impossible en TypeScript à cause des champs privés de la classe, qui cassent la
  compatibilité structurelle) ; extraire l'interface prévue par l'ADR-0004 (retenue).
- **Qui a tranché** : le fondateur pour le go du Lot 6 et le choix d'hébergement
  (question posée explicitement, dépense confirmée avant tout coût engagé — au final
  aucun coût, option gratuite choisie). L'agent pour les choix strictement techniques
  découlant de l'ADR-0004 déjà accepté (interface `Repository`, async par nécessité) :
  pas une nouvelle décision de fond, une correction d'écart avec un ADR déjà approuvé.
- **Réversible** : oui pour le code. Pour l'hébergement, voir ADR-0005 (réversible en
  quelques heures via `pg_dump`, pas gratuit en temps).
- **Ce qui ferait revenir dessus** : si `domelo-dev` doit être réinitialisé pour ses
  propres besoins avant la fin du pilote (auquel cas migrer vers un projet dédié avant,
  pas après) ; si le volume de données du pilote dépassait ce qu'un schéma partagé peut
  raisonnablement porter (aucun risque réel à douze personnes).
- **Veto possible jusqu'à** : 2026-09-15T15:45:00+00:00.

## metadata
```json
{
  "criteres_touches": [],
  "trouve_pendant": "Lot 6, couche de données",
  "decideur": "fondateur (hébergement, go du lot) + agent (architecture Repository, ADR-0004 déjà accepté)"
}
```
