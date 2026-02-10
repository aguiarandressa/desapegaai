/* =========================
   HELPERS / UTILITÁRIOS
   ========================= */

// -------------------------
// Mensagens (DUA-friendly)
// -------------------------
function showMsg(el, type, text) {
  if (!el) return;
  el.className = `msg show ${type || ""}`;
  el.textContent = text;
}

function hideMsg(el) {
  if (!el) return;
  el.className = "msg";
  el.textContent = "";
}

// -------------------------
// Sanitização / Texto
// -------------------------
function safeTrim(value) {
  return (value ?? "").toString().trim();
}

function onlyDigits(value) {
  return (value ?? "").replace(/\D+/g, "");
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

// -------------------------
// Números / Moeda
// -------------------------
function normalizePrice(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
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

// -------------------------
// IDs / Arquivos
// -------------------------
function uuid() {
  return crypto.randomUUID();
}

function fileIsImage(file) {
  return file && file.type && file.type.startsWith("image/");
}

// -------------------------
// Supabase Storage
// -------------------------
function buildPublicImageUrl(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_PRODUTOS}/${encodeURIComponent(path)}`;
}
