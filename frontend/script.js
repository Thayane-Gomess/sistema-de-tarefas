const API_URL = "http://localhost:3000/tarefas"; // depois trocamos para o Render

// Carregar tarefas (GET)
async function carregarTarefas() {
  try {
    const resposta = await fetch(API_URL);
    const tarefas = await resposta.json();

    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
      lista.innerHTML = "<li>Nenhuma tarefa cadastrada ainda. Adicione uma acima!</li>";
      return;
    }

    tarefas.forEach(tarefa => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${tarefa.titulo} - ${tarefa.status || "pendente"}</span>
        <div>
          <button onclick="atualizarTarefa('${tarefa.id}')">✅ Concluir</button>
          <button onclick="deletarTarefa('${tarefa.id}')">🗑️ Excluir</button>
        </div>
      `;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
    alert("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
  }
}

// Criar tarefa (POST)
document.getElementById("form-tarefa").addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  if (!titulo.trim()) {
    alert("Por favor, insira um título para a tarefa.");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, status: "pendente" })
    });

    alert("Tarefa adicionada com sucesso!");
    document.getElementById("form-tarefa").reset();
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);
    alert("Não foi possível adicionar a tarefa.");
  }
});

// Atualizar tarefa (PUT)
async function atualizarTarefa(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "concluída" })
    });
    alert("Tarefa marcada como concluída!");
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
    alert("Não foi possível atualizar a tarefa.");
  }
}

// Deletar tarefa (DELETE)
async function deletarTarefa(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Tarefa excluída com sucesso!");
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao deletar tarefa:", erro);
    alert("Não foi possível excluir a tarefa.");
  }
}

// Inicializar
carregarTarefas();