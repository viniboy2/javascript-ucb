// Preço de cada combustível
const precogasolina = 5.79;
const precoalcool = 4.29;
const precodisel = 6.19;

function atualizarvalor() {
    let tipo = document.getElementById("combustivel").value; // Corrigido "Value" para "value"
    let litros = parseFloat(document.getElementById("litros").value); // Corrigido "Value" para "value"
    
    let precoporlitro; // Declaração da variável

    switch (tipo) {
        case "gasolina":
            precoporlitro = precogasolina;
            break;
        case "etanol":
            precoporlitro = precoalcool;
            break;
        case "disel":
            precoporlitro = precodisel;
            break;
        default:
            document.getElementById("resultado").textContent = "Tipo de combustível inválido";
            return; // Adiciona um retorno para não continuar o código
    }

    // Chama a função para calcular o valor total
    calcularvalorabastecimento(precoporlitro, litros);
}

function calcularvalorabastecimento(precocombustivel, litros) {
   if(litros <= 0 || isNaN (litros) ){
document.getElementById("resultado").textContent = "insira um valor positivo";
return;
   }
    
    let valortotal = precocombustivel * litros;
    document.getElementById("resultado").textContent = `Valor total: R$ ${valortotal.toFixed(2)}`; // Exibe o valor formatado

}
function formatarmoeda(valor){
    return"R$" +valor.toFixed(2);
}
// Adicionando os event listeners para atualizar o valor
document.getElementById("litros").addEventListener("input", atualizarvalor); 
document.getElementById("combustivel").addEventListener("change", atualizarvalor);

