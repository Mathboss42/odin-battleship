import { generateCoords } from "./coordsGenerator";
import Ship from "./ship";

class Gameboard {
    constructor(length, isAiBoard) {
        this.length = length;
        this.isAiBoard =  isAiBoard;
        this.occupiedTiles = [];
        this.placedShips = [];
        this.hitTiles = [];
        this.missedTiles = [];
        this.firedTiles = [];
        this.sunkShips = 0;
        this.negScore = 0;
    }

    placeShip(coords = [], id, length, direction) {
        console.log('place ship please')
        const ship = new Ship(length);

        if (this.occupiedTiles.some(el => {
            return el.includes(coords[0]) && el.includes(coords[1]);
        })) {
            console.log('invalid coords for ship placement');
            console.log(id)
            if (this.isAiBoard) {
                console.log('recu')
                this.placeShip(generateCoords(this.length), id, length, direction);
                return;
            } else {
                return;
            }
        }

        if (direction === 'horizontal') {
            if (coords[0] + length > this.length) {
                console.log('illegal placement');
                if (this.isAiBoard) {
                    console.log('recu')
                    this.placeShip(generateCoords(this.length), id, length, direction);
                    return;
                } else {
                    return;
                }
            };

            for (let i = 0; i < length; i++) {
                this.occupiedTiles.push([coords[0], coords[1], id]);
                coords[0]++;
            }

            this.placedShips.push({id: id, ship});
            
        } else {
            if (coords[1] + length > this.length) {
                console.log('illegal placement');
                if (this.isAiBoard) {
                    console.log('recu')
                    this.placeShip(generateCoords(this.length), id, length, direction);
                    return;
                } else {
                    return;
                }
            };
            
            for (let i = 0; i < length; i++) {
                this.occupiedTiles.push([coords[0], coords[1], id]);
                coords[1]++;
            }

            this.placedShips.push({id: id, ship});
        }
    }

    receiveAttack(coords) {
        if (coords.length !== 2 || coords[0] > this.length || coords[0] < 1 || coords[1] > this.length || coords[1] < 1) {
            console.log('invalid coords');
            return;
        }
        if (this.firedTiles.some(el => {
            return el.includes(coords[0]) && el.includes(coords[1]);
        })) {
            console.log('illegal');
            return;
        } else {
            if (!this.occupiedTiles.some(el => {
                return el.includes(coords[0]) && el.includes(coords[1]);
            })) {
                this.firedTiles.push(coords);
                this.missedTiles.push(coords);
                return 1;
            };

            const id = this.#getId(coords);

            const ship = this.#getShip(id).ship;
            ship.hit()

            if (ship.hits === ship.length) {
                ship.sunk = true;
                this.sunkShips++;
                this.negScore++;
            }

            this.hitTiles.push(coords);
            this.firedTiles.push(coords);

            return 1;
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