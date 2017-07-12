/**
 * @property {Cell} currentCell
 */
export default class Character {

    constructor() {
        this.size        = 30;
        this.padding     = 0;
        this.translateX  = 0;
        this.translateY  = 0;
        this.currentCell = null;
        this.canMove     = true;
        this.completed   = () => null;

        this.node           = document.createElement('div');
        this.node.className = "character";

        document.addEventListener("keydown", this.move.bind(this));
    }

    setSizing(cellSize) {
        if (cellSize < this.size) {
            this.size = cellSize * 0.8;
        }
        this.padding = (cellSize - this.size) / 2;
        this.setStyle();
    }

    setStyle() {
        this.node.setAttribute("style",
            `margin:${this.padding}px;`
            + `transform:translate(${this.translateX}px, ${this.translateY}px);`
            + `height:${this.size}px;width:${this.size}px;`
        );
    }

    /**
     *
     * @param {Cell} cell
     */
    moveToCell(cell) {
        this.setSizing(cell.node.offsetWidth);
        this.translateX = cell.node.offsetLeft;
        this.translateY = cell.node.offsetTop;
        this.setStyle();
        this.currentCell = cell;
        this.canMove     = false;

        let movementDelay = 100;
        if (cell.exit) {
            // TODO: Perhaps we should check if we are moving right from the exit cell instead of into it?
            this.completed();
            movementDelay = 1000;
        }

        // small delay until we can issue the next movement command
        setTimeout(() => this.canMove = true, movementDelay);
    }

    move(e) {
        let direction = null;
        switch (e.keyCode) {
            case 87:
            case 38:
                direction = 0;
                break;
            case 68:
            case 39:
                direction = 1;
                break;
            case 83:
            case 40:
                direction = 2;
                break;
            case 65:
            case 37:
                direction = 3;
                break;
            default:
                break;
        }

        if (direction !== null && this.canMove) {
            let targetCell = this.currentCell.GetNeighbour(direction);
            if (targetCell) {
                if (!this.currentCell.walls[direction]) {
                    this.moveToCell(targetCell);
                }
            }
        }
    }

}
