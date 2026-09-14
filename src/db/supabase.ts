// Implémentation réelle du dépôt (lot 6). Schéma dédié `coeur_relatif` dans le projet
// Supabase partagé `domelo-dev` (EU, eu-central-1) — voir ADR-0005. RLS activé sans
// policy sur les trois tables : seule la clé service_role (utilisée ici, jamais
// exposée à un client) peut lire ou écrire ; `anon`/`authenticated` sont refusés par
// défaut. Aucun calcul ici (ADR-0004) : uniquement la traduction lignes ↔ types du
// domaine (`src/db/schema.ts`).
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Seance, Personne, Coeur } from './schema.js';
import type { Repository } from './repository.js';

interface SeanceLigne {
  id: string;
  personne_id: string;
  horodatage: string;
  activite: string;
  minutes: number;
  effort: number;
  etoiles: number | null;
  message_id_telegram: number | null;
}

interface PersonneLigne {
  id_telegram: string;
  prenom: string;
  consentement_horodate: string | null;
  demande_suppression_le: string | null;
  dernier_rappel_consentement: string | null;
}

interface CoeurLigne {
  id: string;
  seance_id: string;
  donneur_id_telegram: string;
  horodatage: string;
}

function seanceDepuisLigne(ligne: SeanceLigne): Seance {
  return {
    id: ligne.id,
    personneId: ligne.personne_id,
    horodatage: new Date(ligne.horodatage),
    activite: ligne.activite,
    minutes: ligne.minutes,
    effort: ligne.effort,
    etoiles: ligne.etoiles,
    messageIdTelegram: ligne.message_id_telegram,
  };
}

function personneDepuisLigne(ligne: PersonneLigne): Personne {
  return {
    idTelegram: ligne.id_telegram,
    prenom: ligne.prenom,
    consentementHorodate: ligne.consentement_horodate ? new Date(ligne.consentement_horodate) : undefined,
    demandeSuppressionLe: ligne.demande_suppression_le ? new Date(ligne.demande_suppression_le) : undefined,
  };
}

function coeurDepuisLigne(ligne: CoeurLigne): Coeur {
  return {
    id: ligne.id,
    seanceId: ligne.seance_id,
    donneurId: ligne.donneur_id_telegram,
    horodatage: new Date(ligne.horodatage),
  };
}

export class SupabaseRepository implements Repository {
  // `.schema('coeur_relatif')` appelé à chaque requête plutôt qu'une fois au niveau du
  // client (option `db.schema` de `createClient`) : évite de paramétrer le type
  // générique `SupabaseClient` sur un schéma sans types générés (pas de dépendance à
  // `generate_typescript_types` pour trois tables simples).
  private client: SupabaseClient;

  constructor(url: string, cleServiceRole: string) {
    this.client = createClient(url, cleServiceRole);
  }

  private table(nom: 'personne' | 'seance' | 'coeur') {
    return this.client.schema('coeur_relatif').from(nom);
  }

  async ajouterSeance(seance: Seance): Promise<void> {
    const { error } = await this.table('seance').insert({
      id: seance.id,
      personne_id: seance.personneId,
      horodatage: seance.horodatage.toISOString(),
      activite: seance.activite,
      minutes: seance.minutes,
      effort: seance.effort,
      etoiles: seance.etoiles,
      message_id_telegram: seance.messageIdTelegram,
    });
    if (error) throw error;
  }

  async dernieresSeances(personneId: string, n: number): Promise<Seance[]> {
    const { data, error } = await this.table('seance')
      .select('*')
      .eq('personne_id', personneId)
      .order('horodatage', { ascending: false })
      .limit(n);
    if (error) throw error;
    return (data as SeanceLigne[]).map(seanceDepuisLigne).reverse();
  }

  async seancesDe(personneId: string): Promise<Seance[]> {
    const { data, error } = await this.table('seance')
      .select('*')
      .eq('personne_id', personneId)
      .order('horodatage', { ascending: true });
    if (error) throw error;
    return (data as SeanceLigne[]).map(seanceDepuisLigne);
  }

  async supprimerDonneesPersonne(personneId: string): Promise<void> {
    // Cœurs donnés par la personne sur les séances d'autrui : pas de contrainte de
    // clé étrangère sur donneur_id_telegram (voir docs/data-model.md), suppression
    // explicite. Les cœurs reçus sur ses propres séances suivent par la contrainte
    // `on delete cascade` de coeur.seance_id lors de la suppression des séances.
    const { error: erreurCoeursDonnes } = await this.table('coeur')
      .delete()
      .eq('donneur_id_telegram', personneId);
    if (erreurCoeursDonnes) throw erreurCoeursDonnes;

    const { error: erreurSeances } = await this.table('seance').delete().eq('personne_id', personneId);
    if (erreurSeances) throw erreurSeances;

    const { error: erreurPersonne } = await this.table('personne').delete().eq('id_telegram', personneId);
    if (erreurPersonne) throw erreurPersonne;
  }

