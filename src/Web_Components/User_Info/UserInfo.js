import React from 'react';
import './UserInfo.css';
import UserContext from '../../Contexts/UserContext';
import TokenService from '../../Services/token-service';
import { withRouter } from 'react-router';

class UserInfo extends React.Component {
  static contextType = UserContext;

  logout = (e) => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.history.push('/login');
  };

  switchScreen = (e) => {
    e.preventDefault();
    this.props.history.push('/user');
  }

  render() {
    const { username = '', score = 0 } = this.context.user;
    return (
      <div className="user-section">
        <div className="user-info">
          <h2>{username.charAt(0).toUpperCase() + username.slice(1)}</h2>
          <div className="score">
            <h3>Score</h3>
            {score}
          </div>
        </div>
        <button onClick={(e) => this.logout(e)}>Logout</button>
        <button onClick={(e) => this.switchScreen(e)}>Update User Info</button>
      </div>
    );
  }

  static defaultProps = {
    history: {
      push: () => {},
    },
  };
}

export default withRouter(UserInfo);
