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
    "imagens/naruto.png" // Caminho relativo
  ),
  sasuke: new Personagem(
    "Sasuke Uchiha", 
    "Você é estratégico, independente e focado em seus objetivos.",
    "imagens/sasuke.png"
  ),
  sakura: new Personagem(
    "Sakura Haruno",
    "Você é inteligente, cuidadosa e tem grande força interior.",
    "imagens/sakura.png"
  )
};

// Estrutura das perguntas e pontuações
const perguntas = [
  {
    texto: 'Qual dessas qualidades você mais valoriza?',
    opcoes: [
      { texto: 'Determinação', personagem: 'Naruto' },
      { texto: 'Frieza e inteligência', personagem: 'Sasuke' },
      { texto: 'Compaixão e empatia', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Em uma equipe, você é mais:',
    opcoes: [
      { texto: 'O motivador', personagem: 'Naruto' },
      { texto: 'O estrategista', personagem: 'Sasuke' },
      { texto: 'O apoio confiável', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Qual desses jutsus você gostaria de dominar?',
    opcoes: [
      { texto: 'Rasengan', personagem: 'Naruto' },
      { texto: 'Chidori', personagem: 'Sasuke' },
      { texto: 'Super força', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'O que mais te motiva a lutar?',
    opcoes: [
      { texto: 'Proteger os amigos', personagem: 'Naruto' },
      { texto: 'Buscar poder e vingança', personagem: 'Sasuke' },
      { texto: 'Ajudar quem precisa', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Qual dessas frases combina mais com você?',
    opcoes: [
      { texto: 'Nunca volto atrás com minha palavra!', personagem: 'Naruto' },
      { texto: 'As pessoas vivem presas a ilusões.', personagem: 'Sasuke' },
      { texto: 'Eu também quero me tornar mais forte!', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Como você lida com desafios?',
    opcoes: [
      { texto: 'Com coragem e fé em mim mesmo', personagem: 'Naruto' },
      { texto: 'Frio e calculista', personagem: 'Sasuke' },
      { texto: 'Com determinação e trabalho duro', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'O que você faria por um amigo em perigo?',
    opcoes: [
      { texto: 'Arriscaria tudo por ele', personagem: 'Naruto' },
      { texto: 'Avalio os riscos antes de agir', personagem: 'Sasuke' },
      { texto: 'Ajudo da melhor forma possível', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Escolha uma cor que representa você:',
    opcoes: [
      { texto: 'Laranja vibrante', personagem: 'Naruto' },
      { texto: 'Azul escuro', personagem: 'Sasuke' },
      { texto: 'Rosa suave', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Qual tipo de treino você prefere?',
    opcoes: [
      { texto: 'Resistência e chakra', personagem: 'Naruto' },
      { texto: 'Técnicas avançadas', personagem: 'Sasuke' },
      { texto: 'Treinamento físico e emocional', personagem: 'Sakura' }
    ]
  },
  {
    texto: 'Como você lida com a derrota?',
    opcoes: [
      { texto: 'Levanto e tento de novo!', personagem: 'Naruto' },
      { texto: 'Aceito e sigo meu caminho', personagem: 'Sasuke' },
      { texto: 'Aprendo com meus erros', personagem: 'Sakura' }
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