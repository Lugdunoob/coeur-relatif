---
carte: 21
nom: Lot 7 — Architecture et plan (cœurs sociaux)
agent: architecte
skills: [architecture, adr, decoupage-lots, challenge]
parents: [18, 20]
statut: approuvee
livrable: docs/cartes/21-lot7-architecture.md (ce document), docs/data-model.md mis à jour, docs/adr/0007-limite-cloisonnement-multi-entreprises.md, docs/lots.md (Lot 7)
porte: "aucune écriture ne doit laisser croire que le cloisonnement d'accès entre entreprises existe déjà"
risque: L1
approuvee_le: 2026-09-15T09:00:00+00:00
veto_jusqu_au: 2026-09-16T09:00:00+00:00
---

## Entrées reçues

Carte 20 (spécification, approuvée) : P9, R7 amendée, R11-R13, CA-18 à CA-26. Carte 18,
challenge point 2 (obligatoire, pas encore tranché) : documenter noir sur blanc que les
tables `equipe`/`entreprise`/`pays` posent une forme, pas un cloisonnement d'accès réel.

## Modèle de données

Trois nouvelles entités, en plus de `personne`/`seance`/`coeur` existantes
(`docs/data-model.md`) :

- **`pays`** : `id`, `nom`, `region` (texte libre optionnel, ex. « UE-Ouest » — permet un
  regroupement plus fin que le pays seul si besoin plus tard, sans nouvelle table).
- **`entreprise`** : `id`, `nom`, `pays_id` (référence `pays`).
- **`equipe`** : `id`, `nom`, `entreprise_id` (référence `entreprise`).
- **`personne.equipe_id`** (nouveau champ, référence `equipe`) : optionnel pour l'instant
  — les données existantes du pilote n'ont pas encore de ligne `equipe` associée tant
  que le lot de code ne l'a pas peuplée ; un champ obligatoire dès l'écriture casserait
  la compatibilité avec les personnes déjà inscrites sans migration explicite (pattern
  déjà suivi pour `messageIdTelegram`, ADR-0006).

Le pilote peuple **exactement une ligne à chaque niveau** (un pays, une entreprise, une
équipe) — carte 18, réponse 3. Aucune fonctionnalité de gestion multi-entreprises
(facturation, rôle admin par entreprise, création en libre-service) n'est demandée ni
livrée ici : seulement la forme, pour que le Lot 7 (signal pays/région, P9) et une
éventuelle vente à plusieurs entreprises plus tard n'exigent pas de migration de schéma
plat vers hiérarchique.

**`coeur.type`** (nouveau champ, optionnel) : `'simple' | 'grand' | 'tous'`, distingue
les trois options de P9 sans changer le mécanisme de comptage (CA-09/CA-10 inchangés,
réponse au challenge 2 de la carte 20).

**`personne.consentement_version_acceptee`** (nouveau champ, optionnel, entier) :
version du texte de consentement acceptée par la personne ; comparée à
`VERSION_CONSENTEMENT_ACTUELLE` (2) pour appliquer CA-24. Absence (personnes déjà
inscrites avant le Lot 7) traitée comme version 1, donc inférieure à la version
courante — cohérent avec « les personnes déjà inscrites doivent redonner leur accord »
(carte 20).

## Anti-abus « cœur à tout le monde » (R11)

Un envoi « tous » est accepté seulement si aucun envoi « tous » du même donneur n'existe
dans les dernières 24h (lecture de l'historique des cœurs donnés, déjà accessible via
`coeursDonnesParPersonne`, filtré par `type === 'tous'`). Aucune nouvelle table : la
limite se vérifie sur les `coeur` déjà stockés, un envoi « tous » produisant plusieurs
lignes `coeur` du même donneur au même horodatage (CA-22) sert aussi de marqueur pour la
vérification (CA-21).

## Conséquence sur R9 (fond d'écran cumulatif)

Le fond d'écran qualitatif (carte 19) est une **lecture calculée** de la table `coeur`
existante (tous les cœurs reçus par la personne), pas un stockage séparé. Il suit donc
automatiquement la purge déjà spécifiée (`docs/data-model.md`, R9) : `/supprimer` et le
job de fin-pilote + 30 jours suppriment les lignes `coeur` comme aujourd'hui, donc le
fond d'écran se vide avec le reste, sans mécanisme supplémentaire à construire (CA-25
vérifie l'absence de toute nouvelle table de cumul qui contournerait cette purge).

## Découpage en lots (`docs/lots.md`, Lot 7)

