export class Player {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    static from(json) {
        return new Player(
            json['id'],
            json['color'],
        );
    }

    toJSON() {
        return {
            id: this.id,
            color: this.color,
        };
    }
}