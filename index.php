<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PokeAPI Consumer</title>
    <link rel="stylesheet" href="style.css">
</head>
<style>
    body{
        margin: 0;
        font-family: Arial, sans-serif;
    }
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header {
        background-color: rgba(171, 0, 0);
        padding: 10px;
        text-align: center;
    }
    .section {
        /* flex: 1; */
        position: relative;
        flex-grow: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .footer{
        align-items: flex-end;
        background-color: rgba(33, 29, 29, 1);
        padding: 10px;
        color: white;
    }

    #pokemon-info {
        background-color: aliceblue;
        padding: 10px;
    }
    #pokemonInfo img {
        width: 150px;
        height: 150px;
        background-color: aliceblue;
    }
    #pokemonInput {
        padding: 10px;
        width: 30%;
        margin-right: 10px;
    }
    #searchButton, #randomButton, #saveButton {
        padding: 10px 20px;
        background-color: rgba(0, 0, 171, 0.8);
        color: white;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 10px;
    }
    #searchButton:hover, #randomButton:hover, #saveButton:hover {
        background-color: rgba(0, 0, 171, 1);
    }

    .contain_poke_random {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .lista_poke table {
        width: 80%;
        border-collapse: collapse;
        margin-bottom: 200px;
    }
    .lista_poke th, .lista_poke td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    .lista_poke th {
        background-color: #f2f2f2;
    }
</style>
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