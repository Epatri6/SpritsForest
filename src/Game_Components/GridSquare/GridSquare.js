import React from 'react';
import { gridSquare } from '../../sprites/index';
import {gridSquareSelected} from '../../sprites/index';
import GameSprite from '../Game_Sprite/GameSprite';
import GameContext from '../../Game_Data/GameContext';
import GameUtils from '../../Game_Data/GameUtils';
import './GridSquare.css';

export default class GridSquare extends React.Component {
  static contextType = GameContext;

  render() {
    const { placeMechanic } = this.context;
    const { location } = this.props;
    const gameObj = GameUtils.getGameObject(this.context.gameBoard, location);
    return (
      <div className="square" onClick={() => placeMechanic(location)}>
        <GameSprite fps={0} sprites={gameObj.selected ? gridSquareSelected : gridSquare} />
        <div
          className={`square-state ${
            gameObj.selected ? 'selected-square' : ''
          }`}
        >
          {GameUtils.renderSquareState(gameObj)}
        </div>
      </div>
    );
  }
}
