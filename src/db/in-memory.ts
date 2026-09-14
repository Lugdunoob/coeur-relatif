// Implémentation en mémoire du dépôt (lot 02, docs/lots.md).
import type { Seance, Personne, Coeur } from './schema.js';

export class InMemoryRepository {
  private seances: Seance[] = [];
  private personnes = new Map<string, Personne>();
  private rappelsConsentement = new Map<string, Date>();
  private coeurs: Coeur[] = [];

  ajouterSeance(seance: Seance): void {
    this.seances.push(seance);
  }

  dernieresSeances(personneId: string, n: number): Seance[] {
    return this.seances
      .filter((seance) => seance.personneId === personneId)
      .sort((a, b) => a.horodatage.getTime() - b.horodatage.getTime())
      .slice(-n);
  }

  seancesDe(personneId: string): Seance[] {
    return this.seances.filter((seance) => seance.personneId === personneId);
  }

  supprimerDonneesPersonne(personneId: string): void {
    const idsSeances = new Set(this.seancesDe(personneId).map((seance) => seance.id));
    this.seances = this.seances.filter((seance) => seance.personneId !== personneId);
    this.coeurs = this.coeurs.filter(
      (coeur) => coeur.donneurId !== personneId && !idsSeances.has(coeur.seanceId),
    );
    this.personnes.delete(personneId);
    this.rappelsConsentement.delete(personneId);
  }

  purgerFinPilote(dateButoir: Date): void {
    const idsSupprimees = new Set(
      this.seances.filter((seance) => seance.horodatage < dateButoir).map((seance) => seance.id),
    );
    this.seances = this.seances.filter((seance) => seance.horodatage >= dateButoir);
    this.coeurs = this.coeurs.filter((coeur) => !idsSupprimees.has(coeur.seanceId));
    this.personnes.clear();
    this.rappelsConsentement.clear();
  }

  upsertPersonne(personne: Personne): void {
    this.personnes.set(personne.idTelegram, personne);
  }

  getPersonne(idTelegram: string): Personne | undefined {
    return this.personnes.get(idTelegram);
  }

  enregistrerRappelConsentement(idTelegram: string, date: Date): void {
    this.rappelsConsentement.set(idTelegram, date);
  }

  dernierRappelConsentement(idTelegram: string): Date | undefined {
    return this.rappelsConsentement.get(idTelegram);
  }

  ajouterCoeur(coeur: Coeur): void {
    this.coeurs.push(coeur);
  }

  coeursParSeance(seanceId: string): Coeur[] {
    return this.coeurs.filter((coeur) => coeur.seanceId === seanceId);
  }

  coeursDonnesParPersonne(donneurId: string): Coeur[] {
    return this.coeurs.filter((coeur) => coeur.donneurId === donneurId);
  }
}
