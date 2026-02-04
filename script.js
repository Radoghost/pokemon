const button = document.getElementById('generate-btn');
const card = document.getElementById('pokemon-card');

const url = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemon() {
    const id = Math.floor(Math.random() * 150) + 1;
    
    card.innerHTML = '<div class="loader">Szukam Pokémona...</div>';

    try {
        const response = await fetch(url + id);
        const data = await response.json();
        renderPokemon(data);
    } catch (error) {
        console.error("Błąd:", error);
        card.innerHTML = '<p>Nie udało się pobrać danych :(</p>';
    }
}

function renderPokemon(data) {
    const imgSrc = data.sprites.other.dream_world.front_default || data.sprites.front_default;
    const name = data.name;
    const type = data.types[0].type.name;
    
    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;
    
    const weight = data.weight / 10;
    const height = data.height / 10;

    const html = `
        <img src="${imgSrc}" alt="${name}" class="pokemon-img">
        <h2 class="pokemon-name">${name}</h2>
        <span class="pokemon-type">${type}</span>
        
        <div class="stats-container">
            <div class="stat-box">
                <span class="stat-value">${hp}</span>
                <span class="stat-label">HP</span>
            </div>
            <div class="stat-box">
                <span class="stat-value">${attack}</span>
                <span class="stat-label">ATK</span>
            </div>
            <div class="stat-box">
                <span class="stat-value">${defense}</span>
                <span class="stat-label">DEF</span>
            </div>
            <div class="stat-box">
                <span class="stat-value">${speed}</span>
                <span class="stat-label">SPD</span>
            </div>
        </div>

        <div class="physical-stats">
            <p>Waga: <strong>${weight} kg</strong></p>
            <p>Wzrost: <strong>${height} m</strong></p>
        </div>
    `;

    card.innerHTML = html;
}

button.addEventListener('click', getPokemon);
getPokemon();