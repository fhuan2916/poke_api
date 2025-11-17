// Función para obtener un ID aleatorio entre 1 y 1010
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1024) + 1;
}

// Función para cargar y mostrar Pokémon aleatorios
async function loadRandomPokemons() {
    const listDiv = document.getElementById('randomPokemonList');
    listDiv.innerHTML = '<p>Cargando Pokémon...</p>';
    
    // Generar 10 IDs únicos aleatorios
    const ids = [];
    while (ids.length < 3) {
        const id = getRandomPokemonId();
        if (!ids.includes(id)) ids.push(id);
    }
    
    // Hacer llamadas en paralelo
    const promises = ids.map(id => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.ok ? response.json() : null)
            .catch(() => null)
    );
    
    const results = await Promise.all(promises);
    
    // Mostrar resultados
    listDiv.innerHTML = '';
    results.forEach(data => {
        if (data) {
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
                <p>Id: ${data.id}</p>
                <p>Ataque: ${data.stats[1].base_stat}</p>
                <p>Defensa: ${data.stats[2].base_stat}</p>
                <p>Velocidad: ${data.stats[5].base_stat}</p>
            `;
            listDiv.appendChild(card);
        }
    });
}
//evento de boton para cargar pokemones aleatorios
document.getElementById('randomButton').addEventListener('click', loadRandomPokemons);

// Evento para el buscador individual (igual que antes)
document.getElementById('searchButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    if (!pokemonName) {
        alert('Por favor, ingresa un nombre o ID.');
        document.getElementById('pokemonInfo').innerHTML = '';
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const infoDiv = document.getElementById('pokemonInfo');
            infoDiv.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p><strong>Tipo(s):</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
                <button id="saveButton">Guardar Pokémon</button>
            `;
        })
        .catch(error => {
            document.getElementById('pokemonInfo').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

// Cargar Pokémon aleatorios al cargar la página
document.addEventListener('DOMContentLoaded', loadRandomPokemons);
