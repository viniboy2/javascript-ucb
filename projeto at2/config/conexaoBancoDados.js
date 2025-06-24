// config/conexaoBancoDados.js

// Importa a biblioteca mysql2 para interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL
// ATENÇÃO: Substitua 'seu_usuario_mysql', 'sua_senha_mysql' se for diferente!
const configuracaoConexao = {
    host: 'localhost',      // Onde o seu MySQL está rodando (geralmente localhost)
    user: 'root',           // O nome de usuário para acessar o MySQL (geralmente root)
    password: 'catolica',           // A senha para o seu usuário MySQL (pode ser vazia se não tiver senha)
    database: 'tasks_db',   // O nome do banco de dados que criamos anteriormente
    port: 3307             // **** A PORTA PADRÃO DO MYSQL - ADICIONADO/CORRIGIDO AQUI! ****
};

// Cria uma "pool" de conexões. Uma pool gerencia múltiplas conexões ao banco
// de forma eficiente, reutilizando-as. Isso é melhor do que criar uma nova
// conexão a cada requisição.
const poolConexoes = mysql.createPool(configuracaoConexao);

// Função para testar a conexão com o banco de dados ao iniciar
const testarConexao = () => {
    poolConexoes.getConnection((erro, conexao) => {
        if (erro) {
            console.error('Erro ao obter conexão do pool:', erro.stack);
            // Verifica se o erro é de conexão recusada e dá uma dica mais específica
            if (erro.code === 'ECONNREFUSED') {
                console.error('Verifique se o servidor MySQL está rodando e se a porta (3307) está correta.');
            }
            return;
        }
        console.log('Conectado ao banco de dados MySQL com sucesso! ID da Conexão:', conexao.threadId);//threadId id conexão 
        conexao.release(); // Libera a conexão de volta para o pool
    });
};

// Adiciona um ouvinte para monitorar erros na pool de conexões
poolConexoes.on('error', (erro) => {
    console.error('Erro geral na pool de conexões com o banco de dados:', erro);
});

// Exporta a pool de conexões para que outros arquivos possam utilizá-la
module.exports = {
    pool: poolConexoes,
    testarConexao: testarConexao
};