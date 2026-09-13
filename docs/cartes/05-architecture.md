---
carte: 05
nom: Architecture et plan
agent: architecte
skills: [architecture, adr, decoupage-lots]
parents: [03]
statut: approuvee
livrable: docs/adr/, docs/data-model.md, docs/contracts.md, docs/lots.md
porte: "chaque critère de la spec apparaît dans un lot et dans le plan de tests ; chaque ADR a au moins deux options comparées"
risque: L0
approuvee_le: 2026-09-13T21:12:50+00:00
veto_jusqu_au: 2026-09-14T21:12:50+00:00
---

## Entrées reçues

`docs/spec.md` approuvée (carte 03) et ses metadata (17+1 critères numérotés). Rien ne
manquait. Aucun golden run de référence pour cette carte : premier vrai test de la
skill `architecture`, comme pour la carte 03.

## Résumé de fin de carte

- **Action proposée** : approuver l'architecture ; les tests d'acceptation (carte 06)
  et le développement (lots) peuvent commencer.
- **Ce qui change** : quatre ADR, un modèle de données, des contrats, un découpage en
  sept lots.
- **Sources** : `core.telegram.org/bots/faq` pour les limites de débit ; le reste
  découle de la spec et des décisions déjà prises.
- **Ce qui manque** : vérification que les bots Telegram reçoivent bien les mises à jour
  `message_reaction` (voir Challenge, point 1) ; création réelle du projet Supabase en
  région UE (hors périmètre d'un agent, action du fondateur).
- **Risque** : L0, aucun code applicatif encore.
- **À trancher** : rien de réservé sur cette carte.
- **Coût du run** : rédaction de quatre ADR, trois documents, premier run sans référence.

## Challenge

**1 · Sérieuse · L'ADR-0002 marque « à vérifier » la réception des réactions ❤️ par un
bot, et deux critères du produit (CA-09, CA-10, le mécanisme des cœurs, cœur du besoin
« encouragement par les pairs ») en dépendent entièrement.** Si l'API Telegram ne permet
pas à un bot de recevoir les réactions dans les conditions prévues, toute l'architecture
du lot 3 est à revoir.
Alternative : ajouter une étape de vérification explicite (« spike ») en tête du lot 3,
avant d'écrire le code métier des cœurs, plutôt que de découvrir le problème en cours de
lot. Si la vérification échoue, prévoir une exigence de repli : réponse par un message
texte « ❤️ » au lieu d'une réaction native, à trancher alors en carte de changement.
Ce qui tranche : le résultat du spike, avant d'écrire `src/domain/coeurs.ts` en
implémentation réelle (les tests, eux, peuvent déjà être écrits contre l'interface prévue).

**2 · Sérieuse · Le rappel individuel léger transmis par la carte 01 (« rappel léger +
déclaration très courte ») n'a pas de contrepartie architecturale au-delà du message
collectif du lundi.** Ce n'est pas nécessairement un défaut : la carte 02 a déjà jugé le
point couvert par l'existant. Mais l'architecture ne tranche pas explicitement si c'est
suffisant ou si un rappel individuel manque.
Alternative : ne rien ajouter ici, et transmettre explicitement le point à la carte
Pilote (programme D) qui peut ajuster l'engagement pendant le pilote sans changer le code.
Ce qui tranche : le taux de déclaration réel en semaine 1, observé par le Pilote.

**3 · Mineure · `docs/lots.md` ne précise pas quel mécanisme de loop (session ou
contexte frais) utiliser par lot.** Cohérence à ajouter avec la skill `boucle-regie`.
Alternative : préciser que tout lot sous 25 itérations tourne par défaut en contexte
frais (`bash .loop/ralph.sh lot-NN N`), cohérent avec les lots ici, tous sous ce seuil.
Ce qui tranche : rien, c'est une précision de documentation.

**Verdict : à revoir sur un point technique (1), le reste transmis ou précisé sans
blocage.**

## Réponses de l'auteur

1. **Accepte.** Ajouté au lot 3 dans `docs/lots.md` : un spike de vérification avant le
   code métier des cœurs. Les tests CA-09/CA-10 restent écrits dès maintenant contre
   l'interface prévue (ils ne dépendent pas de Telegram, voir ADR-0004) ; seule
   l'implémentation réelle de l'adaptateur attend le spike.
2. **Accepte.** Transmis au programme D, carte Pilote : évaluer en semaine 1 si un
   rappel individuel est nécessaire.
3. **Accepte.** Précisé dans `docs/lots.md`.

## Journal de décision

- **Décision** : architecture approuvée, avec un spike de vérification ajouté au lot 3
  et un point transmis au programme D.
- **Options considérées** : (a) approuver telle quelle ; (b) approuver avec le spike
  ajouté au lot 3 (retenue) ; (c) bloquer l'architecture entière tant que la vérification
  Telegram n'est pas faite, écartée car les lots 0, 1 et 2 (squelette, détail signature,
  chemin critique de déclaration et de publication) ne dépendent pas des réactions et
  n'ont aucune raison d'attendre.
- **Qui a tranché** : Stratège — aucune contestation bloquante, aucune décision réservée.
- **Réversible** : oui.
- **Ce qui ferait revenir dessus** : si le spike du lot 3 montre que les réactions ne
  sont pas exploitables par un bot dans les conditions du pilote, une carte de
  changement remplacera CA-09/CA-10 par un mécanisme de repli.
- **Veto possible jusqu'à** : 2026-09-14T21:12:50+00:00.

## metadata
```json
{
  "adrs": ["0001-pile-et-hebergement", "0002-telegram-bot-api", "0003-region-donnees", "0004-isolation-logique-metier"],
  "lots": ["lot-00-squelette", "lot-01-detail-signature", "lot-02-chemin-critique", "lot-03-coeurs", "lot-04-signaux-collectifs", "lot-05-droits", "lot-06-recette"],
  "points_transmis": [{"vers": "programme D, carte Pilote", "point": "évaluer en semaine 1 si un rappel individuel est nécessaire"}],
  "point_a_verifier": {"quoi": "réception des message_reaction par un bot Telegram", "quand": "avant le code métier du lot 3", "repli_si_echec": "réponse texte au lieu de réaction native"}
}
```
