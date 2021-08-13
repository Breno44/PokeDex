const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon-form/${id}`

const generatePokemonPromises = () => Array(800).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(res => res.json()))

const generateHTML = pokemons => pokemons.reduce((acc, pokemon) => {
const types = pokemon.types.map(typeInfo => typeInfo.type.name)
acc += `
    <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
    </li>`
    return acc
}, '')    

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
