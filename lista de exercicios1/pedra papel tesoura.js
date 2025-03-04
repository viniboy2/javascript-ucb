function jogoPedraPapelTesoura() {
    const escolhas = ["Pedra", "Papel", "Tesoura"];
    const escolhaUsuario = escolhas[Math.floor(Math.random() * 3)]; // Simula a escolha do usuário
    const escolhaComputador = escolhas[Math.floor(Math.random() * 3)]; // Simula a escolha do computador

    let resultado = "";

    if (escolhaUsuario === escolhaComputador) {
        resultado = `Empate! Ambos escolheram ${escolhaUsuario}.`;
    } else if (
        (escolhaUsuario === "Pedra" && escolhaComputador === "Tesoura") ||
        (escolhaUsuario === "Papel" && escolhaComputador === "Pedra") ||
        (escolhaUsuario === "Tesoura" && escolhaComputador === "Papel")
    ) {
        resultado = `Você ganhou! ${escolhaUsuario} vence ${escolhaComputador}.`;
    } else {
        resultado = `Você perdeu! ${escolhaComputador} vence ${escolhaUsuario}.`;
    }

    document.getElementById("resultado").textContent = resultado;
}

