// GET /api/web/moi?p=<jeton> : identité minimale pour savoir quel écran afficher.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenirRepo, authentifier } from '../../src/web/contexte.js';
import { peutEnregistrer } from '../../src/domain/consentement.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const jeton = typeof req.query.p === 'string' ? req.query.p : undefined;
  const personne = await authentifier(obtenirRepo(), jeton);
  if (!personne) {
    res.status(404).json({ erreur: 'Lien invalide.' });
    return;
  }
  res.status(200).json({ prenom: personne.prenom, consentement: peutEnregistrer(personne) });
}
