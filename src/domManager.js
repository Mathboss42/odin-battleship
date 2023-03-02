const mainMenu = document.querySelector('.main-menu-container');
const game = document.querySelector('.game-container');
const playerGrid = document.querySelector('.player-board > .grid');
const aiGrid = document.querySelector('.ai-board > .grid');

let boardSize;

export function startGame(boardLength) {
    mainMenu.remove();
    game.classList.remove('hidden');
    boardSize = boardLength;
    generateGrid(boardLength, playerGrid);
    generateGrid(boardLength, aiGrid);
}

function generateGrid(boardLength, node) {
    for (let i = 1; i <= boardLength; i++) {
        for (let j = 1; j <= boardLength; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('data-x', j);
            newCell.setAttribute('data-y', i);
            node.appendChild(newCell);
        }
    }
}

export function placeShip(coords, length, direction) {
    const cells = getAllCells(coords, length, direction)
}

export function highlight(event) {
    // console.log(coords[0], coords[1])
}

export function getCoords(event) {
    return [event.target.dataset.x, event.target.dataset.y];
}

export function getAllCells(coords, length, direction) {
    if (direction === 'horizontal' && parseInt(coords[0]) + 3 > boardSize) {
        return;
    } else if (direction === 'vertical' && parseInt(coords[1]) + 3 > boardSize) {
        return;
    }
    
    const cells = [];

    for(let i = 0; i < length; i++) {
        console.log('asd')
        if (direction === 'horizontal') {
            cells.push(document.querySelector(`[data-x='${parseInt(coords[0]) + i}'][data-y='${coords[1]}']`));
        } else {
            cells.push(document.querySelector(`[data-x='${coords[0]}'][data-y='${parseInt(coords[1]) + i}']`));
        }
    }

    console.log('cells', cells);
}