import React from 'react';
import GameContext from './GameContext';

export default class GameSprite extends React.Component {

    static contextType = GameContext;

    renderSprite = () => {
        const {time} = this.context;
        const {fps, sprites} = this.props;
        return <img src={sprites[Math.floor(fps * time % sprites.length)]} alt=''/>
    }

    render = () => {
        return (
            <>
                {this.props.sprites.length > 0 && this.renderSprite()}
            </>
        )
    }

    static defaultProps = {
        fps: 0,
        sprites: []
    }
}