

/* =========================
   ADMIN – DONAS (CRUD)
   ========================= */

// =========================
// ELEMENTOS (DOM)
// =========================
const d_nome = document.getElementById("d_nome");
const d_whats = document.getElementById("d_whats");
const btnAddDona = document.getElementById("btnAddDona");
const listaDonas = document.getElementById("listaDonas");
const supabase = window.supabase;
// =========================
// ESTADO
// =========================
let donas = [];

// =========================
// EVENTOS
// =========================
if (btnAddDona) {
  btnAddDona.addEventListener("click", addDona);
}

// =========================
// FUNÇÕES
// =========================
async function loadDonas() {
  const { data, error } = await supabase
    .from("donas")
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    showMsg(msgDona, "err", "Erro ao carregar donas.");
    console.error(error);
    return;
  }

  donas = data || [];
  renderDonas();
  fillDonasSelect();
}

async function addDona() {
  hideMsg(msgDona);

  const nome = safeTrim(d_nome.value);
  const whats = onlyDigits(d_whats.value);

  if (!nome) {
    return showMsg(msgDona, "err", "Informe o nome da dona.");
  }

  if (!whats || whats.length < 12) {
    return showMsg(
      msgDona,
      "err",
      "Informe um WhatsApp válido (55 + DDD + número)."
    );
  }

  const jaExiste = donas.some(
    (d) => onlyDigits(d.whatsapp) === whats
  );

  if (jaExiste) {
    return showMsg(
      msgDona,
      "warn",
      "Já existe uma dona cadastrada com esse WhatsApp."
    );
  }

  const payload = {
    id: crypto.randomUUID(),
    nome,
    whatsapp: whats,
  };

  const { error } = await supabase.from("donas").insert([payload]);

  if (error) {
    console.error(error);
    return showMsg(
      msgDona,
      "err",
      "Erro ao salvar dona. Tente novamente."
    );
  }

  d_nome.value = "";
  d_whats.value = "";

  showMsg(msgDona, "ok", "Dona cadastrada com sucesso!");
  await loadDonas();
}

async function delDona(id) {
  const ok = confirm(
    "Excluir esta dona? Produtos vinculados podem impedir a exclusão."
  );
  if (!ok) return;

  const { error } = await supabase
    .from("donas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return showMsg(
      msgDona,
      "err",
      "Não foi possível excluir. Pode haver produtos vinculados."
    );
  }

  showMsg(msgDona, "ok", "Dona excluída.");
  await loadDonas();
}

// =========================
// RENDER
// =========================
function renderDonas() {
  listaDonas.innerHTML = "";

  if (!donas.length) {
    listaDonas.innerHTML =
      `<div class="msg show warn">Nenhuma dona cadastrada ainda.</div>`;
    return;
  }

  donas.forEach((d) => {
    const el = document.createElement("div");
    el.className = "item";

    el.innerHTML = `
      <div class="meta">
        <div class="title">${escapeHtml(d.nome)}</div>
        <div class="sub">WhatsApp: ${escapeHtml(d.whatsapp)}</div>
      </div>
      <div class="actions">
        <button class="btn red mini" type="button">Excluir</button>
      </div>
    `;

    el
      .querySelector("button")
      .addEventListener("click", () => delDona(d.id));

    listaDonas.appendChild(el);
  });
}

// =========================
// SELECT DE PRODUTOS
// =========================
function fillDonasSelect() {
  const select = document.getElementById("p_dona");
  if (!select) return;

  if (!donas.length) {
    select.innerHTML =
      `<option value="">— Cadastre uma dona primeiro —</option>`;
    return;
  }

  select.innerHTML =
    `<option value="">Selecione...</option>` +
    donas
      .map((d) => `<option value="${d.id}">${d.nome}</option>`)
      .join("");
}
