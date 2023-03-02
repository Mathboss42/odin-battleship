const mainMenu = document.querySelector('.main-menu-container');
const game = document.querySelector('.game-container');
const playerGrid = document.querySelector('.player-board > .grid');
const aiGrid = document.querySelector('.ai-board > .grid');

export function startGame(boardLength) {
    mainMenu.remove();
    game.classList.remove('hidden');
    generateGrid(boardLength, playerGrid);
    generateGrid(boardLength, aiGrid);
}

function generateGrid(boardLength, node) {
    for (let i = 1; i <= boardLength; i++) {
        for (let j = 1; j <= boardLength; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('data-coords', [j, i]);
            node.appendChild(newCell);
        }
    }
}