// variables

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restart");
const windConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["","","","","","","","",""]
let currentPlayer = "X";
let running = false;

inicioGame()

// inicio del juego 

function inicioGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restart.addEventListener("click", restartGame)
    statusText.textContent = `turno de ${currentPlayer}`
    running = true
}

// opcion seleccionada

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex)
    checkWinner()
}

// actualizar celda

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer
}

// cambiar jugador

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statusText.textContent = `Turno de ${currentPlayer}`
}

// saber si ganaste

function checkWinner(){
    let roundWon = false

    for(let i = 0; i < windConditions.length; i++){
        const condition = windConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break
        }
    }
    if(roundWon){
        statusText.textContent = `Gano ${currentPlayer}`
        running = false
    }
    else if(!options.includes("")){
        statusText.textContent = `Empieza de nuevo`
        running = false
    }else{
        changePlayer()
    }
}

// empezar el juego de nuevo

function restartGame(){
    currentPlayer = "X"
    options = ["","","","","","","","",""]
    statusText.textContent = `Turno de ${currentPlayer}`
    cells.forEach(cell => cell.textContent = "")
    running = true
}