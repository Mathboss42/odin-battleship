import Ship from "./ship";

class Gameboard {
    constructor(length) {
        this.length = length;
        this.occupiedTiles = [];
        this.placedShips = [];
        this.hitTiles = [];
        this.missedTiles = [];
        this.firedTiles = [];
        this.sunkShips = 0;
    }

    placeShip(coords, id, length, direction) {
        const ship = new Ship(length);

        if (direction === 'horizontal') {
            if (coords[0] + length > this.length) throw new Error('Illegal placement');

            for (let i = 0; i < length; i++) {
                this.occupiedTiles.push([coords[0], coords[1], id]);
                coords[0]++;
            }

            this.placedShips.push({id: id, ship});
            
        } else {
            if (coords[1] + length > this.length) throw new Error('Illegal placement');
            
            for (let i = 0; i < length; i++) {
                this.occupiedTiles.push([coords[0], coords[1], id]);
                coords[1]++;
            }

            this.placedShips.push({id: id, ship});
        }
    }

    receiveAttack(coords) {
        if (this.hitTiles.some(el => {
            return el.includes(coords[0]) && el.includes(coords[1]);
        })) {
            throw new Error('Illegal shot: tile already shot');
        } else {
            if (!this.occupiedTiles.some(el => {
                return el.includes(coords[0]) && el.includes(coords[1]);
            })) {
                this.firedTiles.push(coords);
                this.missedTiles.push(coords);
                return;
            };

            const id = this.#getId(coords);

            const ship = this.#getShip(id).ship;
            ship.hit()

            if (ship.hits === ship.length) {
                ship.sunk = true;
                this.sunkShips++;
            }

            this.hitTiles.push(coords);
            this.firedTiles.push(coords);
        }
    }

    #getShip(id) {
        return this.placedShips.filter(el => this.id === id)[0];
    }

    #getId(coords) {
        return this.occupiedTiles.filter(el => el.includes(coords[0]) && el.includes(coords[1]))[2];
    }
}

export default Gameboard;
//place ship means import ship and call new Ship