import css from "./styles.css";
import * as game from './game';
import { generateCoords } from "./coordsGenerator";

document.addEventListener('click', () => {
    game.handlePlaceShip(generateCoords(), game.getRandomDirection());
})

// game.player.attack(10, [4, 3]);