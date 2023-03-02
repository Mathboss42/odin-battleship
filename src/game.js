import Player from "./player";
import Gameboard from "./gameboard";
import { generateCoords } from "./coordsGenerator";

const boardLength = 10;
const numberOfShips = 10;

let currentPhase = undefined;

let currentPlayer;

let player;
let ai;

let playerBoard;
let aiBoard;

let lastId = 0; 

export function startGame() {
    player = new Player(false, true);
    ai = new Player(true, false);
    playerBoard = new Gameboard(boardLength, false);
    aiBoard = new Gameboard(boardLength, true);
    currentPlayer = player;
    currentPhase = 'ship placement'
    console.log(player, ai, playerBoard, aiBoard, currentPlayer, currentPhase)
}

function endGame(winner) {
    return;
}

export function handleAttack(entity, coords = []) {
    console.log('handle attack', entity.isAi)
    const targetBoard = getTargetBoard(entity);
    const attack = entity.attack(boardLength, targetBoard, coords);
    console.log(attack);
    if (!attack) {
        console.log('returned')
        return;
    }
    if (targetBoard.negScore === targetBoard.placedShips.length) {
        endGame(entity);
    }
    switchTurns();
}

function switchTurns() {
    console.log('switch turns')
    player.isMyTurn = !player.isMyTurn; 
    ai.isMyTurn = !ai.isMyTurn; 

    currentPlayer === player ? ai : player;

    if (currentPlayer === ai) {
        handleAttack(ai);
    } 
}

export function handlePlaceShip(coords, id, length, direction) {
    if (playerBoard.placedShips.length < numberOfShips) {
        playerBoard.placeShip(coords, id, length, direction);
        console.log(playerBoard);
    } else {
        return;
    }
}

// export function handlePlaceShip(coords, direction) {
//     if (playerBoard.placedShips.length < numberOfShips) {
//         switch (lastId) {
//             case 0 :
//                 playerBoard.placeShip(coords, String(lastId), 4, direction);
//                 break;
//             case 1 :
//             case 2 :
//                 playerBoard.placeShip(coords, String(lastId), 3, direction);
//                 break;
//             case 3 :
//             case 4 :
//             case 5 :
//                 playerBoard.placeShip(coords, String(lastId), 2, direction);
//                 break;
//             case 6 :
//             case 7 :
//             case 8 :
//             case 9 :
//                 playerBoard.placeShip(coords, String(lastId), 1, direction);
//                 break;
//         }
//         lastId++;
//     } else {
//         return;
//     }
// }

function handleAiPlaceShip() {
    aiBoard.placeShip(generateCoords(boardLength), String(0), 4, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(1), 3, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(2), 3, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(3), 2, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(4), 2, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(5), 2, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(6), 1, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(7), 1, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(8), 1, getRandomDirection());
    aiBoard.placeShip(generateCoords(boardLength), String(9), 1, getRandomDirection());
}

function getTargetBoard(entity) {
    return entity.isAi ? playerBoard : aiBoard;
}

export function getRandomDirection() {
    const roll = Math.floor(Math.random() * 2); 
    return roll === 1 ? 'horizontal' : 'vertical';
}

export function getCurrentPhase() {
    return currentPhase;
}

// startGame();
// console.log(aiBoard);
// handleAiPlaceShip();
// handlePlaceShip([4,3], 'vertical');
// handlePlaceShip([5,3], 'vertical');
// handlePlaceShip([6,3], 'vertical');
// handlePlaceShip([7,3], 'vertical');
// handlePlaceShip([8,3], 'vertical');
// handlePlaceShip([9,3], 'vertical');
// handlePlaceShip([10,3], 'vertical');
// handlePlaceShip([10,4], 'vertical');
// handlePlaceShip([10,5], 'vertical');
// handlePlaceShip([10,6], 'vertical');
// handlePlaceShip([10,7], 'vertical');
// handlePlaceShip([10,8], 'vertical');
// console.log(playerBoard);
// handleAttack(player, [2, 2]);
// handleAttack(ai);
// handleAttack(player, [3, 2]);
// handleAttack(ai);
// handleAttack(player, [3, 2]);
// handleAttack(player, [4, 2]);
// handleAttack(ai);