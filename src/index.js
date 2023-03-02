import css from "./css/styles.css";
import * as game from './game';
import * as domManager from './domManager';
import { generateCoords } from "./coordsGenerator";

const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');

const boardLength = 10;

const eventMouseOver = new Event('mouseover');
const eventMouseLeave = new Event('mouseleave');

let hoveringCell;

let lastId = 0;

let direction = 'horizontal';


function handleStartGame() {
    console.log('handle start')
    game.startGame();
    domManager.startGame(boardLength);
    const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');
    playerGridCells.forEach(el => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('click', handleClick);
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyR') {
            hoveringCell.dispatchEvent(eventMouseLeave);
            direction === 'horizontal' ? direction = 'vertical' : direction = 'horizontal';
            hoveringCell.dispatchEvent(eventMouseOver);
        };
    });
}
window.handleStartGame = handleStartGame;


function handleMouseOver(e) {
    const coords = domManager.getCoords(e);
    domManager.highlight(coords, getNextShipLength(), direction);
    hoveringCell = e.target;
    console.log('hoveringCell', hoveringCell)
}

function handleMouseLeave(e) {
    console.log('handlemouseevent', e.target)
    const coords = domManager.getCoords(e);
    domManager.unHighlight(coords, getNextShipLength(), direction);
}

function handleClick(e) {
    if (game.getCurrentPhase() === 'ship placement') {
        const coords = domManager.getCoords(e);
        console.log(coords);
        // game.handlePlaceShip(coords, String(lastId), getNextShipLength(), direction);
        domManager.placeShip(coords, getNextShipLength(), direction);
    } else {
        return;
    }
}

function getNextShipLength() {
    switch (lastId) {
        case 0 :
            return 4;
        case 1 :
        case 2 :
            return 3;
        case 3 :
        case 4 :
        case 5 :
            return 2;
        case 6 :
        case 7 :
        case 8 :
        case 9 :
            return 1;
    }
    lastId++;
}