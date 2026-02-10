/* =========================
   CONFIGURAÇÕES GLOBAIS
   ========================= */

const SUPABASE_URL = "https://ssspgiiftrhvdjidndzi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_igD1PWk91A-ySowhPqJdA_484zncZX";

const BUCKET_PRODUTOS = "produtos";

// =========================
// CLIENTE SUPABASE (singleton)
// =========================

if (!window.supabaseClient) {
  if (!window.supabase) {
    console.error("❌ Supabase JS não carregou. Verifique o script CDN no admin.html");
  } else {
    window.supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    console.log("✅ Supabase conectado com sucesso");
  }
}
