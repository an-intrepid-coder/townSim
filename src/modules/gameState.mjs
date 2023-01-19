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
        this.stampForests();
        this.stampLakes();
        this.stampRivers();
    }

    stampForests() {
        for (let y = 0; y < this.mapCellsHigh; y++) {
            for (let x = 0; x < this.mapCellsWide; x++) {
                let index = y * this.mapCellsWide + x;
                let isForest = Math.floor(Math.random() * 10) % 2 == 0;
                if (isForest) {
                    this.cells[index].terrain = "trees";
                }
            }
        }    
        let generations = 1;
        let threshold = 5;
        for (let i = 0; i < generations; i++) {
            for (let y = 0; y < this.mapCellsHigh; y++) {
                for (let x = 0; x < this.mapCellsWide; x++) {
                    let index = y * this.mapCellsWide + x;
                    let count = 0;
                    let neighbors = this.getCellNeighbors(x, y);
                    for (let cell of neighbors) {
                        if (cell.terrain == "trees") {
                            count++;
                        }
                    }
                    let cell = this.cells[index];
                    if (count >= threshold) {
                        cell.terrain = "trees";
                    } else {
                        cell.terrain = "unset";
                    }
                }
            }
        }
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

    getCellNeighbors(x, y) {
        let neighbors = [];
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) { 
                if (i > 0 && j > 0 && i < this.mapCellsHigh && j < this.mapCellsWide) {
                    let index = i * this.mapCellsWide + j;
                    neighbors.push(this.cells[index]);
                }
            }
        }
        return neighbors;
    }
}

