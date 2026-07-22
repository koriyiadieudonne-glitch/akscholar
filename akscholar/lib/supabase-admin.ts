// ============================================================
// AKSCHOLAR — Client Supabase Admin (service role — serveur uniquement)
// Instanciation lazy pour éviter l'erreur au build sans la clé
// ============================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local");
    }
    _client = createClient(url, key);
  }
  return _client;
}

// Alias pratique — instancié à l'appel, pas à l'import
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseAdmin() as any)[prop];
  },
});
