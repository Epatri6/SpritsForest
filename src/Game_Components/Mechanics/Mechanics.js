import React from 'react';
import PlaceableMechanic from '../Placable_Mechanic/PlaceableMechanic';
import './Mechanics.css';

export default class Mechanics extends React.Component {

    render() {
        return (
            <div className='mechanics'>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'left'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'up'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'right'}}/>
                <PlaceableMechanic mechanic={{name: 'redirect', direction:'down'}}/>
            </div>
        );
    };

}