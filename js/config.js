/* =========================
   CONFIGURAÇÕES GLOBAIS
========================= */

(() => {
  const SUPABASE_URL = "https://ssspgiiftrhvdjidndzi.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_igD1PWk91A-ySowhPqJdA_484zncZX";

  window.BUCKET = "produtos";

  // O CDN @supabase/supabase-js@2 geralmente expõe window.supabase
  const lib = window.supabase || window.supabaseJs;

  if (!lib || typeof lib.createClient !== "function") {
    console.error("Supabase JS não carregou. Verifique o script do CDN no admin.html");
    return;
  }

  // Cria o CLIENTE uma vez só
  if (!window.sb) {
    window.sb = lib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase conectado com sucesso");
  }

  // expõe URL se precisar montar public URL
  window.SUPABASE_URL = SUPABASE_URL;
})();
