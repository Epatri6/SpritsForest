import React from 'react';
import {arrows} from '../../sprites/index';
import './PlaceableMechanic.css';
import GameContext from '../../Game_Data/GameContext';
/**
 * GUI for board altering mechanics the player can place
 */
export default class PlaceableMechanic extends React.Component {

    static contextType = GameContext;

    render() {
        const {mechanic} = this.props;
        const {setSelectedMechanic, selectedMechanic} = this.context;
        const {direction} = mechanic;
        return (
            <img 
            className={`placeable-arrow ${(selectedMechanic && selectedMechanic.name === mechanic.name && selectedMechanic.direction === mechanic.direction) ? 'selected' : ''}`} 
            onClick={() => setSelectedMechanic(mechanic)} 
            src={direction ? arrows[direction] : ''} 
            alt='' />
        );
    };

    static defaultProps = {
        mechanic: {
            name: '',
            direction: ''
        }
    };
}