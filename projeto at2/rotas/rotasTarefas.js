// rotas/rotasTarefas.js

// Importa o módulo Router do Express para criar rotas modulares
const express = require('express');
const roteador = express.Router();

// Importa as funções do controlador de tarefas
// São as funções que contêm a lógica para o banco de dados
const {
    listarTodasAsTarefas,
    criarNovaTarefa,
    atualizarTarefa,
    excluirTarefa
} = require('../controladores/controladorTarefas');

// Define as rotas para a API de tarefas

// Rota para LISTAR todas as tarefas
// MÉTODO: GET
// URL: /tarefas/
// EXPLANATION: Quando o frontend fizer uma requisição GET para '/tarefas/',
// a função 'listarTodasAsTarefas' do controlador será executada.
roteador.get('/', listarTodasAsTarefas);

// Rota para CRIAR uma nova tarefa
// MÉTODO: POST
// URL: /tarefas/
// EXPLANATION: Quando o frontend fizer uma requisição POST para '/tarefas/',
// enviando os dados de uma nova tarefa no corpo da requisição (JSON),
// a função 'criarNovaTarefa' do controlador será executada.
roteador.post('/', criarNovaTarefa);

// Rota para ATUALIZAR uma tarefa específica pelo ID
// MÉTODO: PUT
// URL: /tarefas/:id
// EXPLANATION: O ':id' na URL significa que essa parte é um parâmetro dinâmico.
// Por exemplo, para atualizar a tarefa de ID 5, a URL seria '/tarefas/5'.
// Quando o frontend fizer uma requisição PUT para essa URL,
// enviando os dados atualizados no corpo da requisição (JSON),
// a função 'atualizarTarefa' do controlador será executada.
roteador.put('/:id', atualizarTarefa);

// Rota para EXCLUIR uma tarefa específica pelo ID
// MÉTODO: DELETE
// URL: /tarefas/:id
// EXPLANATION: Similar à rota de atualização, o ':id' indica qual tarefa deve ser excluída.
// Quando o frontend fizer uma requisição DELETE para essa URL,
// a função 'excluirTarefa' do controlador será executada.
roteador.delete('/:id', excluirTarefa);

// Exporta o roteador para que ele possa ser usado no arquivo principal do servidor
module.exports = roteador;