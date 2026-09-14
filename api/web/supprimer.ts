// POST /api/web/supprimer { p } : efface tout, confirme (CA-15).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenirRepo, authentifier } from '../../src/web/contexte.js';
import { supprimerMesDonnees } from '../../src/domain/donnees.js';

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
  await supprimerMesDonnees(repo, personne.idTelegram);
  res.status(200).json({ ok: true });
}
