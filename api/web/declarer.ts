// POST /api/web/declarer { p, activite, minutes, effortMot } : trois choix (CA-03).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenirRepo, authentifier } from '../../src/web/contexte.js';
import { declarerSeance } from '../../src/domain/declarer.js';
import { peutEnregistrer } from '../../src/domain/consentement.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const repo = obtenirRepo();
  const jeton = typeof req.body?.p === 'string' ? req.body.p : undefined;
  const personne = await authentifier(repo, jeton);
  if (!personne || !peutEnregistrer(personne)) {
    res.status(403).json({ erreur: "Il faut d'abord accepter." });
    return;
  }

  const { activite, minutes, effortMot } = req.body ?? {};
  const resultat = await declarerSeance(repo, personne.idTelegram, {
    activite: String(activite ?? ''),
    minutes: Number(minutes),
    effortMot: String(effortMot ?? ''),
  });
  if (!resultat) {
    res.status(400).json({ erreur: "Je n'ai pas compris ce choix." });
    return;
  }
  res.status(200).json({ activite: resultat.activite, etoiles: resultat.etoiles });
}
