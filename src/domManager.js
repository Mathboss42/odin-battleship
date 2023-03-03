const mainMenu = document.querySelector('.main-menu-container');
const game = document.querySelector('.game-container');
const playerGrid = document.querySelector('.player-board > .grid');
const aiGrid = document.querySelector('.ai-board > .grid');
const phaseDispay = document.querySelector('.phase-display');

let boardSize;

export function startGame(boardLength) {
    mainMenu.remove();
    game.classList.remove('hidden');
    phaseDispay.innerHTML = '<h2>Place your ships!</h2>'
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
    const cells = getAllCells(coords, length, direction);

    cells.forEach(el => {
        el.classList.add('occupied');
    });
}

export function highlight(coords, length, direction) {
    const cells = getAllCells(coords, length, direction);
    
    cells.forEach(el => {
        el.classList.add('highlighted');
    });
}

export function clearHighlighted() {
    const cells = document.querySelectorAll('.highlighted');

    cells.forEach(el => {
        el.classList.remove('highlighted');
    });
}

export function getCoords(event) {
    return [parseInt(event.target.dataset.x), parseInt(event.target.dataset.y)];
}

export function getAllCells(coords, length, direction) {
    if (direction === 'horizontal' && coords[0] + length-1 > boardSize) {
        return;
    } else if (direction === 'vertical' && coords[1] + length-1 > boardSize) {
        return;
    }
    
    const cells = [];

    for(let i = 0; i < length; i++) {
        if (direction === 'horizontal') {
            cells.push(document.querySelector(`[data-x='${coords[0] + i}'][data-y='${coords[1]}']`));
        } else {
            cells.push(document.querySelector(`[data-x='${coords[0]}'][data-y='${coords[1] + i}']`));
        }
    }

    return cells;
}

export function getSingleCell(coords, isAiBoard = false) {
    let cell;
    
    if (isAiBoard) {
        cell = document.querySelector(`.ai-board > .grid > [data-x='${coords[0]}'][data-y='${coords[1]}']`);
    } else {
        cell = document.querySelector(`.player-board > .grid > [data-x='${coords[0]}'][data-y='${coords[1]}']`);
    }

    return cell;
}

export function isAvailable(coords, length, direction) {
    const cells = getAllCells(coords, length, direction);

    cells.forEach(el => {

    });
}

export function highlightAttack(cell) {
    cell.classList.add('highlighted');
}

export function colorMiss(cell) {
    cell.classList.add('miss');
}   

export function colorHit(cell) {
    cell.classList.add('hit');
}   