botao1 = document.getElementById("botao1");

const botao = document.getElementById("botao");

botao.addEventListener("mouseover", () => {
    // Gerar posições aleatórias na tela
    const x = Math.random() * (window.innerWidth - botao.clientWidth);
    const y = Math.random() * (window.innerHeight - botao.clientHeight);

    // Aplicar nova posição ao botão
    botao.style.left = `${x}px`;
    botao.style.top = `${y}px`;
});

