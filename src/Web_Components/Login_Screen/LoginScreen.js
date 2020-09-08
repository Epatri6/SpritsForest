import React from 'react';
import LoginForm from '../Login_Form/LoginForm';
import AccountCreationForm from '../Account_Creation_Form/AccountCreationForm';
export default class LoginScreen extends React.Component {

  render() {
    return (
      <div className='login-screen'>
        <LoginForm />
        <p>-----------------------OR-------------------------</p>
        <AccountCreationForm />
      </div>
    );
  }
}