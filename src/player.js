import { generateCoords } from "./coordsGenerator";

class Player {
    constructor(isAi, isMyTurn) {
        this.isAi = isAi;
        this.isMyTurn = isMyTurn;
        this.score = 0;
        this.triedAttacks = [];
    }

    attack(boardLength, board, coords = []) {
        if (this.isMyTurn) {
            if (!this.isAi) {
                return board.receiveAttack(coords);
            } else {
                coords = generateCoords(boardLength);
                if (this.triedAttacks.includes(coords)) {
                    while(this.triedAttacks.includes(coords)) {
                        coords = generateCoords(boardLength);
                    }
                }
                console.log(coords);
                return board.receiveAttack(coords);
            }
        } else {
            return;
        }
    }
}

export default Player;