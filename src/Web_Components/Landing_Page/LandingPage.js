import React from 'react';
import { spritWaveSprites } from '../../sprites/index';
import GameSprite from '../../Game_Components/Game_Sprite/GameSprite';
import { withRouter } from 'react-router';
import './LandingPage.css';

class LandingPage extends React.Component {
  switchScreen = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="landing-page">
        <h1>Sprit's Forest</h1>
        <p>A small grid-based puzzle game to enjoy!</p>
        <GameSprite sprites={spritWaveSprites} fps={10} />
        <button
          className="landing-page-button"
          onClick={(e) => this.switchScreen(e)}
        >
          Login
        </button>
      </div>
    );
  }
}

export default withRouter(LandingPage);
