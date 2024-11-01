// juego en loop
var time = new Date()
var deltatime = 0
var sueloY = 22
var velY = 0
var impulso = 900
var gravedad = 2500

var dinoPosX = 42
var dinoPosY = sueloY

var sueloX = 0
var velEscenario = 1280/3
var gameVel = 1
var score = 0

var parado = false
var saltando = false

var tiempoHastaObstaculo = 2
var tiempoObstaculoMin = 0.7
var tiempoObstaculoMax = 1.8
var obstaculoPosY = 16
var obstaculos = []

var contenedor
var dino
var textoScore
var suelo
var gameOver



if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init,1)
}else{
    document.addEventListener("DOMContentLoaded", Init)
}

function Init(){
    time = new Date()
    Start()
    Loop()
}

function Loop(){
    deltatime = (new Date() - time) / 1000
    time = new Date()
    Update()
    requestAnimationFrame(Loop)
}

// Inicio
function Start(){
    gameOver = document.querySelector(".game-over")
    suelo = document.querySelector(".piso")
    contenedor = document.querySelector(".contenedor")
    textoScore = document.querySelector(".puntaje")
    dino = document.querySelector(".dino")
    document.addEventListener("keydown", HandleKeyDown)
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32){
        Saltar()
    }
}

function Saltar(){
    if(dinoPosY === sueloY){
        saltando = true
        velY = impulso
        dino.classList.remove("dino-corriendo")
    }
}


// Corrida del dinosaurio
function Update() {
    if(parado) return;
    
    MoverDinosaurio();
    MoverSuelo();
    DecidirCrearObstaculos();
    MoverObstaculos();
    DetectarColision();

    velY -= gravedad * deltatime;
}

function MoverSuelo(){
    sueloX += CalcularDesplazamiento()
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px"
}

function CalcularDesplazamiento(){
    return velEscenario * deltatime * gameVel
}


function MoverDinosaurio(){
    dinoPosY += velY * deltatime
    if(dinoPosY < sueloY){
        TocarSuelo()
    }
    dino.style.bottom = dinoPosY + "px"
}

function TocarSuelo(){
    dinoPosY = sueloY
    velY = 0
    if(saltando){
        dino.classList.add("dino-corriendo")
    }
    saltando = false
}

function DecidirCrearObstaculos(){
    tiempoHastaObstaculo -= deltatime
    if(tiempoHastaObstaculo <= 0){
        CrearObstaculos()
    }
}

function CrearObstaculos(){
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if(Math.random() > 0.5) obstaculo.classList.add("cactus2");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth+"px";

    obstaculos.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}

function MoverObstaculos(){
    for(var i = obstaculos.length - 1; i >= 0; i--){
        if(obstaculos[i].posX < -obstaculos[i].clientWidth){
            obstaculos[i].parentNode.removeChild(obstaculos[i])
            obstaculos.splice(i, 1)
            GanarPuntos()
        }else{
            obstaculos[i].posX -= CalcularDesplazamiento()
            obstaculos[i].style.left = obstaculos[i].posX + "px"
        }
    }
}

function GanarPuntos(){
    score++
    textoScore.innerText = score
}

function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if(obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            //EVADE
            break; //al estar en orden, no puede chocar con más
        }else{
            if(IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft){
    var aRect = a.getBoundingClientRect()
    var bRect = b.getBoundingClientRect()

    return!(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))   
    )
}

function GameOver(){
    Estrellarse();
    GameOver.style.display = "block";
}

function Estrellarse(){
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
    Swal.fire({
        icon: "error",
        title: "¡GAME OVER!",
        text: "Perdiste, intentalo de nuevo!",
    });
}