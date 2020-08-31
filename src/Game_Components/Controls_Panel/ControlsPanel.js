import React from 'react';
import Mechanics from '../Mechanics/Mechanics';
import './ControlsPanel.css';

export default class ControlsPanel extends React.Component {

    render() {
        return (
            <div className='control-panel'>
                <div className='game-controls-panel'>Temp Placeholder</div>
                <div className='mechanics-panel'>
                    <Mechanics />
                </div>
            </div>
        );
    };

}