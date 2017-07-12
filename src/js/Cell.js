import { oppositeWall } from "./helpers";

export default class Cell {
    /**
     * @param {CellMap} map
     * @param {number} x
     * @param {number} y
     */
    constructor(map, x, y) {
        this.map = map;

        this.walls = [ // should be map <(enum value),(bool state)>?
            true, // 0 - north
            true, // 1 - east
            true, // 2 - south
            true  // 3 - west
        ];

        this.x    = x;
        this.y    = y;
        this.node = document.createElement("div");
        this.node.classList.add("cell");

        this.open  = false;
        this.start = false;
        this.exit  = false;
    }

    /**
     * @return {string}
     */
    ToString() {
        return `${this.x}, ${this.y}`;
    }

    /**
     * Set the class names for the cell's walls
     */
    UpdateWalls() {
        this.walls.forEach((state, i) => {
            this.node.classList.toggle(`wall-${i}`, state);
        });
    }

    /**
     * Get the directions with walls.
     * Important: We exclude walls on the outer border of the maze
     */
    WallDirections() {
        let directions = [];

        if (this.walls[0] && this.y > 0) directions.push(0);
        if (this.walls[1] && this.x < this.map.width - 1) directions.push(1);
        if (this.walls[2] && this.y < this.map.height - 1) directions.push(2);
        if (this.walls[3] && this.x > 0) directions.push(3);

        return directions;
    }

    /**
     * Get the neighour cell in a specific direction.
     *
     * @return {null|Cell}
     */
    GetNeighbour(direction) {
        switch (direction) {
            case 0:
                return this.map.GetCellAt(this.x, this.y - 1);
            case 1:
                return this.map.GetCellAt(this.x + 1, this.y);
            case 2:
                return this.map.GetCellAt(this.x, this.y + 1);
            case 3:
            default:
                return this.map.GetCellAt(this.x - 1, this.y);
        }
    }

    /**
     * Set the wall state of the cell in one direction.
     * This also updates any potential neighbour in that direction
     *
     * @param {number} direction
     * @param {boolean} state
     */
    SetWall(direction, state) {
        this.walls[direction] = state;
        let neighbour         = this.GetNeighbour(direction);
        if (neighbour) {
            neighbour.walls[oppositeWall(direction)] = state;
        }
    }
}
