import Cell from "./Cell";

export default class CellMap {
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this.cells  = [];
        this.height = height;
        this.width  = width;
    }

    /**
     * Create all the base cells for the map
     */
    Init() {
        this.cells = [];
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row[x] = new Cell(this, x, y);
            }
            this.cells[y] = row;
        }
    }

    /**
     * Get a cell at a set of coordinates.
     *
     * @param {number} x
     * @param {number} y
     * @return {null|Cell}
     */
    GetCellAt(x, y) {
        let row = this.cells[y];
        if (typeof row !== "undefined") {
            let cell = row[x];
            if (typeof cell !== "undefined") {
                return cell;
            }
        }

        return null;
    }

    GetStartingCell() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cell = this.cells[y][x];
                if (cell.start) {
                    return cell;
                }
            }
        }

        return null;
    }
}
