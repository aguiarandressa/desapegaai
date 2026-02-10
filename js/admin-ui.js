/* =========================
   ADMIN UI
   (somente interface)
   ========================= */

// =========================
// MENSAGENS (GLOBAIS DO ADMIN)
// =========================
const msgDona = document.getElementById("msgDona");
const msgCond = document.getElementById("msgCond");
const msgProduto = document.getElementById("msgProduto");
const msgListaProdutos = document.getElementById("msgListaProdutos");



// =========================
// ELEMENTOS – TOPO
// =========================
const btnReload = document.getElementById("btnReload");
const btnLogout = document.getElementById("btnLogout");

// =========================
// TABS – PRODUTOS
// =========================
const tabProdutoForm = document.getElementById("tabProdutoForm");
const tabProdutoList = document.getElementById("tabProdutoList");
const produtoFormWrap = document.getElementById("produtoFormWrap");
const produtoListWrap = document.getElementById("produtoListWrap");





// =========================
// TABS – BASE (DONAS / CONDOMÍNIOS)
// =========================
const tabDonas = document.getElementById("tabDonas");
const tabConds = document.getElementById("tabConds");
const donasWrap = document.getElementById("donasWrap");
const condsWrap = document.getElementById("condsWrap");
const msgCond = document.getElementById("msgCond");

// =========================
// FUNÇÕES – PRODUTOS (UI)
// =========================
function setProdutoTab(tab) {
  if (!tabProdutoForm || !tabProdutoList || !produtoFormWrap || !produtoListWrap) return;

  const isForm = tab === "form";

  tabProdutoForm.classList.toggle("active", isForm);
  tabProdutoList.classList.toggle("active", !isForm);

  produtoFormWrap.style.display = isForm ? "block" : "none";
  produtoListWrap.style.display = isForm ? "none" : "block";

  if (typeof hideMsg === "function") {
    hideMsg(msgProduto);
    hideMsg(msgListaProdutos);
  }
}

// =========================
// FUNÇÕES – BASE (UI)
// =========================
function setBaseTab(tab) {
  if (!tabDonas || !tabConds || !donasWrap || !condsWrap) return;

  const isDonas = tab === "donas";

  tabDonas.classList.toggle("active", isDonas);
  tabConds.classList.toggle("active", !isDonas);

  donasWrap.style.display = isDonas ? "block" : "none";
  condsWrap.style.display = isDonas ? "none" : "block";

  if (typeof hideMsg === "function") {
    hideMsg(msgDona);
    hideMsg(msgCond);
  }
}

// =========================
// EVENTOS – TABS
// =========================
if (tabProdutoForm) {
  tabProdutoForm.addEventListener("click", () => setProdutoTab("form"));
}

if (tabProdutoList) {
  tabProdutoList.addEventListener("click", () => setProdutoTab("list"));
}

if (tabDonas) {
  tabDonas.addEventListener("click", () => setBaseTab("donas"));
}

if (tabConds) {
  tabConds.addEventListener("click", () => setBaseTab("conds"));
}
