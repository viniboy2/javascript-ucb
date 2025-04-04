class BotaoManager {
    constructor() {
        // Contador de incremento/decremento
        this.contador1 = 0
        this.contador2 = document.getElementById("contador2");
        this.botao1 = document.getElementById("botao1");
        this.botao2 = document.getElementById("botao2");

        // Campo de texto e contador de caracteres
        this.entrada = document.getElementById("entrada");
        this.contador = document.getElementById("contador");

        // Listas e botões de adição
        this.itemInput = document.getElementById("itemInput");
        this.listaOrdenada = document.getElementById("listaOrdenada");
        this.listaNaoOrdenada = document.getElementById("listaNaoOrdenada");

        // Botão de reset
        this.resetButton = document.getElementById("reset");

        // Inicializa os eventos
        this.inicializarEventos();
    }

    inicializarEventos() {
        // Eventos do contador
        this.botao1.addEventListener("click", () => this.incremento());
        this.botao2.addEventListener("click", () => this.decremento());

        // Evento de adicionar parágrafo
        this.entrada.addEventListener("keydown", (event) => this.adicionarParagrafo(event));

        // Evento de contador de caracteres
        this.entrada.addEventListener("input", () => this.atualizarContador());

        // Eventos de adicionar itens às listas
        document.getElementById('adicionarOrdenada').addEventListener('click', () => this.adicionarItem('ordenada'));
        document.getElementById('adicionarNaoOrdenada').addEventListener('click', () => this.adicionarItem('naoOrdenada'));

        // Evento de reset
        this.resetButton.addEventListener("click", () => this.resetarTudo());
    }

    incremento() {
        this.contador1++;
        this.contador2.innerText = this.contador1;
    }

    decremento() {
        if (this.contador1 > 0) {
            this.contador1--;
            this.contador2.innerText = this.contador1;
        } else {
            alert("Não pode ser negativo!");
        }
    }

    adicionarParagrafo(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const texto = this.entrada.value.trim();

            if (texto !== "") {
                const novoParagrafo = document.createElement('p');
                novoParagrafo.textContent = texto;
                document.getElementById('conteudo').appendChild(novoParagrafo);

                // Limpa o campo de entrada e atualiza o contador
                this.entrada.value = '';
                this.atualizarContador();
            }
        }
    }

    atualizarContador() {
        const texto = this.entrada.value.replace(/\s/g, '');
        this.contador.textContent = texto.length;
    }

    adicionarItem(tipoLista) {
        const texto = this.itemInput.value.trim();

        if (texto === "") {
            alert("Por favor, digite algo!");
            return;
        }

        const novoItem = document.createElement('li');
        novoItem.textContent = texto;

        if (tipoLista === 'ordenada') {
            this.listaOrdenada.appendChild(novoItem);
        } else if (tipoLista === 'naoOrdenada') {
            this.listaNaoOrdenada.appendChild(novoItem);
        }

        this.itemInput.value = '';
    }

    resetarTudo() {
        // Limpa as listas
        this.listaOrdenada.innerHTML = '';
        this.listaNaoOrdenada.innerHTML = '';

        // Limpa o campo de texto e o contador
        this.itemInput.value = '';
        this.contador.textContent = '0';

        // Limpa o contador de incremento/decremento
        this.contador1 = 0;
        this.contador2.innerText = this.contador1;

        // Limpa o conteúdo de parágrafos
        document.getElementById('conteudo').innerHTML = '';
        this.entrada.value = '';
    }
}

// Instancia a classe quando o script é carregado
const botaoManager = new BotaoManager();