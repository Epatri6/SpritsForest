import GameUtils from './GameUtils';
//------------------------------------------Object to evaluate gameboard and track win or loss------------------------------------//

/**
 * Evaluates a square of a gameboard
 */
const evaluateSquares = (gameBoard) => {

  const {gridSize} = gameBoard;
  const boardLength = Math.pow(gridSize, 2);
  
  //Boundary check
  if(currSquare < 0 || currSquare >= boardLength) {
    return;
  }
  const square = GameUtils.getGameObject(gameBoard, currSquare);
  //Modify flow based on square
  switch (square.name) {
    case 'addFlow':
      flow++;
      break;
    case 'subtractFlow':
      flow--;
      break;
    default:
      break;
  }
  //Modify direction travel based on square
  direction = (square.direction && !square.passed ? square.direction : direction);
  GameUtils.getGameObject(gameBoard, currSquare).passed = true;
  //Determine next path
  const offset = Math.floor(currSquare / gridSize);
  switch(direction) {
    case 'up':
      currSquare -= gridSize;
      break;
    case 'right':
      if(currSquare - (offset * gridSize) === gridSize - 1) {
        currSquare = boardLength;
        break;
      }
      currSquare++;
      break;
    case 'down':
      currSquare += gridSize;
      break;
    case 'left':
      if(currSquare - (offset * gridSize) === 0) {
        currSquare = boardLength;
        break;
      }
      currSquare--;
      break;
    default:
      break;
  }
  //Keep evaluating
  return evaluateSquares(gameBoard);
};

/**
 * Initializes object for evaluations
 */
const initialize = (gameBoard) => {
  flow = 3;
  currSquare = Math.floor((Math.pow(gameBoard.gridSize, 2) - 1) / 2);
  direction = '';
};

/**
 * Evaluates gameboard to see if it wins or loses
 */
const evaluateBoard = (gameBoard) => {
  gameBoard = GameUtils.clearPassed(gameBoard);
  initialize(gameBoard);
  evaluateSquares(gameBoard);
  if(flow <= 0) {
    return true;
  }
  return false;
};

let flow = 3;
let currSquare = -1;
let direction = '';

export default {
  initialize,
  evaluateBoard,
  evaluateSquares,
  flow,
  currSquare,
  direction
}