const API_URL = "http://localhost:3000/tarefas";

const form = document.getElementById("form-tarefa");
const listaPendentes = document.getElementById("lista-pendentes");
const listaAndamento = document.getElementById("lista-andamento");
const listaConcluidas = document.getElementById("lista-concluidas");

// renderiza 
async function carregarTarefas() {
  try {
    const res = await fetch(API_URL);
    const tarefas = await res.json();

    listaPendentes.innerHTML = "";
    listaAndamento.innerHTML = "";
    listaConcluidas.innerHTML = "";

    tarefas.forEach(tarefa => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="tarefa-info">
          <strong>${tarefa.titulo}</strong>
          ${tarefa.descricao ? `<p class="descricao">${tarefa.descricao}</p>` : ""}
        </div>
        <span class="status-${tarefa.status}">${tarefa.status}</span>
        ${tarefa.status === "pendente" ? `<button class="andamento" data-id="${tarefa.id}">Iniciar</button>` : ""}
        ${tarefa.status === "andamento" ? `<button class="concluir" data-id="${tarefa.id}">Concluir</button>` : ""}
        <button class="editar" data-id="${tarefa.id}">Editar</button>
        <button class="excluir" data-id="${tarefa.id}">Excluir</button>
      `;

      if (tarefa.status === "pendente") listaPendentes.appendChild(li);
      else if (tarefa.status === "andamento") listaAndamento.appendChild(li);
      else if (tarefa.status === "concluida") listaConcluidas.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

// adicionar nova
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  if (!titulo) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, status: "pendente" })
    });

    const data = await res.json(); 
    console.log("Tarefa criada:", data);

    if (!res.ok) {
      console.error("Erro ao adicionar:", data);
    }
  } catch (err) {
    console.error("Falha na requisição:", err);
  }

  form.reset();
  carregarTarefas();
});

// ações dos botões
document.addEventListener("click", async function (e) {
  const btn = e.target;
  const id = btn.dataset.id;
  if (!id) return;

  if (btn.classList.contains("andamento")) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "andamento" })
    });
  }

  if (btn.classList.contains("concluir")) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "concluida" })
    });
  }

  if (btn.classList.contains("editar")) {
    const li = btn.closest("li");
    const tituloAtual = li.querySelector("strong").textContent;
    const descricaoAtual = li.querySelector(".descricao") ? li.querySelector(".descricao").textContent : "";

    const novoTitulo = prompt("Novo título:", tituloAtual);
    const novaDescricao = prompt("Nova descrição:", descricaoAtual);

    if (novoTitulo !== null && novaDescricao !== null) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: novoTitulo, descricao: novaDescricao })
      });
      carregarTarefas();
    }
  }

  if (btn.classList.contains("excluir")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  }

  carregarTarefas();
});

carregarTarefas();