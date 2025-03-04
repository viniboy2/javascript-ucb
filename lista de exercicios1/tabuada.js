function exibirTabuada() {
    // Obtém o valor digitado pelo usuário
    const numero = document.getElementById('numero').value;
    
    // Verifica se o número foi fornecido
    if (numero === '') {
        alert('Por favor, digite um número!');
        return;
    }

    // Exibe o número escolhido
    const numeroEscolhido = document.getElementById('numeroEscolhido');
    numeroEscolhido.textContent = numero;
    
    // Obtém a tabela onde será exibida a tabuada
    const tabuada = document.getElementById('tabuada');
    
    // Limpa a tabela antes de gerar a nova tabuada
    tabuada.innerHTML = '';
    
    // Preenche a tabela com a tabuada de 1 a 10
    for (let i = 1; i <= 10; i++) {
        const resultado = numero * i;
        
        // Cria uma nova linha para cada multiplicação
        const linha = document.createElement('tr');
        
        // Cria as células da linha
        const celula1 = document.createElement('td');
        const celula2 = document.createElement('td');
        const celula3 = document.createElement('td');
        
        // Preenche as células com os valores da tabuada
        celula1.textContent = numero;
        celula2.textContent = `x ${i}`;
        celula3.textContent = `= ${resultado}`;
        
        // Adiciona as células à linha
        linha.appendChild(celula1);
        linha.appendChild(celula2);
        linha.appendChild(celula3);
        
        // Adiciona a linha à tabela
        tabuada.appendChild(linha);
    }
}
