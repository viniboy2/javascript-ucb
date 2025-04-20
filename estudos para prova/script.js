
let a = window.prompt("Digite o valor de a");
let b = window.prompt("Digite o valor de b");

// Convert the strings to numbers
a = Number(a);
b = Number(b);

function somar(a, b) {
    return a + b;    
}

let resultado = somar(a, b);  // Call the function with the values
console.log(resultado);      // Log the result