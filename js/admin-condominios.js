// =============================
// CONDOMÍNIOS - CRUD
// =============================

// ELEMENTOS
const c_nome = document.getElementById("c_nome");
const btnAddCond = document.getElementById("btnAddCond");
const listaConds = document.getElementById("listaConds");

let condominios = [];

// EVENTO
if (btnAddCond) {
  btnAddCond.addEventListener("click", addCond);
}

// LOAD
async function loadConds() {
  const { data, error } = await supabase
    .from("condominios")
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    showMsg(msgCond, "err", "Erro ao carregar condomínios.");
    return;
  }

  condominios = data || [];
  renderConds();
  fillCondsSelect();
  fillCondsFilter();
}

// CREATE
async function addCond() {
  hideMsg(msgCond);

  const nome = safeTrim(c_nome.value);
  if (!nome) {
    return showMsg(msgCond, "err", "Informe o nome do condomínio.");
  }

  const duplicado = condominios.some(
    (c) => safeTrim(c.nome).toLowerCase() === nome.toLowerCase()
  );
  if (duplicado) {
    return showMsg(
      msgCond,
      "warn",
      "Este condomínio já está cadastrado."
    );
  }

  const payload = {
    id: uuid(),
    nome,
  };

  const { error } = await supabase
    .from("condominios")
    .insert([payload]);

  if (error) {
    return showMsg(
      msgCond,
      "err",
      "Erro ao cadastrar condomínio."
    );
  }

  c_nome.value = "";
  showMsg(msgCond, "ok", "Condomínio cadastrado com sucesso!");
  loadConds();
}

// DELETE
async function delCond(id) {
  const ok = confirm(
    "Excluir este condomínio? Se houver produtos vinculados, não será possível."
  );
  if (!ok) return;

  const { error } = await supabase
    .from("condominios")
    .delete()
    .eq("id", id);

  if (error) {
    return showMsg(
      msgCond,
      "err",
      "Não foi possível excluir (há produtos vinculados)."
    );
  }

  showMsg(msgCond, "ok", "Condomínio excluído.");
  loadConds();
}

// RENDER
function renderConds() {
  listaConds.innerHTML = "";

  if (!condominios.length) {
    listaConds.innerHTML =
      `<div class="msg show warn">Nenhum condomínio cadastrado.</div>`;
    return;
  }

  condominios.forEach((c) => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div class="meta">
        <div class="title">${escapeHtml(c.nome)}</div>
        <div class="sub">ID: ${escapeHtml(c.id)}</div>
      </div>
      <div class="actions">
        <button class="btn red mini">Excluir</button>
      </div>
    `;

    el.querySelector("button").addEventListener("click", () =>
      delCond(c.id)
    );

    listaConds.appendChild(el);
  });
}
