import Gameboard from './gameboard'
import Ship from './ship';

test('Instantiating a gameboard', () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.length).toBe(10);
    expect(gameboard.board).to
})

test('Place a ship', () => {
    const gameboard = new Gameboard(10);

    gameboard.placeShip([4, 3], 'galley', 4, 'horizontal')
    expect(gameboard.occupiedTiles).toContainEqual([4, 3, 'galley'], [5, 3, 'galley'], [6, 3, 'galley'], [7, 3, 'galley']);
    expect(gameboard.placedShips).toContainEqual({id: 'galley', ship: {hits: 0, length: 4, sunk: false}});
    
    expect(() => gameboard.placeShip([8, 3], 'galley', 4, 'horizontal')).toThrow(Error);
    
    gameboard.placeShip([4, 3], 'asd', 4, 'vertical')
    expect(gameboard.occupiedTiles).toContainEqual([4, 3, 'asd'], [4, 4, 'asd'], [4, 5, 'asd'], [4, 6, 'asd']);
    expect(gameboard.placedShips).toContainEqual({id: 'asd', ship: {hits: 0, length: 4, sunk: false}});

    expect(() => gameboard.placeShip([4, 7], 'galley', 4, 'vertical')).toThrow(Error);
})