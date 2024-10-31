const urlBase = "/receitas";

async function listarReceitas() {
    const resposta = await fetch(urlBase);
    const receitas = await resposta.json();

    const container = document.getElementById("receitas-container");
    container.innerHTML = "";

    receitas.forEach(receita => {
        const div = document.createElement("div");
        div.className = "receita";
        div.innerHTML = `
            <h3>${receita.nome}</h3>
            <p><strong>Ingredientes:</strong> ${receita.ingredientes.join(", ")}</p>
            <p><strong>Preparo:</strong> ${receita.preparo}</p>
            <button onclick="deletarReceita(${receita.id})">Deletar</button>
            <button onclick="mostrarEdicao(${receita.id})">Editar</button>
        `;
        container.appendChild(div);
    });
}

async function adicionarReceita() {
    const nome = document.getElementById("nome").value;
    const ingredientes = document.getElementById("ingredientes").value.split(",");
    const preparo = document.getElementById("preparo").value;

    await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, ingredientes, preparo })
    });

    listarReceitas();
}

async function deletarReceita(id) {
    await fetch(`${urlBase}/${id}`, { method: "DELETE" });
    listarReceitas();
}

function mostrarEdicao(id) {
    const nome = prompt("Novo nome da receita:");
    const ingredientes = prompt("Novos ingredientes (separados por vírgula):").split(",");
    const preparo = prompt("Novo modo de preparo:");

    editarReceita(id, { nome, ingredientes, preparo });
}

async function editarReceita(id, dados) {
    await fetch(`${urlBase}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    listarReceitas();
}

listarReceitas();