  async purgerFinPilote(dateButoir: Date): Promise<void> {
    // Comme InMemoryRepository : seules les séances antérieures à dateButoir partent
    // (avec leurs cœurs, par cascade), mais TOUTES les fiches personne sont effacées —
    // purgerFinPilote n'est appelé qu'une fois la date butoir atteinte (garde dans
    // purger(), src/domain/purge.ts), le pilote entier se termine à ce moment-là.
    const { error: erreurSeances } = await this.table('seance')
      .delete()
      .lt('horodatage', dateButoir.toISOString());
    if (erreurSeances) throw erreurSeances;

    // `.not(..., 'is', null)` sur la clé primaire (jamais nulle) : équivalent d'un
    // DELETE sans condition, que le client Supabase exige d'exprimer avec un filtre.
    const { error: erreurPersonnes } = await this.table('personne').delete().not('id_telegram', 'is', null);
    if (erreurPersonnes) throw erreurPersonnes;
  }

  async upsertPersonne(personne: Personne): Promise<void> {
    const { error } = await this.table('personne').upsert({
      id_telegram: personne.idTelegram,
      prenom: personne.prenom,
      consentement_horodate: personne.consentementHorodate?.toISOString() ?? null,
      demande_suppression_le: personne.demandeSuppressionLe?.toISOString() ?? null,
    });
    if (error) throw error;
  }

  async getPersonne(idTelegram: string): Promise<Personne | undefined> {
    const { data, error } = await this.table('personne')
      .select('*')
      .eq('id_telegram', idTelegram)
      .maybeSingle();
    if (error) throw error;
    return data ? personneDepuisLigne(data as PersonneLigne) : undefined;
  }

  async toutesLesPersonnes(): Promise<Personne[]> {
    const { data, error } = await this.table('personne').select('*');
    if (error) throw error;
    return (data as PersonneLigne[]).map(personneDepuisLigne);
  }

  async enregistrerRappelConsentement(idTelegram: string, date: Date): Promise<void> {
    // Suppose une fiche personne déjà créée par upsertPersonne au premier contact
    // (P1) : un rappel de consentement n'a de sens qu'après une invitation initiale.
    const { error } = await this.table('personne')
      .update({ dernier_rappel_consentement: date.toISOString() })
      .eq('id_telegram', idTelegram);
    if (error) throw error;
  }

  async dernierRappelConsentement(idTelegram: string): Promise<Date | undefined> {
    const { data, error } = await this.table('personne')
      .select('dernier_rappel_consentement')
      .eq('id_telegram', idTelegram)
      .maybeSingle();
    if (error) throw error;
    const valeur = (data as Pick<PersonneLigne, 'dernier_rappel_consentement'> | null)?.dernier_rappel_consentement;
    return valeur ? new Date(valeur) : undefined;
  }

  async ajouterCoeur(coeur: Coeur): Promise<void> {
    const { error } = await this.table('coeur').insert({
      id: coeur.id,
      seance_id: coeur.seanceId,
      donneur_id_telegram: coeur.donneurId,
      horodatage: coeur.horodatage.toISOString(),
    });
    if (error) throw error;
  }

  async coeursParSeance(seanceId: string): Promise<Coeur[]> {
    const { data, error } = await this.table('coeur').select('*').eq('seance_id', seanceId);
    if (error) throw error;
    return (data as CoeurLigne[]).map(coeurDepuisLigne);
  }

  async coeursDonnesParPersonne(donneurId: string): Promise<Coeur[]> {
    const { data, error } = await this.table('coeur').select('*').eq('donneur_id_telegram', donneurId);
    if (error) throw error;
    return (data as CoeurLigne[]).map(coeurDepuisLigne);
  }

  async coeursRecusParPersonne(personneId: string): Promise<Coeur[]> {
    // Pas de jointure Supabase directe pratique ici : deux requêtes simples plutôt
    // qu'une jointure PostgREST peu lisible, volumes du pilote (douze personnes)
    // sans enjeu de performance.
    const { data: seances, error: erreurSeances } = await this.table('seance')
      .select('id')
      .eq('personne_id', personneId);
    if (erreurSeances) throw erreurSeances;
    const idsSeances = (seances as { id: string }[]).map((s) => s.id);
    if (idsSeances.length === 0) return [];

    const { data, error } = await this.table('coeur').select('*').in('seance_id', idsSeances);
    if (error) throw error;
    return (data as CoeurLigne[]).map(coeurDepuisLigne);
  }

  async enregistrerMessageSeance(seanceId: string, messageId: number): Promise<void> {
    const { error } = await this.table('seance').update({ message_id_telegram: messageId }).eq('id', seanceId);
    if (error) throw error;
  }

  async seanceParMessage(messageId: number): Promise<Seance | undefined> {
    const { data, error } = await this.table('seance')
      .select('*')
      .eq('message_id_telegram', messageId)
      .maybeSingle();
    if (error) throw error;
    return data ? seanceDepuisLigne(data as SeanceLigne) : undefined;
  }

  async seancesEntre(debut: Date, fin: Date): Promise<Seance[]> {
    const { data, error } = await this.table('seance')
      .select('*')
      .gte('horodatage', debut.toISOString())
      .lt('horodatage', fin.toISOString());
    if (error) throw error;
    return (data as SeanceLigne[]).map(seanceDepuisLigne);
  }

  async coeursEntre(debut: Date, fin: Date): Promise<Coeur[]> {
    const { data, error } = await this.table('coeur')
      .select('*')
      .gte('horodatage', debut.toISOString())
      .lt('horodatage', fin.toISOString());
    if (error) throw error;
    return (data as CoeurLigne[]).map(coeurDepuisLigne);
  }
}
