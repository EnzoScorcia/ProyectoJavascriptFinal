fetch("https://pokeapi.co/api/v2/pokemon/charmander")
    .then((datos)=> datos.json())
    .then((datos)=> console.log(datos.stats))
    .catch((error)=> console.log(error))

// let promise = new Promise((resolve, reject)=> {

//     resolve(info_pokemon)

//     reject(info_error)
// })