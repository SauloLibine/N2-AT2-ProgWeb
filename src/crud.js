let pedidos = [];

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const cerveja = document.getElementById("cerveja").value;

    // CREATE + VALIDAÇÃO
    if (!nome || !email || !cerveja) {
        alert("Preencha todos os campos!");
        return;
    }

    pedidos.push({
        nome,
        email,
        cerveja
    });

    renderizar();

    formulario.reset();
});

// READ COM MAP()
function renderizar() {
    const lista = document.getElementById("listaPedidos");

   lista.innerHTML = pedidos.map((pedido, index) => `
    <li>
        <strong>${pedido.nome}</strong><br>
        ${pedido.email}<br>
        🍺 ${pedido.cerveja}<br><br>

        <button onclick="editar(${index})">
            Editar
        </button>

        <button onclick="excluir(${index})">
            Excluir
        </button>
    </li>
`).join("");
}

// UPDATE
function editar(index) {

    const novoNome = prompt(
        "Novo nome:",
        pedidos[index].nome
    );

    const novoEmail = prompt(
        "Novo email:",
        pedidos[index].email
    );

    const novaCerveja = prompt(
        "Nova cerveja:",
        pedidos[index].cerveja
    );

    if (novoNome && novoEmail && novaCerveja) {

        pedidos[index].nome = novoNome;
        pedidos[index].email = novoEmail;
        pedidos[index].cerveja = novaCerveja;

        renderizar();
    }
}

// DELETAR
function excluir(index) {
    pedidos.splice(index, 1);
    renderizar();
}