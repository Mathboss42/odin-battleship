class Player {
    constructor(isAi, isMyTurn) {
        this.isAi = isAi;
        this.isMyTurn = isMyTurn;
        this.score = 0;
    }

    attack(boardLength, callback, coords = null) {
        if (this.isMyTurn) {
            if (!this.isAi) {
                callback(coords);
            } else {
                coords = Math.random() * (boardLength - 1) + 1;
                callback(coords);
            }
        } else {
            return;
        }
    }
}

export default Player;