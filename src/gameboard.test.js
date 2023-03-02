import Gameboard from './gameboard';
import Ship from './ship';

test('Instantiating a gameboard', () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.length).toBe(10);
    expect(gameboard.occupiedTiles).toEqual([]);
    expect(gameboard.placedShips).toEqual([]);
});

// test('Place a ship', () => {
//     const gameboard = new Gameboard(10);

//     gameboard.placeShip([4, 1], 'qwe', 4, 'horizontal');
//     expect(gameboard.occupiedTiles).toContainEqual([4, 1, 'qwe'], [5, 1, 'qwe'], [6, 1, 'qwe'], [7, 1, 'qwe']);
//     expect(gameboard.placedShips).toContainEqual({id: 'qwe', ship: {hits: 0, length: 4, sunk: false}});

//     gameboard.placeShip([4, 3], 'galley', 4, 'horizontal');
//     expect(gameboard.occupiedTiles).toContainEqual([4, 3, 'galley'], [5, 3, 'galley'], [6, 3, 'galley'], [7, 3, 'galley']);
//     expect(gameboard.placedShips).toContainEqual({id: 'galley', ship: {hits: 0, length: 4, sunk: false}});
    
//     expect(() => gameboard.placeShip([8, 3], 'galley', 4, 'horizontal')).toBe(undefined);
    
//     gameboard.placeShip([4, 3], 'asd', 4, 'vertical');
//     expect(gameboard.occupiedTiles).toContainEqual([4, 3, 'asd'], [4, 4, 'asd'], [4, 5, 'asd'], [4, 6, 'asd']);
//     expect(gameboard.placedShips).toContainEqual({id: 'asd', ship: {hits: 0, length: 4, sunk: false}});

//     expect(() => gameboard.placeShip([4, 7], 'galley', 4, 'vertical')).toBe(undefined);
// });

// test('Receive an attack', () => {
//     const gameboard = new Gameboard(10);
//     gameboard.placeShip([4, 3], '1', 4, 'horizontal');

//     expect(gameboard.receiveAttack([4, 2])).toBe(undefined);
//     expect(gameboard.firedTiles).toContainEqual([4, 2]);
//     expect(gameboard.sunkShips).toBe(0);

//     gameboard.receiveAttack([4, 3]);
//     expect(gameboard.placedShips).toContainEqual({id: '1', ship: {hits: 1, length: 4, sunk: false}});
//     expect(gameboard.hitTiles).toContainEqual([4, 3]);
//     expect(gameboard.sunkShips).toBe(0);
    
//     expect(() => gameboard.receiveAttack([4, 3])).toBe(undefined);
//     expect(gameboard.sunkShips).toBe(0);
    
//     gameboard.receiveAttack([5, 3]);
//     expect(gameboard.placedShips).toContainEqual({id: '1', ship: {hits: 2, length: 4, sunk: false}});
//     expect(gameboard.hitTiles).toContainEqual([5, 3]);
//     expect(gameboard.sunkShips).toBe(0);
    
//     gameboard.receiveAttack([6, 3]);
//     expect(gameboard.placedShips).toContainEqual({id: '1', ship: {hits: 3, length: 4, sunk: false}});
//     expect(gameboard.hitTiles).toContainEqual([6, 3]);
//     expect(gameboard.sunkShips).toBe(0);
    
//     gameboard.receiveAttack([7, 3]);
//     expect(gameboard.placedShips).toContainEqual({id: '1', ship: {hits: 4, length: 4, sunk: true}});
//     expect(gameboard.hitTiles).toContainEqual([7, 3]);
//     expect(gameboard.sunkShips).toBe(1);

    
// });