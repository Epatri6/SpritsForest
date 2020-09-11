import React from 'react';
import GameManager from '../../Game_Manager/GameManager';
import UserInfo from '../User_Info/UserInfo';
import './GamePage.css';
import AuthApiService from '../../Services/auth-api-service';
import UserContext from '../../Contexts/UserContext';
import ErrorMessage from '../Error_Message/ErrorMessage';
import Tutorial from '../Tutorial/Tutorial';

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      errorMessage: '',
    };
  }

  //-----------------------------Load/Save game data-------------------------------------------------------//

  loadLevel = () => {
    return AuthApiService.getUser()
      .then((user) => {
        this.setState({ user });
        return user;
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  saveLevel = (savegame) => {
    return AuthApiService.patchUser({ savegame })
      .then(() => {
        this.loadUser();
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  updateScore = (change) => {
    const { user } = this.state;
    return AuthApiService.patchUser({ score: user.score + change })
      .then(() => {
        this.loadUser();
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  //Load user information
  loadUser = () => {
    AuthApiService.getUser()
      .then((res) => {
        this.setState({ user: res });
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  //Load user information
  componentDidMount = () => {
    this.loadUser();
  };

  render() {
    const { user, errorMessage } = this.state;
    const contextValue = {
      user,
      loadLevel: this.loadLevel,
      saveLevel: this.saveLevel,
      updateScore: this.updateScore,
    };
    return (
      <UserContext.Provider value={contextValue}>
        <div className="game-page">
          <h1>Sprit's Forest</h1>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <UserInfo />
          <GameManager />
          <Tutorial />
        </div>
      </UserContext.Provider>
    );
  }
}
