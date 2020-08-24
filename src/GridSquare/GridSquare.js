import React from 'react';
import {gridSquare} from '../sprites/index';
import GameSprite from '../GameSprite';
import GameContext from '../GameContext';
import GameUtils from '../GameUtils';
import './GridSquare.css';

export default class GridSquare extends React.Component {

    static contextType = GameContext;

    renderGameState = () => {
        const {location} = this.props;
        const {grid, gridSize} = this.context;
        const row = Math.floor(location / gridSize);
        const gameObj = grid[row][location - (row * gridSize)];
        return (
            <div className='square-state'>
                {GameUtils.renderSquareState(gameObj)}
            </div>
        )
    }

    render() {
        return (
            <div className='square'>
                <GameSprite fps={0} sprites={gridSquare}/>
                {this.renderGameState()}
            </div>
        );
    }
}