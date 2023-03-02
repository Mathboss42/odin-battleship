import Player from './player';
import Gameboard from './gameboard';

test('Instantiating a player', () => {
    const player = new Player(false, false);
    const ai = new Player(true, false);
    
    expect(player.isAi).toBe(false);
    expect(player.isMyTurn).toBe(false);
    expect(ai.isAi).toBe(true);
    expect(ai.isMyTurn).toBe(false);
});

test('asd', () => {
    expect(1).toBe(1);
});

// test('attack', () => {
//     const player = new Player(false, true);
//     const board = new Gameboard(10);
//     const mockReceive = jest.fn((coords) => board.receiveAttack(coords));

//     player.attack(10, mockReceive, [4, 3]);
//     expect(mockReceive).toBeCalled();
// })