import {randInRange, randomIndex} from "./utility.mjs";

let terrainTypes = ["unset", "grass", "trees", "dirt", "water"];

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.terrain = "unset";
        // more to come (TODO)
    }
}

export class GameState {
    constructor() { 
        this.mapCellsHigh = 100;
        this.mapCellsWide = 100;
        this.cells = [];
        for (let y = 0; y < this.mapCellsHigh; y++) {
            for (let x = 0; x < this.mapCellsWide; x++) {
                this.cells.push(new Cell(x, y));
            }
        }
        // forests TODO
        // lakes TODO
        // river(s) TODO
    }

    stampForests() {
        // TODO using a cellular automata
    }

    stampLakes() {
        // TODO using a cellular automata
    }

    stampRivers() {
        // TODO using a kind of drunken walk
    }

    getCellTerrain(x, y) {
        return this.cells[y * this.mapCellsWide + x].terrain;
    }
}

