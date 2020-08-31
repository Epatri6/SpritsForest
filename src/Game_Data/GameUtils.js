//--------------Board construction-----------------------------------------//

/**
 * Initializes a game grid
 */
const initializeGrid = (gridSize) => {
    let grid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let k = 0; k < gridSize; k++) {
            grid[i][k] = generateSquare();
        }
    }
    const validDirections = ['up', 'right', 'down', 'left'];
    grid[3][3] = {
        name: 'start',
        direction: validDirections[Math.floor(validDirections.length * Math.random())]
    }
    return grid;
}

/**
 * Generates a random game square object
 */
const generateSquare = () => {
    const validNames = ['addFlow', 'subtractFlow', 'empty'];
    const validDirections = ['up', 'right', 'down', 'left', 'none', 'none', 'none', 'none'];
    const name = validNames[Math.floor(validNames.length * Math.random())];
    return {
        name: name,
        direction: (name === 'empty') ? '' : validDirections[Math.floor(validDirections.length * Math.random())],
        passed: false
    }
}

//------------------------Render Functions----------------------------------//
/** 
 * Renders a square based on its game square object
 */
const renderSquareState = (gameObj) => {
    let res = ''
    switch(gameObj.name) {
        case 'addFlow':
            res += '+1';
            break;
        case 'subtractFlow':
            res += '-1';
            break;
        case 'start':
            res += 'Start';
            break;
        default:
            break;
    }
    res += ' '
    switch(gameObj.direction) {
        case 'up':
            res += '\u2191';
            break;
        case 'right':
            res += '\u2192';
        break;
        case 'down':
            res += '\u2193';
        break;
        case 'left':
            res += '\u2190';
        break;
        default:
            break;
    }
    return res;
}

//-------------------------------Board Manipulation----------------------------------//

/**
 * Updates a square on the gameboard
 */
const updateSquare = (gameBoard, squareIndex, mechanic) => {
    const newBoard = {...gameBoard};
    getGameObject(newBoard, squareIndex).direction = mechanic;
    return newBoard;
}

//---------------------------Helper Functions--------------------------------------//

/**
 * Returns the gameobject from the gameboard given
 * its location
 */
const getGameObject = (gameboard, location) => {
    const {grid, gridSize} = gameboard;
    const row = Math.floor(location / gridSize);
    return grid[row][location - (row * gridSize)];
}

/**
 * Determines if a square index belongs to the start square
 */
const isStart = (gameBoard, squareIndex) => {
    return getGameObject(gameBoard, squareIndex).name === 'start';
}

export default {
    renderSquareState,
    generateSquare,
    initializeGrid,
    updateSquare,
    getGameObject,
    isStart
}