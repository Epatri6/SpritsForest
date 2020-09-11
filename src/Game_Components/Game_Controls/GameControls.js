import React from 'react';
import GameContext from '../../Game_Data/GameContext';
import './GameControls.css';
import {spritHappySprites} from '../../sprites/index';
import GameSprite from '../Game_Sprite/GameSprite';

export default class GameControls extends React.Component {
  static contextType = GameContext;

  render() {
    const {evaluateBoard, resetBoard, saveLevel, loadLevel} = this.context;
    return (
      <div className="game-controls-panel">
        <button onClick={evaluateBoard}>Evaluate Board</button>
        <button onClick={resetBoard}>Reset Board</button>
        <button onClick={saveLevel}>Save Game</button>
        <button onClick={loadLevel}>Load Game</button>
        <GameSprite sprites={spritHappySprites} fps={10}/>
      </div>
    );
  }
}
