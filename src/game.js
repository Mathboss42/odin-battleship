import Player from "./player";
import Gameboard from "./gameboard";

const boardLength = 10;

const player = new Player(false, true);
const ai = new Player(true, false);

const playerBoard = new Gameboard(boardLength);
const aiBoard = new Gameboard(boardLength);

export function handleAttack(entity, coords) {
    const targetBoard = player.isAi ? playerBoard : aiBoard;
    entity.attack(boardLength, targetBoard.receiveAttack, coords);
}