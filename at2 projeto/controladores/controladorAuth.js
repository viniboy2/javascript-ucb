
const bcrypt = require('bcryptjs');;
const { pool } = require('../config/conexaoBancoDados');

const register = async (req, res) => {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const consultaSQL = 'INSERT INTO users (nome, email, password) VALUES (?, ?, ?)';
        await pool.query(consultaSQL, [nome, email, hashedPassword]);
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Este email já está em uso.' });
        }
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const consultaSQL = 'SELECT * FROM users WHERE email = ?';
        const [users] = await pool.query(consultaSQL, [email]);
        if (users.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        const user = users[0];
        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Senha incorreta.' });
        }
        req.session.userId = user.id;
        res.status(200).json({ mensagem: 'Login bem-sucedido!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ mensagem: 'Não foi possível fazer logout.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
    });
};

module.exports = { register, login, logout };