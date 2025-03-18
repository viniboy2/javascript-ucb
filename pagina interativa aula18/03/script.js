// Inicializando a variável do contador
var contador = 0;
// Pegando os elementos necessários
var contador2 = document.getElementById("contador2");
var botao1 = document.getElementById("botao1");
var botao2 = document.getElementById("botao2");
var entrada =  document.getElementById("entrada");
var caracteres = document.getElementById("caracteres");
// Função para incrementar o contador
botao1.onclick = function incremento() {
    contador++; // Incrementa a variável
    contador2.innerText = contador; // Atualiza o valor na página
    console.log(contador); // Log no console para ver o valor
};
botao2.onclick = function decremento() {
    if (contador>0){
    contador--;
    contador2.innerText = contador;  
    }
    else{
         alert("não pode numero negativo");
    }
};
entrada.onkeydown = function(){
 
}
