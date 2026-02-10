/* =========================
   CONFIGURAÇÕES GLOBAIS
   ========================= */

// ⚠️ NUNCA redeclarar isso em outro arquivo
const SUPABASE_URL = "https://ssspgiiftrhvdjidndzi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_igD1PWk91A-ySowhPqJdA_484zncZX";

// Bucket público onde ficam as imagens
const BUCKET_PRODUTOS = "produtos";

// =========================
// Cliente Supabase (singleton)
// =========================

// Evita erro: "Identifier 'supabase' has already been declared"
if (!window.supabase) {
  window.supabase = supabaseJs.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}

// A partir daqui, TODOS os arquivos usam:
// 👉 window.supabase
