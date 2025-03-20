// Contador de incremento/decremento
let contador1 = 0;
const contador2 = document.getElementById("contador2");
const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");

botao1.onclick = function () {
    contador1++;
    contador2.innerText = contador1;
};

botao2.onclick = function () {
    if (contador1 > 0) {
        contador1--;
        contador2.innerText = contador1;
    } else {
        alert("Não pode ser negativo!");
    }
};

// Adicionar parágrafos ao pressionar "Enter"
document.getElementById('entrada').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const texto = this.value.trim();

        if (texto !== "") {
            const novoParagrafo = document.createElement('p');
            novoParagrafo.textContent = texto;
            document.getElementById('conteudo').appendChild(novoParagrafo);

            // Limpa o campo de entrada
            this.value = '';

            // Atualiza o contador de caracteres para 0
            document.getElementById('contador').textContent = '0';
        }
    }
});

// Contador de caracteres (excluindo espaços)
document.getElementById('entrada').addEventListener('input', function () {
    const texto = this.value.replace(/\s/g, '');
    document.getElementById('contador').textContent = texto.length;
});

// Adicionar itens às listas
function adicionarItem(tipoLista) {
    const input = document.getElementById('itemInput');
    const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor, digite algo!");
        return;
    }

    const novoItem = document.createElement('li');
    novoItem.textContent = texto;

    if (tipoLista === 'ordenada') {
        document.getElementById('listaOrdenada').appendChild(novoItem);
    } else if (tipoLista === 'naoOrdenada') {
        document.getElementById('listaNaoOrdenada').appendChild(novoItem);
    }

    input.value = '';
}

// Event listeners para adicionar itens
document.getElementById('adicionarOrdenada').addEventListener('click', () => adicionarItem('ordenada'));
document.getElementById('adicionarNaoOrdenada').addEventListener('click', () => adicionarItem('naoOrdenada'));

// Botão de reset
document.getElementById('reset').addEventListener('click', function () {
    // Limpa as listas
    document.getElementById('listaOrdenada').innerHTML = '';
    document.getElementById('listaNaoOrdenada').innerHTML = '';

    // Limpa o campo de texto e o contador
    document.getElementById('itemInput').value = '';
    document.getElementById('contador').textContent = '0';

    // Limpa o contador de incremento/decremento
    contador1 = 0;
    contador2.innerText = contador1;

    // Limpa o conteúdo de parágrafos
    document.getElementById('conteudo').innerHTML = '';
    document.getElementById('entrada').value = '';
});