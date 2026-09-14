// Orchestration partagée entre canaux (Telegram, web — ADR-0006) : parser les trois
// choix, calculer la charge/étoiles à partir de l'historique, enregistrer la séance.
// Touche le dépôt (pas pur), mais aucune dépendance à un canal précis (ADR-0004).
import type { Repository } from '../db/repository.js';
import { parserDeclaration, type ChoixDeclaration } from './parsing.js';
import { calculerEtoiles } from './etoiles.js';

export interface ResultatDeclaration {
  seanceId: string;
  activite: string;
  etoiles: number | null;
}

export async function declarerSeance(
  repo: Repository,
  personneId: string,
  choix: ChoixDeclaration,
): Promise<ResultatDeclaration | null> {
  const declaration = parserDeclaration(choix);
  if (!declaration) return null;

  const historique = await repo.dernieresSeances(personneId, 6);
  const charge = declaration.minutes * declaration.effort;
  const etoiles = calculerEtoiles({
    charge,
    historiqueCharges: historique.map((s) => s.minutes * s.effort),
    effortsRecents: historique.map((s) => s.effort),
  });

  const seanceId = `${personneId}-${Date.now()}`;
  await repo.ajouterSeance({
    id: seanceId,
    personneId,
    horodatage: new Date(),
    activite: declaration.activite,
    minutes: declaration.minutes,
    effort: declaration.effort,
    etoiles,
    messageIdTelegram: null,
  });

  return { seanceId, activite: declaration.activite, etoiles };
}
