// POST /api/web/accepter { p } : consentement (P1, CA-01).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenirRepo, authentifier } from '../../src/web/contexte.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const repo = obtenirRepo();
  const jeton = typeof req.body?.p === 'string' ? req.body.p : undefined;
  const personne = await authentifier(repo, jeton);
  if (!personne) {
    res.status(404).json({ erreur: 'Lien invalide.' });
    return;
  }
  await repo.upsertPersonne({ ...personne, consentementHorodate: new Date() });
  res.status(200).json({ ok: true });
}
