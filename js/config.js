// =============================
// CONFIG SUPABASE
// =============================
const SUPABASE_URL = "https://ssspgiiftrhvdjidndzi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_igD1PWk91A-ySowhPqJdA_484zncZX";
const BUCKET = "produtos";

// client único (evita erro de redeclaração)
if (!window.supabaseClient) {
  window.supabaseClient = supabaseJs.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}
