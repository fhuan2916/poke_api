<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PokeAPI Consumer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Consumidor de PokeAPI</h1>
        </div>
        <div class="section">
            <h1>Buscador de Pokémon</h1>
            <input type="text" id="pokemonInput" placeholder="Ingresa nombre o ID de Pokémon (ej: pikachu)">
            <button id="searchButton">Buscar</button>
            <div id="pokemonInfo"></div>
            
            <h2>Pokémon Aleatorios Iniciales</h2>
            <div class="contain_poke_random">
                <button id="randomButton">Generar Aleatorios</button>
                <div id="randomPokemonList"></div>
            </div>
            <div id="lista_poke_save" class="lista_poke">
                <h2>Pokémon Guardados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id Pokémon</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Tipo(s)</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody id="savedPokemonTableBody">
                        <!-- Aquí se agregarán los Pokémon guardados -->
                    </tbody>    
                </table>
            </div>
        </div>
        <div class="footer">
            <p>Desarrollado por Juan Diego Blanco Tapia - <?php echo date("Y"); ?></p>
        </div>
    </div>
    <script src="script.js"></script>
    <script src="db.js"></script>
</body>
</html>