// =============================
// HELPERS GERAIS (DUA)
// =============================

function showMsg(el, type, text) {
  if (!el) return;
  el.className = "msg show " + (type || "");
  el.textContent = text;
}

function hideMsg(el) {
  if (!el) return;
  el.className = "msg";
  el.textContent = "";
}

function onlyDigits(str) {
  return (str || "").replace(/\D+/g, "");
}

function safeTrim(str) {
  return (str ?? "").toString().trim();
}

function uuid() {
  return crypto.randomUUID();
}

function escapeHtml(str) {
  return (str ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toBRL(value) {
  try {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } catch {
    return "R$ 0,00";
  }
}
