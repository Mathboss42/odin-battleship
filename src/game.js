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

// let lastId = 0; 

export function startGame() {
    player = new Player(false, true);
    ai = new Player(true, false);
    playerBoard = new Gameboard(boardLength, false);
    aiBoard = new Gameboard(boardLength, true);
    currentPlayer = player;
    currentPhase = 'ship placement'
    console.log(player, ai, playerBoard, aiBoard, currentPlayer, currentPhase)
    handleAiPlaceShip();
}

function endGame(winner) {
    return;
}

export function handleAttack(entity, coords = []) {
    console.log('handle attack', entity.isAi)
    const targetBoard = getTargetBoard(entity);
    console.log(targetBoard);
    const attack = entity.attack(boardLength, targetBoard, coords);
    console.log('attack return value', attack);
    if (!attack) {
        console.log('returned')
        return;
    }
    if (targetBoard.negScore === targetBoard.placedShips.length) {
        endGame(entity);
    }
    switchTurns();

    return attack;
}

function switchTurns() {
    console.log('switch turns')
    player.isMyTurn = !player.isMyTurn; 
    ai.isMyTurn = !ai.isMyTurn; 

    currentPlayer === player ? currentPlayer = ai : currentPlayer = player;

    // if (currentPlayer === ai) {
    //     handleAttack(ai);
    // } 
}

export function handlePlaceShip(coords, id, length, direction) {
    if (playerBoard.placedShips.length < numberOfShips) {
        return playerBoard.placeShip(coords, id, length, direction);
        console.log(playerBoard);
    } else {
        return;
    }
}

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

export function setNextPhase() {
    switch (currentPhase) {
        case 'ship placement':
            currentPhase = 'game';
            break;
        case 'game':
            currentPhase = 'game over';
            break;
    }
}

export function getCurrentPlayer() {
    return currentPlayer;
}
