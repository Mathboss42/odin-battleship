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
    game.startGame();
    domManager.startGame(boardLength);
    const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');
    playerGridCells.forEach(el => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('click', handleClick);
    });
    document.addEventListener('keydown', switchDirection);
}
window.handleStartGame = handleStartGame;


function handleMouseOver(e) {
    if (game.getCurrentPhase() === 'ship placement') {
        domManager.clearHighlighted();
        const coords = domManager.getCoords(e);
        domManager.highlight(coords, getNextShipLength(), direction);
        hoveringCell = e.target;
    } else if (game.getCurrentPhase() === 'game') {
        domManager.clearHighlighted();
        domManager.highlightAttack(e.target);
    }
}

function handleMouseLeave(e) {
    domManager.clearHighlighted();
}

function handleClick(e) {
    if (game.getCurrentPhase() === 'ship placement') {
        const coords = domManager.getCoords(e);

        const placeShip = game.handlePlaceShip(coords, String(lastId), getNextShipLength(), direction);

        if (placeShip === 1) {
            domManager.placeShip(coords, getNextShipLength(), direction);
            lastId++;

            if (lastId > 9) {
                game.setNextPhase();
                handleNextPhase();
            }
        } else {
            return;
        }
    } else if (game.getCurrentPhase() === 'game') {
        console.log('attack');
    }
}

function handleNextPhase() {
    const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');
    playerGridCells.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
    });
    
    const aiGridCells = document.querySelectorAll('.ai-board > .grid > .cell');
    aiGridCells.forEach(el => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('click', handleClick);
    });

    document.removeEventListener('keydown', switchDirection);
} 

function switchDirection(e) {
    if (e.code === 'KeyR') {
        direction === 'horizontal' ? direction = 'vertical' : direction = 'horizontal';
        hoveringCell.dispatchEvent(eventMouseOver);
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
}