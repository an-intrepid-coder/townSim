import {CELL_SIZE, UNSET_COLOR, GRASS_COLOR, 
        TREES_COLOR, DIRT_COLOR, WATER_COLOR} from "./modules/constants.mjs";
import {GameState} from "./modules/gameState.mjs";
import {randInRange, randomIndex} from "./modules/utility.mjs";

let game = new GameState();

let gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = game.mapCellsWide * CELL_SIZE;
gameCanvas.height = game.mapCellsHigh * CELL_SIZE;

let gameCanvasContext = gameCanvas.getContext("2d");

// Updates the display each frame:
function updateDisplay(showGrid = false) {
    // Paint visible grid lines on the map:
    function paintGridLines() {
        gameCanvas.strokeStyle = "black";
        gameCanvasContext.beginPath();
        for (let y = 1; y < game.mapCellsHigh; y++) {
            let ty = y * CELL_SIZE;
            gameCanvasContext.moveTo(0, ty);
            gameCanvasContext.lineTo(gameCanvas.width - 1, ty);
            gameCanvasContext.stroke(); 
        }
        for (let x = 1; x < game.mapCellsWide; x++) {
            let tx = x * CELL_SIZE;
            gameCanvasContext.moveTo(tx, 0);
            gameCanvasContext.lineTo(tx, gameCanvas.height - 1);
            gameCanvasContext.stroke(); 
        }
    }

    // Paint terrain layer:
    function paintTerrainLayer() {
        for (let y = 0; y < game.mapCellsHigh; y++) {
            for (let x = 0; x < game.mapCellsWide; x++) {
                let terrain = game.getCellTerrain(x, y);
                if (terrain == "unset") {
                    gameCanvasContext.fillStyle = UNSET_COLOR;
                } else if (terrain == "grass") {
                    gameCanvasContext.fillStyle = GRASS_COLOR; 
                } else if (terrain == "trees") { 
                    gameCanvasContext.fillStyle = TREES_COLOR;
                } else if (terrain == "dirt") {
                    gameCanvasContext.fillStyle = DIRT_COLOR;
                } else if (terrain == "water") {
                    gameCanvasContext.fillStyle = WATER_COLOR;
                }
                gameCanvasContext.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    paintTerrainLayer();
    if (showGrid) {
        paintGridLines();
    }
    // TODO
}

/* Basic idea is that every animation frame it will update the display and check for whether to progress the game state,
   while the buttons will affect the game state only (only updateDisplay() will affect the DOM.  */ // TODO, in prog.

updateDisplay(true);

// TODO: Buttons and game loop

