import React from 'react';
import LoginForm from '../Login_Form/LoginForm';
import AccountCreationForm from '../Account_Creation_Form/AccountCreationForm';
import './LoginScreen.css';
export default class LoginScreen extends React.Component {

  render() {
    return (
      <div className='login-screen'>
        <h1>Sprit's Forest</h1>
        <LoginForm />
        <AccountCreationForm />
      </div>
    );
  }
}