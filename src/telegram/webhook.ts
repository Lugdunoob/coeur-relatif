// Adaptateur Vercel (lot 6, carte 17) : traduit une requête HTTP en mise à jour
// `grammY`, aucun calcul ici (ADR-0004).
//
// N'utilise PAS l'adaptateur générique `webhookCallback(bot, 'http')` de grammY : le
// runtime Node de Vercel consomme déjà le flux de la requête pour remplir `req.body`
// avant que le gestionnaire ne s'exécute, donc relire le flux brut (ce que fait
// l'adaptateur `http`) ne reçoit plus rien. `req.body` déjà analysé par Vercel est
// utilisé directement à la place.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { creerBot } from './bot.js';
import { SupabaseRepository } from '../db/supabase.js';

let bot: ReturnType<typeof creerBot> | undefined;

function obtenirBot(): ReturnType<typeof creerBot> {
  if (bot === undefined) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = process.env.SUPABASE_URL;
    const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!token || !url || !cle) {
      throw new Error('TELEGRAM_BOT_TOKEN, SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.');
    }
    const groupChatIdTexte = process.env.TELEGRAM_GROUP_CHAT_ID;
    bot = creerBot({
      token,
      repo: new SupabaseRepository(url, cle),
      groupChatId: groupChatIdTexte ? Number(groupChatIdTexte) : undefined,
    });
  }
  return bot;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(200).json({ ok: true });
    return;
  }

  const secretAttendu = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secretAttendu && req.headers['x-telegram-bot-api-secret-token'] !== secretAttendu) {
    res.status(401).end();
    return;
  }

  const bot = obtenirBot();
  await bot.init();
  await bot.handleUpdate(req.body);
  // Règle Telegram (docs/contracts.md) : répondre vite, traiter après. Le traitement
  // ci-dessus est déjà terminé ici (await), donc rien à différer.
  res.status(200).json({ ok: true });
}
