/**
 * @property {Cell} currentCell
 */
export default class Character {

    constructor() {
        this.node             = document.createElement('div');
        this.node.className   = "character";
        this.cellSize         = 0;
        this.characterSize    = 30;
        this.characterPadding = 0;
        this.translateX       = 0;
        this.translateY       = 0;
        this.currentCell      = null;
        this.map              = null;
        this.canMove          = true;

        document.addEventListener("keydown", this.move.bind(this));
    }

    setSizing(cellSize) {
        this.cellSize         = cellSize;
        this.characterPadding = (cellSize - this.characterSize) / 2;
        this.setStyle();
    }

    setStyle() {
        this.node.setAttribute("style", `margin:${this.characterPadding}px; transform:translate(${this.translateX}px, ${this.translateY}px);`);
    }

    /**
     *
     * @param {Cell} cell
     */
    moveToCell(cell) {
        this.translateX = cell.node.offsetLeft;
        this.translateY = cell.node.offsetTop;
        this.setStyle();
        this.currentCell = cell;
        this.canMove     = false;
        setTimeout(() => this.canMove = true, 500 / 3); // third of the time of the css move animation
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
