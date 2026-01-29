const API_URL = "https://sistema-de-tarefas-6gfb.onrender.com/tarefas";

const form = document.getElementById("form-tarefa");
const listaPendentes = document.getElementById("lista-pendentes");
const listaAndamento = document.getElementById("lista-andamento");
const listaConcluidas = document.getElementById("lista-concluidas");

// renderizar tarefas
async function carregarTarefas() {
  const res = await fetch(API_URL);
  const tarefas = await res.json();

  // Limpa listas
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
      <button class="excluir" data-id="${tarefa.id}">Excluir</button>
    `;

    if (tarefa.status === "pendente") listaPendentes.appendChild(li);
    else if (tarefa.status === "andamento") listaAndamento.appendChild(li);
    else if (tarefa.status === "concluida") listaConcluidas.appendChild(li);
  });
}

// Adiciona nova tarefa
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!titulo) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao, status: "pendente" })
  });

  form.reset();
  carregarTarefas();
});

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

  if (btn.classList.contains("excluir")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  }

  carregarTarefas();
});

carregarTarefas();