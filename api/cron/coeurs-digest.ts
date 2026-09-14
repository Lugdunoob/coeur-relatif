// Cron Vercel, quotidien (carte 14, CA-09bis) : résumé groupé des cœurs reçus, pas de
// message à chaque ❤️. N'envoie rien à une personne qui n'a reçu aucun cœur ce jour-là
// (choix opérationnel de la carte 17, pas un critère d'acceptation : éviter un message
// "Aucun cœur reçu" à tout le monde, tous les jours).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Api } from 'grammy';
import { SupabaseRepository } from '../../src/db/supabase.js';
import { coeursRecusJour } from '../../src/domain/coeurs.js';
import { STYLE_NEUTRE } from '../../src/domain/styles.js';

const UN_JOUR_MS = 24 * 3600 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end();
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!token || !url || !cle) {
    res.status(500).json({ error: 'Variables d\'environnement manquantes.' });
    return;
  }

  const repo = new SupabaseRepository(url, cle);
  const api = new Api(token);
  const debutJour = new Date(Date.now() - UN_JOUR_MS);

  const personnes = await repo.toutesLesPersonnes();
  for (const personne of personnes) {
    const nombre = await coeursRecusJour(repo, personne.idTelegram, debutJour);
    if (nombre === 0) continue;
    await api.sendMessage(Number(personne.idTelegram), STYLE_NEUTRE.coeursDigestJour({ nombre }));
  }

  res.status(200).json({ ok: true, personnesNotifiees: personnes.length });
}
