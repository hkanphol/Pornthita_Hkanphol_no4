const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=80';

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonList();
});

async function fetchPokemonList() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
    }
}

function displayPokemonList(pokemonList) {
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonList.forEach(pokemon => {
        const pokemonItem = document.createElement('div');
        pokemonItem.className = 'pokemon-item';
        pokemonItem.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(pokemon.url)}.png" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
        `;
        pokemonItem.addEventListener('click', () => showPokemonDetail(pokemon.url));
        pokemonContainer.appendChild(pokemonItem);
    });
}

function getPokemonId(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}

async function showPokemonDetail(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        displayPokemonDetail(pokemon);
    } catch (error) {
        console.error('Error fetching Pokemon detail:', error);
    }
}

function displayPokemonDetail(pokemon) {
    const detailContainer = document.getElementById('pokemon-detail');
    const detailInfo = document.getElementById('pokemon-info');
    
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    //const stats = pokemon.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ');
    
    detailInfo.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p><strong>ความสูง:</strong> ${pokemon.height / 10} cm.</p>
        <p><strong>น้ำหนัก:</strong> ${pokemon.weight / 10} kg.</p>
        <p><strong>ประสบการณ์พื้นฐาน:</strong> ${pokemon.base_experience} ประสบการณ์</p>
        <p><strong>ประเภท:</strong> ${types}</p>
        <p><strong>ความสามารถ:</strong> ${abilities}</p>
    `;
    
    detailContainer.classList.remove('hidden');

    const closeButton = document.getElementById('close-detail');
    closeButton.addEventListener('click', () => {
        detailContainer.classList.add('hidden');
    });
}
