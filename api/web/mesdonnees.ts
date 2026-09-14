// GET /api/web/mesdonnees?p=<jeton> : étoiles de la semaine en cours (CA-14).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenirRepo, authentifier } from '../../src/web/contexte.js';
import { mesDonnees } from '../../src/domain/donnees.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const repo = obtenirRepo();
  const jeton = typeof req.query.p === 'string' ? req.query.p : undefined;
  const personne = await authentifier(repo, jeton);
  if (!personne) {
    res.status(404).json({ erreur: 'Lien invalide.' });
    return;
  }
  const donnees = await mesDonnees(repo, personne.idTelegram, new Date());
  res.status(200).json({ etoiles: donnees.map((d) => d.etoiles) });
}
