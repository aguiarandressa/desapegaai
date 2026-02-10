// =============================
// PRODUTOS — CRUD + UPLOAD
// =============================

// ELEMENTOS FORM
const p_nome = document.getElementById("p_nome");
const p_preco = document.getElementById("p_preco");
const p_descricao = document.getElementById("p_descricao");
const p_categoria = document.getElementById("p_categoria");
const p_ativo = document.getElementById("p_ativo");
const p_dona = document.getElementById("p_dona");
const p_condominio = document.getElementById("p_condominio");
const p_imagem = document.getElementById("p_imagem");
const p_preview = document.getElementById("p_preview");
const p_preview_text = document.getElementById("p_preview_text");

const btnSalvarProduto = document.getElementById("btnSalvarProduto");
const btnLimparProduto = document.getElementById("btnLimparProduto");
//const msgProduto = document.getElementById("msgProduto");

const modoTexto = document.getElementById("modoTexto");
const produtoIdTexto = document.getElementById("produtoIdTexto");

// LISTA / FILTROS
const listaProdutos = document.getElementById("listaProdutos");
const contagemProdutos = document.getElementById("contagemProdutos");
const q_busca = document.getElementById("q_busca");
const q_status = document.getElementById("q_status");
const q_cat = document.getElementById("q_cat");
const q_cond = document.getElementById("q_cond");


// ESTADO
let produtos = [];
let editingProductId = null;
let editingOldImageUrl = null;

// =============================
// CATEGORIAS FIXAS
// =============================
const CATEGORIAS = [
  "Calçados",
  "Roupas",
  "Infantil",
  "Brinquedos",
  "Acessórios",
  "Casa",
  "Outros",
];

// =============================
// INIT SELECTS
// =============================
function fillCategorias() {
  p_categoria.innerHTML = CATEGORIAS.map(
    (c) => `<option value="${c}">${c}</option>`
  ).join("");

  q_cat.innerHTML =
    `<option value="all">Todas</option>` +
    CATEGORIAS.map(
      (c) => `<option value="${c}">${c}</option>`
    ).join("");
}

// =============================
// PREVIEW DE IMAGEM
// =============================
p_imagem.addEventListener("change", () => {
  const file = p_imagem.files?.[0];
  if (!file) return resetPreview();

  if (!file.type.startsWith("image/")) {
    showMsg(msgProduto, "err", "Selecione uma imagem válida.");
    resetPreview();
    return;
  }

  p_preview.src = URL.createObjectURL(file);
  p_preview.style.display = "block";
  p_preview_text.textContent = `Imagem selecionada: ${file.name}`;
});

function resetPreview() {
  p_preview.src = "";
  p_preview.style.display = "none";
  p_preview_text.textContent = "Nenhuma imagem selecionada.";
}

// =============================
// LOAD PRODUTOS
// =============================
async function loadProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    showMsg(msgListaProdutos, "err", "Erro ao carregar produtos.");
    return;
  }

  produtos = data || [];
  renderListaProdutos();
}

// =============================
// SALVAR PRODUTO
// =============================
btnSalvarProduto.addEventListener("click", saveProduto);
btnLimparProduto.addEventListener("click", resetProdutoForm);