Quatre sous-lots, un critère dans exactement un sous-lot (règle de `decoupage-lots`) :
7.1 (modèle de données + signal pays), 7.2 (envoi + anti-abus), 7.3 (flux anonymisé +
consentement révisé), 7.4 (fond d'écran + purge). Détail dans `docs/lots.md`.

## Résumé de fin de carte

**Ce qui est livré ici** : forme du modèle de données à trois niveaux, mécanisme
anti-abus sans nouvelle table, confirmation que le fond d'écran ne casse pas R9, et
découpage en quatre sous-lots exécutables indépendamment (chacun testable seul, ordre de
dépendance documenté dans `docs/lots.md`).

**Ce qui n'est pas livré ici (limite explicite, obligatoire — challenge 2 carte 18)** :
voir `docs/adr/0007-limite-cloisonnement-multi-entreprises.md`. En résumé : les trois
tables ne créent aucun cloisonnement d'accès réel entre entreprises ; le schéma
Supabase reste partagé (ADR-0005), un seul `service_role` a accès à tout, aucune policy
RLS différenciée par entreprise n'existe. Ce risque est théorique tant qu'une seule
entreprise existe réellement (le pilote) et devient réel dès qu'une deuxième entreprise
est ajoutée sur la même base — chantier distinct, non planifié dans ce Lot 7.

**Sources** : carte 20 ; `docs/data-model.md`, `docs/adr/0004-*.md`,
`docs/adr/0005-*.md` existants.

**Risque** : L1 — nouvelles colonnes et tables (réversible), mais l'écrit de l'ADR fixe
une limite de confiance à ne pas dépasser sans nouveau chantier (risque de mésusage si
ignoré par un futur lecteur pressé).

**Coût du run** : lecture carte 20, `docs/data-model.md`, ADR-0004/0005 ; rédaction du
modèle et de l'ADR ; aucun code de production.

## Challenge

**1 · Sérieuse · Pourquoi une table `pays` séparée plutôt qu'un simple champ texte sur
`entreprise` (ce que la carte 18 avait initialement esquissé : « entreprise (pays) »)
?** Une table dédiée est plus lourde pour un pilote qui n'en peuple qu'une ligne.
Alternative : garder `entreprise.pays` en texte libre, sans table séparée.
Ce qui tranche : table séparée retenue, pour deux raisons écrites ici plutôt que
supposées : (a) elle porte aussi `region`, nécessaire si le signal R13 doit un jour se
calculer par région plutôt que par pays strict, sans nouvelle migration ; (b) le mandat
du loop demande explicitement des « tables `equipe`, `entreprise`, `pays` » (trois
tables), pas un champ texte — décision déjà prise en amont de cette carte, actée ici
plutôt que rediscutée.

**2 · Sérieuse · L'ADR doit-il aussi documenter une mitigation minimale (ex. filtrer
systématiquement par `entreprise_id` côté application) plutôt que seulement constater
l'absence de cloisonnement ?** Se contenter de dire « ce n'est pas cloisonné » sans rien
proposer laisse le futur lot de code sans garde-fou pratique.
Alternative : ajouter à l'ADR une consigne de convention de code (filtrer explicitement
par `entreprise_id`/`pays_id` à chaque requête d'agrégation) comme mitigation partielle,
en la nommant clairement comme une convention et non un cloisonnement réel.
Ce qui tranche : retenu, ajouté à l'ADR-0007 (section Conséquences).

**Verdict : accepté, ADR complété avec la mitigation de convention (point 2).**

## Réponses de l'auteur

1. **Accepte.** Table `pays` séparée maintenue, justification écrite ci-dessus.
2. **Accepte.** Convention de filtrage explicite ajoutée à l'ADR-0007.

## Journal de décision

- **Décision** : modèle à trois niveaux (`pays` → `entreprise` → `equipe` →
  `personne.equipe_id`), `coeur.type`, `personne.consentement_version_acceptee`, anti-abus
  sans nouvelle table, fond d'écran comme lecture calculée (pas de nouveau stockage),
  quatre sous-lots dans `docs/lots.md`. La limite du cloisonnement est documentée dans
  l'ADR-0007, pas glissée dans une phrase optionnelle.
- **Options considérées** : cloisonnement réel dès ce lot (RLS par entreprise) — écartée,
  hors mandat de la carte 18 et sans deuxième entreprise réelle pour le valider ; champ
  texte plutôt que table `pays` — écartée (challenge 1) ; documenter la limite sans
  mitigation de convention — écartée (challenge 2).
- **Qui a tranché** : le Stratège, après challenge du Contradicteur, sur le mandat
  explicite de la carte 18 (« à écrire noir sur blanc dans l'ADR d'architecture »).
- **Réversible** : oui pour le schéma (colonnes/tables ajoutables et migrables sans
  perte tant qu'une seule entreprise existe) ; l'ADR lui-même engage surtout la
  compréhension future du projet, pas du code.
- **Ce qui ferait revenir dessus** : l'arrivée réelle d'une deuxième entreprise cliente
  sur ce schéma sans le chantier de cloisonnement livré au préalable — configuration que
  l'ADR interdit explicitement.
- **Veto possible jusqu'à** : 2026-09-16T09:00:00+00:00.

## metadata
```json
{
  "type": "architecture",
  "tables_ajoutees": ["pays", "entreprise", "equipe"],
  "champs_ajoutes": ["personne.equipe_id", "coeur.type", "personne.consentement_version_acceptee"],
  "adr": "0007-limite-cloisonnement-multi-entreprises",
  "sous_lots": ["7.1", "7.2", "7.3", "7.4"],
  "carte_suivante_proposee": "22 (tests d'acceptation Lot 7)"
}
```
