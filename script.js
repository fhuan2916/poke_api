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
                <button id="saveButton" onclick="savePokemon(${data.id})">Guardar Pokémon</button>
            `;
        })
        .catch(error => {
            document.getElementById('pokemonInfo').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

async function getpokemon(){
    try{
        const dbopen = await db();
        const transaction = dbopen.transaction('pokemons', 'readonly');
        const pokedex = transaction.objectStore('pokemons');
        const request = pokedex.getAll();

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }catch(error){
        console.error('Error al obtener los Pokémon guardados:', error);
        return [];
    }
}

function ensureTableWrapped(tbody){
    // Wrap the nearest table in a div.table-responsive if not already wrapped
    const table = tbody ? tbody.closest('table') : null;
    if (!table) return;
    if (table.parentElement && table.parentElement.classList.contains('table-responsive')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-responsive';
    table.parentElement.insertBefore(wrapper, table);
    wrapper.appendChild(table);
}

function poketabla(poke){
    ensureResponsiveStyles();

    const tbody = document.getElementById('savePokemonTablaBody');
    if (!tbody) return;
    ensureTableWrapped(tbody);

    tbody.innerHTML = '';

    if (!poke || poke.length === 0) {
        const row = document.createElement('tr');
        // Assuming table has 5 columns: ID, Name, Image, Types, Actions
        row.innerHTML = `<td colspan="5" style="text-align:center; padding:12px;">No hay Pokémon guardados.</td>`;
        tbody.appendChild(row);
        return;
    }
    poke.forEach(p => {
        // Support different shapes: p may have .data or direct fields
        const idValue = p.id ?? (p.data && p.data.id) ?? '';
        const nameValue = p.name ?? (p.data && p.data.name) ?? '';
        const sprite = (p.data && p.data.sprites && p.data.sprites.front_default) || p.sprites?.front_default || p.image || '';
        const typesArray = p.types ?? (p.data && p.data.types) ?? [];
        const typesText = Array.isArray(typesArray) ? typesArray.map(t => (t.type ? t.type.name : t.name || t)).join(', ') : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${idValue}</td>
            <td>${nameValue}</td>
            <td><img class="pokemon-img" src="${sprite}" alt="${nameValue}"></td>
            <td>${typesText}</td>
            <td><button onclick="deletePokemon(${idValue})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Cargar Pokémon aleatorios al cargar la página
document.addEventListener('DOMContentLoaded', loadRandomPokemons);

window.addEventListener('load', async () => {
    const savedPokemons = await getpokemon();
    poketabla(savedPokemons);
});

async function deletePokemon(id){
    try{
        const dbopen = await db();
        const transaction = dbopen.transaction('pokemons', 'readwrite');
        const pokedex = transaction.objectStore('pokemons');
        const request = pokedex.delete(id);
        request.onsuccess = async () => {
            console.log(`Pokémon con ID ${id} eliminado.`);
            const savedPokemons = await getpokemon();
            poketabla(savedPokemons);
        };
        request.onerror = (event) => {
            console.error('Error al eliminar el Pokémon:', event.target.error);
        };
    }catch(error){
        console.error('Error al eliminar el Pokémon o abrir la base de datos:', error);
    }
}

