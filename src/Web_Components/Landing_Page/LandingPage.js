import React from 'react';
import {spritWaveSprites} from '../../sprites/index';
import GameSprite from '../../Game_Components/GameSprite';
import {withRouter} from 'react-router';
import GameContext from '../../Game_Data/GameContext';
import './LandingPage.css';

class LandingPage extends React.Component {

  //--------------------------------------------------Setup for animated sprite--------------------------------------//

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      tick: '',
      fps: 30
    }
  }

  //Start tracking time
  componentDidMount = () => {
    this.setState({tick: this.tick()});
  }

  //Avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.state.tick);
  }

  //Update state, then wait again
  tick = () => {
    return setTimeout(this.update, 1000 / this.state.fps);
  };

  //update time
  update = () => {
    const { fps, time } = this.state;
    this.setState({
      time: time + 1 / fps,
      tick: this.tick(),
    });
  };

  //-----------------------------------------------------------------------------------------------------------------------------------//
  switchScreen = () => {
    this.props.history.push('/login');
  }

  render() {
    const contextValue = {
      time: this.state.time
    }
    return (
      <div className='landing-page'>
        <h1>Sprit's Forest</h1>
        <p>A small grid-based puzzle game to enjoy!</p>
        <GameContext.Provider value={contextValue}>
          <GameSprite sprites={spritWaveSprites} fps={10} />
        </GameContext.Provider>
        <button className='landing-page-button' onClick={(e) => this.switchScreen(e)}>Login</button>
      </div>
    );
  }

}

export default withRouter(LandingPage);