function db(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PokemonDB', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pokemons')) {
                const pokedex = db.createObjectStore('pokemons', { keyPath: 'id' });
                pokedex.createIndex('name', 'name', { unique: false });
            }
        };
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        request.onerror = function(event) {
            console.error('Error al abrir la base de datos', event.target.error);
            reject(event.target.error);
        };
    });
}

async function savepoke(id_poke){
    try{
        const dbopen = await db();
        const transaction = dbopen.transaction('pokemons', 'readwrite');
        const pokedex = transaction.objectStore('pokemons');
        const inputpoke = document.getElementById('pokemonInput');
        const poke_info = document.getElementById('pokemonInfo');
        const poke = { id: id_poke  };
        // use put to allow updating existing records; wrap IDBRequest in a Promise
        const request = pokedex.put(poke);
        await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
            // keep logging for transaction
            transaction.oncomplete = () => {
                console.log('Pokémon guardado con ID:', id_poke);
                alert('Pokémon guardado con ID: ' + id_poke);
                inputpoke.value = '';
                poke_info.innerHTML = '';
                inputpoke.focus();
            };
            transaction.onerror = (event) => {
                console.error('Error al guardar el Pokémon (transacción):', event.target.error);
            };
        });
    }
    catch(error){
        console.error('Error al guardar el Pokémon o abrir la base de datos:', error);
        throw error;
    }
}
async function savePokemon(id) {
    await savepoke(id);
}

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const pokemonInput = document.getElementById('pokemonInput');
    if (!saveButton || !pokemonInput) {
        console.error('Elementos #saveButton o #pokemonInput no encontrados en el DOM.');
        return;
    }

    saveButton.addEventListener('click', async () => {
        const pokemonId = parseInt(pokemonInput.value, 10);
        if (Number.isNaN(pokemonId)) {
            console.error('ID de Pokémon inválido:', pokemonInput.value);
            return;
        }
        try {
            await savepoke(pokemonId);
            console.log('Pokémon guardado en la base de datos');
        } catch (e) {
            console.error('Error al guardar el Pokémon:', e);
        }
    });
});