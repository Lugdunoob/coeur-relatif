# État de l'idée

_Généré le 2026-09-15 12:27 UTC par `scripts/etat.py`. Ne pas éditer._

## Veto possible maintenant

- **Carte 12 Correction Recette — format de déclaration en trois lignes** : encore 1 h. Décision : le format de déclaration devient une liste à trois lignes, ordre libre,. `/regie:veto 12 <raison>`
- **Carte 13 Correction Recette — déclaration par boutons, sans texte libre** : encore 2 h. Décision : la déclaration d'une séance se fait par trois choix de boutons. `/regie:veto 13 <raison>`
- **Carte 14 Correction Recette — cœurs groupés par jour et mécanisme de style de message** : encore 2 h. Décision : les cœurs reçus sont annoncés en un seul message par jour (toutes. `/regie:veto 14 <raison>`
- **Carte 15 Correction Recette — rotation de phrases motivantes le lundi** : encore 3 h. Décision : le message du lundi tourne parmi une liste fixe de 4 phrases. `/regie:veto 15 <raison>`
- **Carte 16 Lot 6 : couche de données réelle (Repository, SupabaseRepository, schéma EU)** : encore 3 h. Décision : extraire `Repository` (interface async) comme prévu par l'ADR-0004,. `/regie:veto 16 <raison>`
- **Carte 17 Lot 6 : câblage grammY, Vercel, jobs planifiés** : encore 3 h. Décision : câbler le bot réellement (grammY, Vercel, cron), avec un texte de. `/regie:veto 17 <raison>`
- **Carte 18 Lot 7 — Cadrage des cœurs sociaux (envoi, flux d'activité, classement pays)** : encore 18 h. Décision : le Lot 7 (cœurs sociaux — envoi, flux d'activité, classement pays/région. `/regie:veto 18 <raison>`
- **Carte 19 Lot 7 — Design des écrans (cœurs sociaux)** : encore 19 h. Décision : les quatre écrans/zones et leurs états (peuplé, vide, erreur,. `/regie:veto 19 <raison>`
- **Carte 20 Lot 7 — Spécification (cœurs sociaux)** : encore 20 h. Décision : P9 spécifié, P1 révisé (consentement v2 avec re-consentement requis. `/regie:veto 20 <raison>`
- **Carte 21 Lot 7 — Architecture et plan (cœurs sociaux)** : encore 20 h. Décision : modèle à trois niveaux (`pays` → `entreprise` → `equipe` →. `/regie:veto 21 <raison>`
- **Carte 22 Lot 7 — Tests d'acceptation (cœurs sociaux)** : encore 21 h. Décision : 9 tests rouges écrits (un par CA-18 à CA-26), 4 squelettes minimaux. `/regie:veto 22 <raison>`

## Où on en est

| Programme | Carte | Agent | Statut | Décision |
|---|---|---|---|---|
| A cadrage | 01 Cadrage | stratege | ✓ approuvee | cadrage approuvé sans modification ; trois points du Contradicteur ne sont pas tranchés ic |
| A cadrage | 02 Méthode Musk | musk | ✓ approuvee | référence personnelle = médiane glissante des six dernières séances, |
| A cadrage | 03 Spécification | produit | ✓ approuvee | spécification approuvée avec un critère ajouté (CA-11bis) suite au |
| B plan | 05 Architecture et plan | architecte | ✓ approuvee | architecture approuvée, avec un spike de vérification ajouté au lot 3 |
| B plan | 06 Tests d'acceptation | architecte | ✓ approuvee | les dix-huit tests d'acceptation sont approuvés tels quels. |
| C lots | 07 Lot 01 | dev | ✓ approuvee | lot 1 approuvé ; fusionné dans `main` en local faute de dépôt distant. |
| C lots | 08 Lot 02 | dev | ✓ approuvee | lot 2 approuvé et fusionné par PR (première PR réelle du projet, |
| C lots | 09 Lot 03 | dev | ✓ approuvee | lot 3 approuvé malgré la réserve sur le spike, parce que rien de codé |
| C lots | 10 Lot 04 | dev | ✓ approuvee | lot 4 approuvé sans réserve. |
| C lots | 11 Lot 05 | dev | ✓ approuvee | lot 5 approuvé. Programme C (les cinq lots) terminé. |
| Recette (fondateur) | 12 Correction Recette — format de déclaration en trois lignes | fondateur | ✓ approuvee | le format de déclaration devient une liste à trois lignes, ordre libre, |
| Recette (fondateur) | 13 Correction Recette — déclaration par boutons, sans texte libre | fondateur | ✓ approuvee | la déclaration d'une séance se fait par trois choix de boutons |
| Recette (fondateur) | 14 Correction Recette — cœurs groupés par jour et mécanisme de style de message | fondateur | ✓ approuvee | les cœurs reçus sont annoncés en un seul message par jour (toutes |
| Recette (fondateur) | 15 Correction Recette — rotation de phrases motivantes le lundi | fondateur | ✓ approuvee | le message du lundi tourne parmi une liste fixe de 4 phrases |
| C lots | 16 Lot 6 : couche de données réelle (Repository, SupabaseRepository, schéma EU) | fondateur | ✓ approuvee | extraire `Repository` (interface async) comme prévu par l'ADR-0004, |
| C lots | 17 Lot 6 : câblage grammY, Vercel, jobs planifiés | fondateur | ✓ approuvee | câbler le bot réellement (grammY, Vercel, cron), avec un texte de |
| C lots | 18 Lot 7 — Cadrage des cœurs sociaux (envoi, flux d'activité, classement pays) | fondateur | ✓ approuvee | le Lot 7 (cœurs sociaux — envoi, flux d'activité, classement pays/région |
| C lots | 19 Lot 7 — Design des écrans (cœurs sociaux) | architecte | ✓ approuvee | les quatre écrans/zones et leurs états (peuplé, vide, erreur, |
| C lots | 20 Lot 7 — Spécification (cœurs sociaux) | produit | ✓ approuvee | P9 spécifié, P1 révisé (consentement v2 avec re-consentement requis |
| C lots | 21 Lot 7 — Architecture et plan (cœurs sociaux) | architecte | ✓ approuvee | modèle à trois niveaux (`pays` → `entreprise` → `equipe` → |
| C lots | 22 Lot 7 — Tests d'acceptation (cœurs sociaux) | architecte | ✓ approuvee | 9 tests rouges écrits (un par CA-18 à CA-26), 4 squelettes minimaux |

## Prochaines étapes

- Toutes les cartes connues sont closes. Programme suivant dans `docs/programme.md`.

## À trancher (notes des agents, non bloquantes)

- Carte 02 : Telegram ou Slack pour le groupe (version prudente : Telegram, déjà
- Carte 05 : rien de réservé sur cette carte.
- Carte 06 : rien.
- Carte 08 : rien de réservé. Point noté par le Contradicteur du loop, non
- Carte 09 : rien de réservé au fondateur maintenant ; le point 1 est une
- Carte 10 : rien de réservé.
- Carte 11 : rien de réservé sur cette carte.
- Carte 12 : rien de réservé restant sur ce point précis.
- Carte 13 : rien de réservé restant sur ce point précis.
- Carte 14 : rien de réservé restant sur ce point précis. L'extension « totaux par

## Méthode

- 0 ajustements de méthode journalisés, dont 0 marqués génériques pour la prochaine rétro.

## Feuille de route

Voir `docs/programme.md` (loops, ordre, état) et les jalons GitHub si le miroir est activé.
