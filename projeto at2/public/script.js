// frontend/script.js

// Endereço base da nossa API de tarefas no backend
// Certifique-se de que a porta (3000) corresponde à porta do seu servidor Express
const URL_API = 'http://localhost:3000/tarefas';

// Seleciona os elementos HTML que vamos manipular
const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('inputTarefa'); // Corrigido: era inputTarefa, deveria ser botaoAdicionar
const listaTarefas = document.getElementById('listaTarefas');

// --- Funções Principais ---

// Função para buscar e exibir todas as tarefas do backend usando Promises
function carregarTarefas() {
    // Faz uma requisição GET para a nossa API
    fetch(URL_API)
        .then(resposta => {
            // Verifica se a resposta da rede foi bem-sucedida (status 200-299)
            if (!resposta.ok) {
                // Se não foi bem-sucedida, lança um erro com a mensagem do servidor
                return resposta.json().then(erroDados => {
                    throw new Error(erroDados.mensagem || 'Erro ao carregar tarefas.');
                });
            }
            // Converte a resposta para JSON e passa para o próximo .then()
            return resposta.json();
        })
        .then(tarefas => {
            // Limpa a lista atual no HTML antes de adicionar as novas tarefas
            listaTarefas.innerHTML = '';

            // Para cada tarefa recebida, cria um elemento na lista e adiciona à página
            tarefas.forEach(tarefa => {
                adicionarTarefaAoDOM(tarefa);
            });
        })
        .catch(erro => {
            // Captura e exibe qualquer erro que ocorra durante o processo
            console.error('Falha ao carregar as tarefas:', erro);
            alert('Erro ao carregar tarefas: ' + erro.message);
        });
}

// Função para adicionar uma nova tarefa via API usando Promises
function adicionarTarefa() {
    const descricao = inputTarefa.value.trim(); // Pega o valor do input e remove espaços extras

    // Valida se a descrição não está vazia
    if (!descricao) {
        alert('Por favor, digite uma descrição para a tarefa.');
        return;
    }

    // Faz uma requisição POST para a API com a nova tarefa
    fetch(URL_API, {
        method: 'POST', // Define o método HTTP como POST
        headers: {
            'Content-Type': 'application/json' // Indica que estamos enviando JSON
        },
        body: JSON.stringify({ description: descricao }) // Converte o objeto JS para string JSON
    })
        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(erroDados => {
                    throw new Error(erroDados.mensagem || 'Erro ao adicionar tarefa.');
                });
            }
            // Pega a nova tarefa retornada pela API (com o ID gerado)
            return resposta.json();
        })
        .then(dadosTarefa => {
            // Adiciona a nova tarefa à lista no HTML
            adicionarTarefaAoDOM(dadosTarefa.tarefa);

            // Limpa o campo de input
            inputTarefa.value = '';
        })
        .catch(erro => {
            console.error('Falha ao adicionar a tarefa:', erro);
            alert('Erro ao adicionar tarefa: ' + erro.message);
        });
}

// Função para atualizar o status de uma tarefa (concluída/não concluída) usando Promises
function atualizarStatusTarefa(idTarefa, statusConcluido) {
    // Faz uma requisição PUT para a API para atualizar a tarefa
    fetch(`${URL_API}/${idTarefa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: statusConcluido }) // Envia o novo status
    })
        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(erroDados => {
                    throw new Error(erroDados.mensagem || 'Erro ao atualizar tarefa.');
                });
            }
            // Não precisamos de retorno específico, apenas recarregamos as tarefas
            carregarTarefas();
        })
        .catch(erro => {
            console.error('Falha ao atualizar status da tarefa:', erro);
            alert('Erro ao atualizar tarefa: ' + erro.message);
        });
}

// Função para excluir uma tarefa usando Promises
function excluirTarefa(idTarefa) {
    // Pede confirmação ao usuário antes de excluir
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return; // Se o usuário cancelar, não faz nada
    }

    // Faz uma requisição DELETE para a API para excluir a tarefa
    fetch(`${URL_API}/${idTarefa}`, {
        method: 'DELETE' // Define o método HTTP como DELETE
    })
        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(erroDados => {
                    throw new Error(erroDados.mensagem || 'Erro ao excluir tarefa.');
                });
            }
            // Recarrega as tarefas para remover a tarefa excluída da UI
            carregarTarefas();
        })
        .catch(erro => {
            console.error('Falha ao excluir a tarefa:', erro);
            alert('Erro ao excluir tarefa: ' + erro.message);
        });
}


// --- Funções de Manipulação do DOM (Interface) ---

// Função para criar e adicionar um item de tarefa ao HTML (DOM)
function adicionarTarefaAoDOM(tarefa) {
    const elementoLista = document.createElement('li'); // Cria um novo elemento <li>
    elementoLista.dataset.id = tarefa.id; // Armazena o ID da tarefa no dataset do elemento

    // Adiciona a classe 'concluida' se a tarefa já estiver marcada como concluída
    if (tarefa.completed) {
        elementoLista.classList.add('concluida');
    }

    // Cria o texto da tarefa
    const textoTarefa = document.createElement('span');
    textoTarefa.textContent = tarefa.description;
    elementoLista.appendChild(textoTarefa);

    // Cria um contêiner para os botões de ação
    const divAcoes = document.createElement('div');
    divAcoes.classList.add('acoes-tarefa');

    // Botão para marcar/desmarcar como concluída
    const botaoConcluir = document.createElement('button');
    botaoConcluir.textContent = tarefa.completed ? 'Desfazer' : 'Concluir';
    botaoConcluir.classList.add('botao-concluir');
    botaoConcluir.onclick = () => atualizarStatusTarefa(tarefa.id, !tarefa.completed); // Inverte o status
    divAcoes.appendChild(botaoConcluir);

    // Botão para excluir a tarefa
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('botao-excluir');
    botaoExcluir.onclick = () => excluirTarefa(tarefa.id);
    divAcoes.appendChild(botaoExcluir);

    elementoLista.appendChild(divAcoes); // Adiciona os botões ao item da lista

    listaTarefas.appendChild(elementoLista); // Adiciona o item completo à lista de tarefas
}

// --- Event Listeners (Ouvintes de Eventos) ---

// Adiciona um ouvinte de evento para o botão de adicionar tarefa
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Opcional: Permite adicionar tarefa pressionando Enter no campo de input
inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});
    
// --- Inicialização ---

// Carrega as tarefas assim que a página é carregada
document.addEventListener('DOMContentLoaded', carregarTarefas);