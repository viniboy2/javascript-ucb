const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  port: process.env.DB_PORT ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testarConexao() {
  try {
    const conexao = await pool.getConnection();
    console.log('Conexão com o banco de dados bem-sucedida!');
    conexao.release();
  } catch (erro) {
    console.error('--- INÍCIO DO ERRO DE CONEXÃO ---');
    console.error('Mensagem do Erro:', erro.message);
    console.error('Código do Erro:', erro.code);
    console.error('Objeto de Erro Completo:', JSON.stringify(erro, null, 2));
    console.error('--- FIM DO ERRO DE CONEXÃO ---');
  }
}

module.exports = { pool, testarConexao };