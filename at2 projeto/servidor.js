
const fs = require('fs');
const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const { testarConexao } = require('./config/conexaoBancoDados');
const rotasTarefas = require('./rotas/rotasTarefas');
const rotasAuth = require('./rotas/rotasAuth');

const aplicativo = express();
const PORTA = process.env.PORT || 3000;

// 1. Middlewares essenciais
aplicativo.use(express.json());

// 2. CONFIGURAÇÃO DA SESSÃO
aplicativo.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Em produção, com HTTPS, mude para 'true'
        maxAge: 1000 * 60 * 60 * 24 // Duração do cookie (ex: 24 horas)
    }
}));

// 3. MIDDLEWARE PARA SERVIR ARQUIVOS ESTÁTICOS (A LINHA QUE FALTAVA)
// Esta linha diz ao Express para servir arquivos da pasta 'public' automaticamente.
// É ESSENCIAL que ela venha ANTES das suas rotas de API.
aplicativo.use(express.static(path.join(__dirname, 'public')));

// 4. ROTAS DA API
// O Express só chegará aqui se a requisição não for para um arquivo estático.
aplicativo.use('/auth', rotasAuth);
aplicativo.use('/tarefas', rotasTarefas);


// 5. INICIA O SERVIDOR
aplicativo.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    testarConexao();

    // Código para listar os arquivos da pasta public
    console.log('\nLinks diretos para os arquivos públicos:');
    const publicDir = path.join(__dirname, 'public');

    try {
        const files = fs.readdirSync(publicDir);

        if (files.length === 0) {
            console.log('  (A pasta public está vazia)');
        } else {
            files.forEach(file => {
                const url = `http://localhost:${PORTA}/${file}`;
                console.log(`  - ${file}: ${url}`);
            });
        }
    } catch (error) {
        console.error('  Erro ao ler a pasta public:', error.message);
    }
});