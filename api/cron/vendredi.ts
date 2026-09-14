// Cron Vercel (docs/contracts.md) : vendredi 17h locale, signal collectif (CA-11,
// CA-11bis). Aucun calcul ici (ADR-0004) : lit le dépôt, appelle
// `genererSignalVendredi`, publie.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Api } from 'grammy';
import { SupabaseRepository } from '../../src/db/supabase.js';
import { genererSignalVendredi } from '../../src/domain/signal-vendredi.js';

const UNE_SEMAINE_MS = 7 * 24 * 3600 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end();
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;
  if (!token || !url || !cle || !groupChatId) {
    res.status(500).json({ error: 'Variables d\'environnement manquantes.' });
    return;
  }

  const repo = new SupabaseRepository(url, cle);
  const fin = new Date();
  const debut = new Date(fin.getTime() - UNE_SEMAINE_MS);
  const [seances, coeurs] = await Promise.all([repo.seancesEntre(debut, fin), repo.coeursEntre(debut, fin)]);

  const api = new Api(token);
  await api.sendMessage(Number(groupChatId), genererSignalVendredi(seances, coeurs));
  res.status(200).json({ ok: true });
}
