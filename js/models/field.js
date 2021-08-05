import { Cell } from "./cell.js";

export class Field {
    constructor(width, height, cells) {
        this.width = width;
        this.height = height;
        this.cells = new Array(cells.length).fill(0);

        // NOTE:
        // This slows down everything a bit .. I guess player cells can also be fetched from API
        // NOTE: mb. store index and (x, y) of the cell
        this.playersCells = {
            1 : new Set(),
            2 : new Set(),
        };

        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = Cell.from(cells[i]);

            if (cells[i].playerId != 0) {
                this.playersCells[cells[i].playerId].add(i);
            }
        }
    }

    static from(json) {
        return new Field(
            json['width'],
            json['height'],
            json['cells'],
        )
    }

    isValidCell(y, x) {
        return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
    }

    debugFieldColors() {
        console.table(this.cells);
    }
    
    // TODO: Add cell blinking here
    // NOTE: Mb. to implement blinking just draw blinking romb on top of the cell ?
    draw(ctx, x, y, cell_width, cell_height) { 
        for (let h = 0; h < this.height; h++) {
            // each odd line is 1 cell shorter
            for (let w = 0; w < this.width - (h & 1); w++) {
                let index = (h * this.width - (~~(h / 2))) + w;

                if (this.cells[index].playerId != 0) {
                    this.playersCells[this.cells[index].playerId].add(index);
                }

                // NOTE: It can probably be a static method
                this.cells[index].draw(ctx, 
                    x + w * cell_width  + ((h % 2) * cell_width / 2), 
                    y + h * cell_height - (h * (cell_height / 2)), 
                    cell_width, 
                    cell_height
                    );
            }
        }
    }
}
