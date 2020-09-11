import GameUtils from './GameUtils';
//------------------------------------------Object to evaluate gameboard and track win or loss------------------------------------//

/**
 * Evaluates a square of a gameboard
 */
const evaluateSquare = (gameEval, gameBoard) => {
  const { gridSize } = gameBoard;
  const boardLength = Math.pow(gridSize, 2);
  let currSquareIndex = gameEval.currSquareIndex;
  let direction = gameEval.direction;
  let flow = gameEval.flow;

  const square = GameUtils.getGameObject(gameBoard, currSquareIndex);
  square.selected = false;
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
  direction = square.direction && !square.passed ? square.direction : direction;
  GameUtils.getGameObject(gameBoard, currSquareIndex).passed = true;
  //Determine next path
  const offset = Math.floor(currSquareIndex / gridSize);
  switch (direction) {
    case 'up':
      currSquareIndex -= gridSize;
      break;
    case 'right':
      if (currSquareIndex - offset * gridSize === gridSize - 1) {
        currSquareIndex = boardLength;
        break;
      }
      currSquareIndex++;
      break;
    case 'down':
      currSquareIndex += gridSize;
      break;
    case 'left':
      if (currSquareIndex - offset * gridSize === 0) {
        currSquareIndex = boardLength;
        break;
      }
      currSquareIndex--;
      break;
    default:
      break;
  }
  //Boundary check
  if (currSquareIndex < 0 || currSquareIndex >= boardLength) {
    return {
      ...gameEval,
      gameBoard,
      flow,
      currSquareIndex,
      direction,
      running: false,
      finished: true,
      won: flow <= 0,
    };
  }
  //Select next square
  const newSquare = GameUtils.getGameObject(gameBoard, currSquareIndex);
  newSquare.selected = true;
  return {
    ...gameEval,
    gameBoard,
    flow,
    currSquareIndex,
    direction: direction,
    displayDirection: newSquare.passed ? direction : newSquare.direction
  };
};

const initialize = () => {
  return {
    flow: 3,
    currSquareIndex: -1,
    direction: '',
    running: false,
    won: false,
    gameBoard: '',
    displayDirection: ''
  };
};

/**
 * Initializes object for evaluations
 */
const initializeEval = (gameEval, gameBoard) => {
  gameEval.flow = 3;
  gameEval.currSquareIndex = Math.floor(
    (Math.pow(gameBoard.gridSize, 2) - 1) / 2
  );
  const square = GameUtils.getGameObject(gameBoard, gameEval.currSquareIndex);
  square.selected = true;
  gameEval.direction = square.direction;
  gameEval.displayDirection = square.direction;
  gameEval.running = true;
};

/**
 * Evaluates gameboard to see if it wins or loses
 */
const evaluateBoard = (gameEval, gameBoard) => {
  //needed since gameBoard will be a state object - cannot directly edit
  gameEval = {
    ...gameEval,
  };
  gameBoard = {
    ...gameBoard,
  };
  if (!gameEval.running) {
    gameBoard = GameUtils.clearPassed(gameBoard);
    initializeEval(gameEval, gameBoard);
    gameEval.gameBoard = gameBoard;
    return gameEval;
  }
  return evaluateSquare(gameEval, gameBoard);
};

export default {
  initialize,
  evaluateBoard,
  evaluateSquare,
};
