// GET /api/web/options : les trois listes fermées (CA-03, carte 13), pour que la page
// n'ait pas sa propre copie qui pourrait diverger de src/domain/parsing.ts.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ACTIVITES, DUREES_MINUTES, DUREE_LABELS, EFFORTS_MOTS } from '../../src/domain/parsing.js';

export default function handler(_req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({
    activites: ACTIVITES,
    durees: DUREES_MINUTES.map((minutes) => ({ minutes, label: DUREE_LABELS[minutes] })),
    efforts: EFFORTS_MOTS,
  });
}
