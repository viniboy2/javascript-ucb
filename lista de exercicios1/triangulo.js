function desenharTriangulo() {
    // Obtém o número de linhas digitado pelo usuário
    const numeroLinhas = parseInt(document.getElementById('numero').value);
    
    // Verifica se o número de linhas é válido
    if (isNaN(numeroLinhas) || numeroLinhas < 1) {
        alert('Por favor, insira um número válido de linhas!');
        return;
    }

    // Obtém o elemento onde o triângulo será exibido
    const trianguloElement = document.getElementById('triangulo');
    
    // Limpa o conteúdo anterior
    trianguloElement.textContent = '';

    // Gera o triângulo de asteriscos
    for (let i = 1; i <= numeroLinhas; i++) {
        let linha = '*'.repeat(i); // Cria a linha com i asteriscos
        trianguloElement.textContent += linha + '\n'; // Adiciona a linha ao elemento
    }
}
