import Ship from "./ship";

class Gameboard {
    constructor(length) {
        this.length = length;
        this.occupiedTiles = [];
        this.placedShips = [];
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
        if (!this.occupiedTiles.some(el => 
            {el.includes(coords[0]) && el.includes(coords[1])}
        )) return;

        return -1;
    }
}

export default Gameboard;
//place ship means import ship and call new Ship