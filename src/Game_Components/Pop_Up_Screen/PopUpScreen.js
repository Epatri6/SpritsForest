import React from 'react';
import GameSprite from '../GameSprite';
import './PopUpScreen.css';

export default class PopUpScreen extends React.Component {
  render() {
    const { message, sprites, fps, children } = this.props;
    return (
      <div className="pop-up-screen">
        <p>{message}</p>
        <GameSprite sprites={sprites} fps={fps} />
        <div className="pop-up-button-row">{children}</div>
      </div>
    );
  }

  static defaultProps = {
    message: '',
    sprites: [],
    fps: 0,
    children: '',
  };
}
