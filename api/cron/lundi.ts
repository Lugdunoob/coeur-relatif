// Cron Vercel (docs/contracts.md) : lundi 8h locale, rappel (CA-13). Aucun calcul ici
// (ADR-0004) : appelle `genererRappelLundi`, publie.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Api } from 'grammy';
import { genererRappelLundi } from '../../src/domain/rappel-lundi.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end();
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;
  if (!token || !groupChatId) {
    res.status(500).json({ error: 'Variables d\'environnement manquantes.' });
    return;
  }

  const api = new Api(token);
  await api.sendMessage(Number(groupChatId), genererRappelLundi(new Date()));
  res.status(200).json({ ok: true });
}
