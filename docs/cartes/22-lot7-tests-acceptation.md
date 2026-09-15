---
carte: 22
nom: Lot 7 — Tests d'acceptation (cœurs sociaux)
agent: architecte
skills: [tests-dabord, challenge]
parents: [20, 21]
statut: approuvee
livrable: docs/cartes/22-lot7-tests-acceptation.md (ce document), docs/test-plan.md mis à jour, tests rouges commités (CA-18 à CA-26), squelettes minimaux (src/domain/signal-pays.ts, src/domain/anti-abus.ts, src/domain/flux-anonymise.ts, src/domain/fond-ecran.ts, src/db/schema.ts mis à jour)
porte: "aucun test ne doit passer au vert dans ce loop : ce serait soit un code applicatif déjà écrit (interdit ici), soit un test qui ne teste rien"
risque: L0
approuvee_le: 2026-09-15T09:30:00+00:00
veto_jusqu_au: 2026-09-16T09:30:00+00:00
---

## Entrées reçues

Carte 21 (architecture, approuvée) : modèle de données, anti-abus, conséquence R9,
découpage en quatre sous-lots. `docs/spec.md` mis à jour (CA-18 à CA-26).

## Résumé de fin de carte

**Action** : un test par nouveau critère, exécutable et rouge, plus le squelette minimal
nécessaire pour qu'il s'exécute (types dans `src/db/schema.ts`, fonctions du domaine qui
lèvent une erreur explicite « non implémenté » plutôt que du code applicatif réel — règle
absolue du loop : aucun code de production dans ce loop).

