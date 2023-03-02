class Player {
    constructor(isAi, isMyTurn) {
        this.isAi = isAi;
        this.isMyTurn = isMyTurn;
        this.score = 0;
    }

    attack(boardLength, board, coords = []) {
        if (this.isMyTurn) {
            if (!this.isAi) {
                return board.receiveAttack(coords);
            } else {
                coords[0] = Math.floor(Math.random() * (boardLength - 1) + 1);
                coords[1] = Math.floor(Math.random() * (boardLength - 1) + 1);
                console.log(coords);
                return board.receiveAttack(coords);
            }
        } else {
            return;
        }
    }
}

export default Player;