import React from 'react';
import GridSquare from '../GridSquare/GridSquare';
import GameContext from '../GameContext';
import './GameGrid.css';

export default class GameGrid extends React.Component {

    static contextType = GameContext;

    renderGrid = () => {
        const {grid} = this.context;
        return grid.map((row, outerIndex) => {
            return row.map((col, index) => {
                const location = (outerIndex * grid.length) + index
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