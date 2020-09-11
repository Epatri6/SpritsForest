import React from 'react';
import PlaceableMechanic from '../Placable_Mechanic/PlaceableMechanic';
import './Mechanics.css';
import GameContext from '../../Game_Data/GameContext';

export default class Mechanics extends React.Component {

    static contextType = GameContext;

    render() {
        const {gameBoard} = this.context;
        return (
            <div className='mechanics'>
                <span className='redirects'>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'left'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'up'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'right'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'down'}}/>
                </span>
                Redirects left: {gameBoard.maxRedirects - gameBoard.redirects}
            </div>
        );
    };

}