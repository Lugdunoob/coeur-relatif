// Partagé par les routes /api/web/*.ts (lot 6, ADR-0006) : dépôt Supabase (singleton
// par instance de fonction Vercel) et authentification par jeton personnel — pas de
// mot de passe, pas de compte partagé avec le vrai produit domelo.
import { SupabaseRepository } from '../db/supabase.js';
import type { Repository } from '../db/repository.js';
import type { Personne } from '../db/schema.js';

let repo: Repository | undefined;

export function obtenirRepo(): Repository {
  if (repo === undefined) {
    const url = process.env.SUPABASE_URL;
    const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !cle) throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.');
    repo = new SupabaseRepository(url, cle);
  }
  return repo;
}

// Le jeton personnel (paramètre `p`) EST l'identifiant de la personne : pas de table
// de correspondance séparée. Une personne inconnue (jeton invalide, ou pas encore créée
// par le fondateur) ne peut rien faire — jamais créée à la volée par cette route (c'est
// le fondateur qui invite, comme pour Telegram).
export async function authentifier(repository: Repository, jeton: string | undefined): Promise<Personne | undefined> {
  if (!jeton) return undefined;
  return repository.getPersonne(jeton);
}
