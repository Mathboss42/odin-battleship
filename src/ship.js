class Ship {
    constructor(length, hits, sunk) {
        this.length = length,
        this.hits = hits,
        this.sunk = sunk
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

export default Ship;