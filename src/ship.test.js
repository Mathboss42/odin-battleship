import Ship from './ship'

test('Instantiating a ship', () => {
    const ship = new Ship(4, 0, false);
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
})

test('hit() increments ships hitcount', () => {
    const ship = new Ship(4, 0, false);
    ship.hit();
    expect(ship.hits).toBe(1);
})

test('isSunk() returns isSunk property', () =>{
    const ship1 = new Ship(4, 0, false);
    expect(ship1.isSunk()).toBe(false);
    const ship2 = new Ship(4, 4, true);
    expect(ship2.isSunk()).toBe(true);
})