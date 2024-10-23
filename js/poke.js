const pokemonContainer = document.querySelector(".pokemon-container")


function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => {
            createPokemon(data)
        })
}

function fetchPokemons(number){
    for (let i = 1; i <= number; i++){
        fetchPokemon(i)
    }
}

function createPokemon(pokemon){
    const card = document.createElement("div")
    card.classList.add("pokemon-block")

    const spriteContainer = document.createElement("div")
    spriteContainer.classList.add("img-container")

    const sprite = document.createElement("img")
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite)

    const number = document.createElement("p")
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement("p")
    name.classList.add("name")
    name.textContent = pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)
    card.appendChild(progressBars(pokemon.stats))
    pokemonContainer.appendChild(card)
}

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
    const stat = stats[i];
    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");
    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    const progress = document.createElement("div");
    progress.classList.add("progress");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;
    progressBar.textContent = stat.base_stat;
    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);
    statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}



fetchPokemons(1024)