import React from 'react';
import Mechanics from '../Mechanics/Mechanics';
import './ControlsPanel.css';
import GameControls from '../Game_Controls/GameControls';

export default class ControlsPanel extends React.Component {

    render() {
        return (
            <div className='control-panel'>
                <GameControls />
                <div className='mechanics-panel'>
                    <Mechanics />
                </div>
            </div>
        );
    };

}