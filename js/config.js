/* =========================
   CONFIGURAÇÕES GLOBAIS (ADMIN)
   ========================= */

(function () {
  // ---- Config (coloque tudo em window para ficar acessível e evitar redeclaração acidental)
  window.SUPABASE_URL = "https://ssspgiiftrhvdjidndzi.supabase.co";
  window.SUPABASE_ANON_KEY = "sb_publishable_igD1PWk91A-ySowhPqJdA_484zncZX";
  window.BUCKET_PRODUTOS = "produtos";

  // ---- Garantir que o CDN do Supabase foi carregado
  if (!window.supabaseJs || typeof window.supabaseJs.createClient !== "function") {
    console.error("Supabase JS não carregou. Verifique o <script src> do CDN no admin.html");
    return;
  }

  // ---- Singleton do client
  if (!window.supabase) {
    window.supabase = window.supabaseJs.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
  }

  // Atalho opcional (pra ficar curto nos outros arquivos)
  window.sb = window.supabase;
})();
