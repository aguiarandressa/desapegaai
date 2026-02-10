/* =========================
   ADMIN UI
   (somente interface)
   ========================= */

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
const msgListaProdutos = document.getElementById("msgListaProdutos");
const msgProduto = document.getElementById("msgProduto");

// =========================
// TABS – BASE (DONAS / CONDS)
// =========================
const tabDonas = document.getElementById("tabDonas");
const tabConds = document.getElementById("tabConds");
const donasWrap = document.getElementById("donasWrap");
const condsWrap = document.getElementById("condsWrap");
const msgDona = document.getElementById("msgDona");
const msgCond = document.getElementById("msgCond");

// =========================
// FUNÇÕES – PRODUTOS (UI)
// =========================
function setProdutoTab(tab) {
  const isForm = tab === "form";

  tabProdutoForm.classList.toggle("active", isForm);
  tabProdutoList.classList.toggle("active", !isForm);

  produtoFormWrap.style.display = isForm ? "block" : "none";
  produtoListWrap.style.display = isForm ? "none" : "block";

  hideMsg(msgProduto);
  hideMsg(msgListaProdutos);
}

// =========================
// FUNÇÕES – BASE (UI)
// =========================
function setBaseTab(tab) {
  const isDonas = tab === "donas";

  tab
