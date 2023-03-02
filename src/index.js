import css from "./css/styles.css";
import * as game from './game';
import * as domManager from './domManager';
import { generateCoords } from "./coordsGenerator";

const boardLength = 10;

const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');

function handleStartGame() {
    console.log('handle start')
    game.startGame();
    domManager.startGame(boardLength);
    playerGridCells.forEach(el => {
        el.addEventListener('click', placeShip);
    });
}
window.handleStartGame = handleStartGame;

function placeShip(coords) {
    console.log('placeShip')
}