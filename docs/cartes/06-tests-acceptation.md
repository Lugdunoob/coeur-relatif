---
carte: 06
nom: Tests d'acceptation
agent: architecte
skills: [architecture, tests-dabord]
parents: [05]
statut: approuvee
livrable: test/*.test.ts (18 critères)
porte: "les tests d'acceptation sont rouges, pas absents"
risque: L0
approuvee_le: 2026-09-13T21:12:50+00:00
veto_jusqu_au: 2026-09-14T21:12:50+00:00
---

## Entrées reçues

`docs/test-plan.md` (carte 05) et `docs/lots.md`. Rien ne manquait.

## Résumé de fin de carte

- **Action proposée** : approuver les dix-huit tests d'acceptation ; le développement du
  lot 1 peut commencer, en loop.
- **Ce qui change** : un dossier `test/` avec un fichier par critère ou groupe de
  critères proches, tous rouges sauf le test de squelette (lot 0, déjà vert).
- **Sources** : `docs/spec.md`, `docs/test-plan.md`.
- **Ce qui manque** : rien pour écrire les tests ; les fichiers `src/domain/*.ts` et
  `src/db/*.ts` qu'ils testent restent à écrire, lot par lot.
- **Risque** : L0.
- **À trancher** : rien.
- **Coût du run** : dix-huit critères, douze fichiers de test, un run `npm test` pour
  vérifier le rouge.

## Preuve du rouge

Sortie réelle de `npm test`, 2026-09-13T21:12:50+00:00 :

```
> coeur-relatif@0.0.0 test
> vitest run


 RUN  v5.0.0 /home/user/coeur-relatif

 ❯ test/coeurs.test.ts (0 test)
 ❯ test/donnees.test.ts (0 test)
 ❯ test/consentement.test.ts (0 test)
 ❯ test/etoiles.test.ts (0 test)
 ❯ test/message.test.ts (0 test)
 ❯ test/parsing.test.ts (0 test)
 ❯ test/purge.test.ts (0 test)
 ❯ test/rappel-lundi.test.ts (0 test)
 ❯ test/reference.test.ts (0 test)
 ❯ test/schema.test.ts (0 test)
 ❯ test/signal-vendredi.test.ts (0 test)

 Test Files  11 failed | 1 passed (12)
      Tests  1 passed (1)
   Start at  21:12:51
   Duration  548ms (worker 71%, transform 17%, import 8%, tests 3%, environment 2%)

    Isolate  12 workers spawned · ~89ms startup each (spawn + environment, per file)
             at least ~266ms faster with isolate: false — reuses workers across files instead of one per file
```

11 suites échouent (imports vers des modules qui n'existent pas encore), 1 passe (le
« hello » du lot 0, déjà vert car déjà codé). C'est exactement l'état attendu avant tout
lot de code.

## Challenge

**1 · Mineure · Les tests CA-09/CA-10 (les cœurs) sont écrits contre l'interface
`Repository` prévue par l'ADR-0004, avant que le spike de vérification Telegram (carte
05) n'ait confirmé que les réactions sont exploitables.** Si le spike échoue, ces deux
tests seront à réécrire contre le mécanisme de repli.
Alternative : aucune, c'est un risque accepté et déjà tracé dans la carte 05 ; réécrire
deux tests coûte peu.
Ce qui tranche : le spike du lot 3.

**Verdict : solide.** Les dix-huit critères ont un test, tous rouges sauf celui déjà
couvert par le lot 0.

## Réponses de l'auteur

1. **Accepte, sans modification.** Risque déjà tracé et accepté en carte 05.

## Journal de décision

- **Décision** : les dix-huit tests d'acceptation sont approuvés tels quels.
- **Options considérées** : (a) approuver tels quels (retenue) ; (b) attendre le spike
  Telegram avant d'écrire CA-09/CA-10, écartée car ces tests ne dépendent d'aucun accès
  réseau (ADR-0004) et peuvent être écrits et lus dès maintenant.
- **Qui a tranché** : Stratège, contestation mineure sans conséquence.
- **Réversible** : oui, deux tests à réécrire si le spike échoue.
- **Ce qui ferait revenir dessus** : l'échec du spike du lot 3.
- **Veto possible jusqu'à** : 2026-09-14T21:12:50+00:00.

## metadata
```json
{
  "tests_rouges": 11,
  "tests_verts": 1,
  "criteres_couverts": ["CA-01","CA-02","CA-03","CA-04","CA-05","CA-06","CA-07","CA-08","CA-09","CA-10","CA-11","CA-11bis","CA-12","CA-13","CA-14","CA-15","CA-16","CA-17"]
}
```
