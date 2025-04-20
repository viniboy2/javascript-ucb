// Classe para representar um personagem
class Personagem {
  constructor(nome, descricao, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontos = 0;
  }
}

// Criando os personagens
const personagens = {
  naruto: new Personagem(
    "Naruto Uzumaki",
    "Você é energético, determinado e nunca desiste!",
    "assets/naruto.png" // Caminho relativo
  ),
  sasuke: new Personagem(
    "Sasuke Uchiha", 
    "Você é estratégico, independente e focado em seus objetivos.",
    "assets/sasuke.png"
  ),
  sakura: new Personagem(
    "Sakura Haruno",
    "Você é inteligente, cuidadosa e tem grande força interior.",
    "assets/sakura.png"
  )
};

// Estrutura das perguntas e pontuações
const perguntas = [
  // Pergunta 0
  {
    texto: "Qual dessas virtudes ninja você valoriza mais?",
    opcoes: [
      { texto: "Determinação inabalável", pontos: { naruto: 3, sasuke: 2, sakura: 1 } },
      { texto: "Habilidade estratégica", pontos: { naruto: 1, sasuke: 3, sakura: 2 } },
      { texto: "Controle emocional", pontos: { naruto: 2, sasuke: 1, sakura: 3 } }
    ]
  },
  // Pergunta 1
  {
    texto: "Qual cenário de missão você prefere?",
    opcoes: [
      { texto: "Batalha direta contra inimigos poderosos", pontos: { naruto: 3, sasuke: 2, sakura: 1 } },
      { texto: "Missão de infiltração e coleta de informações", pontos: { naruto: 1, sasuke: 3, sakura: 2 } },
      { texto: "Missão de resgate e proteção", pontos: { naruto: 2, sasuke: 1, sakura: 3 } }
    ]
  },
  // Pergunta 2
  {
    texto: "Qual é sua relação com seu time?",
    opcoes: [
      { texto: "Sou o coração que mantém todos unidos", pontos: { naruto: 3, sasuke: 1, sakura: 2 } },
      { texto: "Prefiro trabalhar sozinho na maioria das vezes", pontos: { naruto: 1, sasuke: 3, sakura: 1 } },
      { texto: "Sou o apoio que mantém o time funcionando", pontos: { naruto: 2, sasuke: 1, sakura: 3 } }
    ]
  },
  // Pergunta 3
  {
    texto: "Como você lida com a derrota?",
    opcoes: [
      { texto: "Treino ainda mais forte para a revanche", pontos: { naruto: 3, sasuke: 2, sakura: 1 } },
      { texto: "Analiso meus erros para melhorar", pontos: { naruto: 1, sasuke: 3, sakura: 2 } },
      { texto: "Busco apoio dos meus amigos", pontos: { naruto: 2, sasuke: 1, sakura: 3 } }
    ]
  },
  // Pergunta 4
  {
    texto: "Qual desses jutsus combina mais com você?",
    opcoes: [
      { texto: "Rasengan - esfera de energia poderosa", pontos: { naruto: 3, sasuke: 1, sakura: 2 } },
      { texto: "Chidori - ataque rápido e preciso", pontos: { naruto: 1, sasuke: 3, sakura: 2 } },
      { texto: "Byakugou no Jutsu - cura e força interior", pontos: { naruto: 2, sasuke: 1, sakura: 3 } }
    ]
  }
];

// Variáveis de controle
let perguntaAtual = 0;
const telaInicial = document.getElementById("tela-inicial");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnProxima = document.getElementById("btnproxima");
const nomePersonagem = document.getElementById("nomepersonagem");
const descricaoPersonagem = document.getElementById("descricaopersonagem");
const imagemPersonagem = document.getElementById("imagempersonagem");
const btnComecar = document.getElementById("btncomecar");
const btnReiniciar = document.getElementById("btnreiniciar");

// Iniciar quiz
btnComecar.onclick = () => {
  telaInicial.classList.add("escondido");
  quiz.classList.remove("escondido");
  mostrarPergunta();
};

// Mostrar pergunta
function mostrarPergunta() {
  btnProxima.classList.add('escondido');
  const pergunta = perguntas[perguntaAtual];
  perguntaEl.textContent = pergunta.texto;
  opcoesEl.innerHTML = ''; // Isso já remove quaisquer seleções anteriores

  pergunta.opcoes.forEach((opcao) => {
    const div = document.createElement('div');
    div.classList.add('opcao');
    div.textContent = opcao.texto;
    div.onclick = () => selecionarOpcao(opcao);
    opcoesEl.appendChild(div);
  });
}

// Selecionar opção
function selecionarOpcao(opcao) {
  // Remove seleção anterior de todas as opções
  document.querySelectorAll('.opcao').forEach(el => {
    el.classList.remove('selecionado');
  });
  
  // Marca a opção atual como selecionada
  event.target.classList.add('selecionado');
  
  // Adiciona pontos
  for (let personagem in opcao.pontos) {
    personagens[personagem].pontos += opcao.pontos[personagem];
  }
  
  btnProxima.classList.remove('escondido');
}
// Próxima pergunta
btnProxima.onclick = () => {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
};

// Mostrar resultado
function mostrarResultado() {
  quiz.classList.add("escondido");
  resultado.classList.remove("escondido");
  
  // Encontrar personagem com mais pontos
  let vencedor = Object.values(personagens).reduce((a, b) => 
    a.pontos > b.pontos ? a : b
  );

  nomePersonagem.textContent = vencedor.nome;
  descricaoPersonagem.textContent = vencedor.descricao;
  imagemPersonagem.src = vencedor.imagem;
  imagemPersonagem.alt = `Imagem de ${vencedor.nome}`;
}

// Reiniciar quiz
btnReiniciar.onclick = () => {
  perguntaAtual = 0;
  // Resetar pontos
  for (let p in personagens) {
    personagens[p].pontos = 0;
  }
  resultado.classList.add("escondido");
  telaInicial.classList.remove("escondido");
};