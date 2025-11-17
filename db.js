function db(){
    return new Promise((resolve) => {
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
        request.onerror = function() {
            console.error('Error al abrir la base de datos');
        };
    });
}

async function savepoke(id_poke){
    try{
        const dbopen = await openDB('PokemonDB', 1);
        const transaction = dbopen.transaction('pokemons', 'readwrite');
        const pokedex = transaction.objectStore('pokemons');
        const poke = { id: id_poke  };
        await pokedex.add(poke);
        transaction.oncomplete = () => {
            console.log('Pokémon guardado con ID:', id_poke);
        };
        transaction.onerror = (event) => {
            console.error('Error al guardar el Pokémon:', event.target.error);
        };
    }
    catch(error){
        console.error('Error al abrir la base de datos:', error);
    }
}
document.getElementById('saveButton').addEventListener('click', async () => {
    const pokemonId = parseInt(document.getElementById('pokemonInput').value);
    await savepoke(pokemonId);
    console.log('Pokémon guardado en la base de datos');
});