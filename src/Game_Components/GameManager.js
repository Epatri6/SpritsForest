import React from 'react';
import GameGrid from './GameGrid/GameGrid';
import GameContext from '../Game_Data/GameContext';
import GameBoard from '../Game_Data/GameBoard';

export default class GameManager extends React.Component {

    //----------------------------------Game Logic-------------------------------------------------------//

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
        this.state = {
            fps: 30,
            time: 0,
            gameBoard: GameBoard
        };
    }

    componentDidMount = () => {
        this.tick();
    }

    render() {
        const contextValue = {
            time: this.state.time,
            fps: this.state.fps,
            gameBoard: this.state.gameBoard
        }
        return (
            <GameContext.Provider value={contextValue}>
                <GameGrid />
            </GameContext.Provider>
        )
    }
}