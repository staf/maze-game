/**
 * Imports
 */
import Generator from "./Generator";
import CellMap from "./CellMap";
import { randomInt } from "./helpers";
import Character from "./Character";

/**
 * Setup the maze once the page has loaded. Though it is probably not necessary
 * to wait for the DOMContent since there are no external assets being loaded...
 */
document.addEventListener("DOMContentLoaded", function () {

    let game = {
        character: new Character(),
        maze: document.getElementById("game"),
        style: document.getElementById("style"),
        inputs: {
            size: document.getElementById("size"),
            seed: document.getElementById("seed"),
            walls: document.getElementById("walls")
        }
    };

    // Set default values
    game.inputs.size.value  = 15;
    game.inputs.seed.value  = randomInt(0, 999999);
    game.inputs.walls.value = 0;

    let settingsForm = document.getElementById("settings-form");
    let seedButton   = document.getElementById("random-seed");

    // Function to run when we generate a maze with input settings
    const bootMaze = e => {

        // Check if the event is there so we can call the function manually.
        if (e) e.preventDefault();

        // Seed the random number generator
        window._SEED = game.inputs.seed.value;

        // Init the CellMap
        let size = parseInt(game.inputs.size.value);
        let map  = new CellMap(size, size);
        map.Init();

        Generator.BuildMaze(map);
        Generator.KnockDownWalls(map, parseInt(game.inputs.walls.value));

        // Configure the (flexbox) grid properly before rendering
        game.style.innerHTML = `.cell { flex-basis: ${(1 / size) * 100}%; }`;

        // Print the cells on the page.
        game.maze.innerHTML = "";
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                let cell = map.cells[y][x];
                cell.UpdateWalls();
                game.maze.appendChild(cell.node);
            }
        }

        game.maze.appendChild(game.character.node);
        game.character.moveToCell(map.GetStartingCell());
    };

    // Generate initial maze
    bootMaze();

    // Register the listener to the settings form
    settingsForm.addEventListener("submit", bootMaze);

    const newRandomMap = e => {
        if (e) e.preventDefault();
        game.inputs.seed.value = randomInt(0, 999999);
        bootMaze();
    };

    game.character.completed = () => {
        console.log("GAME COMPLETE! Creating a new maze");
        newRandomMap();
    };

    // Setup the random seed button
    seedButton.addEventListener("click", newRandomMap);

});
