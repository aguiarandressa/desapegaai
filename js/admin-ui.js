// =============================
// ADMIN UI — CONTROLES DE TELA
// =============================

// ELEMENTOS TOPO
const btnReload = document.getElementById("btnReload");
const btnLogout = document.getElementById("btnLogout");

// PRODUTOS (abas)
const tabProdutoForm = document.getElementById("tabProdutoForm");
const tabProdutoList = document.getElementById("tabProdutoList");
const produtoFormWrap = document.getElementById("produtoFormWrap");
const produtoListWrap = document.getElementById("produtoListWrap");
const msgProduto = document.getElementById("msgProduto");
const msgListaProdutos = document.getElementById("msgListaProdutos");

// BASE (abas)
const tabDonas = document.getElementById("tabDonas");
const tabConds = document.getElementById("tabConds");
const donasWrap = document.getElementById("donasWrap");
const condsWrap = document.getElementById("condsWrap");
const msgDona = document.getElementById("msgDona");
const msgCond = document.getElementById("msgCond");

// =============================
// TABS — PRODUTOS
// =============================
function setProdutoTab(mode) {
  const isForm = mode === "form";

  tabProdutoForm.classList.toggle("active", isForm);
  tabProdutoList.classList.toggle("active", !isForm);

  produtoFormWrap.style.display = isForm ? "block" : "none";
  produtoListWrap.style.display = isForm ? "none" : "block";

  if (msgProduto) hideMsg(msgProduto);
  if (msgListaProdutos) hideMsg(msgListaProdutos);
}

if (tabProdutoForm) {
  tabProdutoForm.addEventListener("click", () =>
    setProdutoTab("form")
  );
}

if (tabProdutoList) {
  tabProdutoList.addEventListener("click", () => {
    setProdutoTab("list");
    if (typeof renderListaProdutos === "function") {
      renderListaProdutos();
    }
  });
}

// =============================
// TABS — BASE (DONAS / CONDS)
// =============================
function setBaseTab(mode) {
  const isDonas = mode === "donas";

  tabDonas.classList.toggle("active", isDonas);
  tabConds.classList.toggle("active", !isDonas);

  donasWrap.style.display = isDonas ? "block" : "none";
  condsWrap.style.display = isDonas ? "none" : "block";

  if (msgDona) hideMsg(msgDona);
  if (msgCond) hideMsg(msgCond);
}

if (tabDonas) {
  tabDonas.addEventListener("click", () =>
    setBaseTab("donas")
  );
}

if (tabConds) {
  tabConds.addEventListener("click", () =>
    setBaseTab("conds")
  );
}

// =============================
// AÇÕES DO TOPO
// =============================
if (btnReload) {
  btnReload.addEventListener("click", () => {
    if (typeof init === "function") {
      init(true);
    } else {
      location.reload();
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem("admin_ok");
    location.reload();
  });
}
