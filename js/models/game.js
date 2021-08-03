import { Cell } from './cell.js';
import { Field } from './field.js';
import { Player } from './player.js';

export class Game {
    static from(json) {
        return {
            id: json['id'],
            currentPlayerId: json['currentPlayerId'],
            winnerPlayerId: json['winnerPlayerId'],
            players: {
                1 : Player.from(json['players'][1]),
                2 : Player.from(json['players'][2]),
            },
            field: Field.from(json['field']),
        };
    }

    // current player's color can't be used & other player's color can't be used
    static isUsefulColor(game, color) {
        return game != null &&
               !(game.players[game.currentPlayerId].color.toUpperCase() === color.toUpperCase()) &&
               !(game.players[(game.currentPlayerId % 2) + 1].color.toUpperCase() === color.toUpperCase());
    }
}
