import * as game from './game';
import Player from './player';
import Gameboard from './gameboard';


test('handleAttack', () => {
    const player = new Player(false, true);
    const board = new Gameboard(10);
    const mockAttack = jest.fn((a, b, c) => player.attack(a, b, c));

    game.handleAttack(player, [4, 3], mockAttack);
    expect(mockAttack).toBeCalled();
});