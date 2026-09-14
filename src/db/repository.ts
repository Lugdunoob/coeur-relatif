// Interface `Repository` prévue par l'ADR-0004, jamais extraite avant le lot 6 (les
// lots 1 à 5 ne connaissaient que `InMemoryRepository`, utilisée directement comme type
// par les fonctions du domaine — un écart avec l'ADR corrigé ici, au moment où une
// deuxième implémentation (`SupabaseRepository`) existe réellement).
//
// Chaque méthode renvoie une Promise : `InMemoryRepository` résout immédiatement (aucun
// I/O), `SupabaseRepository` fait un vrai appel réseau. Une interface synchrone aurait
// été plus simple pour les tests existants, mais ne peut pas représenter un vrai accès
// réseau — mieux vaut le même contrat partout que deux formes de dépôt différentes
// entre les tests et la production.
import type { Seance, Personne, Coeur } from './schema.js';

export interface Repository {
  ajouterSeance(seance: Seance): Promise<void>;
  dernieresSeances(personneId: string, n: number): Promise<Seance[]>;
  seancesDe(personneId: string): Promise<Seance[]>;
  supprimerDonneesPersonne(personneId: string): Promise<void>;
  purgerFinPilote(dateButoir: Date): Promise<void>;

  upsertPersonne(personne: Personne): Promise<void>;
  getPersonne(idTelegram: string): Promise<Personne | undefined>;

  enregistrerRappelConsentement(idTelegram: string, date: Date): Promise<void>;
  dernierRappelConsentement(idTelegram: string): Promise<Date | undefined>;

  ajouterCoeur(coeur: Coeur): Promise<void>;
  coeursParSeance(seanceId: string): Promise<Coeur[]>;
  coeursDonnesParPersonne(donneurId: string): Promise<Coeur[]>;
  coeursRecusParPersonne(personneId: string): Promise<Coeur[]>;
}