async function saveProduto() {
  hideMsg(msgProduto);

  if (!donas.length || !condominios.length) {
    return showMsg(
      msgProduto,
      "err",
      "Cadastre donas e condomínios antes."
    );
  }

  const nome = safeTrim(p_nome.value);
  const preco = Number(p_preco.value);
  const categoria = p_categoria.value;
  const donaId = p_dona.value;
  const condId = p_condominio.value;
  const ativo = p_ativo.value === "true";
  const descricao = safeTrim(p_descricao.value);
  const file = p_imagem.files?.[0];

  if (!nome || !categoria || !donaId || !condId) {
    return showMsg(
      msgProduto,
      "err",
      "Preencha todos os campos obrigatórios."
    );
  }

  if (!Number.isFinite(preco)) {
    return showMsg(msgProduto, "err", "Preço inválido.");
  }

  if (!editingProductId && !file) {
    return showMsg(
      msgProduto,
      "err",
      "Selecione uma imagem para o produto."
    );
  }

  btnSalvarProduto.disabled = true;
  btnSalvarProduto.textContent = "Salvando...";

  try {
    let imagem_url = editingOldImageUrl;

    if (file) {
      const path = `${Date.now()}-${uuid()}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file);

      if (error) throw error;

      imagem_url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    }

    const payload = {
      nome,
      preco,
      categoria,
      descricao,
      dona_id: donaId,
      condominio_id: condId,
      imagem_url,
      ativo,
    };

    if (!editingProductId) {
      payload.id = uuid();
      await supabase.from("produtos").insert([payload]);
      showMsg(msgProduto, "ok", "Produto cadastrado!");
    } else {
      await supabase
        .from("produtos")
        .update(payload)
        .eq("id", editingProductId);
      showMsg(msgProduto, "ok", "Produto atualizado!");
    }

    resetProdutoForm();
    loadProdutos();
  } catch (e) {
    console.error(e);
    showMsg(msgProduto, "err", "Erro ao salvar produto.");
  } finally {
    btnSalvarProduto.disabled = false;
    btnSalvarProduto.textContent = "Salvar produto";
  }
}

// =============================
// RESET FORM
// =============================
function resetProdutoForm() {
  editingProductId = null;
  editingOldImageUrl = null;

  p_nome.value = "";
  p_preco.value = "";
  p_descricao.value = "";
  p_categoria.value = CATEGORIAS[0];
  p_ativo.value = "true";
  p_dona.value = "";
  p_condominio.value = "";
  p_imagem.value = "";

  resetPreview();

  modoTexto.textContent = "Novo produto";
  produtoIdTexto.textContent = "—";
  hideMsg(msgProduto);
}

// =============================
// EDITAR PRODUTO
// =============================
function editProduto(id) {
  const p = produtos.find((x) => x.id === id);
  if (!p) return;

  editingProductId = p.id;
  editingOldImageUrl = p.imagem_url;

  p_nome.value = p.nome;
  p_preco.value = p.preco;
  p_descricao.value = p.descricao || "";
  p_categoria.value = p.categoria;
  p_ativo.value = String(p.ativo);
  p_dona.value = p.dona_id;
  p_condominio.value = p.condominio_id;

  p_preview.src = p.imagem_url;
  p_preview.style.display = "block";
  p_preview_text.textContent =
    "Imagem atual (escolha outra se quiser trocar).";

  modoTexto.textContent = "Editando produto";
  produtoIdTexto.textContent = p.id;

  setProdutoTab("form");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =============================
// LISTA / FILTROS
// =============================
btnAplicarFiltros.addEventListener("click", renderListaProdutos);
btnLimparFiltros.addEventListener("click", () => {
  q_busca.value = "";
  q_status.value = "all";
  q_cat.value = "all";
  q_cond.value = "all";
  renderListaProdutos();
});

function renderListaProdutos() {
  let list = [...produtos];

  const busca = safeTrim(q_busca.value).toLowerCase();
  const status = q_status.value;
  const cat = q_cat.value;
  const cond = q_cond.value;

  if (status !== "all") {
    list = list.filter((p) => String(p.ativo) === status);
  }
  if (cat !== "all") {
    list = list.filter((p) => p.categoria === cat);
  }
  if (cond !== "all") {
    list = list.filter((p) => p.condominio_id === cond);
  }
  if (busca) {
    list = list.filter(
      (p) =>
        p.nome.toLowerCase().includes(busca) ||
        (p.descricao || "").toLowerCase().includes(busca)
    );
  }

  contagemProdutos.textContent = `${list.length} produto(s)`;
  listaProdutos.innerHTML = "";

  if (!list.length) {
    listaProdutos.innerHTML =
      `<div class="msg show warn">Nenhum produto encontrado.</div>`;
    return;
  }

  list.forEach((p) => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div class="meta">
        <div class="title">${escapeHtml(p.nome)}</div>
        <div class="sub">${escapeHtml(p.categoria)} • ${toBRL(p.preco)}</div>
        <div class="status ${p.ativo ? "on" : "off"}">
          ● ${p.ativo ? "Ativo" : "Inativo"}
        </div>
      </div>
      <div class="actions">
        <button class="btn blue mini">Editar</button>
        <button class="btn mini">${p.ativo ? "Desativar" : "Ativar"}</button>
      </div>
    `;

    const [btnEdit, btnToggle] = el.querySelectorAll("button");
    btnEdit.onclick = () => editProduto(p.id);
    btnToggle.onclick = () =>
      toggleAtivoProduto(p.id, !p.ativo);

    listaProdutos.appendChild(el);
  });
}

async function toggleAtivoProduto(id, ativo) {
  await supabase.from("produtos").update({ ativo }).eq("id", id);
  loadProdutos();
}
