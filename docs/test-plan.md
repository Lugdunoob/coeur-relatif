# Plan de tests · « Cœur relatif »

*Carte 06. Un test exécutable par critère. Tous rouges avant tout code (règle 5 de
PROCESS.md). Commande : `npm test` (vitest). Aucun test n'a besoin d'un vrai compte
Supabase ni Telegram (ADR-0004, `InMemoryRepository`).*

| CA | Type | Fichier de test | Données de test |
|---|---|---|---|
| CA-01 | unitaire | `test/consentement.test.ts` | dépôt en mémoire, personne sans consentement |
| CA-02 | unitaire | `test/consentement.test.ts` | deux relances à moins de 7 jours d'écart |
| CA-03 | unitaire | `test/parsing.test.ts` | chaînes valides et invalides |
| CA-04 | unitaire | `test/etoiles.test.ts` | historique de 1 puis 2 séances |
| CA-05 | unitaire | `test/reference.test.ts` | historiques de 3, 6, et 10 séances à cheval sur deux semaines |
| CA-06 | unitaire | `test/message.test.ts` | génération du message public, recherche d'un nombre autre que les étoiles |
| CA-07 | unitaire | `test/etoiles.test.ts` | une charge par tranche des cinq seuils |
| CA-08 | unitaire | `test/etoiles.test.ts` | deux séances consécutives à effort 10 puis une troisième forte |
| CA-09 | intégration | `test/coeurs.test.ts` | réaction simulée sur une séance, dépôt en mémoire |
| CA-09bis | intégration | `test/coeurs.test.ts`, `test/styles.test.ts` | cœurs sur deux séances le même jour, cœur la veille exclu, cas zéro cœur |
| CA-10 | intégration | `test/coeurs.test.ts` | récapitulatif hebdomadaire de dons |
| CA-11 | unitaire | `test/signal-vendredi.test.ts` | semaine avec plusieurs séances, recherche d'un prénom |
| CA-11bis | unitaire | `test/signal-vendredi.test.ts` | semaine sans aucune séance |
| CA-12 | unitaire | `test/signal-vendredi.test.ts` | personne absente deux semaines, recherche de son prénom dans tout message généré |
| CA-13 | unitaire | `test/rappel-lundi.test.ts` | comparaison texte-à-texte, deux semaines différentes |
| CA-14 | intégration | `test/donnees.test.ts` | deux personnes, vérifier l'isolation |
| CA-15 | intégration | `test/donnees.test.ts` | suppression puis relecture, doit être vide |
| CA-16 | unitaire | `test/purge.test.ts` | séance datée avant et après le seuil fin-pilote + 30 jours |
| CA-17 | statique | `test/schema.test.ts` | introspection des types du modèle, recherche des noms de champs interdits |
