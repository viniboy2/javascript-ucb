
const { pool } = require('../config/conexaoBancoDados');

const listarTarefasDoUsuario = async (requisicao, resposta) => {
    const userId = requisicao.userId;
    const consultaSQL = 'SELECT id, title, description, completed FROM tasks WHERE user_id = ?';
    try {
        const [tarefas] = await pool.query(consultaSQL, [userId]);
        resposta.status(200).json(tarefas);
    } catch (erro) {
        resposta.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const criarNovaTarefa = async (requisicao, resposta) => {
    const { title, description } = requisicao.body;
    const userId = requisicao.userId;
    if (!title) {
        return resposta.status(400).json({ mensagem: 'O título da tarefa é obrigatório.' });
    }
    const consultaSQL = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
    try {
        const [resultado] = await pool.query(consultaSQL, [title, description, userId]);
        resposta.status(201).json({
            mensagem: 'Tarefa criada com sucesso!',
            tarefaId: resultado.insertId
        });
    } catch (erro) {
        resposta.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const atualizarTarefa = async (requisicao, resposta) => {
    const { id } = requisicao.params;
    const { title, description, completed } = requisicao.body;
    const userId = requisicao.userId;
    if (title === undefined && description === undefined && completed === undefined) {
        return resposta.status(400).json({ mensagem: 'Pelo menos um campo deve ser fornecido.' });
    }
    let consultaSQL = 'UPDATE tasks SET ';
    const valores = [];
    const campos = [];
    if (title !== undefined) {
        campos.push('title = ?');
        valores.push(title);
    }
    if (description !== undefined) {
        campos.push('description = ?');
        valores.push(description);
    }
    if (completed !== undefined) {
        campos.push('completed = ?');
        valores.push(completed);
    }
    consultaSQL += campos.join(', ') + ' WHERE id = ? AND user_id = ?';
    valores.push(id, userId);
    try {
        const [resultado] = await pool.query(consultaSQL, valores);
        if (resultado.affectedRows === 0) {
            return resposta.status(404).json({ mensagem: 'Tarefa não encontrada ou não pertence a este usuário.' });
        }
        resposta.status(200).json({ mensagem: 'Tarefa atualizada com sucesso!' });
    } catch (erro) {
        resposta.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const excluirTarefa = async (requisicao, resposta) => {
    const { id } = requisicao.params;
    const userId = requisicao.userId;
    const consultaSQL = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
    try {
        const [resultado] = await pool.query(consultaSQL, [id, userId]);
        if (resultado.affectedRows === 0) {
            return resposta.status(404).json({ mensagem: 'Tarefa não encontrada ou não pertence a este usuário.' });
        }
        resposta.status(204).send();
    } catch (erro) {
        resposta.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarTarefasDoUsuario,
    criarNovaTarefa,
    atualizarTarefa,
    excluirTarefa
};