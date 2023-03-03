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
        console.log(this.isAiBoard ? 'AI place ship' : 'place ship')

        let newCoords = [...coords];
        const ship = new Ship(length);

        if (this.occupiedTiles.some(el => {
            return el[0] === coords[0] && el[1] === coords[1];
        }) || !this.checkAdjacent(coords, length, direction)) {
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
            if (coords[0] + length-1 > this.length) {
                console.log('illegal placement', coords[0], length, this.length);
                if (this.isAiBoard) {
                    console.log('recu')
                    this.placeShip(generateCoords(this.length), id, length, direction);
                    return;
                } else {
                    return;
                }
            };

            for (let i = 0; i < length; i++) {
                this.occupiedTiles.push([newCoords[0], newCoords[1], id]);
                newCoords[0]++;
            }

            this.placedShips.push({id: id, ship});
            console.log('this is suppsoed to return 1', this)
            return 1;
            
        } else {
            if (coords[1] + length-1 > this.length) {
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
                this.occupiedTiles.push([newCoords[0], newCoords[1], id]);
                newCoords[1]++;
            }

            this.placedShips.push({id: id, ship});
            console.log('this is suppsoed to return 1', this)
            return 1;
        }
    }

    checkAdjacent(coords, length, direction) {
        let newCoords = [...coords];

        const xDirection = [1, 1, 1, 0, -1, -1, -1, 0];
        const yDirection = [-1, 0, 1, 1, 1, 0, -1, -1];
    
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < xDirection.length; j++) {
                    const newNewCoords = [...newCoords];
                    newNewCoords[0] += xDirection[j];
                    newNewCoords[1] += yDirection[j];

                    if (this.occupiedTiles.some(el => {
                        return el[0] === newNewCoords[0] && el[1] === newNewCoords[1];
                    })) {
                        console.log(-1)
                        return 0;
                    }
                }
                newCoords[0]++;
            }
        } else {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < xDirection.length; j++) {
                    const newNewCoords = [...newCoords];
                    newNewCoords[0] += xDirection[j];
                    newNewCoords[1] += yDirection[j];

                    if (this.occupiedTiles.some(el => {
                        return el[0] === newNewCoords[0] && el[1] === newNewCoords[1];
                    })) {
                        console.log(-1)
                        return 0;
                    }
                }
                newCoords[1]++;
            }
        }

        console.log(1);
        return 1;
    }
    

    receiveAttack(coords) {
        // console.log('receive attack', this.isAiBoard)
        if (coords.length !== 2 || coords[0] > this.length || coords[0] < 1 || coords[1] > this.length || coords[1] < 1) {
            console.log('invalid coords', coords);
            return;
        }
        if (this.firedTiles.some(el => {
            return el[0] === coords[0] && el[1] === coords[1];
        })) {
            console.log('illegal');
            return;
        } else {
            if (!this.occupiedTiles.some(el => {
                return el[0] === coords[0] && el[1] === coords[1];
            })) {
                // console.log('frangipane')
                this.firedTiles.push(coords);
                this.missedTiles.push(coords);
                return 1;
            };

            // console.log('lol')
            const id = this.#getId(coords);
            // console.log('id', id)

            const ship = this.#getShip(id).ship;
            console.log('ship', ship)
            ship.hit()
            // console.log('fasdasd')

            if (ship.hits === ship.length) {
                console.log('ship.hits === ship.length', ship.hits === ship.length)
                ship.sunk = true;
                this.sunkShips++;
                this.negScore++;
            }

            this.hitTiles.push(coords);
            this.firedTiles.push(coords);

            return 2;
        }
    }

    #getShip(id) {
        // console.log('getship', this.placedShips.filter(el => {console.log(el.id == ide);return el.id == ide}))
        // console.log('getship', this.placedShips.filter(el => {console.log(el.id, ide);return el.id === ide}))
        return this.placedShips.filter(el => el.id === id)[0];
    }

    #getId(coords) {
        return this.occupiedTiles.filter(el => el[0] === coords[0] && el[1] === coords[1])[0][2];
    }
}

export default Gameboard;
//place ship means import ship and call new Ship