import React from 'react';
import Mechanics from '../Mechanics/Mechanics';
import './ControlsPanel.css';
import GameContext from '../../Game_Data/GameContext'

export default class ControlsPanel extends React.Component {

    static contextType = GameContext;

    render() {
        const {won, evaluateBoard} = this.context;
        return (
            <div className='control-panel'>
                <div className='game-controls-panel'>
                    <button onClick={evaluateBoard}>Evaluate Board</button>
                    won = {`${won}`}
                </div>
                <div className='mechanics-panel'>
                    <Mechanics />
                </div>
            </div>
        );
    };

}