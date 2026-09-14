// Cron Vercel (docs/contracts.md) : nuit, quotidien, purge fin-pilote + 30 jours
// (R9, CA-16). Aucun calcul ici (ADR-0004) : appelle `purger`.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SupabaseRepository } from '../../src/db/supabase.js';
import { purger } from '../../src/domain/purge.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end();
    return;
  }

  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const finPiloteTexte = process.env.FIN_PILOTE;
  if (!url || !cle || !finPiloteTexte) {
    res.status(500).json({ error: 'Variables d\'environnement manquantes (dont FIN_PILOTE).' });
    return;
  }

  const repo = new SupabaseRepository(url, cle);
  await purger(repo, new Date(), new Date(finPiloteTexte));
  res.status(200).json({ ok: true });
}
