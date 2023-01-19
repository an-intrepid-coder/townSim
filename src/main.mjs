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
function updateDisplay(showGrid = false, hideHud = false) {
    // Paint visible grid lines on the map:
    function paintGridLines(canvas, context) {
        canvas.strokeStyle = "black";
        context.beginPath();
        for (let y = 1; y < game.mapCellsHigh; y++) {
            let ty = y * CELL_SIZE;
            context.moveTo(0, ty);
            context.lineTo(canvas.width - 1, ty);
            context.stroke(); 
        }
        for (let x = 1; x < game.mapCellsWide; x++) {
            let tx = x * CELL_SIZE;
            context.moveTo(tx, 0);
            context.lineTo(tx, canvas.height - 1);
            context.stroke(); 
        }
    }

    // Paint terrain layer:
    function paintTerrainLayer(canvas, context, adaptive = false) {
        // NOTE: assumes canvas height == width, for now
        let cellSize = adaptive ? Math.floor(canvas.width / game.mapCellsWide) : CELL_SIZE;
        if (adaptive) { /////
            canvas.width = cellSize * game.mapCellsWide;
            canvas.height = canvas.width;
        }
        for (let y = 0; y < game.mapCellsHigh; y++) {
            for (let x = 0; x < game.mapCellsWide; x++) {
                let terrain = game.getCellTerrain(x, y);
                if (terrain == "unset") {
                    context.fillStyle = UNSET_COLOR;
                } else if (terrain == "grass") {
                    context.fillStyle = GRASS_COLOR; 
                } else if (terrain == "trees") { 
                    context.fillStyle = TREES_COLOR;
                } else if (terrain == "dirt") {
                    context.fillStyle = DIRT_COLOR;
                } else if (terrain == "water") {
                    context.fillStyle = WATER_COLOR;
                }
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    function paintHud(canvas, context) {
        function paintMiniMap() {
            paintTerrainLayer(canvas, context, true);
            // TODO: viewport outline
        }
        paintMiniMap();
    }

    paintTerrainLayer(gameCanvas, gameCanvasContext);
    if (showGrid) {
        paintGridLines(gameCanvas, gameCanvasContext);
    }
    if (!hideHud) {
        // Create mini map canvas:
        let miniMapCanvas = document.createElement("canvas");
        miniMapCanvas.style.position = "fixed";
        miniMapCanvas.height = "400";
        miniMapCanvas.width = miniMapCanvas.height;
        miniMapCanvas.style.border = "4px solid red";
        document.body.appendChild(miniMapCanvas);
        let miniMapCanvasContext = miniMapCanvas.getContext("2d");
        miniMapCanvasContext.fillStyle = "black";
        miniMapCanvasContext.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
        // paint the HUD:
        paintHud(miniMapCanvas, miniMapCanvasContext);
    }
}

updateDisplay(true, false);

// TODO: Buttons and game loop

