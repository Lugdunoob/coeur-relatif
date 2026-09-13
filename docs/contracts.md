# Contrats · « Cœur relatif »

*Carte 05. Chaque échange avec l'extérieur : format, erreurs, limites.*

## Telegram Bot API (webhook)

**Entrée** : Telegram POST sur l'URL de webhook Vercel, JSON `Update` (types officiels
via `grammY`). Types utilisés : `message` (privé, pour la déclaration et les commandes),
`message_reaction` (pour les cœurs, CA-09 — nécessite `allowed_updates` incluant
`message_reaction` à l'enregistrement du webhook, à vérifier en lot 3).

**Sortie** : appels `sendMessage` (privé ou groupe), réponse HTTP 200 immédiate au
webhook quel que soit le résultat du traitement (règle Telegram : répondre vite, traiter
après).

**Erreurs** : toute erreur de traitement est journalisée côté serveur, jamais renvoyée à
l'utilisateur telle quelle ; en privé, un message générique « je n'ai pas compris,
essaie `<exemple>` » (CA-03).

**Limites de débit** : Telegram limite à 30 messages/s vers des destinataires différents
et 1 message/s vers un même chat (core.telegram.org/bots/faq#my-bot-is-hitting-limits) ;
sans objet à 12 utilisateurs, à ne pas re-mesurer pour ce pilote.

## Commandes du bot

| Commande | Contexte | Effet |
|---|---|---|
| `<activité> <minutes> <effort>` en privé, format libre | privé | déclare une séance (CA-03) |
| `/mesdonnees` | privé | renvoie les étoiles de la semaine en cours (CA-14) |
| `/supprimer` | privé | efface toutes les données de la personne, confirme (CA-15) |
| ❤️ en réaction à un message de séance | groupe | compte un cœur (CA-09) |

## Job planifié (cron Vercel)

- Lundi 8 h locale : message fixe dans le groupe (CA-13).
- Vendredi 17 h locale : message collectif, y compris à zéro (CA-11, CA-11bis).
- Nuit, quotidien : purge des données au-delà de fin-pilote + 30 jours (R9, CA-16).
