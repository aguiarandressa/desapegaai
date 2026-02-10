// =============================
// ADMIN INIT — ORQUESTRAÇÃO
// =============================

async function init(showToast = false) {
  try {
    // 1️⃣ Prepara selects fixos
    if (typeof fillCategorias === "function") {
      fillCategorias();
    }

    // 2️⃣ Reseta formulário de produto (estado limpo)
    if (typeof resetProdutoForm === "function") {
      resetProdutoForm();
    }

    // 3️⃣ Carrega dados base (ordem importa)
    if (typeof loadDonas === "function") {
      await loadDonas();
    }

    if (typeof loadConds === "function") {
      await loadConds();
    }

    if (typeof loadProdutos === "function") {
      await loadProdutos();
    }

    // 4️⃣ Feedback visual opcional
    if (showToast && typeof showMsg === "function") {
      const msg = document.getElementById("msgListaProdutos");
      if (msg) {
        showMsg(msg, "ok", "Dados carregados com sucesso.");
      }
    }

    // 5️⃣ Garante aba padrão
    if (typeof setProdutoTab === "function") {
      setProdutoTab("form");
    }

  } catch (err) {
    console.error("Erro ao inicializar admin:", err);

    const msg = document.getElementById("msgListaProdutos");
    if (msg && typeof showMsg === "function") {
      showMsg(
        msg,
        "err",
        "Erro ao carregar dados. Verifique conexão ou Supabase."
      );
    }
  }
}

// =============================
// BOOTSTRAP
// =============================
document.addEventListener("DOMContentLoaded", () => {
  init(false);
});
