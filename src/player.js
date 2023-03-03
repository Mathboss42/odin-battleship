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
                // console.log('coords', coords)
                return board.receiveAttack(coords);
            } else {
                // console.log('triedattacks1', this.triedAttacks)
                let newCoords = generateCoords(boardLength);
                if (this.triedAttacks.some(el => {
                    return el[0] === newCoords[0] && el[1] === newCoords[1];
                })) {
                    // console.log('crash location?');
                    let i = 0;
                    while(this.isTriedAttack(newCoords)) {
                        console.log('crash zone');
                        newCoords = generateCoords(boardLength);
                        if (i === 100) break;
                        // console.log('crash zone coorindates', newCoords);
                        // console.log(this.triedAttacks.some(el => {
                        //     return el[0] === newCoords[0] && el[1] === newCoords[1];
                        // }));

                        i++;
                    }

                    if (this.triedAttacks.some(el => {
                        return el[0] === newCoords[0] && el[1] === newCoords[1];
                    })) {
                        let j = 1;
                        newCoords[0] = Math.floor(Math.random() * (boardLength - 1) + 1);

                        loop1:
                            while(this.triedAttacks.some(el => {
                                return el[0] === newCoords[0] && el[1] === newCoords[1];
                            })) {
                                // if (j === 11) break;
                                // newCoords[1] = j;
                                console.log('new crash zone');
                                for (let k = 1; k < 11; k++) {
                                    newCoords[1] = k;
                                    if (!this.isTriedAttack(newCoords)) {
                                        console.log(this.triedAttacks);
                                        break loop1;
                                    }
                                }
                                console.log('newCoords pretty please', newCoords)
                                
                                newCoords[0]++;

                                if (newCoords[0] > boardLength) {
                                    newCoords[0] = newCoords[0] - boardLength; 
                                }
                                // j++;
                            }
                    }
                }
                this.triedAttacks.push(newCoords);
                // console.log('triedattacks2', this.triedAttacks)
                // console.log('newCoords', newCoords);
                return [board.receiveAttack(newCoords), newCoords];
            }
        } else {
            console.log('isnt my turn');
            return;
        }
    }

    isTriedAttack(coords) {
        return this.triedAttacks.some(el => {
                return el[0] === coords[0] && el[1] === coords[1];
            })
    }
}

export default Player;