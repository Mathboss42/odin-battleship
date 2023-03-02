export function generateCoords(boardLength) {
    console.log('generatecoords');
    return [Math.floor(Math.random() * (boardLength - 1) + 1), Math.floor(Math.random() * (boardLength - 1) + 1)];
}