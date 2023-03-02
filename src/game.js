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

let lastId = -1; 

export function startGame() {
    player = new Player(false, true);
    ai = new Player(true, false);
    playerBoard = new Gameboard(boardLength, false);
    aiBoard = new Gameboard(boardLength, true);
    currentPlayer = player;
}

function endGame(winner) {
    return;
}

export function handleAttack(entity, coords = []) {
    const targetBoard = getTargetBoard(entity);
    const attack = entity.attack(boardLength, targetBoard, coords);
    console.log(attack);
    if (!attack) {
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

export function handlePlaceShip(coords, direction) {
    lastId++;
    if (playerBoard.placedShips.length < numberOfShips) {
        playerBoard.placeShip(coords, lastId, 4, direction);
    } else {
        return;
    }
}

function handleAiPlaceShip() {
    for (let i = 0; i < numberOfShips; i++) {
        // console.log(i);
        aiBoard.placeShip(generateCoords(boardLength), i, 2, 'vertical');
    }
}

function getTargetBoard(entity) {
    return entity.isAi ? playerBoard : aiBoard;
}

export function getRandomDirection() {
    const roll = Math.floor(Math.random() * 2); 
    return roll === 1 ? 'horizontal' : 'vertical';
}

startGame();
console.log(aiBoard);
handleAiPlaceShip();
handlePlaceShip([4,3], 4, 'vertical');
handlePlaceShip([5,3], 4, 'vertical');
console.log(playerBoard);
handleAttack(player, [2, 2]);
handleAttack(ai);
handleAttack(player, [3, 2]);
handleAttack(ai);