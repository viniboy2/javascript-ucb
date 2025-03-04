function jogoAdivinhacao() {
    const numeroSecreto = Math.floor(Math.random() * 20) + 1;
    let tentativas = 0;
    
    alert("Tente adivinhar o número secreto entre 1 e 20!");
    
    while (true) {
        let tentativa = prompt("Digite seu palpite (entre 1 e 20):");
        tentativas++;
        
        if (isNaN(tentativa) || tentativa < 1 || tentativa > 20) {
            alert("Por favor, digite um número válido entre 1 e 20.");
            continue;
        }
        
        tentativa = Number(tentativa);
        
        if (tentativa < numeroSecreto) {
            alert("O número secreto é maior!");
        } else if (tentativa > numeroSecreto) {
            alert("O número secreto é menor!");
        } else {
            alert(`Parabéns! Você acertou em ${tentativas} tentativa(s)!`);
            break;
        }
    }
}

jogoAdivinhacao();