import GameUtils from './GameUtils';
//-----------------This object represents the game board------------------------//

//Board size - it's a square
const gridSize = 7;

//Game Board
const grid = GameUtils.initializeGrid(gridSize);

export default {
    grid,
    gridSize
}