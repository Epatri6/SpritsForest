import React from 'react';
import GameGrid from './GameGrid/GameGrid';
import GameContext from './GameContext';
import GameUtils from './GameUtils';

export default class GameManager extends React.Component {

    //----------------------------------Game Logic-------------------------------------------------------//
    
    /**
     * Sets up the game board
     */
    initializeGrid = () => {
        const gridSize = 7;
        this.setState({
            fps: 30,
            time: 0,
            gridSize: gridSize,
            grid: GameUtils.initializeGrid(gridSize)
        });
    }

    /**
     * Wait for a bit, then update game state
     */
    tick = () => {
        setTimeout(this.update, 1000 / this.state.fps);
    }

    /**
     * Update game state
     */
    update = () => {
        const {fps, time} = this.state;
        this.setState({time: time + (1 / fps)});
        this.tick();
    }

    //-----------------------------Life Cycle Methods--------------------------------------------------------//

    constructor(props) {
        super(props);
        this.initializeGrid();
    }

    componentDidMount = () => {
        this.tick();
    }

    render() {
        const contextValue = {
            time: this.state.time,
            fps: this.state.fps,
            gridSize: this.state.gridSize,
            grid: this.state.grid
        }
        return (
            <GameContext.Provider value={contextValue}>
                <GameGrid />
            </GameContext.Provider>
        )
    }
}