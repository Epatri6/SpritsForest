import GameUtils from './GameUtils';
//-----------------This object represents the game board------------------------//

//Board size - it's a square
const gridSize = 7;

//Game Board
const grid = GameUtils.initializeGrid(gridSize);

//How many redirects players can place
const maxRedirects = 3;

//How many redirects have been used
let redirects = 0;

export default {
    grid,
    gridSize,
    maxRedirects,
    redirects,
};