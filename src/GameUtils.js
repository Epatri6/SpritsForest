/**
 * Initializes a game grid
 */
const initializeGrid = (gridSize) => {
    let grid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let k = 0; k < gridSize; k++) {
            grid[i][k] = GameUtils.generateSquare();
        }
    }
    const validDirections = ['Up', 'Right', 'Down', 'Left'];
    grid[3][3] = {
        name: 'Start',
        direction: validDirections[Math.floor(validDirections.length * Math.random())]
    }
    return grid;
}

/**
 * Generates a random game square object
 */
const generateSquare = () => {
    const validNames = ['AddFlow', 'SubtractFlow', 'Empty'];
    const validDirections = ['Up', 'Right', 'Down', 'Left', 'None', 'None', 'None', 'None'];
    const name = validNames[Math.floor(validNames.length * Math.random())];
    return {
        name: name,
        direction: (name === 'Empty') ? '' : validDirections[Math.floor(validDirections.length * Math.random())],
        passed: false
    }
}

/** 
 * Renders a square based on its game square object
 */
const renderSquareState = (gameObj) => {
    let res = ''
    switch(gameObj.name) {
        case 'AddFlow':
            res += '+1';
            break;
        case 'SubtractFlow':
            res += '-1';
            break;
        case 'Start':
            res += 'Start';
            break;
        default:
            break;
    }
    res += ' '
    switch(gameObj.direction) {
        case 'Up':
            res += '\u2191';
            break;
        case 'Right':
            res += '\u2192';
        break;
        case 'Down':
            res += '\u2193';
        break;
        case 'Left':
            res += '\u2190';
        break;
        default:
            break;
    }
    return res;
}

export default {
    renderSquareState,
    generateSquare,
    initializeGrid
}