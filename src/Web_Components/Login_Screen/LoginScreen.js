import React from 'react';
import LoginForm from '../Login_Form/LoginForm';
import AccountCreationForm from '../Account_Creation_Form/AccountCreationForm';
import './LoginScreen.css';
import AuthApiService from '../../Services/auth-api-service';
import TokenService from '../../Services/token-service';
import ErrorMessage from '../Error_Message/ErrorMessage';
import { withRouter } from "react-router-dom";

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  demoLogin = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });

    AuthApiService.postLogin({
      username: 'demo_account',
      pass: 'Password!1',
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push('/game');
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message ? res.message : res.error ? res.error : res,
        });
      });
  };

  render() {
    const {errorMessage} = this.state;
    return (
      <div className='login-screen'>
        <h1>Sprit's Forest</h1>
        <LoginForm />
        <AccountCreationForm />
        <button onClick={e => this.demoLogin(e)}>Demo Account</button>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default withRouter(LoginScreen);