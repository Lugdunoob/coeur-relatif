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

## Champs explicitement absents (CA-17)
Fréquence cardiaque, distance, allure, position, âge, poids : aucun champ, aucune table,
aucune colonne, dans aucune entité ci-dessus.

## Conservation (R9)
Toute ligne dont `personne_id` pointe vers une personne dont
`demande_suppression_le` est renseigné, ou dont l'horodatage dépasse
fin-du-pilote + 30 jours, est supprimée. Un job planifié applique la seconde règle ;
`/supprimer` applique la première immédiatement (CA-15, CA-16).
