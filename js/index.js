// tomando el nombre del usuario

let nombre
let correo


// nombre
document.getElementById("submit").onclick = function(){
    nombre = document.getElementById("texto").value;
    document.getElementById("h1").textContent = `Hola ${nombre}
    ¡Bienvenido!`
    localStorage.setItem("nombre", nombre)
}


// CORREO
document.getElementById("submit1").onclick = function(){
    correo = document.getElementById("texto1").value;
    Swal.fire({
        title: "Genial!",
        text: `Has ingresado tu correo, llegaran notificaciones de actualizacion a ${correo}`,
        icon: "success"
    });
    localStorage.setItem("correo", correo)
}