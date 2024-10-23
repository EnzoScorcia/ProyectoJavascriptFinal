// variables

const opciones = ["Piedra", "Papel", "Tijera"];
const PlayerDisplay = document.getElementById("PlayerDisplay");
const CompuDisplay = document.getElementById("CompuDisplay");
const ResultadoDisplay = document.getElementById("ResultadoDisplay");
const playerscoredisplay = document.getElementById("playerscoredisplay")
const compuscoredisplay = document.getElementById("compuscoredisplay")
let playerscore = 0;
let compuscore = 0;

// opcion del jugador

function playGame(PlayerOpcion){
    const CompuOpcion = opciones[Math.floor(Math.random() * 3)]
    let resultado = "";

    if(PlayerOpcion === CompuOpcion){
        resultado = "Empate!"
    }else{
        switch(PlayerOpcion){
            case "Piedra":
                resultado = (CompuOpcion === "Tijera") ? "Ganaste!" : "Perdiste!";
                break;
            case "Papel":
                resultado = (CompuOpcion === "Piedra") ? "Ganaste!" : "Perdiste!";
                break;
            case "Tijera":
                resultado = (CompuOpcion === "Papel") ? "Ganaste!" : "Perdiste!";
                break;
        }
    }

    // resultados del juego

    PlayerDisplay.textContent = `PLAYER: ${PlayerOpcion}`;
    CompuDisplay.textContent = `Computadora: ${CompuOpcion}`;
    ResultadoDisplay.textContent = resultado;

    ResultadoDisplay.classList.remove("greenText", "redText");

    // colores para perdiste y ganaste

    switch(resultado){
        case "Ganaste!":
            ResultadoDisplay.classList.add("greenText");
            playerscore++;
            playerscoredisplay.textContent = playerscore;
            break
        case "Perdiste!":
            ResultadoDisplay.classList.add("redText");
            compuscore++;
            compuscoredisplay.textContent = compuscore;
            break
    }
}