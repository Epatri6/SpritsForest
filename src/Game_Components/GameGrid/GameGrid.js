import React from 'react';
import GridSquare from '../GridSquare/GridSquare';
import GameContext from '../../Game_Data/GameContext';
import './GameGrid.css';

export default class GameGrid extends React.Component {

    static contextType = GameContext;

    renderGrid = () => {
        const {grid, gridSize} = this.context.gameBoard;
        if (!grid) {
            return '';
        }
        return grid.map((row, outerIndex) => {
            return row.map((col, index) => {
                const location = (outerIndex * gridSize) + index
                return <GridSquare key={location} location={location}/>
            })
        });
    }

    render() {
        return (
            <div className='game-grid'>
                {this.renderGrid()}
            </div>
        );
    };
}