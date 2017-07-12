import { random, randomArrayValue } from "./helpers";
export default class Generator {
    /**
     * "Snakes" through the cells of a map randomly and creates the maze
     *
     * @param {CellMap} map
     */
    static BuildMaze(map) {

        let startX    = 0; //random(0, map.width - 1);
        let startY    = random(0, map.height - 1);
        let startCell = map.cells[startY][startX];

        startCell.SetWall(3, false); // open wall to left
        startCell.node.classList.add("start");
        startCell.open  = true;
        startCell.start = true;

        let totalCells = map.width * map.height;
        let openCells  = 1;
        let previous   = startCell;

        while (openCells < totalCells) {

            let randomCell;
            if (random(0, 100) > 50) { // Prefer previous cell
                randomCell = previous;
            } else {
                randomCell = Generator.RandomOpenCell(map);
            }

            if (!randomCell) {
                break;
            }

            let target = Generator.RandomClosedSibling(randomCell);
            if (!target) {
                continue;
            }

            openCells++;
            target.cell.open = true;
            randomCell.SetWall(target.direction, false);
            previous = target.cell;
        }

        // Place an exit
        let exitDirection = randomArrayValue([0, 1, 2]); // any except starting direction
        let exitCell;
        if (exitDirection === 0) {
            exitCell = map.GetCellAt(random(0, map.width - 1), 0);
        } else if (exitDirection === 1) {
            exitCell = map.GetCellAt(map.width - 1, random(0, map.height - 1));
        } else if (exitDirection === 2) {
            exitCell = map.GetCellAt(random(0, map.width - 1), map.height - 1);
        }

        exitCell.SetWall(exitDirection, false);
        exitCell.node.classList.add("exit");
        exitCell.exit = true;

    }

    /**
     * Knock down a set number of walls on a map
     *
     * @param {CellMap} map
     * @param {number} count
     */
    static KnockDownWalls(map, count = 1) {
        for (let i = 0; i < count; i++) {

            let cell;
            let directions;
            let maxTries = count * 4; // To stop infinite loops when there are no walls left. todo: check if there are walls left instead.
            let tries    = 0;
            do {
                cell       = Generator.RandomOpenCell(map);
                directions = cell.WallDirections();
            } while (directions.length === 0 || ++tries > maxTries);

            cell.SetWall(randomArrayValue(directions), false);
        }
    }

    /**
     * Get a random cell that has been marked as open
     *
     * @param {CellMap} map
     * @return {null|Cell}
     */
    static RandomOpenCell(map) {
        let possibilities = [];

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let cell = map.cells[y][x];
                if (cell.open) {
                    possibilities.push(cell);
                }
            }
        }

        return randomArrayValue(possibilities);
    }

    /**
     * Find a random neighbour of a cell that is closed.
     *
     * @return {null|Cell}
     */
    static RandomClosedSibling(cell) {
        let available = [];
        [0, 1, 2, 3].forEach(direction => {
            let possibleTarget = cell.GetNeighbour(direction);
            if (possibleTarget !== null && possibleTarget.open === false) {
                available.push({direction, cell: possibleTarget});
            }
        });

        return randomArrayValue(available);
    }
}