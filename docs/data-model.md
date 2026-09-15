# Modèle de données · « Cœur relatif »

*Carte 05, agent `architecte`. Couvre exactement la section « Données » de `docs/spec.md`
(règles R2, R7, R9, R10, CA-17) sans rien ajouter.*

## Entité `personne`
| Champ | Type | Sensible | Note |
|---|---|---|---|
| id_telegram | identifiant Telegram | non | clé primaire |
| prenom | texte | non | affiché dans le groupe (CA-06) |
| consentement_horodate | date/heure ou vide | non | tant que vide, aucune écriture des autres champs (CA-01) |
| demande_suppression_le | date/heure ou vide | non | posé par `/supprimer` (CA-15) |
| dernier_rappel_consentement | date/heure ou vide | non | horodatage du dernier rappel envoyé ; sert `doitRelancerConsentement` pour ne pas relancer plus d'une fois par 7 jours (CA-02). Champ manquant à l'écriture initiale de cette carte, ajouté au lot 6 en implémentant `SupabaseRepository` — `InMemoryRepository` l'avait déjà (`enregistrerRappelConsentement`/`dernierRappelConsentement`), l'écart n'était pas documenté ici. |

## Entité `seance`
| Champ | Type | Sensible | Note |
|---|---|---|---|
| id | identifiant | non | |
| personne_id | référence `personne` | non | |
| horodatage | date/heure | non | |
| activite | texte libre | non | nommée par la personne (E15 réécrite) |
| minutes | entier > 0 | **oui** | ne sort jamais de la conversation privée (R2) |
| effort | entier 1-10 | **oui** | idem |
| etoiles | entier 1-5 ou vide | non | vide pendant la calibration (CA-04) ; c'est le seul nombre public |
| message_id_telegram | identifiant Telegram ou vide | non | id du message publié dans le groupe (P4) ; vide tant qu'aucun message n'a été publié (calibration). Sert à retrouver la séance visée par une réaction ❤️ (CA-09). Point explicitement laissé ouvert par `src/telegram/webhook.ts` au lot 2/3, tranché au lot 6 (carte 17). |

`charge` (minutes × effort) et la référence glissante ne sont **pas stockés** : ils se
recalculent à la demande à partir des six dernières séances (R3), pour qu'aucun total ne
puisse être exposé par erreur ailleurs que dans le calcul du moment.

## Entité `coeur`
| Champ | Type | Sensible | Note |
|---|---|---|---|
| id | identifiant | non | |
| seance_id | référence `seance` | non | |
| donneur_id_telegram | identifiant Telegram | non | jamais affiché en cumul (R7) |
| horodatage | date/heure | non | |
| type | `simple` \| `grand` \| `tous` ou vide | non | carte 21 (Lot 7, P9) ; vide = équivalent `simple` pour les cœurs antérieurs au Lot 7. Un « cœur à tout le monde » produit plusieurs lignes (une par destinataire), jamais une ligne groupée (CA-22) ; sert aussi à vérifier la limite de fréquence R11 (CA-21). |

## Entités `pays`, `entreprise`, `equipe` (carte 21, Lot 7)

Trois niveaux, ajoutés pour porter la hiérarchie multi-entreprises annoncée par le
fondateur (carte 18) sans qu'aucune fonctionnalité multi-tenant (facturation, admin par
entreprise) ne soit livrée. **Ces tables posent une forme, pas un cloisonnement d'accès
réel entre entreprises — voir `docs/adr/0007-limite-cloisonnement-multi-entreprises.md`
pour la limite explicite, à lire avant de considérer que l'isolement est fait.**

| Table | Champs | Note |
|---|---|---|
| `pays` | `id`, `nom`, `region` (optionnel) | `region` permet un futur regroupement plus fin sans nouvelle table. |
| `entreprise` | `id`, `nom`, `pays_id` (réf. `pays`) | |
| `equipe` | `id`, `nom`, `entreprise_id` (réf. `entreprise`) | |

Le pilote actuel peuple **exactement une ligne à chaque niveau**.

## Entité `personne` — champs ajoutés (carte 21, Lot 7)

| Champ | Type | Sensible | Note |
|---|---|---|---|
| equipe_id | référence `equipe` ou vide | non | optionnel : les personnes inscrites avant le Lot 7 n'en ont pas tant que le lot de code ne les a pas migrées. |
| consentement_version_acceptee | entier ou vide | non | comparé à `VERSION_CONSENTEMENT_ACTUELLE` (2, `src/domain/flux-anonymise.ts`) pour appliquer CA-24 ; absent = traité comme version 1 (inférieure à la version courante), donc comme non réaccepté. |

## Signal qualitatif pays/région (R13, carte 20)

N'est **pas stocké** : calculé à la demande à partir des étoiles déjà présentes sur
`seance.etoiles` de la semaine en cours, filtrées par `pays_id` via
`equipe.entreprise_id` → `entreprise.pays_id`. Le résultat exposé est une bande
(`calme` | `actif` | `tres_actif`), jamais le niveau numérique intermédiaire — voir
`docs/spec.md` (R13) pour la règle de conversion et son exemple chiffré.

## Fond d'écran qualitatif (carte 21, conséquence R9)

N'est **pas un stockage séparé** : lecture calculée de la table `coeur` (tous les cœurs
reçus par la personne). Suit donc automatiquement la purge de la section « Conservation »
ci-dessous, sans mécanisme supplémentaire (CA-25).

## Champs explicitement absents (CA-17)
Fréquence cardiaque, distance, allure, position, âge, poids : aucun champ, aucune table,
aucune colonne, dans aucune entité ci-dessus.

## Conservation (R9)
Toute ligne dont `personne_id` pointe vers une personne dont
`demande_suppression_le` est renseigné, ou dont l'horodatage dépasse
fin-du-pilote + 30 jours, est supprimée. Un job planifié applique la seconde règle ;
`/supprimer` applique la première immédiatement (CA-15, CA-16).
