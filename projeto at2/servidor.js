// servidor.js

// Importa a biblioteca Express para criar o servidor web
const express = require('express');
// Importa o módulo 'path' do Node.js, que ajuda a lidar com caminhos de arquivos e diretórios
const path = require('path'); // Adicionado para auxiliar no envio do index.html

// Importa a pool de conexões com o banco de dados e a função de teste de conexão.
const { testarConexao } = require('./config/conexaoBancoDados');

// Importa as rotas específicas para as tarefas.
const rotasTarefas = require('./rotas/rotasTarefas');

// Cria uma instância do aplicativo Express.
const aplicativo = express();

// Define a porta em que o servidor irá escutar as requisições.
const PORTA = process.env.PORT || 3000;

// Middleware para permitir que o Express entenda requisições com corpo em formato JSON.
aplicativo.use(express.json());

// Middleware para configurar o CORS (Cross-Origin Resource Sharing).
aplicativo.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware para servir arquivos estáticos.
// Esta linha permite que o Express entregue arquivos como 'estilo.css' e 'script.js'
// da pasta 'public' quando forem requisitados diretamente.
aplicativo.use(express.static(path.join(__dirname, 'public')));


// **** AQUI ESTÁ A CORREÇÃO PRINCIPAL ****
// Rota para servir o arquivo 'index.html' na raiz da aplicação.
// Isso garante que quando o navegador acessar 'http://localhost:3000/',
// ele sempre receba o 'index.html' do seu frontend.
aplicativo.get('/', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Rota de teste simples para verificar se o servidor está ativo.
// Esta rota é separada da raiz para não conflitar com o frontend.
aplicativo.get('/api', (requisicao, resposta) => {
    resposta.send('Servidor de Tarefas Rodando e Conectado ao Banco de Dados! A API de tarefas está em /tarefas.');
});

// Adiciona as rotas de tarefas ao aplicativo Express.
aplicativo.use('/tarefas', rotasTarefas);

// Inicia o servidor Express para começar a escutar as requisições na porta definida.
aplicativo.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    testarConexao();
});