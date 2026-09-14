// Implémentation en mémoire du dépôt (lot 02, docs/lots.md). Implémente `Repository`
// (lot 6, src/db/repository.ts) : méthodes async pour respecter le même contrat que
// `SupabaseRepository`, même si rien ici ne fait de vrai I/O.
import type { Seance, Personne, Coeur } from './schema.js';
import type { Repository } from './repository.js';

export class InMemoryRepository implements Repository {
  private seances: Seance[] = [];
  private personnes = new Map<string, Personne>();
  private rappelsConsentement = new Map<string, Date>();
  private coeurs: Coeur[] = [];

  async ajouterSeance(seance: Seance): Promise<void> {
    this.seances.push(seance);
  }

  async dernieresSeances(personneId: string, n: number): Promise<Seance[]> {
    return this.seances
      .filter((seance) => seance.personneId === personneId)
      .sort((a, b) => a.horodatage.getTime() - b.horodatage.getTime())
      .slice(-n);
  }

  async seancesDe(personneId: string): Promise<Seance[]> {
    return this.seances.filter((seance) => seance.personneId === personneId);
  }

  async supprimerDonneesPersonne(personneId: string): Promise<void> {
    const idsSeances = new Set((await this.seancesDe(personneId)).map((seance) => seance.id));
    this.seances = this.seances.filter((seance) => seance.personneId !== personneId);
    this.coeurs = this.coeurs.filter(
      (coeur) => coeur.donneurId !== personneId && !idsSeances.has(coeur.seanceId),
    );
    this.personnes.delete(personneId);
    this.rappelsConsentement.delete(personneId);
  }

  async purgerFinPilote(dateButoir: Date): Promise<void> {
    const idsSupprimees = new Set(
      this.seances.filter((seance) => seance.horodatage < dateButoir).map((seance) => seance.id),
    );
    this.seances = this.seances.filter((seance) => seance.horodatage >= dateButoir);
    this.coeurs = this.coeurs.filter((coeur) => !idsSupprimees.has(coeur.seanceId));
    this.personnes.clear();
    this.rappelsConsentement.clear();
  }

  async upsertPersonne(personne: Personne): Promise<void> {
    this.personnes.set(personne.idTelegram, personne);
  }

  async getPersonne(idTelegram: string): Promise<Personne | undefined> {
    return this.personnes.get(idTelegram);
  }

  async enregistrerRappelConsentement(idTelegram: string, date: Date): Promise<void> {
    this.rappelsConsentement.set(idTelegram, date);
  }

  async dernierRappelConsentement(idTelegram: string): Promise<Date | undefined> {
    return this.rappelsConsentement.get(idTelegram);
  }

  async ajouterCoeur(coeur: Coeur): Promise<void> {
    this.coeurs.push(coeur);
  }

  async coeursParSeance(seanceId: string): Promise<Coeur[]> {
    return this.coeurs.filter((coeur) => coeur.seanceId === seanceId);
  }

  async coeursDonnesParPersonne(donneurId: string): Promise<Coeur[]> {
    return this.coeurs.filter((coeur) => coeur.donneurId === donneurId);
  }

  async coeursRecusParPersonne(personneId: string): Promise<Coeur[]> {
    const idsSeances = new Set((await this.seancesDe(personneId)).map((seance) => seance.id));
    return this.coeurs.filter((coeur) => idsSeances.has(coeur.seanceId));
  }
}
