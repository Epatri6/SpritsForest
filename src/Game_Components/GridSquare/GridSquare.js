import React from 'react';
import {gridSquare} from '../../sprites/index';
import GameSprite from '../GameSprite';
import GameContext from '../../Game_Data/GameContext';
import GameUtils from '../../Game_Data/GameUtils';
import './GridSquare.css';

export default class GridSquare extends React.Component {

    static contextType = GameContext;

    renderGameState = () => {
        const {location} = this.props;
        const gameObj = GameUtils.getGameObject(this.context.gameBoard, location);
        return (
            <div className='square-state'>
                {GameUtils.renderSquareState(gameObj)}
            </div>
        )
    }

    render() {
        const {placeMechanic} = this.context;
        const {location} = this.props;
        return (
            <div className='square' onClick={() => placeMechanic(location)}>
                <GameSprite fps={0} sprites={gridSquare}/>
                {this.renderGameState()}
            </div>
        );
    }
}