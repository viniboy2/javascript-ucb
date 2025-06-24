// controladores/controladorTarefas.js

// Importa a pool de conexões com o banco de dados
// Precisamos dela para fazer as consultas SQL
const { pool } = require('../config/conexaoBancoDados');

// Função para listar todas as tarefas
// Esta função será executada quando o frontend pedir todas as tarefas.
const listarTodasAsTarefas = (requisicao, resposta) => {
    // Obtém uma conexão do pool
    pool.getConnection((erroConexao, conexao) => {
        if (erroConexao) {
            console.error('Erro ao obter conexão do pool:', erroConexao);
            // Retorna um erro 500 (Erro Interno do Servidor) se não conseguir conexão
            return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao conectar ao banco de dados.' });
        }

        // Consulta SQL para selecionar todas as colunas de todas as tarefas
        const consultaSQL = 'SELECT id, description, completed FROM tasks';

        // Executa a consulta no banco de dados
        conexao.query(consultaSQL, (erroConsulta, resultados) => {
            // Libera a conexão de volta para o pool, independente do resultado da consulta
            conexao.release();

            if (erroConsulta) {
                console.error('Erro ao buscar tarefas:', erroConsulta);
                // Retorna um erro 500 se houver problema na consulta
                return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao buscar tarefas.' });
            }

            // Se tudo deu certo, retorna as tarefas encontradas como JSON (código 200 OK)
            resposta.status(200).json(resultados);
        });
    });
};

// Função para criar uma nova tarefa
// Esta função será executada quando o frontend enviar dados para adicionar uma nova tarefa.
const criarNovaTarefa = (requisicao, resposta) => {
    // Pega a 'description' (descrição) do corpo da requisição JSON
    // O Express.json() que configuramos no servidor.js permite isso
    const { description } = requisicao.body;

    // Verifica se a descrição foi fornecida
    if (!description) {
        // Se a descrição estiver faltando, retorna um erro 400 (Requisição Inválida)
        return resposta.status(400).json({ mensagem: 'A descrição da tarefa é obrigatória.' });
    }

    // Obtém uma conexão do pool
    pool.getConnection((erroConexao, conexao) => {
        if (erroConexao) {
            console.error('Erro ao obter conexão do pool:', erroConexao);
            return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao conectar ao banco de dados.' });
        }

        // Consulta SQL para inserir uma nova tarefa na tabela 'tasks'
        // Os valores são passados como um array para segurança contra SQL Injection
        const consultaSQL = 'INSERT INTO tasks (description) VALUES (?)';
        const valores = [description];

        // Executa a consulta de inserção
        conexao.query(consultaSQL, valores, (erroConsulta, resultado) => {
            conexao.release(); // Libera a conexão

            if (erroConsulta) {
                console.error('Erro ao criar tarefa:', erroConsulta);
                return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao criar tarefa.' });
            }

            // Se a tarefa foi criada com sucesso, retorna os detalhes da nova tarefa
            // O 'insertId' é o ID gerado automaticamente pelo banco para a nova tarefa
            resposta.status(201).json({
                mensagem: 'Tarefa criada com sucesso!',
                tarefa: {
                    id: resultado.insertId,
                    description,
                    completed: false // Por padrão, novas tarefas não estão completas
                }
            });
        });
    });
};

// Função para atualizar uma tarefa existente
// Esta função será executada quando o frontend enviar dados para modificar uma tarefa.
const atualizarTarefa = (requisicao, resposta) => {
    // Pega o 'id' da tarefa da URL (ex: /tarefas/123)
    const { id } = requisicao.params;
    // Pega a 'description' e 'completed' do corpo da requisição JSON
    const { description, completed } = requisicao.body;

    // Verifica se pelo menos um campo foi fornecido para atualização
    if (description === undefined && completed === undefined) {
        return resposta.status(400).json({ mensagem: 'Pelo menos um campo (description ou completed) deve ser fornecido para atualização.' });
    }

    // Obtém uma conexão do pool
    pool.getConnection((erroConexao, conexao) => {
        if (erroConexao) {
            console.error('Erro ao obter conexão do pool:', erroConexao);
            return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao conectar ao banco de dados.' });
        }

        let consultaSQL = 'UPDATE tasks SET ';
        const valores = [];
        const camposParaAtualizar = [];

        if (description !== undefined) {
            camposParaAtualizar.push('description = ?');
            valores.push(description);
        }
        if (completed !== undefined) {
            camposParaAtualizar.push('completed = ?');
            valores.push(completed);
        }

        consultaSQL += camposParaAtualizar.join(', ') + ' WHERE id = ?';
        valores.push(id);

        // Executa a consulta de atualização
        conexao.query(consultaSQL, valores, (erroConsulta, resultado) => {
            conexao.release(); // Libera a conexão

            if (erroConsulta) {
                console.error('Erro ao atualizar tarefa:', erroConsulta);
                return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar tarefa.' });
            }

            // Verifica se alguma linha foi afetada (se a tarefa com o ID existia)
            if (resultado.affectedRows === 0) {
                // Se nenhuma linha foi afetada, significa que a tarefa não foi encontrada
                return resposta.status(404).json({ mensagem: 'Tarefa não encontrada.' });
            }

            // Retorna uma mensagem de sucesso
            resposta.status(200).json({ mensagem: 'Tarefa atualizada com sucesso!' });
        });
    });
};

// Função para excluir uma tarefa
// Esta função será executada quando o frontend pedir para remover uma tarefa.
const excluirTarefa = (requisicao, resposta) => {
    // Pega o 'id' da tarefa da URL (ex: /tarefas/123)
    const { id } = requisicao.params;

    // Obtém uma conexão do pool
    pool.getConnection((erroConexao, conexao) => {
        if (erroConexao) {
            console.error('Erro ao obter conexão do pool:', erroConexao);
            return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao conectar ao banco de dados.' });
        }

        // Consulta SQL para deletar uma tarefa pelo seu ID
        const consultaSQL = 'DELETE FROM tasks WHERE id = ?';
        const valores = [id];

        // Executa a consulta de exclusão
        conexao.query(consultaSQL, valores, (erroConsulta, resultado) => {
            conexao.release(); // Libera a conexão

            if (erroConsulta) {
                console.error('Erro ao excluir tarefa:', erroConsulta);
                return resposta.status(500).json({ mensagem: 'Erro interno do servidor ao excluir tarefa.' });
            }

            // Verifica se alguma linha foi afetada (se a tarefa com o ID existia)
            if (resultado.affectedRows === 0) {
                // Se nenhuma linha foi afetada, significa que a tarefa não foi encontrada
                return resposta.status(404).json({ mensagem: 'Tarefa não encontrada.' });
            }

            // Se a tarefa foi excluída com sucesso, retorna um status 204 (No Content)
            // ou 200 (OK) com uma mensagem, indicando sucesso e que não há conteúdo para retornar
            resposta.status(204).send(); // 204 significa "No Content", ou seja, sucesso sem dados para retornar
        });
    });
};

// Exporta todas as funções do controlador para que as rotas possam usá-las
module.exports = {
    listarTodasAsTarefas,
    criarNovaTarefa,
    atualizarTarefa,
    excluirTarefa
};