import React, { Fragment } from 'react';
import GameGrid from '../Game_Components/GameGrid/GameGrid';
import GameContext from '../Game_Data/GameContext';
import GameBoard from '../Game_Data/GameBoard';
import GameUtils from '../Game_Data/GameUtils';
import GameEvaluation from '../Game_Data/GameEvaluation';
import ControlsPanel from '../Game_Components/Controls_Panel/ControlsPanel';
import UserContext from '../Contexts/UserContext';
import LevelApiService from '../Services/level-api-service';
import PopUpScreen from '../Game_Components/Pop_Up_Screen/PopUpScreen';
import './GameManager.css';
import {
  spritWaveSprites,
  spritSadSprites,
  spritHappySprites,
} from '../sprites/index';

export default class GameManager extends React.Component {
  static contextType = UserContext;

  //----------------------------------Game Logic-------------------------------------------------------//

  /**
   * Wait for a bit, then update game state
   */
  tick = () => {
    return setTimeout(this.update, 1000 / this.state.fps);
  };

  /**
   * Update game state
   */
  update = () => {
    const { fps, time } = this.state;
    this.setState({
      time: time + 1 / fps,
      tick: this.tick(),
    });
  };

  /**
   * Clears selected mechanic to place
   */
  clearSelectedMechanic = (e) => {
    //don't open context menu
    e.preventDefault();
    this.setState({ selectedMechanic: '' });
  };

  /**
   * Sets the mechanic to be placed on grid square click
   */
  setSelectedMechanic = (selectedMechanic) => {
    this.setState({ selectedMechanic });
  };

  /**
   * Places selectedMechanic on the game board
   */
  placeMechanic = (squareIndex) => {
    const { gameBoard, selectedMechanic } = this.state;
    if (!selectedMechanic.name || GameUtils.isStart(gameBoard, squareIndex)) {
      return;
    }
    this.setState({
      gameBoard: GameUtils.updateSquare(
        gameBoard,
        squareIndex,
        selectedMechanic.direction
      ),
      selectedMechanic: { name: '', direction: '' },
    });
  };

  /**
   * Evaluate the gameboard
   */
  evaluateBoard = () => {
    const { gameBoard } = this.state;
    const {updateScore} = this.context;
    if (GameEvaluation.evaluateBoard(gameBoard)) {
      this.createWinPopUp();
      updateScore(1);
    } else {
      this.createLosePopUp();
    }
  };

  /**
   * Resets the gameboard
   */
  resetBoard = () => {
    const { gameBoard } = this.state;
    this.setState({
      gameBoard: GameUtils.resetBoard(gameBoard),
    });
  };

  /**
   * Parses a gameboard from a json string
   */
  parseBoard = (board) => {
    return JSON.parse(board);
  };

  /**
   * Converts a gameboard to a string
   */
  parseBoardString = (board) => {
    return `${JSON.stringify(board)}`;
  };

  //-----------------------------Load/Save game data-------------------------------------------------------//

  loadLevel = () => {
    this.context
      .loadLevel()
      .then((res) => {
        if (!res.savegame) {
          this.createError('No save game available!');
          return;
        }
        this.setState({
          gameBoard: this.parseBoard(res.savegame),
        });
        this.createIOPopUp('Game Loaded!');
      })
      .catch((res) => {
        const message = res.message ? res.message : res.error ? res.error : res;
        this.createError(message);
      });
  };

  saveLevel = () => {
    this.context
      .saveLevel(this.parseBoardString(this.state.gameBoard))
      .then(() => {
        this.createIOPopUp('Game Saved!');
      })
      .catch((res) => {
        const message = res.message ? res.message : res.error ? res.error : res;
        this.createError(message);
      });
  };

  loadNewLevel = () => {
    LevelApiService.getLevel()
      .then((res) => {
        this.setState({ gameBoard: this.parseBoard(res.level), popUp: null });
      })
      .catch((res) => {
        const message = res.message ? res.message : res.error ? res.error : res;
        this.createError(message);
      });
  };

  retryLevel = () => {
    this.resetBoard();
    this.setState({ popUp: null });
  };

  //--------------------------------------Helpers---------------------------------------------------------//

  //Creates error popUp window
  createError = (message) => {
    this.setState({
      popUp: (
        <PopUpScreen message={message} sprites={spritSadSprites} fps={10}>
          <button className="pop-up-button" onClick={(e) => this.closePopUp(e)}>
            OK =(
          </button>
        </PopUpScreen>
      ),
    });
  };

  //Creates winning popUp window
  createWinPopUp = () => {
    this.setState({
      popUp: (
        <PopUpScreen message={'You win!'} sprites={spritHappySprites} fps={10}>
          <button
            className="pop-up-button"
            onClick={(e) => this.loadNewLevel(e)}
          >
            New Game!
          </button>
        </PopUpScreen>
      ),
    });
  };

  //Creates losing popUp window
  createLosePopUp = () => {
    this.setState({
      popUp: (
        <PopUpScreen message={'You Lose!'} sprites={spritSadSprites} fps={10}>
          <button
            className="pop-up-button"
            onClick={(e) => this.loadNewLevel(e)}
          >
            New Game!
          </button>
          <button className="pop-up-button" onClick={(e) => this.retryLevel(e)}>
            Try Again!
          </button>
        </PopUpScreen>
      ),
    });
  };

  //Creates an I/O popUp window
  createIOPopUp = (message) => {
    this.setState({
      popUp: (
        <PopUpScreen message={message} sprites={spritWaveSprites} fps={10}>
          <button className="pop-up-button" onClick={(e) => this.closePopUp(e)}>
            OK!
          </button>
        </PopUpScreen>
      ),
    });
  };

  //Closes popUp windows
  closePopUp = (e) => {
    e.preventDefault();
    this.setState({ popUp: null });
  };

  //-----------------------------Life Cycle Methods--------------------------------------------------------//

  constructor(props) {
    super(props);
    this.state = {
      fps: 30,
      time: 0,
      gameBoard: GameBoard,
      selectedMechanic: { name: '', direction: '' },
      tick: '',
      popUp: null,
    };
  }

  componentDidMount = () => {
    this.setState({ tick: this.tick() });
    this.loadNewLevel();
  };

  componentWillUnmount = () => {
    clearTimeout(this.state.tick);
  };

  //Renders popUps
  renderPopUp = () => {
    const { popUp } = this.state;
    if (popUp) {
      return popUp;
    }
    return '';
  };

  //Renders game
  renderGame = () => {
    const { popUp } = this.state;
    if (!popUp) {
      return (
        <Fragment>
          <GameGrid />
          <ControlsPanel />
        </Fragment>
      );
    }
  };

  render() {
    const contextValue = {
      time: this.state.time,
      fps: this.state.fps,
      gameBoard: this.state.gameBoard,
      setSelectedMechanic: this.setSelectedMechanic,
      placeMechanic: this.placeMechanic,
      selectedMechanic: this.state.selectedMechanic,
      evaluateBoard: this.evaluateBoard,
      resetBoard: this.resetBoard,
      loadLevel: this.loadLevel,
      saveLevel: this.saveLevel,
    };
    return (
      <GameContext.Provider value={contextValue}>
        <div className="game" onContextMenu={this.clearSelectedMechanic}>
          {this.renderPopUp()}
          {this.renderGame()}
        </div>
      </GameContext.Provider>
    );
  }
}
