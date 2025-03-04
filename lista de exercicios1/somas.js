function calcularSoma() {
    // Obtém a quantidade de termos digitada pelo usuário
    const termos = parseInt(document.getElementById('termos').value);
    
    // Verifica se a quantidade de termos é válida
    if (isNaN(termos) || termos < 1) {
        alert('Por favor, insira um número válido de termos!');
        return;
    }

    // Variáveis para armazenar a série e a soma
    let serie = '';
    let soma = 0;
    let numeroAtual = 1;

    // Gera a série e calcula a soma
    for (let i = 1; i <= termos; i++) {
        // Adiciona o número atual à série
        if (i > 1) serie += ' + ';
        serie += numeroAtual;
        
        // Adiciona o número atual à soma
        soma += numeroAtual;
        
        // Gera o próximo número da série (por exemplo, 1 -> 11 -> 111 -> 1111)
        numeroAtual = numeroAtual * 10 + 1;
    }

    // Exibe a série e a soma
    document.getElementById('serie').textContent = serie;
    document.getElementById('soma').textContent = soma;
}
