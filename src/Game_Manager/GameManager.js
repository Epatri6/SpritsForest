import React from 'react';
import GameGrid from '../Game_Components/GameGrid/GameGrid';
import GameContext from '../Game_Data/GameContext';
import GameBoard from '../Game_Data/GameBoard';
import GameUtils from '../Game_Data/GameUtils';
import ControlsPanel from '../Game_Components/Controls_Panel/ControlsPanel';
import './GameManager.css';

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

    /**
     * Clears selected mechanic to place
     */
    clearSelectedMechanic = (e) => {
        //don't open context menu
        e.preventDefault();
        this.setState({selectedMechanic: ''});
    }

    /**
     * Sets the mechanic to be placed on grid square click
     */
    setSelectedMechanic = (selectedMechanic) => {
        this.setState({selectedMechanic});
    }

    /**
     * Places selectedMechanic on the game board
     */
    placeMechanic = (squareIndex) => {
        const {gameBoard, selectedMechanic} = this.state;
        if(!selectedMechanic.name || GameUtils.isStart(gameBoard, squareIndex)) {
            return;
        }
        this.setState({
            gameBoard: GameUtils.updateSquare(gameBoard, squareIndex, selectedMechanic.direction),
            selectedMechanic: {name: '', direction: ''}
        })
    }

    //-----------------------------Life Cycle Methods--------------------------------------------------------//

    constructor(props) {
        super(props);
        this.state = {
            fps: 0.1,
            time: 0,
            gameBoard: GameBoard,
            selectedMechanic: {name: '', direction: ''}
        };
    }

    componentDidMount = () => {
        this.tick();
    }

    render() {
        const contextValue = {
            time: this.state.time,
            fps: this.state.fps,
            gameBoard: this.state.gameBoard,
            setSelectedMechanic: this.setSelectedMechanic,
            placeMechanic: this.placeMechanic,
            selectedMechanic: this.state.selectedMechanic
        }
        return (
            <GameContext.Provider value={contextValue}>
                <div className="game" onContextMenu={this.clearSelectedMechanic}>
                    <GameGrid />
                    <ControlsPanel />
                </div>
            </GameContext.Provider>
        )
    }
}