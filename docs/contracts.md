# Contrats · « Cœur relatif »

*Carte 05. Chaque échange avec l'extérieur : format, erreurs, limites.*

## Telegram Bot API (webhook)

**Entrée** : Telegram POST sur l'URL de webhook Vercel, JSON `Update` (types officiels
via `grammY`). Types utilisés : `message` (privé, pour les commandes et le texte libre
de « Autre »), `callback_query` (les trois choix par boutons de la déclaration, carte
13), `message_reaction` (pour les cœurs, CA-09 — nécessite `allowed_updates` incluant
`message_reaction` à l'enregistrement du webhook, vérifié au lot 6, carte 17).

**Sortie** : appels `sendMessage` (privé ou groupe), réponse HTTP 200 immédiate au
webhook quel que soit le résultat du traitement (règle Telegram : répondre vite, traiter
après).

**Erreurs** : toute erreur de traitement est journalisée côté serveur, jamais renvoyée à
l'utilisateur telle quelle ; en privé, un message générique « je n'ai pas compris,
essaie `<exemple>` » (CA-03).

**Limites de débit** : Telegram limite à 30 messages/s vers des destinataires différents
et 1 message/s vers un même chat (core.telegram.org/bots/faq#my-bot-is-hitting-limits) ;
sans objet à 12 utilisateurs, à ne pas re-mesurer pour ce pilote.

## Commandes et interactions du bot

| Entrée | Contexte | Effet |
|---|---|---|
| `/start` | privé | affiche le texte de consentement provisoire + bouton « J'accepte » (P1, CA-01) |
| `/declarer` puis trois choix par boutons (activité, durée, effort) | privé | déclare une séance (CA-03, carte 13) ; « Autre » est la seule échappatoire en texte libre, via `force_reply` |
| `/mesdonnees` | privé | renvoie les étoiles de la semaine en cours (CA-14) |
| `/supprimer` | privé | efface toutes les données de la personne, confirme (CA-15) |
| ❤️ en réaction à un message de séance | groupe | compte un cœur (CA-09) ; seul l'ajout d'un ❤️ est traité, le retirer ne retire pas le cœur (limitation acceptée, carte 17) |
| tout autre texte | privé | message générique « je n'ai pas compris » (CA-03) |

## Jobs planifiés (cron Vercel, `vercel.json`)

- Lundi 7h UTC (≈ 8-9h Paris selon heure d'été) : message fixe dans le groupe (CA-13).
  Horaire fixe en UTC : dérive d'environ une heure selon la saison, accepté pour un
  pilote de quatre semaines plutôt que gérer un fuseau horaire dynamique.
- Vendredi 16h UTC (≈ 17-18h Paris) : message collectif, y compris à zéro (CA-11,
  CA-11bis). Même remarque sur la dérive saisonnière.
- Nuit (3h UTC), quotidien : purge des données au-delà de fin-pilote + 30 jours (R9,
  CA-16), à partir de la variable d'environnement `FIN_PILOTE`.
- Quotidien (19h UTC) : résumé groupé des cœurs reçus dans la journée (CA-09bis, carte
  14), un message par personne ayant reçu au moins un cœur — rien envoyé à qui n'en a
  reçu aucun ce jour-là (choix opérationnel, pas un critère d'acceptation).

Chaque route de cron vérifie l'en-tête `Authorization: Bearer $CRON_SECRET` si la
variable d'environnement `CRON_SECRET` est définie (Vercel l'envoie automatiquement
pour ses propres invocations planifiées) : évite qu'un tiers déclenche ces routes en
devinant leur URL.
