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
    const direction = validDirections[Math.floor(validDirections.length * Math.random())]
    grid[3][3] = {
        name: 'start',
        direction: direction,
        originalDirection: direction,
        passed: false,
        mechanicPlaced: false,
    }
    return grid;
}

/**
 * Generates a random game square object
 */
const generateSquare = () => {
    const validNames = ['addFlow', 'subtractFlow', 'empty'];
    const validDirections = ['up', 'right', 'down', 'left', '', '', '', ''];
    const name = validNames[Math.floor(validNames.length * Math.random())];
    const square = {
        name: name,
        direction: (name === 'empty') ? '' : validDirections[Math.floor(validDirections.length * Math.random())],
        passed: false,
        mechanicPlaced: false,
    }
    square.originalDirection = square.direction;
    return square;
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
    const newBoard = redirect(gameBoard, squareIndex);
    if(!newBoard) {
        return gameBoard;
    }
    const square = getGameObject(newBoard, squareIndex);
    square.direction = mechanic;
    square.mechanicPlaced = true;
    return newBoard;
}

//Use a redirect
const redirect = (gameBoard, squareIndex) => {
    const square = getGameObject(gameBoard, squareIndex);
    if(!square.mechanicPlaced && gameBoard.maxRedirects - gameBoard.redirects <= 0) {
        return;
    }
    const board = {
        ...gameBoard,
        redirects: (square.mechanicPlaced ? gameBoard.redirects : gameBoard.redirects + 1)
    }
    return board;
}

/**
 * Resets a board to its initial state
 */
const resetBoard = (gameBoard) => {
    const newBoard = {
        ...gameBoard,
        redirects: 0
    };
    for(let i = 0; i < Math.pow(newBoard.gridSize, 2); i++) {
        const square = getGameObject(newBoard, i);
        square.passed = false;
        square.selected = false;
        square.mechanicPlaced = false;
        square.direction = square.originalDirection;
    }
    return newBoard;
}

/**
 * Clears all passed tags on squares
 */
const clearPassed = (gameBoard) => {
    const newBoard = {
        ...gameBoard,
        redirects: 0
    };
    for(let i = 0; i < Math.pow(newBoard.gridSize, 2); i++) {
        const square = getGameObject(newBoard, i);
        square.passed = false;
        square.selected = false;
    }
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
    isStart,
    resetBoard,
    redirect,
    clearPassed
}