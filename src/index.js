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
    const coords = domManager.getCoords(e);

    if (game.getCurrentPhase() === 'ship placement') {

        const placeShip = game.handlePlaceShip(coords, String(lastId), getNextShipLength(), direction);

        if (placeShip === 1) {
            domManager.placeShip(coords, getNextShipLength(), direction);
            lastId++;

            if (lastId > 9) {
                game.setNextPhase();
                domManager.displayNextPhase('game');
                handleNextPhase(game.getCurrentPhase());
            }
        } else {
            return;
        }
    } else if (game.getCurrentPhase() === 'game') {
        // console.log('attack');
        const playerAttack = game.handleAttack(game.getCurrentPlayer(), coords);
        console.log(playerAttack);
        if (playerAttack === 2) {
            domManager.colorHit(e.target);
        } else if (playerAttack === 1) {
            domManager.colorMiss(e.target);
        } else if (playerAttack === 3) {
            domManager.colorHit(e.target);
            handleNextPhase('win', 'Player');
            game.setNextPhase();
            domManager.displayNextPhase('win', 'Player');
        } else {
            console.log('attack failed');
            return;
        }

        if (playerAttack === 1 || playerAttack === 2) {
            
            const aiGridCells = document.querySelectorAll('.ai-board > .grid > .cell');
            aiGridCells.forEach(el => {
                el.removeEventListener('click', handleClick);
            });

            setTimeout(() => {
                const aiAttack = game.handleAttack(game.getCurrentPlayer());

                if (aiAttack[0] === 2) {
                    const cell = domManager.getSingleCell(aiAttack[1]);
                    domManager.colorHit(cell);
                    aiGridCells.forEach(el => {
                        el.addEventListener('click', handleClick);
                    });
                } else if (aiAttack[0] === 1){
                    const cell = domManager.getSingleCell(aiAttack[1]);
                    domManager.colorMiss(cell);
                    aiGridCells.forEach(el => {
                        el.addEventListener('click', handleClick);
                    });
                } else if (aiAttack[0] === 3) {
                    console.log('ai win');
                    // domManager.colorLastPlayerCell();
                    handleNextPhase('win');
                    // game.setNextPhase();
                    domManager.displayNextPhase('win', 'AI');
                    const cell = domManager.getSingleCell(aiAttack[1]);
                    domManager.colorMiss(cell);
                } else {
                    aiGridCells.forEach(el => {
                        el.addEventListener('click', handleClick);
                    });
                    console.log('AI attack failed');
                    return;
                }
            }, 500);
        }
        
    }
}

function handleNextPhase(phase) {
    const aiGridCells = document.querySelectorAll('.ai-board > .grid > .cell');
    const playerGridCells = document.querySelectorAll('.player-board > .grid > .cell');
    
    switch (phase) {
        case 'game':
            playerGridCells.forEach(el => {
                el.removeEventListener('mouseover', handleMouseOver);
                el.removeEventListener('click', handleClick);
            });
            
            aiGridCells.forEach(el => {
                el.addEventListener('mouseover', handleMouseOver);
                el.addEventListener('click', handleClick);
            });

            document.removeEventListener('keydown', switchDirection);
            break;

        case 'win':
            aiGridCells.forEach(el => {
                el.removeEventListener('mouseover', handleMouseOver);
                el.removeEventListener('click', handleClick);
            });
    }
        

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