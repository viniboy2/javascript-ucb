// Preços dos combustíveis
const PRECOS_COMBUSTIVEIS = {
    gasolina: 5.79,
    etanol: 4.29,
    diesel: 6.19,
  };
  
  function calcularValorAbastecimento() {
    const tipoCombustivel = document.getElementById("combustivel").value;
    const litros = parseFloat(document.getElementById("litros").value);
    const resultadoElemento = document.getElementById("resultado");
  
    // Validação de entrada
    if (!PRECOS_COMBUSTIVEIS[tipoCombustivel]) {
      resultadoElemento.textContent = "Tipo de combustível inválido.";
      return;
    }
  
    if (isNaN(litros) || litros <= 0) {
      resultadoElemento.textContent = "Insira um valor de litros válido.";
      return;
    }
  
    // Cálculo do valor total
    const precoLitro = PRECOS_COMBUSTIVEIS[tipoCombustivel];
    const valorTotal = precoLitro * litros;
  
    // Exibição do resultado formatado
    resultadoElemento.textContent = `Valor total: ${formatarMoeda(valorTotal)}`;
  }
  
  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  
  // Adicionando os event listeners
  document
    .getElementById("litros")
    .addEventListener("input", calcularValorAbastecimento);
  document
    .getElementById("combustivel")
    .addEventListener("change", calcularValorAbastecimento);    
