// ============================================================
// AKSCHOLAR — Client Supabase Admin (service role — serveur uniquement)
// Utilisé pour les écritures depuis les webhooks
// ============================================================

import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
