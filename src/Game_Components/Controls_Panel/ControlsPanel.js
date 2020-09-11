import React, { Fragment } from 'react';
import Mechanics from '../Mechanics/Mechanics';
import './ControlsPanel.css';
import GameControls from '../Game_Controls/GameControls';
import GameContext from '../../Game_Data/GameContext';
import { spritHappySprites } from '../../sprites/index';
import GameSprite from '../Game_Sprite/GameSprite';

export default class ControlsPanel extends React.Component {
  static contextType = GameContext;

  //Renders evaluation data when it's running
  renderEval = () => {
    const { flow, direction, displayDirection } = this.context.gameEval;
    return (
      <Fragment>
        <div className="eval-panel">
          <span className="eval-row"> {`Corruption: ${flow}`}</span>
          <span className="eval-row"> {`Direction: ${displayDirection ? displayDirection : direction}`}</span>
        </div>
        <div className="eval-sprit">
          <GameSprite sprites={spritHappySprites} fps={10} />
        </div>
      </Fragment>
    );
  };

  //Renders controls when evaluation isn't running
  renderControls = () => {
    return (
      <Fragment>
        <GameControls />
        <div className="mechanics-panel">
          <Mechanics />
        </div>
      </Fragment>
    );
  };

  render() {
    const { gameEval } = this.context;
    return (
      <div className="control-panel">
        {(gameEval.running || (!gameEval.running && gameEval.finished)) &&
          this.renderEval()}
        {!gameEval.running && !gameEval.finished && this.renderControls()}
      </div>
    );
  }
}