| CA | Type | Fichier de test | Squelette qui lève l'erreur |
|---|---|---|---|
| CA-18 | unitaire | `test/signal-pays.test.ts` | `src/domain/signal-pays.ts` → `signalPays` |
| CA-19 | unitaire | `test/signal-pays.test.ts` | `src/domain/signal-pays.ts` → `signalPays` |
| CA-20 | statique | `test/signal-pays.test.ts` | `src/domain/signal-pays.ts` → `NIVEAUX_AGREGATION_AUTORISES` (valeur volontairement fausse) |
| CA-21 | intégration | `test/anti-abus.test.ts` | `src/domain/anti-abus.ts` → `peutEnvoyerCoeurATousLeMonde` |
| CA-22 | intégration | `test/anti-abus.test.ts` | `src/domain/anti-abus.ts` → `envoyerCoeurATousLeMonde` |
| CA-23 | unitaire | `test/flux-anonymise.test.ts` | `src/domain/flux-anonymise.ts` → `fluxActivitesAnonymes` |
| CA-24 | unitaire | `test/flux-anonymise.test.ts` | `src/domain/flux-anonymise.ts` → `fluxActivitesAnonymes` |
| CA-25 | intégration | `test/fond-ecran.test.ts` | `src/domain/fond-ecran.ts` → `fondEcranCoeursRecus` |
| CA-26 | statique | `test/schema-lot7.test.ts` | `src/db/schema.ts` → `CHAMPS_PERSONNE` (n'inclut pas encore `equipeId`, intentionnellement) |

Chaque squelette lève une erreur explicite (`Error('CA-NN : ... non implémenté ...')`)
ou expose une valeur volontairement incomplète (CA-20, CA-26) plutôt que de simuler un
comportement correct : ce loop ne doit produire aucune illusion de fonctionnalité.

**Vérification faite avant approbation** :
1. `grep` de chaque `CA-NN` du tableau `docs/spec.md` (CA-18 à CA-26) dans `test/` : 0
   manquant (voir commande ci-dessous, exécutée).
2. `npm test` : les 9 nouveaux tests échouent (rouge), les 46 tests existants restent
   verts.
3. `git diff --stat main -- docs/spec.md` : seules les sections P1, P9, Règles (R7, R11-
   R13) et le tableau des critères (CA-18 à CA-26) ont changé.
4. `git branch --show-current` → `plan-lot7`.
5. R13 (conversion qualitative) et la limite de cloisonnement (ADR-0007) apparaissent
   toutes deux en toutes lettres dans le diff de la branche.

**Sources** : `docs/spec.md`, `docs/lots.md`, `docs/data-model.md`,
`docs/adr/0007-*.md`.

**Risque** : L0 — aucun code applicatif, seulement des tests et des types/squelettes qui
échouent intentionnellement.

**Coût du run** : écriture de 9 tests, 4 nouveaux fichiers de squelette, mise à jour de
`src/db/schema.ts` et `docs/test-plan.md` ; exécution de `npm test`.

## Challenge

**1 · Mineure · CA-20 et CA-26 sont des critères « négatifs » ou « de forme » — un peu
artificiels comme tests unitaires. Est-ce un test valable ou un contournement pour cocher
la case « un test par critère » ?** Un test qui vérifie une constante volontairement
fausse ou un champ volontairement absent est réel (il échoue pour la bonne raison, il
passera quand et seulement quand le lot de code aura fait le bon choix), mais mérite
d'être signalé comme différent des tests de comportement (CA-18, CA-21…).
Alternative : aucune, la nature « statique » de ces deux critères (déjà indiquée dans
`docs/test-plan.md` comme colonne « Type ») rend ce test légitime, à la manière de
CA-17 déjà dans le pilote (introspection des champs interdits).
Ce qui tranche : accepté tel quel, type « statique » déjà documenté dans le tableau
ci-dessus, cohérent avec le précédent CA-17.

**Verdict : accepté sans réserve.**

## Réponses de l'auteur

1. **Accepte.** Type « statique » explicite dans le tableau, cohérent avec CA-17.

## Journal de décision

- **Décision** : 9 tests rouges écrits (un par CA-18 à CA-26), 4 squelettes minimaux
  (`signal-pays.ts`, `anti-abus.ts`, `flux-anonymise.ts`, `fond-ecran.ts`),
  `src/db/schema.ts` étendu (types `Pays`/`Entreprise`/`Equipe`, champs optionnels sur
  `Personne`/`Coeur`), `docs/test-plan.md` complété. Les 46 tests existants restent
  verts (vérifié par exécution).
- **Options considérées** : simuler un comportement plausible mais incorrect (ex.
  `signalPays` qui somme au lieu de prendre la médiane) plutôt que lever une erreur
  explicite — écartée : plus proche d'un vrai TDD « on écrit le mauvais raccourci
  d'abord », mais risque plus élevé d'introduire un bug qui ne serait pas celui prévu et
  de brouiller la lecture du diff pour la vérification binaire ; l'erreur explicite est
  plus sûre et tout aussi rouge.
- **Qui a tranché** : le Stratège, après challenge du Contradicteur.
- **Réversible** : oui, ce sont des tests et des types, aucun comportement de production.
- **Ce qui ferait revenir dessus** : si le lot de code (Lot 7.1-7.4) découvre qu'un
  squelette manque un cas non anticipé ici (ex. une personne dans plusieurs pays) — pas
  observé dans les cartes précédentes, donc pas anticipé davantage ici.
- **Veto possible jusqu'à** : 2026-09-16T09:30:00+00:00.

## metadata
```json
{
  "type": "tests-acceptation",
  "nouveaux_tests": ["test/signal-pays.test.ts", "test/anti-abus.test.ts", "test/flux-anonymise.test.ts", "test/fond-ecran.test.ts", "test/schema-lot7.test.ts"],
  "nouveaux_squelettes": ["src/domain/signal-pays.ts", "src/domain/anti-abus.ts", "src/domain/flux-anonymise.ts", "src/domain/fond-ecran.ts"],
  "criteres_couverts": ["CA-18","CA-19","CA-20","CA-21","CA-22","CA-23","CA-24","CA-25","CA-26"],
  "tests_existants_verts": 46,
  "carte_suivante_proposee": "aucune — fin du loop plan-lot7, Lot 7 de code (7.1-7.4) à lancer séparément"
}
```
