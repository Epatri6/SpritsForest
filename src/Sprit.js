import React from 'react';
import {spritSprites} from './sprites/index';
import GameSprite from './GameSprite';

export default class Sprit extends React.Component {

    render() {
        return (
            <GameSprite fps={10} sprites={spritSprites}/>
        )
    }

}