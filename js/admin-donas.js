// =============================
// DONAS - CRUD
// =============================

// ELEMENTOS
const d_nome = document.getElementById("d_nome");
const d_whats = document.getElementById("d_whats");
const btnAddDona = document.getElementById("btnAddDona");
const listaDonas = document.getElementById("listaDonas");
const msgDona = document.getElementById("msgDona");

// ESTADO
let donas = [];

// EVENTO
if (btnAddDona) {
  btnAddDona.addEventListener("click", addDona);
}

// LOAD
async function loadDonas() {
  const { data, error } = await supabase
    .from("donas")
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    showMsg(msgDona, "err", "Erro ao carregar donas.");
    return;
  }

  donas = data || [];
  renderDonas();
  fillDonasSelect();
}

// CREATE
async function addDona() {
  hideMsg(msgDona);

  const nome = safeTrim(d_nome.value);
  const whatsapp = onlyDigits(d_whats.value);

  if (!nome) {
    return showMsg(msgDona, "err", "Informe o nome da dona.");
  }

  if (!whatsapp || whatsapp.length < 12) {
    return showMsg(
      msgDona,
      "err",
      "WhatsApp inválido. Use DDI + DDD + número."
    );
  }

  const duplicada = donas.some(
    (d) => onlyDigits(d.whatsapp) === whatsapp
  );
  if (duplicada) {
    return showMsg(
      msgDona,
      "warn",
      "Já existe uma dona com esse WhatsApp."
    );
  }

  const payload = {
    id: uuid(),
    nome,
    whatsapp,
  };

  const { error } = await supabase.from("donas").insert([payload]);

  if (error) {
    return showMsg(msgDona, "err", "Erro ao cadastrar dona.");
  }

  d_nome.value = "";
  d_whats.value = "";

  showMsg(msgDona, "ok", "Dona cadastrada com sucesso!");
  loadDonas();
}

// DELETE
async function delDona(id) {
  const ok = confirm(
    "Excluir esta dona? Se houver produtos vinculados, não será possível."
  );
  if (!ok) return;

  const { error } = await supabase
    .from("donas")
    .delete()
    .eq("id", id);

  if (error) {
    return showMsg(
      msgDona,
      "err",
      "Não foi possível excluir (há produtos vinculados)."
    );
  }

  showMsg(msgDona, "ok", "Dona excluída.");
  loadDonas();
}

// RENDER
function renderDonas() {
  listaDonas.innerHTML = "";

  if (!donas.length) {
    listaDonas.innerHTML =
      `<div class="msg show warn">Nenhuma dona cadastrada.</div>`;
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
        <button class="btn red mini">Excluir</button>
      </div>
    `;

    el.querySelector("button").addEventListener("click", () =>
      delDona(d.id)
    );

    listaDonas.appendChild(el);
  });
}
