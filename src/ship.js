class Ship {
    constructor(length, hits = 0, sunk = false) {
        this.length = length,
        this.hits = hits,
        this.sunk = sunk
    }

    hit() {
        console.log('ship is hit')
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

export default Ship;